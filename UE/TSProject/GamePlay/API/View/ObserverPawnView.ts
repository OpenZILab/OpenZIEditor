///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/13 14:21
///

import { $ref, $unref, $InRef, makeUClass } from "puerts";
import * as UE from "ue";
import { WebSocketServer } from "../../../System/API/Handle/WebSocketServer";
import { PackBroadcastMessage } from "../../../System/API/IHandle/IAPIMessageHandle";
import { MessageCenter } from "../../../System/Core/NotificationCore/MessageManager";
import { NotificationLists } from "../../../System/Core/NotificationCore/NotificationLists";
import { CoodinateConverterViewModel } from "../ViewModel/CoodinateConverterViewModel";
import { APIViewModelSystem, GetViewModel, GetViewModelByType } from "../../../System/API/ApiViewModelSystem";
import { ERROR, WARNING } from "../../../System/Utils/MiscTools";


export enum cameraMode {
    none = "none",//none
    s = "s",
    r = "r",
    rt = "rt",
    rts = "rts"
}


export const IgnoreCollisionCheckViewModel = ["AlarmAnchor", "DrawPlane", "DrawLine", "DrawPoint", "MeasureCoordinates", "MeasureDistance", "MeasureArea", "Flatten", "Trenching"]

export class ObserverPawnView extends UE.VMPawn {

    bCameraRotaion: boolean
    bCameraTranslation: boolean
    CameraMode: cameraMode
    RedirectionOrigin: boolean
    GISType: number
    Coordinates: UE.Vector
    Pitch: number
    PitchRange: UE.Vector2D
    Yaw: number
    Distance: number
    DistanceRange: UE.Vector2D
    AutoRotate: boolean
    AutoRotateCountdown: number
    AutoRotateDirection: number
    MovementTime: number
    Fov: number
    CameraCollision: boolean
    ShiftFactor: number
    ZoomFactor: number
    TwiddleFactor: number
    ClickHighlight: boolean
    EnableDoubleclickFocus: boolean
    BuseDefaultDistance: boolean
    DoubleClickFocusDistance: number
    CurveFloat: UE.CurveFloat
    RecAutoTime: number
    bTouch: boolean
    bUpdating: boolean
    CoodinateConverterMgr: UE.CoordinateConverterMgr
    ClickInfos: boolean
    ArmTargetDistance: number
    targetLoc: UE.Vector = new UE.Vector(0, 0, 0)
    targetRot: UE.Rotator = new UE.Rotator(0, 0, 0)
    targetDis: number = 0
    currentLoc: UE.Vector = new UE.Vector(0, 0, 0)
    currentRot: UE.Rotator = new UE.Rotator(0, 0, 0)
    currentDis: number = 0
    currentChangeTime: number
    jsonData: { [key: string]: any }
    bOpenGetMetaData: boolean
    bControllerObjct: boolean
    OldLocation: UE.Vector
    bCenterOfSphere: boolean
    TempPitchRange: UE.Vector2D
    FaceLocation: UE.Vector
    FaceCamera: UE.Vector

    //touch
    TouchPoints: Map<string, UE.Vector2D> = new Map<string, UE.Vector2D>()
    TouchPointNum: number
    TouchPreDis: number


    //foucsActor
    bFoucs: boolean



    Constructor() {
        this.CameraMode = cameraMode.rts
        this.RedirectionOrigin = false
        this.GISType = 0
        this.Coordinates = new UE.Vector(104.091752, 30.626308, 0)
        this.Pitch = -60
        this.PitchRange = new UE.Vector2D(-90, -15)
        this.TempPitchRange = new UE.Vector2D(-90, -15)
        this.Yaw = 30
        this.AutoRotate = true
        this.AutoRotateCountdown = 10
        this.AutoRotateDirection = -1
        this.MovementTime = 1.5
        this.Fov = 90
        this.CameraCollision = false
        this.ShiftFactor = 1
        this.ZoomFactor = 0.2
        this.TwiddleFactor = 0.15
        this.ClickHighlight = false
        this.EnableDoubleclickFocus = false
        this.BuseDefaultDistance = false
        this.CurveFloat = UE.CurveFloat.Load("/OpenZIAPI/Asset/Curve/Curve_PawnMovementSpeed_Float.Curve_PawnMovementSpeed_Float")
        this.bTouch = false
        this.CameraSp = 1.0
        this.CurScreenPos = new UE.Vector2D(0, 0)
        this.PreScreenPos = new UE.Vector2D(0, 0)
        this.bUpdating = false
        this.CoodinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
        this.ClickInfos = true
        this.bControllerObjct = false
        this.OldLocation = new UE.Vector(0, 0, 0)
        this.bCenterOfSphere = false
        this.TouchPoints = new Map<string, UE.Vector2D>()
        this.bFoucs = false
    }

    ReceiveBeginPlay(): void {
        super.ReceiveBeginPlay()
        this.Distance = 2000 * GetViewModel(CoodinateConverterViewModel).GetScale()
        this.DistanceRange = new UE.Vector2D(4 * GetViewModel(CoodinateConverterViewModel).GetScale(), 5000 * GetViewModel(CoodinateConverterViewModel).GetScale())
        this.DoubleClickFocusDistance = 100 * GetViewModel(CoodinateConverterViewModel).GetScale()
        this.ArmTargetDistance = this.Distance
        this.SpringArmComp.TargetArmLength = this.ArmTargetDistance
        this.TouchPoints = new Map<string, UE.Vector2D>()
        UE.AxesToolSubsystem.Get().OnClickSceneObject.Add((bClickend) => {
            this.bControllerObjct = !bClickend
        })
        let CurController = UE.GameplayStatics.GetPlayerController(this, 0)
        CurController.HitResultTraceDistance = 10000000000.0
        this.IsHightLight(this.ClickHighlight)
        this.OldLocation = this.K2_GetActorLocation()
        this.SpringArmComp.bDoCollisionTest = this.CameraCollision
        MessageCenter.Add(this, this.Focus, NotificationLists.API.ONPOINTBE_CLICKED)
        this.currentLoc = this.K2_GetActorLocation()
        this.currentRot = this.GetController().GetControlRotation()
        this.currentDis = this.SpringArmComp.TargetArmLength
    }

    ReceiveTick(DeltaSeconds: number): void {
        if (this.GetController()) {
            if (!this.bCenterOfSphere) {
                if (this.SpringArmComp.TargetArmLength > (8000000 - 6369340) * GetViewModel(CoodinateConverterViewModel).GetScale()) {
                    ERROR(`${this.SpringArmComp.TargetArmLength}`)
                    this.SpringArmComp.TargetArmLength = this.SpringArmComp.TargetArmLength + 6369340 * GetViewModel(CoodinateConverterViewModel).GetScale()
                    //this.ArmTargetDistance = this.SpringArmComp.TargetArmLength + 2369340 * GetViewModel(CoodinateConverterViewModel).GetScale()
                    this.ArmTargetDistance = this.SpringArmComp.TargetArmLength + 1800000 * GetViewModel(CoodinateConverterViewModel).GetScale()
                    this.bCenterOfSphere = true
                    ERROR(`球面坐标`)

                    MessageCenter.Execute(NotificationLists.API.ON_PAWN_CENTER_SPHERE, true)

                    this.SpringArmComp.bEnableCameraLag = false
                    this.SpringArmComp.bEnableCameraRotationLag = false
                    let CCC = new UE.Vector(10, 10, 0)
                    CCC.Y = 90
                    GetViewModel(CoodinateConverterViewModel).UpdateGeoLngLatHeight(CCC)

                    this.K2_SetActorLocation(GetViewModel(CoodinateConverterViewModel).GetOriginLocation(), false, undefined, false)



                    let TempRotation = this.K2_GetActorRotation()

                    TempRotation.Pitch = 0
                    this.K2_SetActorRotation(TempRotation, false)
                    this.TempPitchRange = this.PitchRange
                    this.PitchRange = new UE.Vector2D(-179, 179)
                    this.currentDis = this.SpringArmComp.TargetArmLength

                    // this.currentRot.Pitch = -89.9
                    // this.targetRot.Pitch =  -89.9
                    // this.PitchRange = this.TempPitchRange



                }
            } else {
                if (this.SpringArmComp.TargetArmLength < 8000000 * GetViewModel(CoodinateConverterViewModel).GetScale()) {

                    ERROR(`平面坐标`)
                    this.SpringArmComp.bEnableCameraLag = false
                    this.SpringArmComp.bEnableCameraRotationLag = false
                    GetViewModel(CoodinateConverterViewModel).ReturnToplaneOrigin()
                    this.K2_SetActorLocation(new UE.Vector(0, 0, 0), false, undefined, false)
                    let TempRotation = this.K2_GetActorRotation()
                    TempRotation.Pitch = -89.9
                    this.K2_SetActorRotation(TempRotation, false)
                    if (this.SpringArmComp.TargetArmLength - 6369341 * GetViewModel(CoodinateConverterViewModel).GetScale() > 0) {
                        this.SpringArmComp.TargetArmLength = this.SpringArmComp.TargetArmLength - 6369341 * GetViewModel(CoodinateConverterViewModel).GetScale()
                    }
                    this.ArmTargetDistance = this.SpringArmComp.TargetArmLength
                    this.currentDis = this.SpringArmComp.TargetArmLength
                    this.currentRot.Pitch = -89.9
                    this.targetRot.Pitch = -89.9
                    this.currentLoc = new UE.Vector(0, 0, 0)
                    this.targetLoc = new UE.Vector(0, 0, 0)
                    this.PitchRange = this.TempPitchRange
                    this.bCenterOfSphere = false
                    ERROR(`${this.SpringArmComp.TargetArmLength}`)
                    MessageCenter.Execute(NotificationLists.API.ON_PAWN_CENTER_SPHERE, false)
                } else {

                }
            }
            // WARNING(`${this.bControllerObjct}`)
            if (!this.bControllerObjct) {

                this.LimitControllRotation()
                this.AutoRotation(DeltaSeconds)
                this.UpdateCameraInfo(DeltaSeconds)
            }
            this.UpdateZoom(DeltaSeconds)
            MessageCenter.Execute(NotificationLists.API.GET_CAMERA_LOCATION, this.CameraComp.K2_GetComponentLocation())
            MessageCenter.Execute(NotificationLists.API.CAMERA_HEIGHT, this.SpringArmComp.TargetArmLength)
            MessageCenter.Execute(NotificationLists.API.CAMERA_COORD_ROT_LEN, this.CameraComp.K2_GetComponentLocation(), this.K2_GetActorRotation(), this.SpringArmComp.TargetArmLength)
        }
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason): void {

    }

    OnTouchPressed(FingerIndex: UE.ETouchIndex, Location: UE.Vector): void {
        this.bTouch = true
        this.TouchPointNum = this.TouchPoints.size
        this.TouchPoints.set(this.TouchIndexToString(FingerIndex), new UE.Vector2D(Location.X, Location.Y))
        if (this.TouchPoints.size == 1 && this.TouchPointNum == 0) {
            if (this.bCenterOfSphere) {
                this.StartRotation(FingerIndex)
            } else {
                if (this.TouchIsLeft(Location)) {
                    this.StartTranslation(FingerIndex)
                } else {
                    this.StartRotation(FingerIndex)
                }
            }

        } else if (this.TouchPoints.size == 2) {
            this.TouchPreDis = UE.KismetMathLibrary.Distance2D(this.TouchPoints.get("one"), this.TouchPoints.get("two"))
        }


    }

    OnTouchReleased(FingerIndex: UE.ETouchIndex, Location: UE.Vector): void {
        if (this.TouchPoints.size == 1 && this.TouchPointNum == 0) {
        } else if (this.TouchPoints.size == 2) {
            this.TouchPreDis = 0
        }
        this.EndRotation()
        this.EndTranslation()
        this.TouchPoints.clear()

    }

    OnTouchRepeat(FingerIndex: UE.ETouchIndex, Location: UE.Vector): void {
        //return
        this.bTouch = true
        this.TouchPoints.set(this.TouchIndexToString(FingerIndex), new UE.Vector2D(Location.X, Location.Y))
        if (this.TouchPoints.size == 1 && this.TouchPointNum == 0) {
            if (this.bCameraTranslation) {


                this.UpdateControllerLocation(FingerIndex)
            }
            if (this.bCameraRotaion) {

                this.UpdateControllerRotation(FingerIndex)
            }
        } else if (this.TouchPoints.size == 2) {
            this.TouchZoom()
        }
    }

    OnTouchDoubleClick(FingerIndex: UE.ETouchIndex, Location: UE.Vector): void {
        this.bTouch = true
        this.ActivateAutoRotation()
    }

    TouchZoom() {
        let dis = (UE.KismetMathLibrary.Distance2D(this.TouchPoints.get("one"), this.TouchPoints.get("two")) - this.TouchPreDis) / this.TouchPreDis * 10
        if (Math.abs(dis) > 1) return
        this.SetZoom(-dis)
        this.TouchPreDis = UE.KismetMathLibrary.Distance2D(this.TouchPoints.get("one"), this.TouchPoints.get("two"))
    }

    TouchIsLeft(value) {
        let X = $ref(Number())
        let Y = $ref(Number())
        let Controller = this.GetController() as UE.PlayerController
        Controller.GetViewportSize(X, Y)
        return value.X / $unref(X) < 0.5
    }


    OnLeftMouseButtonPressed(): void {

        //左键点击一些通用设置

        this.bTouch = false
        if (this.bCenterOfSphere) {
            this.StartRotation(-1)
        } else {

            this.StartTranslation(-1)
        }


        //发送点击通知
        let HitResult = $ref(new UE.HitResult())
        if (this.GetHitUnderPoint(0, HitResult)) {
            let Coordinates = $ref(new UE.GeographicCoordinates())
            this.CoodinateConverterMgr.EngineToGeographic(UE.EGISType.WGS84, $unref(HitResult).ImpactPoint, Coordinates)
            let OutVec = new UE.Vector(0, 0, 0)
            OutVec.X = $unref(Coordinates).Longitude
            OutVec.Y = $unref(Coordinates).Latitude
            OutVec.Z = $unref(Coordinates).Altitude
            MessageCenter.Execute(NotificationLists.API.MOUSE_HIT, OutVec)
            let out = {location: {X: 0, Y: 0, Z: 0}, name: "", tags: []}
            if (this.ClickInfos) {
                let HitActor = UE.OpenZIFrameworkLibrary.GetHitActor($unref(HitResult))
                if (HitActor) {
                    out.name = UE.KismetSystemLibrary.GetDisplayName(HitActor)
                    if (HitActor.Tags.Num() > 0) {
                        for (let i = 0; i < HitActor.Tags.Num(); i++) {
                            out.tags.push(HitActor.Tags.Get(i))
                        }
                    }
                }
            }
            let msg = {
                classDef: "ObserverPawn", funcDef: "MouseHit"
            }
            let Location = {X: OutVec.X, Y: OutVec.Y, Z: OutVec.Z}
            out.location = Location
            let Msg = PackBroadcastMessage(msg, out)
            WebSocketServer.GetInstance().OnSendWebMessage(Msg)
        }
    }

    StartTranslation(index) {
        this.ActivateAutoRotation()
        UE.AxesToolSubsystem.Get().OnLeftMouseDown()
        this.SpringArmComp.bEnableCameraLag = true
        this.SpringArmComp.bEnableCameraRotationLag = true
        this.SpringArmComp.CameraLagSpeed = 10
        this.bCameraTranslation = true
        let Pos = $ref(new UE.Vector2D(0, 0))
        if (!this.bTouch) {
            index = -1
        }
        if (this.GetScreenPos(this.bTouch, Pos, index)) {
            this.PreScreenPos = $unref(Pos)
            this.CurScreenPos = $unref(Pos)
        }
    }

    EndTranslation() {
        UE.AxesToolSubsystem.Get().OnLeftMouseUp()
        this.ActivateAutoRotation()
        this.bCameraTranslation = false
    }

    StartRotation(index) {
        this.ActivateAutoRotation()
        this.SpringArmComp.bEnableCameraLag = true
        this.SpringArmComp.bEnableCameraRotationLag = true
        this.SpringArmComp.CameraLagSpeed = 10
        this.bControllerObjct = false
        this.bCameraRotaion = true
        let Pos = $ref(new UE.Vector2D(0, 0))
        if (!this.bTouch) {
            index = -1
        }
        if (this.GetScreenPos(this.bTouch, Pos, index)) {
            this.PreScreenPos = $unref(Pos)
            this.CurScreenPos = $unref(Pos)
        }
    }

    EndRotation() {
        this.ActivateAutoRotation()

        this.bControllerObjct = false

        this.bCameraRotaion = false
    }

    OnLeftMouseButtonDoubleClick(): void {
        this.ActivateAutoRotation()

        if (this.bCenterOfSphere) {
            // if(this.GetCameraCenterHitValue()!=null){
            //     let HitResult = $unref(this.GetCameraCenterHitValue())
            //     //GetViewModel(CoodinateConverterViewModel).
            //     let CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
            //     let GeographicPos =$ref(new UE.GeographicCoordinates(0,0,0))

            //     CoordinateConverterMgr.EngineToGeographic(GetViewModel(CoodinateConverterViewModel).GetGISType(),HitResult.ImpactPoint,GeographicPos)
            //     let GeoPosVec = new UE.Vector($unref(GeographicPos).Longitude,$unref(GeographicPos).Latitude,$unref(GeographicPos).Altitude)
            //     GetViewModel(CoodinateConverterViewModel).UpdateGeoLngLatHeight(GeoPosVec)
            //     this.K2_SetActorLocation(new UE.Vector(0,0,0), false, undefined, false)
            //     this.SpringArmComp.TargetArmLength = 1000000 * GetViewModel(CoodinateConverterViewModel).GetScale()
            //     this.ArmTargetDistance = 2000*GetViewModel(CoodinateConverterViewModel).GetScale()
            //     this.bCenterOfSphere = false
            // }
        }

        let HitResult = $ref(new UE.HitResult())
        let HitActor: UE.Actor
        if (this.GetHitUnderPoint(0, HitResult)) {
            HitActor = UE.OpenZIFrameworkLibrary.GetHitActor($unref(HitResult))
            if (HitActor.Tags.Contains("CesiumTerrain")) {
                return
            }
            if (this.EnableDoubleclickFocus) {
                HitActor = UE.OpenZIFrameworkLibrary.GetHitActor($unref(HitResult))
                this.K2_SetActorLocation(HitActor.K2_GetActorLocation(), false, null, false)
                if (!this.BuseDefaultDistance) {
                    if (this.ArmTargetDistance > this.DoubleClickFocusDistance) {
                        this.ArmTargetDistance = this.DoubleClickFocusDistance
                    }
                    let msg = {
                        classDef: "ObserverPawn", funcDef: "MouseDoubleClick"
                    }
                    let out = {}
                    let Msg = PackBroadcastMessage(msg, out)
                    WebSocketServer.GetInstance().OnSendWebMessage(Msg)
                }
            }
        }

    }

    Focus(InputData) {
        this.bControllerObjct = false
        if (InputData && InputData.location) {
            this.K2_SetActorLocation(InputData?.location, false, null, false)
        }
        if (InputData.distance != null) {
            this.ArmTargetDistance = InputData.distance * GetViewModel(CoodinateConverterViewModel).GetScale()
        } else {
            this.ArmTargetDistance = this.DoubleClickFocusDistance
        }
    }


    OnLeftMouseButtonReleased(): void {
        UE.AxesToolSubsystem.Get().OnLeftMouseUp()
        if (this.bCenterOfSphere) {
            this.EndRotation()
        } else {

            this.EndTranslation()
        }

    }

    OnRightMouseButtonPressed(): void {
        this.bTouch = false
        if (!this.bCenterOfSphere) {

            this.StartRotation(-1)
        }
    }

    OnRightMouseButtonReleased(): void {
        if (!this.bCenterOfSphere) {

            this.EndRotation()
        }
    }

    OnMiddleMouseButtonPressed(): void {
        this.bTouch = false
        this.ActivateAutoRotation()
        if (this.bOpenGetMetaData) {
            let OutHit = $ref(new UE.HitResult());
            let LocationX = $ref(Number());
            let LocationY = $ref(Number());
            let PlayerController = this.GetController() as UE.PlayerController
            let WorldLocation = $ref(new UE.Vector(0, 0, 0))
            let WorldDirection = $ref(new UE.Vector(0, 0, 0))
            let EndTrance: UE.Vector = new UE.Vector(0, 0, 0)
            if (PlayerController.GetMousePosition(LocationX, LocationY)) {
                if (PlayerController.DeprojectScreenPositionToWorld($unref(LocationX), $unref(LocationY), WorldLocation, WorldDirection)) {
                    let EndLocation = UE.KismetMathLibrary.Multiply_VectorFloat($unref(WorldDirection), 500000 * GetViewModel(CoodinateConverterViewModel).GetScale())
                    EndTrance = UE.KismetMathLibrary.Add_VectorVector(EndLocation, UE.GameplayStatics.GetPlayerCameraManager(this, 0).GetCameraLocation())
                }
            }
            let bHit = UE.KismetSystemLibrary.LineTraceSingle(this, this.CameraComp.K2_GetComponentLocation(), EndTrance, UE.ETraceTypeQuery.TraceTypeQuery1, true, undefined, UE.EDrawDebugTrace.None, OutHit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5)
            if (bHit) {
                let HitComponent = UE.OpenZIFrameworkLibrary.GetHitComponent($unref(OutHit))
                let Metadata = UE.CesiumToolHelper.GetMetadata(HitComponent, $unref(OutHit).FaceIndex)
                let out: { [key: string]: any } = {}
                for (let i = 0; i < Metadata.Num(); i++) {
                    out[Metadata.GetKey(i)] = Metadata.Get(Metadata.GetKey(i))
                }
                let msg = {
                    classDef: "ObserverPawn", funcDef: "GetMetaData"
                }
                let Msg = PackBroadcastMessage(msg, out)
                WebSocketServer.GetInstance().OnSendWebMessage(Msg)
            }
        }
    }


    EventMouseX(AxisValue: number): void {

        if (this.bCameraRotaion) {
            this.UpdateControllerRotation(-1)
        }
        if (this.bCameraTranslation) {
            if (this.bCenterOfSphere) return
            this.UpdateControllerLocation(-1)
        }

    }

    EventMouseY(AxisValue: number): void {


        if (this.bCameraRotaion) {
            this.UpdateControllerRotation(-1)
        }

        if (this.bCameraTranslation) {
            if (this.bCenterOfSphere) return
            this.UpdateControllerLocation(-1)
        }
    }

    Zoom(AxisValue: number): void {
        this.SetZoom(-AxisValue)
        if (AxisValue !== 0) {
            this.bControllerObjct = false
            this.ActivateAutoRotation()
        }
    }

    //@no-blueprint
    UpdateControllerRotation(index) {
        this.SpringArmComp.bDoCollisionTest = this.CameraCollision
        if (this.bControllerObjct) return
        if (this.CameraMode == cameraMode.r || this.CameraMode == cameraMode.rt || this.CameraMode == cameraMode.rts) {
            let ScrDiff = this.CalculateScreenDiff(this.TwiddleFactor * 0.5, this.bTouch, index)
            let VecZero = new UE.Vector2D(0, 0)
            if (ScrDiff != VecZero) {
                //test
                // let ViewportSize = UE.CoreFunctionLibrary.GetViewportSize()
                // let ScreenCenter =UE.KismetMathLibrary.Divide_Vector2DFloat(ViewportSize,2)

                this.AddControllerYawInput(-ScrDiff.X)
                this.AddControllerPitchInput(-ScrDiff.Y)
                this.ActivateAutoRotation()
            }
        }
    }

    UpdateControllerLocation(index) {
        this.SpringArmComp.bDoCollisionTest = false
        if (this.bControllerObjct) return
        if (this.CameraMode == cameraMode.rt || this.CameraMode == cameraMode.rts) {
            let ZDis = UE.KismetMathLibrary.Abs(this.SpringArmComp.TargetArmLength) * 0.002 * this.ShiftFactor
            ZDis = ZDis < 1 ? 1 : ZDis
            let ScrDiff = this.CalculateScreenDiff(ZDis, this.bTouch, index)
            let VecZero = new UE.Vector2D(0, 0)
            if (ScrDiff != VecZero) {
                let RightVec = this.GetActorRightVector()
                let XOffset = UE.KismetMathLibrary.Multiply_VectorFloat(RightVec, ScrDiff.X)
                let YDir = UE.KismetMathLibrary.Normal(UE.KismetMathLibrary.Add_VectorVector(this.GetActorUpVector(), this.GetActorForwardVector()), 0.1)
                let YOffset = UE.KismetMathLibrary.Multiply_VectorFloat(YDir, -ScrDiff.Y)
                let Offset = UE.KismetMathLibrary.Add_VectorVector(XOffset, YOffset)
                Offset.Z = 0
                if (this.CameraCollision) {
                    let NewRootLocation = UE.KismetMathLibrary.Add_VectorVector(this.K2_GetActorLocation(), Offset)
                    let NewCameraLocation = UE.KismetMathLibrary.Add_VectorVector(this.CameraComp.K2_GetComponentLocation(), Offset)
                    let PlayerController = this.GetController() as UE.PlayerController
                    let EndTrance = UE.KismetMathLibrary.Add_VectorVector(NewCameraLocation, UE.KismetMathLibrary.Multiply_VectorFloat(this.CameraComp.GetForwardVector(), PlayerController.HitResultTraceDistance))
                    let OutHit = $ref(new UE.HitResult())
                    let bHit = UE.KismetSystemLibrary.LineTraceSingle(this, NewCameraLocation, EndTrance, UE.ETraceTypeQuery.TraceTypeQuery1, true, undefined, UE.EDrawDebugTrace.None, OutHit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5)
                    if (bHit) {
                        Offset.Z = $unref(OutHit).ImpactPoint.Z - this.K2_GetActorLocation().Z
                    }
                }
                this.K2_AddActorWorldOffset(Offset, false, undefined, false)
            }
        }
    }


    //@no-blueprint
    SetZoom(AxisValue: number) {
        if (this.CameraMode == cameraMode.rts || this.CameraMode == cameraMode.s) {
            if (AxisValue != 0) {
                if (!this.bCenterOfSphere) {
                    if (this.GetCameraCenterHit() == false) {
                        this.SpringArmComp.bEnableCameraLag = true
                        this.SpringArmComp.bEnableCameraRotationLag = true
                        this.SpringArmComp.CameraLagSpeed = 10
                        let temp = AxisValue * 0.1
                        let RateDistance = this.CurveFloat.GetFloatValue(this.ArmTargetDistance)
                        RateDistance = temp * RateDistance + this.ArmTargetDistance
                        let DistanceRangeMax = this.DistanceRange.Y
                        if (this.DistanceRange.Y <= 8000000 * GetViewModel(CoodinateConverterViewModel).GetScale() && this.DistanceRange.Y > (8000000 - 6369340) * GetViewModel(CoodinateConverterViewModel).GetScale()) {
                            DistanceRangeMax = this.DistanceRange.Y + 6369340 * GetViewModel(CoodinateConverterViewModel).GetScale()
                        }
                        this.ArmTargetDistance = UE.KismetMathLibrary.FClamp(RateDistance, this.DistanceRange.X, DistanceRangeMax)
                    }
                } else {
                    this.SpringArmComp.bEnableCameraLag = true
                    this.SpringArmComp.bEnableCameraRotationLag = true
                    this.SpringArmComp.CameraLagSpeed = 10
                    let temp = AxisValue * 0.1
                    let RateDistance = this.CurveFloat.GetFloatValue(this.ArmTargetDistance)
                    RateDistance = temp * RateDistance + this.ArmTargetDistance
                    let DistanceRangeMax = this.DistanceRange.Y
                    if (this.DistanceRange.Y <= 8000000 * GetViewModel(CoodinateConverterViewModel).GetScale() && this.DistanceRange.Y > (8000000 - 6369340) * GetViewModel(CoodinateConverterViewModel).GetScale()) {
                        DistanceRangeMax = this.DistanceRange.Y + 6369340 * GetViewModel(CoodinateConverterViewModel).GetScale()
                    }
                    //let DistanceRangeMax = this.DistanceRange.Y+8000000*GetViewModel(CoodinateConverterViewModel).GetScale()
                    this.ArmTargetDistance = UE.KismetMathLibrary.FClamp(RateDistance, this.DistanceRange.X, DistanceRangeMax)

                }
            }
        }
    }

    //@no-blueprint
    UpdateZoom(DeltaSeconds) {
        if (this.bFoucs) {
            //this.ArmTargetDistance = 0

        } else {
            if (this.CameraMode !== cameraMode.none) {
                if (this.ArmTargetDistance != this.SpringArmComp.TargetArmLength) {
                    this.SpringArmComp.TargetArmLength = UE.KismetMathLibrary.FInterpTo(this.SpringArmComp.TargetArmLength, this.ArmTargetDistance, DeltaSeconds, 5)
                }
            }
        }

    }

    OnFocusActors(InFoucs: boolean, Vector: UE.Vector) {
        this.bFoucs = InFoucs
        if (this.bFoucs) {
            let TransformProxyLocation = UE.AxesToolSubsystem.Get().TransformInteraction.GetProxyTransform().GetTranslation();
            this.K2_SetActorLocation(TransformProxyLocation, false, undefined, false);
            let ArmDistance = UE.KismetMathLibrary.Vector_Distance(TransformProxyLocation, Vector);
            console.error(`${ArmDistance}`)
            this.SpringArmComp.TargetArmLength = ArmDistance
            this.ArmTargetDistance = ArmDistance
        }
    }


    //@no-blueprint
    LimitControllRotation() {
        let Rotation = this.K2_GetActorRotation()
        let value = UE.KismetMathLibrary.FClamp(Rotation.Pitch, this.PitchRange.X, this.PitchRange.Y)
        Rotation.Pitch = value
        this.GetController().SetControlRotation(Rotation)
    }

    //@no-blueprint
    ActivateAutoRotation() {
        this.RecAutoTime = this.AutoRotateCountdown
    }

    //no-blueprint
    AutoRotation(DeltaSeconds) {
        if (this.bControllerObjct) return

        if (this.CameraMode != cameraMode.none && this.CameraMode != cameraMode.s && this.AutoRotate && !this.bUpdating) {
            if (this.RecAutoTime == 0) {
                this.RunAutoRatation(DeltaSeconds)
            } else {
                this.RecAutoTime = this.RecAutoTime - DeltaSeconds
                if (this.RecAutoTime <= 0) {
                    this.RecAutoTime = 0
                }
            }
        }
    }

    //no-blueprint
    RunAutoRatation(DeltaSeconds) {
        let value = UE.KismetMathLibrary.RandomFloatInRange(0.2, 2.5) * DeltaSeconds * this.AutoRotateDirection
        this.AddControllerYawInput(value)
    }

    //no-blueprint
    GetHitUnderPoint(index, Hit: $InRef<UE.HitResult>): boolean {
        let bSuccess = false
        //let HitResult = $ref(new UE.HitResult())
        if (this.GetController()) {
            let Controller = this.GetController() as UE.PlayerController
            if (this.bTouch) {
                bSuccess = Controller.GetHitResultUnderFinger(index, UE.ECollisionChannel.ECC_Visibility, true, Hit)
            } else {
                bSuccess = Controller.GetHitResultUnderCursorByChannel(UE.ETraceTypeQuery.Visibility, true, Hit)
            }
        }
        return bSuccess
    }

    //@no-blueprint
    SetCameraInfo(jsonData) {
        //GetViewModel(CoodinateConverterViewModel).ReturnToplaneOrigin()
        this.jsonData = jsonData
        this.bUpdating = true
        this.bControllerObjct = false
        let _data = jsonData.data
        this.CameraMode = _data.cameraMode
        this.RedirectionOrigin = _data.RedirectionOrigin
        this.GISType = _data.GISType
        this.Coordinates = _data.coordinates
        this.Pitch = _data.pitch
        if (!this.bCenterOfSphere) {
            this.PitchRange = _data.pitchRange
        }
        this.Yaw = _data.yaw
        this.Distance = _data.distance * GetViewModel(CoodinateConverterViewModel).GetScale()
        this.DistanceRange.X = _data.distanceRange.X * GetViewModel(CoodinateConverterViewModel).GetScale()
        this.DistanceRange.Y = _data.distanceRange.Y * GetViewModel(CoodinateConverterViewModel).GetScale()
        this.AutoRotate = _data.autoRotate
        this.AutoRotateCountdown = _data.autoRotateCountdown
        this.AutoRotateDirection = _data.autoRotateDirection
        this.MovementTime = _data.movementTime
        this.Fov = _data.fov
        this.CameraCollision = _data.cameraCollision
        this.ShiftFactor = _data.shiftFactor
        this.ZoomFactor = _data.zoomFactor
        this.TwiddleFactor = _data.twiddleFactor
        this.ClickInfos = _data.clickInfos
        this.ClickHighlight = _data.clickHighLight
        this.EnableDoubleclickFocus = _data.enableDoubleclickFocus
        this.BuseDefaultDistance = _data.buseDefaultDistance
        this.DoubleClickFocusDistance = _data.doubleClickFocusDistance * GetViewModel(CoodinateConverterViewModel).GetScale()

        let GeographicPos = new UE.GeographicCoordinates()
        GeographicPos.Longitude = this.Coordinates.X
        GeographicPos.Latitude = this.Coordinates.Y
        GeographicPos.Altitude = this.Coordinates.Z

        if (this.RedirectionOrigin) {
            GetViewModel(CoodinateConverterViewModel).UpdateGeoLngLatHeight(this.Coordinates)
        }
        let EngineLocation = $ref(new UE.Vector(0, 0, 0))
        this.CoodinateConverterMgr.GeographicToEngine(this.GISType, GeographicPos, EngineLocation)
        if (EngineLocation == null) {
            return "coordinates is error"
        }
        this.targetLoc = $unref(EngineLocation)
        let Rotation = this.K2_GetActorRotation()
        Rotation.Pitch = this.Pitch
        Rotation.Yaw = this.Yaw
        this.targetRot = Rotation
        if (this.Distance > this.DistanceRange.Y) {
            this.Distance = this.DistanceRange.Y
            if (this.bCenterOfSphere && this.Distance > (8000000 - 6369341) * GetViewModel(CoodinateConverterViewModel).GetScale() && this.Distance < 8000000 * GetViewModel(CoodinateConverterViewModel).GetScale()) {
                this.Distance = (8000000 - 6369341) * GetViewModel(CoodinateConverterViewModel).GetScale()
            }
        }
        if (this.Distance < this.DistanceRange.X) {
            this.Distance = this.DistanceRange.X
        }

        this.targetDis = this.Distance
        // if(this.bCenterOfSphere&&this.targetDis>(8000000-6369341)&&this.targetDis<8000000){
        //     (this.targetDis+ 6369341) * GetViewModel(CoodinateConverterViewModel).GetScale()
        // }
        this.CameraComp.SetFieldOfView(this.Fov)

        this.currentChangeTime = this.MovementTime
        this.IsHightLight(this.ClickHighlight)
        MessageCenter.Execute(NotificationLists.API.SET_CAMERA_FINISH, _data)
        return "success"
    }

    SetTargetInfoFinish() {
        this.bUpdating = false
        this.currentChangeTime = 0
        this.currentLoc = this.targetLoc
        this.currentRot = this.targetRot
        this.currentDis = this.targetDis
        if (!this.bCenterOfSphere) {
            this.GetController().SetControlRotation(this.targetRot)
            this.K2_SetActorLocation(this.targetLoc, false, undefined, false)
        }
        this.ArmTargetDistance = this.targetDis
        this.ActivateAutoRotation()

    }

    UpdateCameraInfo(DeltaSeconds) {
        if (this.bUpdating) {
            let notEqual_Dis = UE.KismetMathLibrary.Abs((this.targetDis - this.currentDis)) < 0.1
            let notEqual_Loc = UE.KismetMathLibrary.EqualEqual_VectorVector(this.currentLoc, this.targetLoc, 1)
            let notEqual_Rot = UE.KismetMathLibrary.EqualEqual_RotatorRotator(this.currentRot, this.targetRot, 1)
            if (notEqual_Dis && notEqual_Loc && notEqual_Rot) {
                this.SetTargetInfoFinish()
                return
            }
            if (this.currentChangeTime == 0) {
                this.SetTargetInfoFinish()
            } else {
                this.currentChangeTime = this.currentChangeTime - DeltaSeconds
                if (this.currentChangeTime <= 0) {
                    this.currentChangeTime = 0
                }
                let alpha = 1 - this.currentChangeTime / this.MovementTime
                let newloc = UE.KismetMathLibrary.VLerp(this.currentLoc, this.targetLoc, alpha)
                let newrot = UE.KismetMathLibrary.RLerp(this.currentRot, this.targetRot, alpha, true)
                let newdis = UE.KismetMathLibrary.Lerp(this.currentDis, this.targetDis, alpha)
                // ERROR(`currentDis:${this.currentDis}`)
                // ERROR(`targetDis:${this.targetDis}`)
                // ERROR(`newdis:${newdis}`)
                this.ArmTargetDistance = newdis
                if (!this.bCenterOfSphere) {
                    this.K2_SetActorLocation(newloc, false, undefined, false)
                    this.GetController().SetControlRotation(newrot)
                }
            }
        } else {
            this.currentLoc = this.K2_GetActorLocation()
            this.currentRot = this.GetController().GetControlRotation()
            this.currentDis = this.SpringArmComp.TargetArmLength
        }
    }

    GetCameraInfo() {
        this.jsonData = {
            CameraMode: this.CameraMode,
            RedirectionOrigin: this.RedirectionOrigin,
            GISType: this.GISType,
            Coordinates: this.Coordinates,
            Pitch: this.Pitch,
            PitchRange: this.PitchRange,
            Yaw: this.Yaw,
            Distance: this.Distance,
            DistanceRange: this.DistanceRange,
            AutoRotate: this.AutoRotate,
            AutoRotateCountdown: this.AutoRotateCountdown,
            AutoRotateDirection: this.AutoRotateDirection,
            MovementTime: this.MovementTime,
            Fov: this.Fov,
            CameraCollision: this.CameraCollision,
            ShiftFactor: this.ShiftFactor,
            ZoomFactor: this.ZoomFactor,
            TwiddleFactor: this.TwiddleFactor,
            ClickInfos: this.ClickInfos,
            ClickHighlight: this.ClickHighlight,
            EnableDoubleclickFocus: this.EnableDoubleclickFocus,
            BuseDefaultDistance: this.BuseDefaultDistance,
            DoubleClickFocusDistance: this.DoubleClickFocusDistance,
        }
        let CameraRotation = this.K2_GetActorRotation()
        this.jsonData.Pitch = CameraRotation.Pitch
        this.jsonData.PitchRange = { X: this.PitchRange.X, Y: this.PitchRange.Y }
        this.jsonData.DistanceRange = { X: this.DistanceRange.X, Y: this.DistanceRange.Y }
        this.jsonData.Distance = this.ArmTargetDistance / GetViewModel(CoodinateConverterViewModel).GetScale()
        this.jsonData.PitchRange = { X: this.PitchRange.X, Y: this.PitchRange.Y }
        this.jsonData.DistanceRange = { X: this.DistanceRange.X, Y: this.DistanceRange.Y }
        let GeographicPos = $ref(new UE.GeographicCoordinates())
        this.CoodinateConverterMgr.EngineToGeographic(this.GISType, this.K2_GetActorLocation(), GeographicPos)
        let Cood = {
            X: $unref(GeographicPos).Longitude,
            Y: $unref(GeographicPos).Latitude,
            Z: $unref(GeographicPos).Altitude
        }
        this.jsonData.Coordinates = Cood
        this.jsonData.Yaw = CameraRotation.Yaw
        return this.jsonData
    }

    GetCoord() {
        return this.Coordinates
    }

    SetOpenMetaData(jsonData) {
        this.bOpenGetMetaData = jsonData.data.bOpenGetMetaData

    }

    GetCameraCenterHit(): boolean {
        let CameraLocation = this.CameraComp.K2_GetComponentLocation()
        let PlayerController = this.GetController() as UE.PlayerController
        let EndTrance = UE.KismetMathLibrary.Add_VectorVector(CameraLocation, UE.KismetMathLibrary.Multiply_VectorFloat(this.CameraComp.GetForwardVector(), PlayerController.HitResultTraceDistance))
        let OutHit = $ref(new UE.HitResult())
        let ActorsToIgnore = this.FindIgnoreActors()
        let bHit = UE.KismetSystemLibrary.LineTraceSingle(this, this.CameraComp.K2_GetComponentLocation(), EndTrance, UE.ETraceTypeQuery.TraceTypeQuery1, true, ActorsToIgnore, UE.EDrawDebugTrace.None, OutHit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5)
        if ($unref(OutHit).Item)
            if (bHit) {
                let SameLocation = UE.KismetMathLibrary.EqualEqual_VectorVector(this.K2_GetActorLocation(), $unref(OutHit).ImpactPoint, 1)
                if (!SameLocation) {
                    this.SpringArmComp.bEnableCameraLag = false
                    this.SpringArmComp.bEnableCameraRotationLag = false
                    this.K2_SetActorLocation($unref(OutHit).ImpactPoint, false, undefined, false)
                    let distance = UE.KismetMathLibrary.Vector_Distance(CameraLocation, $unref(OutHit).ImpactPoint)
                    this.SpringArmComp.TargetArmLength = distance
                    this.ArmTargetDistance = this.SpringArmComp.TargetArmLength
                    return true
                }
            }
        return false
    }

    GetCameraCenterHitValue() {
        let CameraLocation = this.CameraComp.K2_GetComponentLocation()
        let PlayerController = this.GetController() as UE.PlayerController
        let EndTrance = UE.KismetMathLibrary.Add_VectorVector(CameraLocation, UE.KismetMathLibrary.Multiply_VectorFloat(this.CameraComp.GetForwardVector(), PlayerController.HitResultTraceDistance))
        let OutHit = $ref(new UE.HitResult())
        let bHit = UE.KismetSystemLibrary.LineTraceSingle(this, this.CameraComp.K2_GetComponentLocation(), EndTrance, UE.ETraceTypeQuery.TraceTypeQuery1, true, undefined, UE.EDrawDebugTrace.None, OutHit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5)
        if (bHit) {
            return OutHit
        }
        return null
    }

    TouchIndexToString(index: number): string {

        if (index == 0) {
            return "one"
        } else if (index == 1) {
            return "two"
        } else if (index == 2) {
            return "three"
        } else if (index == 3) {
            return "four"
        }
    }

    FindIgnoreActors() {
        let IgnoreActors = UE.NewArray(UE.Actor)
        IgnoreCollisionCheckViewModel.forEach(item => {
            let ViewModel = GetViewModelByType(item)
            if (ViewModel) {
                ViewModel.OBJMaps.forEach((value, key) => {
                    if (value instanceof UE.Actor) {
                        IgnoreActors.Add(value)
                    }
                })
            }
        })
        return IgnoreActors
    }


}


