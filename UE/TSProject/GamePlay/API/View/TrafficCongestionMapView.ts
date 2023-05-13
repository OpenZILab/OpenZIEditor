///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 18:29
///

import * as UE from 'ue'
import {NewArray} from "ue";
import {BaseView} from "../../../System/API/View/BaseView";
import {$ref, $unref} from "puerts";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationStyle} from "../../../System/API/Handle/MessageNotificationHandle";
import {MessageTips} from "../../../System/Core/MessagePupop/MessageList";
import {MessagePopup} from "../../../System/Core/MessagePupop/MessagePupop";

export class TrafficCongestionMapView extends BaseView {

    //@C++
    Root: UE.SceneComponent
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    Spline: UE.SplineComponent

    //@ts
    data: any
    PointsType: UE.TArray<string>
    AllMesh: UE.TArray<UE.SplineMeshComponent>
    LastPoint: UE.Vector
    EndScale: UE.Vector2D
    ColorList: any
    ColorListValue: any

    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>("Root", UE.SceneComponent.StaticClass())
        this.RootComponent = this.Root
        this.Spline = this.CreateDefaultSubobjectGeneric<UE.SplineComponent>("Spline", UE.SplineComponent.StaticClass())
        this.Spline.SetupAttachment(this.Root, "Spline")
        this.Spline.SetMobility(UE.EComponentMobility.Movable)
        this.PointsType = NewArray(UE.BuiltinString)
        this.AllMesh = NewArray(UE.SplineMeshComponent)
        this.LastPoint = new UE.Vector(0,0,0)
        this.EndScale = new UE.Vector2D(0,0)
        this.ColorList = {
            "未知":{X:0.5, Y:0.5, Z:0.5 ,W:0},
            "畅通":{X:0, Y:1, Z:0 ,W:0},
            "缓行":{X:1, Y:1, Z:0 ,W:0},
            "拥堵":{X:1, Y:0.5, Z:0 ,W:0},
            "严重拥堵":{X:1, Y:0, Z:0 ,W:0},
        }
        this.ColorListValue = {X:0.5, Y:0.5, Z:0.5 ,W:0}
    }

    ReceiveBeginPlay(): void {
        this.Init()
        MessageCenter.Add(this,this.SetScale,NotificationLists.API.GET_CAMERA_LOCATION)
    }

    private  Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
    }

    ReceiveEndPlay(EndPlayReason): void{
        MessageCenter.Remove(this,NotificationLists.API.GET_CAMERA_LOCATION)
    }

    ClearAllData(): void{
        this.PointsType.Empty()
        for (let index = 0; index < this.AllMesh.Num(); index++){
            this.AllMesh.Get(index).K2_DestroyComponent(this)
            // UE.OpenZIFrameworkLibrary.RemoveOwnedComponent(this,this.AllMesh.Get(index))
        }
        this.AllMesh.Empty()
        this.Spline.ClearSplinePoints(true)
        this.LastPoint = new UE.Vector(0,0,0)
        this.EndScale = new  UE.Vector2D(0,0)
    }


    RefreshView(jsonData): string {
        this.data = jsonData.data
        this.ColorList =  this.data.statusColorList
        this.ClearAllData()
        if (this.data.coordinatesList.length == 0){
            return "success"
        }
        if(this.data.coordinatesList.length !== this.data.statusList.length ){
            let NotifiItem
            let NotifiStyle = new NotificationStyle()
            NotifiStyle.RegisterFrameStyle(MessageTips.API.TrafficCongestion, 600, 3, false)
            NotifiItem = MessagePopup.ShowNotification(MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle)
            NotifiItem.SetCompletionState(UE.EDisplayState.CS_None)
            NotifiItem.ExpireAndFadeout()

            return "success"
        }
        this.CoorConvertToUECoor()
        return "success"
    }

    CoorConvertToUECoor(): void{
        let CurVector = new UE.Vector(0,0,0)
        for (let key = 0; key < this.data.coordinatesList.length; key++){
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[key].X, this.data.coordinatesList[key].Y, this.data.coordinatesList[key].Z)
            let CurEngineLocation = $ref(new UE.Vector(0,0,0))
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
            let uecoor = $unref(CurEngineLocation)
            CurVector = new UE.Vector(CurVector.X + uecoor.X,CurVector.Y + uecoor.Y,CurVector.Z + uecoor.Z)
        }
        CurVector = new UE.Vector(CurVector.X / this.data.coordinatesList.length, CurVector.Y / this.data.coordinatesList.length,CurVector.Z / this.data.coordinatesList.length)
        let originCoordinate = $ref(new UE.GeographicCoordinates(0, 0,0))
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CurVector, originCoordinate)
        this.CoordinatesToRelative(this.data.coordinatesList,{ X: $unref(originCoordinate).Longitude, Y: $unref(originCoordinate).Latitude, Z: $unref(originCoordinate).Altitude})
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(CurVector, false, FHitResult, false)
        for (let key = 0; key < this.data.coordinatesList.length; key++){
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[key].X, this.data.coordinatesList[key].Y, this.data.coordinatesList[key].Z)
            let CurEngineLocation = $ref(new UE.Vector(0,0,0))
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
            let uecoor = $unref(CurEngineLocation)
            let status = "畅通"
            if (this.data.statusList[key] !== undefined){
                status = this.data.statusList[key]
            }
            this.AddPoint(uecoor,status,1,key)
        }
        this.CreateSplineMesh(this.data.lineWidth)
    }

    AddPoint(Position,ItemType,ErrorTolerance,index): void{
        let istrue = UE.KismetMathLibrary.NotEqual_VectorVector(Position,this.LastPoint,ErrorTolerance)
        if (istrue === true){
            // this.Spline.AddSplinePoint(Position,UE.ESplineCoordinateSpace.Local,false)
            this.Spline.AddSplinePointAtIndex(Position,index,UE.ESplineCoordinateSpace.World,false)
            this.PointsType.Add(ItemType)
            this.LastPoint = Position
        }
    }

    CreateSplineMesh(width): void{
        this.Spline.UpdateSpline()
        let num = this.Spline.GetNumberOfSplinePoints()
        let Material = UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/HotLine_500.HotLine_500")
        let Material_1 = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/MI_HotLine")
        for (let index = 0; index < num - 1; index++){
            let name = "SplineMeshComponent" + index
            let Transform = new UE.Transform(new UE.Rotator(0,0,0),new UE.Vector(0,0,0),new UE.Vector(1,1,1))
            let SplineMeshComponent = new UE.SplineMeshComponent(this, name)
            SplineMeshComponent.RegisterComponent()
            SplineMeshComponent.SetMobility(UE.EComponentMobility.Movable)
            SplineMeshComponent.SetStaticMesh(Material)
            SplineMeshComponent.SetMaterial(0,Material_1)
            this.AllMesh.Add(SplineMeshComponent)
            SplineMeshComponent.SetCollisionEnabled(UE.ECollisionEnabled.NoCollision)
            let poi_1_loc_ref = $ref(new UE.Vector)
            let poi_1_tangent_ref = $ref(new UE.Vector)
            this.Spline.GetLocationAndTangentAtSplinePoint(index,poi_1_loc_ref,poi_1_tangent_ref,UE.ESplineCoordinateSpace.World)
            let poi_1_loc = $unref(poi_1_loc_ref)
            let poi_1_tangent = $unref(poi_1_tangent_ref)
            let poi_2_loc_ref = $ref(new UE.Vector)
            let poi_2_tangent_ref = $ref(new UE.Vector)
            this.Spline.GetLocationAndTangentAtSplinePoint(index + 1 ,poi_2_loc_ref,poi_2_tangent_ref,UE.ESplineCoordinateSpace.World)
            let poi_2_loc = $unref(poi_2_loc_ref)
            let poi_2_tangent = $unref(poi_2_tangent_ref)
            this.Spline.SetSplinePointType(index,UE.ESplinePointType.CurveCustomTangent,false)
            SplineMeshComponent.SetStartAndEnd(poi_1_loc,poi_1_tangent,poi_2_loc,poi_2_tangent,true)
            let endscale = new UE.Vector2D(width / 10,1)
            this.EndScale = endscale
            SplineMeshComponent.SetEndScale(endscale,false)
            SplineMeshComponent.SetStartScale(endscale,true)
            let MI = SplineMeshComponent.CreateDynamicMaterialInstance(0,Material_1,"None")
            SplineMeshComponent.K2_AttachToComponent(this.K2_GetRootComponent(), name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
            // UE.OpenZIFrameworkLibrary.AddOwnedComponent(this,SplineMeshComponent)
            let tempindex = this.PointsType.Get(index)
            let tempValue
            if(this.ColorList instanceof Map ){
                this.ColorList.forEach((value,key)=>{
                    if(key === this.PointsType.Get(index)){
                        tempindex = key
                        this.ColorListValue = value
                        tempValue = new UE.LinearColor(this.ColorListValue.R,this.ColorListValue.G,this.ColorListValue.B,this.ColorListValue.A)
                    }
                })
            }else{
                Object.entries(this.ColorList).forEach(([k,v]) => {
                    if (k === this.PointsType.Get(index)){
                        tempindex = k
                        this.ColorListValue = v
                        tempValue = new UE.LinearColor(this.ColorListValue.X,this.ColorListValue.Y,this.ColorListValue.Z,this.ColorListValue.W)
                    }
                })
            }
            let value
            if (tempValue !== undefined){
                value = tempValue
            }
            else {
                value = new UE.LinearColor(0,1,0,1)
            }
            MI.SetVectorParameterValue("Color1",value)
            let tempindex1
            let tempValue1
            if(this.ColorList instanceof Map ){
                this.ColorList.forEach((value,key)=>{
                    if(key === this.PointsType.Get(index + 1)){
                        tempindex1 = key
                        this.ColorListValue = value
                        tempValue1 = new UE.LinearColor(this.ColorListValue.R,this.ColorListValue.G,this.ColorListValue.B,this.ColorListValue.A)
                    }
                })
            }else{
                Object.entries(this.ColorList).forEach(([k,v]) => {
                    if (k === this.PointsType.Get(index + 1)){
                        tempindex1 = k
                        this.ColorListValue = v
                        tempValue1 = new UE.LinearColor(this.ColorListValue.X,this.ColorListValue.Y,this.ColorListValue.Z,this.ColorListValue.W)
                    }
                })
            }
            let value1
            if (tempValue1 !== undefined){
                value1 = tempValue1
            }
            else {
                value1 = new UE.LinearColor(0,1,0,1)
            }
            MI.SetVectorParameterValue("Color2",value1)
        }
    }

    SetScale(CameraLocation): void{
        let loc = this.K2_GetActorLocation()
        let Distance = UE.KismetMathLibrary.Vector_Distance(CameraLocation, loc)
        let Scale = UE.KismetMathLibrary.SafeDivide(Distance,100000)
        let CurScale = new UE.Vector2D(this.EndScale.X + Scale,this.EndScale.Y)
        for (let index = 0; index < this.AllMesh.Num(); index++){
            this.AllMesh.Get(index).SetEndScale(CurScale,false)
            this.AllMesh.Get(index).SetStartScale(CurScale,true)
        }
    }
}
