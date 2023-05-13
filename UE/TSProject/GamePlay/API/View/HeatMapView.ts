///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 18:29
///

import * as UE from 'ue'
import {NewArray} from "ue";
import {$ref, $unref} from "puerts";
import {BaseView} from "../../../System/API/View/BaseView";

export class HeatMapView extends BaseView {

    //@C++
    Root: UE.SceneComponent
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    HeatMap: UE.StaticMeshComponent
    MI_HotMap: UE.MaterialInstanceDynamic
    MI_Painter: UE.MaterialInstanceDynamic
    RT: UE.TextureRenderTarget2D
    UECoorList: UE.TArray<UE.Vector>
    //@ts
    data: any
    max_x: number
    min_x: number
    max_y: number
    min_y: number
    data_max_size: number
    bUsePointMaxRadius: boolean
    map_size: number
    CanvasScale: number


    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>("Root", UE.SceneComponent.StaticClass())
        this.HeatMap = this.CreateDefaultSubobjectGeneric<UE.StaticMeshComponent>("HeatMap", UE.StaticMeshComponent.StaticClass())
        this.RootComponent = this.Root
        this.HeatMap.SetupAttachment(this.Root, "HeatMap")
        this.HeatMap.SetStaticMesh(UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/SM_HeatMap"))
        let Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_HeatMap3D_Inst")
        this.HeatMap.SetMaterial(0,Material)
        let hit = $ref(new UE.HitResult)
        let tempR = new UE.Rotator(0,0,0)
        let tempV = new UE.Vector(0,0,0)
        let tempS = new UE.Vector(1,1,1)
        this.HeatMap.K2_SetRelativeTransform(new UE.Transform(tempR,tempV,tempS),false,hit,false)
        this.HeatMap.SetCastShadow(false)
        let Material_1 = UE.MaterialInterface.Load("/OpenZIAPI/Asset/Material/M_HeatMap3D")
        this.MI_HotMap = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this,Material_1,"None",UE.EMIDCreationFlags.None)
        let Material_2 = UE.MaterialInterface.Load("/OpenZIAPI/Asset/Material/M_HeatMapPoint")
        this.MI_Painter = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this,Material_2,"None",UE.EMIDCreationFlags.None)
        this.UECoorList = NewArray(UE.Vector)
        this.max_x = 0
        this.min_x = 0
        this.max_y = 0
        this.min_y = 0
        this.data_max_size = 0
        this.bUsePointMaxRadius = true
        this.map_size = 0
        this.CanvasScale = 0
    }

    ReceiveBeginPlay(): void {
        super.ReceiveBeginPlay()
        this.Init()
    }

    private  Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
        this.RT = UE.KismetRenderingLibrary.CreateRenderTarget2D(this,2048,2048,UE.ETextureRenderTargetFormat.RTF_RGBA16f,new UE.LinearColor(0,0,0,1),false)
        this.HeatMap.SetMaterial(0,this.MI_HotMap)
        this.MI_HotMap.SetTextureParameterValue("RT",this.RT)
    }

    ClearAllData(): void{
        this.UECoorList.Empty()
        UE.KismetRenderingLibrary.ClearRenderTarget2D(this, this.RT, new UE.LinearColor(0, 0, 0, 1))
    }


    RefreshView(jsonData): string {
        this.ClearAllData()
        this.data = jsonData.data
        if (this.data.coordinatesList.length == 0){
            return "success"
        }
        this.CoorConvertToUECoor()
        let Location = this.K2_GetActorLocation()
        Location.Z = this.data.mapHeight
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(Location,false,FHitResult,false)
        this.DrawHeatMap()
        this.UpdateHeatMap()
        let CenterLoc = new UE.Vector((this.max_x + this.min_x) * 0.5, (this.max_y + this.min_y) * 0.5, this.data.mapHeight)
        let FHitResult2 = $ref(new UE.HitResult)
        this.K2_SetActorLocation(CenterLoc, false, FHitResult2, false)
        let originCoordinate = $ref(new UE.GeographicCoordinates(0, 0,0))
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CenterLoc, originCoordinate)
        this.CoordinatesToRelative(this.data.coordinatesList,{ X: $unref(originCoordinate).Longitude, Y: $unref(originCoordinate).Latitude, Z: $unref(originCoordinate).Altitude})
        this.HeatMap.SetWorldScale3D(new UE.Vector(this.CanvasScale, this.CanvasScale, 1))
        return "success"
    }

    CoorConvertToUECoor(): void{
        this.UECoorList.Empty()
        let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[1].X, this.data.coordinatesList[1].Y, 0)
        let CurEngineLocation = $ref(new UE.Vector(0,0,0))
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
        let EngineLocation = $unref(CurEngineLocation)
        this.max_x = EngineLocation.X
        this.min_x = EngineLocation.X
        this.max_y = EngineLocation.Y
        this.min_y = EngineLocation.Y
        this.data_max_size = 0
        for (let key = 0;key < this.data.coordinatesList.length; key++){
            let GeographicPos1 = new UE.GeographicCoordinates(this.data.coordinatesList[key].X, this.data.coordinatesList[key].Y, 0)
            let CurEngineLocation1 = $ref(new UE.Vector(0,0,0))
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos1, CurEngineLocation1)
            let EngineLocation1 = $unref(CurEngineLocation1)
            if (this.max_x < EngineLocation1.X){
                this.max_x = EngineLocation1.X
            } else if (this.min_x > EngineLocation1.X) {
                this.min_x = EngineLocation1.X
            }

            if (this.max_y < EngineLocation1.Y){
                this.max_y = EngineLocation1.Y
            } else if (this.min_y > EngineLocation1.Y) {
                this.min_y = EngineLocation1.Y
            }
            this.UECoorList.Add(EngineLocation1)

            if (this.bUsePointMaxRadius === false){
                if (this.data.sizeList[key]){
                    if (this.data.sizeList[key] > this.data_max_size){
                        this.data_max_size = this.data.data.sizeList[key]
                    }
                }
            }
        }
        this.CalculateHeatMapSize()
    }
    CalculateHeatMapSize(): void{
        let CenterLoc = new UE.Vector((this.max_x + this.min_x) * 0.5, (this.max_y + this.min_y) * 0.5, this.data.mapHeight)
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(CenterLoc,false,FHitResult,false)
        let size_x = this.max_x - this.min_x
        let size_y = this.max_y - this.min_y
        let temp =Math.max(size_x,size_y)
        this.map_size = this.data.pointMaxRadius * 2 * Math.tan(45) + temp
        this.CanvasScale = this.map_size / 512
        // this.HeatMap.SetWorldScale3D(new UE.Vector(this.CanvasScale,this.CanvasScale,this.data.mapHeight))
        this.HeatMap.SetWorldScale3D(new UE.Vector(this.CanvasScale,this.CanvasScale,1))
    }
    DrawHeatMap(): void{
        UE.KismetRenderingLibrary.ClearRenderTarget2D(this, this.RT, new UE.LinearColor(0, 0, 0, 1))
        this.HeatMap.SetVisibility(true)
        for (let key = 0;key < this.UECoorList.Num(); key++){
            let LocalLocation = UE.KismetMathLibrary.InverseTransformLocation(this.GetTransform(), this.UECoorList.Get(key))
            let CanvasLoc = UE.KismetMathLibrary.Multiply_VectorFloat(LocalLocation,1 / this.map_size)
            this.MI_Painter.SetVectorParameterValue("ForcePosition", new UE.LinearColor(CanvasLoc.X + 0.5, CanvasLoc.Y + 0.5, 0, 0))
            let scale = 1
            if (this.bUsePointMaxRadius === false){
                if (this.data.sizeList[key]){
                    scale = this.data.sizeList[key] / this.data_max_size
                }
            }
            this.MI_Painter.SetScalarParameterValue("ForceSize",this.data.pointMaxRadius  / this.map_size * scale)
            this.MI_Painter.SetScalarParameterValue("ForceStrength", 1)
            UE.KismetRenderingLibrary.DrawMaterialToRenderTarget(this, this.RT, this.MI_Painter)
        }

    }
    UpdateHeatMap():void{
        this.MI_HotMap.SetScalarParameterValue("Contrast",this.data.contrast)
        this.MI_HotMap.SetScalarParameterValue("HeightScale",this.data.heightScale)
    }
}
