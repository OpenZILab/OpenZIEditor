///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 14:43
///

import * as UE from 'ue'
import {PlaneBase} from "./PlaneBase";
import {$ref, $unref} from "puerts";
import {NewArray} from "ue";


export class GeoOverlayView extends PlaneBase {

    //@C++
    DyMIOverlay: UE.MaterialInstanceDynamic
    DyMITop: UE.MaterialInstanceDynamic
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    //@ts
    data: any

    Constructor(): void {
        super.Constructor()
        this.DyMIOverlay = undefined
        this.DyMITop = undefined
    }

    ReceiveBeginPlay(): void {
        super.ReceiveBeginPlay()
        this.Init()
    }

    ReceiveTick(DeltaSeconds: number): void {

    }

    private ClearAllData(): void  {
        this.Spline.ClearSplinePoints(false)
        this.ProceduralMesh.ClearAllMeshSections()
        this.BottomVertices.Empty()
        this.TopVertices.Empty()
        this.BodyVertices.Empty()
    }

    private  Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
    }

    private  UpdateHeightandColor(Height,Value): void {
        this.Height = Height
        this.DyMIOverlay.SetVectorParameterValue("BaseColor",Value)
    }

    private Rebuild(): void {
        this.ProceduralMesh.ClearAllMeshSections()
        let num = this.Spline.GetNumberOfSplinePoints()
        for (let index = 0; index< num; index++){
            this.Spline.SetSplinePointType(index,UE.ESplinePointType.Linear,false)
            let vector = this.Spline.GetLocationAtSplinePoint(index,UE.ESplineCoordinateSpace.Local)
            this.BottomVertices.Add(vector)
            let vector2 = UE.KismetMathLibrary.Add_VectorVector(vector,new UE.Vector(0,0,this.Height))
            this.TopVertices.Add(vector2)
        }
        this.Spline.UpdateSpline()
        let R = this.DrawPlane(0,this.TopVertices,this.DyMITop,this.Height,0,new UE.Vector2D(0,0),true)
        for (let key = 0; key < this.BottomVertices.Num(); key++){
            this.BodyVertices.Add(this.BottomVertices.Get(key))
            let CurValue1 = UE.KismetMathLibrary.SelectInt(0,key + 1,UE.KismetMathLibrary.EqualEqual_IntInt(key + 1,this.BottomVertices.Num()))
            this.BodyVertices.Add(this.BottomVertices.Get(CurValue1))
            let CurValue2 = UE.KismetMathLibrary.SelectInt(0,key + 1,UE.KismetMathLibrary.EqualEqual_IntInt(key + 1,this.BottomVertices.Num()))
            this.BodyVertices.Add(this.TopVertices.Get(CurValue1))
            this.BodyVertices.Add(this.TopVertices.Get(key))
            let R = this.DrawPlane(key + 1 ,this.BodyVertices,this.DyMIOverlay,this.Height,0,new UE.Vector2D(0,0),true)
            this.BodyVertices.Empty()
        }
    }

    DrawPlane(SectionIndex,Vertices,Material,UVSize,UVRot,UVOffset,bReverse): any{
        return super.DrawPlane(SectionIndex,Vertices,Material,UVSize,UVRot,UVOffset,bReverse)
    }

    RefreshView(jsonData): string {
        this.ClearAllData()
        this.data = jsonData.data
        if (this.data.coordinatesList.length == 0){
            return "success"
        }
        let CurVector = new UE.Vector(0,0,0)
        let AllPoints = NewArray(UE.Vector)
        for (let i = 0; i < this.data.coordinatesList.length;i++){
            if (this.data.coordinatesList[i] === ""){
                return "coordinatesList: index " + i + "is empty !"
            }
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[i].X, this.data.coordinatesList[i].Y, this.data.coordinatesList[i].Z)
            let CurEngineLocation = $ref(new UE.Vector(0,0,0))
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
            let EngineLocation = $unref(CurEngineLocation)
            CurVector = new UE.Vector(CurVector.X + EngineLocation.X,CurVector.Y + EngineLocation.Y,CurVector.Z + EngineLocation.Z)
            AllPoints.Add(EngineLocation)
        }
        CurVector = new UE.Vector(CurVector.X / this.data.coordinatesList.length, CurVector.Y / this.data.coordinatesList.length,CurVector.Z / this.data.coordinatesList.length)

        let originCoordinate = $ref(new UE.GeographicCoordinates(0, 0,0))
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CurVector, originCoordinate)
        this.CoordinatesToRelative(this.data.coordinatesList,{ X: $unref(originCoordinate).Longitude, Y: $unref(originCoordinate).Latitude, Z: $unref(originCoordinate).Altitude})
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(CurVector, false, FHitResult, false)
        for (let i = 0; i < AllPoints.Num(); i++){
            this.Spline.AddSplinePointAtIndex(AllPoints.Get(i),i,UE.ESplineCoordinateSpace.World,true)
            this.Spline.SetSplinePointType(i,UE.ESplinePointType.Linear,false)
        }
        this.Spline.UpdateSpline()
        this.Height = this.data.height

        if (this.data.OverlaywallUseCustomMaterial){
            let Material_1 = UE.MaterialInstance.Load(this.data.OverlaywallMaterial)
            this.DyMIOverlay = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this,Material_1,"None",UE.EMIDCreationFlags.None)
        }
        else {
            let Material_1 = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/PureColorMaterial_Inst")
            this.DyMIOverlay = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this,Material_1,"None",UE.EMIDCreationFlags.None)
            let color1 = new UE.LinearColor(this.data.fillColor.X,this.data.fillColor.Y,this.data.fillColor.Z,this.data.fillColor.W)
            this.DyMIOverlay.SetVectorParameterValue("BaseColor",color1)
        }

        if (this.data.OverlayTopUseCustomMaterial){
            let Material_2 = UE.MaterialInstance.Load(this.data.OverlayTopMaterial)
            this.DyMITop = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this,Material_2,"None",UE.EMIDCreationFlags.None)
        }
        else {
            let Material_2 = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/PureColorMaterial_Inst")
            this.DyMITop = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this,Material_2,"None",UE.EMIDCreationFlags.None)
            let color1 = new UE.LinearColor(this.data.fillColor.X,this.data.fillColor.Y,this.data.fillColor.Z,this.data.fillColor.W)
            this.DyMITop.SetVectorParameterValue("BaseColor",color1)
        }
        this.Rebuild()
        return "success"
    }
}
