///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/05 19:33
///

import * as UE from 'ue'
import {$ref, $unref} from "puerts";
import {BaseView} from "../../../System/API/View/BaseView";
import {AxesTool} from "../Game_APIList";
import {MessagePopup} from "../../../System/Core/MessagePupop/MessagePupop";
import {MessageTips} from "../../../System/Core/MessagePupop/MessageList";
import {NotificationStyle} from "../../../System/API/Handle/MessageNotificationHandle";

export class ViewshedAnalysisView extends BaseView {

    //@C++
    Root: UE.StaticMeshComponent
    SceneCapture: UE.SceneCaptureComponent2D
    Decal: UE.DecalComponent
    Arrow: UE.ArrowComponent
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    ViewshedAnalysisMater: UE.MaterialParameterCollection
    //@ts
    data: any
    IsAuto: boolean
    IsOnce: boolean
    IsExist: boolean

    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric<UE.StaticMeshComponent>("Root", UE.StaticMeshComponent.StaticClass())
        let CameraMesh = UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/SM_CameraMesh.SM_CameraMesh")
        this.Root.SetStaticMesh(CameraMesh)
        this.RootComponent = this.Root
        this.Root.SetWorldScale3D(new UE.Vector(50, 50, 50))
        this.ViewshedAnalysisMater = UE.MaterialParameterCollection.Load("/OpenZIAPI/Asset/MaterialFunction/MPC_Decal2.MPC_Decal2")
        this.IsAuto = true
        this.IsOnce = true
        this.IsExist = false
    }

    ReceiveBeginPlay(): void {
        this.Init()
        let CurController = UE.GameplayStatics.GetPlayerController(this, 0)
        CurController.HitResultTraceDistance = 10000000000.0
    }

    ReceiveTick(DeltaSeconds: number): void {
        if (!this.IsAuto) {
            this.ListenKeyAction()
        }
        if (this.IsExist) {
            this.SetMaterialColor()
        }
    }

    private Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
        AxesTool.CloseAxesTool("")
    }

    RefreshView(jsonData): string {
        this.data = jsonData.data
        this.Root.SetWorldScale3D(new UE.Vector(this.data.CameraScale, this.data.CameraScale, this.data.CameraScale))
        if (this.data.IsAuto) {
            this.IsAuto = true
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinates.X, this.data.coordinates.Y, this.data.coordinates.Z)
            let CurEngineLocation = $ref(new UE.Vector(0, 0, 0))
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
            let EngineLocation = $unref(CurEngineLocation)
            if (EngineLocation === null) {
                return "coordinates is error"
            }
            this.SetInit(EngineLocation)
        } else {
            if (this.data.IsAuto !== this.IsAuto) {
                let NotifiItem
                let NotifiStyle = new NotificationStyle()
                NotifiStyle.RegisterFrameStyle(MessageTips.API.ViewshedAnalysis, 600, 3, false)
                // NotifiStyle.AddNotifiButton("确定", () => { NotifiItem.SetCompletionState(UE.EDisplayState.CS_Pending) }, "cc", ENotifiButtonState.None)
                NotifiItem = MessagePopup.ShowNotification(MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle)
                NotifiItem.SetCompletionState(UE.EDisplayState.CS_None)
                NotifiItem.ExpireAndFadeout()
            }
            this.IsAuto = false
        }
        return "success"
    }

    GetUnderHit(): UE.HitResult {
        let CurPlayerController = UE.GameplayStatics.GetPlayerController(this, 0)
        let HitResult1 = $ref(new UE.HitResult)
        let IsBool1 = CurPlayerController.GetHitResultUnderCursorByChannel(UE.ETraceTypeQuery.Visibility, true, HitResult1)
        let HitResult2 = $ref(new UE.HitResult)
        let IsBool2 = CurPlayerController.GetHitResultUnderFingerByChannel(UE.ETouchIndex.Touch1, UE.ETraceTypeQuery.Visibility, true, HitResult2)
        let Hit = new UE.HitResult
        if (IsBool1) {
            Hit = $unref(HitResult1)
        } else {
            if (IsBool2) {
                Hit = $unref(HitResult2)
            }
        }
        return Hit
    }

    ListenKeyAction(): void {
        let CurPlayerController = UE.GameplayStatics.GetPlayerController(this, 0)
        let LeftMouse = this.MakeKey("LeftMouseButton")
        let Touch1 = this.MakeKey("Touch1")
        let IsMouse1 = CurPlayerController.WasInputKeyJustPressed(LeftMouse)
        let IsTouch1 = CurPlayerController.WasInputKeyJustPressed(Touch1)
        if (IsMouse1 || IsTouch1) {
            this.DrawDown()
        }
    }

    MakeKey(KeyName): UE.Key {
        let key = new UE.Key
        key.KeyName = KeyName
        return key
    }

    DrawDown() {
        let Hit = this.GetUnderHit()
        if (Hit.bBlockingHit) {
            let curloc = new UE.Vector(Hit.ImpactPoint.X, Hit.ImpactPoint.Y, Hit.ImpactPoint.Z + 50)
            this.SetInit(curloc)
        }
    }

    EndDrawing() {
        this.IsAuto = true
    }

    SetInit(location) {
        if (this.IsOnce) {
            this.SetComponent()
            this.IsOnce = false
        }
        this.IsAuto = true
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(location, false, FHitResult, false)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, this.ViewshedAnalysisMater, "FanAngleDegree", this.data.Fov)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, this.ViewshedAnalysisMater, "MaxDistance", this.data.CaptureWidth)
        this.Decal.SetWorldScale3D(new UE.Vector(this.data.CaptureWidth, this.data.CaptureWidth, this.data.CaptureWidth))
        this.SetMaterialColor()
        AxesTool.OpenAxesTool("")
        this.IsExist = true
    }

    SetComponent() {
        this.SceneCapture = new UE.SceneCaptureComponent2D(this, "SceneCapture")
        this.SceneCapture.ProjectionType = UE.ECameraProjectionMode.Perspective
        this.SceneCapture.FOVAngle = 90
        this.SceneCapture.TextureTarget = UE.TextureRenderTarget2D.Load("/OpenZIAPI/Asset/Texture/TextureRenderTarget2D2.TextureRenderTarget2D2")
        this.SceneCapture.CaptureSource = UE.ESceneCaptureSource.SCS_SceneDepth
        this.SceneCapture.K2_AttachToComponent(this.Root, "SceneCapture", UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
        this.SceneCapture.RegisterComponent()
        this.Decal = new UE.DecalComponent(this, "Decal")
        this.Decal.SetDecalMaterial(UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/Decal_Material2_Inst"))
        this.Decal.DecalSize = new UE.Vector(1, 1, 1)
        this.Decal.K2_AttachToComponent(this.SceneCapture, "Decal", UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
        this.Decal.RegisterComponent()
        this.Arrow = new UE.ArrowComponent(this, "Arrow")
        this.Arrow.K2_AttachToComponent(this.SceneCapture, "Arrow", UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
        this.Arrow.RegisterComponent()
        this.SceneCapture.HiddenActors.Add(this)
    }

    SetMaterialColor() {
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, this.ViewshedAnalysisMater, "CameraRelativePos", UE.KismetMathLibrary.Conv_VectorToLinearColor(this.SceneCapture.K2_GetComponentLocation()))
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, this.ViewshedAnalysisMater, "CameraXDir", UE.KismetMathLibrary.Conv_VectorToLinearColor(this.SceneCapture.GetRightVector()))
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, this.ViewshedAnalysisMater, "CameraYDir", UE.KismetMathLibrary.Conv_VectorToLinearColor(UE.KismetMathLibrary.Multiply_VectorFloat(this.SceneCapture.GetUpVector(), 1)))
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, this.ViewshedAnalysisMater, "CameraZDir", UE.KismetMathLibrary.Conv_VectorToLinearColor(this.SceneCapture.GetForwardVector()))
    }
}
