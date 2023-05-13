///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/11/07 18:11
///

import * as UE from 'ue'
import { NewArray, NewMap, Vector2D } from "ue";
import { $ref, $unref } from "puerts";
import { BaseView } from "../../../System/API/View/BaseView";

export class ColumnarMapView extends BaseView {
    //@C++
    Root: UE.SceneComponent
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    Niagara: UE.NiagaraComponent
    NiaAsset: UE.NiagaraSystem
    PointsInfo: UE.TArray<UE.ColumnarPointsInfo>
    HeatMapPointsInfo: UE.TMap<string, UE.ColumnarPointsInfo>
    Widget: UE.TArray<UE.WidgetComponent>

    //@ts
    data: any
    value_max_x: number
    value_min_x: number
    value_max_y: number
    value_min_y: number
    maxNumber: number
    first_x: number
    first_y: number
    last_x: number
    last_y: number
    count_x: number
    count_y: number
    scaleXY: number


    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>("Root", UE.SceneComponent.StaticClass())
        this.Niagara = this.CreateDefaultSubobjectGeneric<UE.NiagaraComponent>("Niagara", UE.NiagaraComponent.StaticClass())
        this.RootComponent = this.Root
        this.Niagara.SetupAttachment(this.Root, "Niagara")
        this.value_max_x = 0
        this.value_min_x = 0
        this.value_max_y = 0
        this.value_min_y = 0
        this.first_x = 0
        this.first_y = 0
        this.last_x = 0
        this.last_y = 0
        this.count_x = 0
        this.count_y = 0
        this.scaleXY = 0
        this.maxNumber = 0
        this.PointsInfo = NewArray(UE.ColumnarPointsInfo)
        this.HeatMapPointsInfo = NewMap(UE.BuiltinString, UE.ColumnarPointsInfo)
        this.Widget = NewArray(UE.WidgetComponent)
    }

    ReceiveBeginPlay(): void {
        this.Init()
    }

    private Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
    }

    ClearAllData(): void {
        this.Niagara.SetAsset(undefined, true)
        this.value_max_x = 0
        this.value_min_x = 0
        this.value_max_y = 0
        this.value_min_y = 0
        this.first_x = 0
        this.first_y = 0
        this.last_x = 0
        this.last_y = 0
        this.count_x = 0
        this.count_y = 0
        this.maxNumber = 0
        this.PointsInfo.Empty()
        this.HeatMapPointsInfo.Empty()
        for (let i = 0; i < this.Widget.Num(); i++) {
            this.Widget.Get(i).K2_DestroyComponent(this.Widget.Get(i))
        }
        this.Widget.Empty()
    }

    RefreshView(jsonData): string {
        this.ClearAllData()
        this.data = jsonData.data
        if (this.data.pointsInfoList.length == 0){
            return "success"
        }
        this.scaleXY = this.data.scaleXY
        this.CoorConvertToUECoor()
        this.CalculateColumnarMapSize()
        this.DrawColumnar()
        return "success"
    }

    CoorConvertToUECoor(): void {
        let GeographicPos = new UE.GeographicCoordinates(this.data.pointsInfoList[1].X, this.data.pointsInfoList[1].Y, 0)
        let CurEngineLocation = $ref(new UE.Vector(0, 0, 0))
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
        let EngineLocation = $unref(CurEngineLocation)
        this.value_max_x = EngineLocation.X
        this.value_min_x = EngineLocation.X
        this.value_max_y = EngineLocation.Y
        this.value_min_y = EngineLocation.Y
        for (let key = 0; key < this.data.pointsInfoList.length; key++) {
            let GeographicPos1 = new UE.GeographicCoordinates(this.data.pointsInfoList[key].X, this.data.pointsInfoList[key].Y, 0)
            let CurEngineLocation1 = $ref(new UE.Vector(0, 0, 0))
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos1, CurEngineLocation1)
            let EngineLocation1 = $unref(CurEngineLocation1)
            if (this.value_max_x < EngineLocation1.X) {
                this.value_max_x = EngineLocation1.X
            } else if (this.value_min_x > EngineLocation1.X) {
                this.value_min_x = EngineLocation1.X
            }
            if (this.value_max_y < EngineLocation1.Y) {
                this.value_max_y = EngineLocation1.Y
            } else if (this.value_min_y > EngineLocation1.Y) {
                this.value_min_y = EngineLocation1.Y
            }
            let curpoint = new UE.ColumnarPointsInfo(new UE.Vector2D(EngineLocation1.X, EngineLocation1.Y), this.data.pointsInfoList[key].Z)
            this.PointsInfo.Add(curpoint)
        }
    }

    CalculateColumnarMapSize(): void {
        let mapmaxX = 0
        if (this.value_max_x >= 0) {
            mapmaxX = Math.floor(this.value_max_x / this.scaleXY) * this.scaleXY + this.scaleXY
        } else {
            let a = (-1) * this.value_max_x
            let b = Math.floor(a / this.scaleXY) * this.scaleXY + this.scaleXY
            mapmaxX = (-1) * b
        }
        let mapminX = 0
        if (this.value_min_x >= 0) {
            mapminX = Math.floor(this.value_min_x / this.scaleXY) * this.scaleXY - this.scaleXY
        } else {
            let a = (-1) * this.value_min_x
            let b = Math.floor(a / this.scaleXY) * this.scaleXY + this.scaleXY
            mapminX = (-1) * b
        }
        let mapmaxY = 0
        if (this.value_max_y >= 0) {
            mapmaxY = Math.floor(this.value_max_y / this.scaleXY) * this.scaleXY + this.scaleXY
        } else {
            let a = (-1) * this.value_max_y
            let b = Math.floor(a / this.scaleXY) * this.scaleXY + this.scaleXY
            mapmaxY = (-1) * b
        }
        let mapminY = 0
        if (this.value_min_y >= 0) {
            mapminY = Math.floor(this.value_min_y / this.scaleXY) * this.scaleXY - this.scaleXY
        } else {
            let a = (-1) * this.value_min_y
            let b = Math.floor(a / this.scaleXY) * this.scaleXY + this.scaleXY
            mapminY = (-1) * b
        }
        let size_x = mapmaxX - mapminX
        let size_y = mapmaxY - mapminY
        this.count_x = Math.floor(size_x / this.scaleXY)
        this.count_y = Math.floor(size_y / this.scaleXY)
        let detection = this.CountDetection(size_x, size_y)
        if (!detection) {
            this.CalculateColumnarMapSize()
        } else {
            this.first_x = mapminX + this.scaleXY / 2
            this.first_y = mapminY + this.scaleXY / 2
            this.last_x = mapmaxX - this.scaleXY / 2
            this.last_y = mapmaxY - this.scaleXY / 2
            let mapcenterx = (this.first_x + this.last_x) / 2
            let mapcentery = (this.first_y + this.last_y) / 2
            let CenterLoc = new UE.Vector(mapcenterx, mapcentery, this.data.mapHeight)
            let FHitResult = $ref(new UE.HitResult)
            this.K2_SetActorLocation(CenterLoc, false, FHitResult, false)
            let originCoordinate = $ref(new UE.GeographicCoordinates(0, 0, 0))
            this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CenterLoc, originCoordinate)
            this.CoordinatesToRelative(this.data.pointsInfoList, { X: $unref(originCoordinate).Longitude, Y: $unref(originCoordinate).Latitude, Z: 0 })
        }
    }

    DrawColumnar(): void {
        for (let i = 0; i < this.PointsInfo.Num(); i++) {
            let curPointCenter_X = 0
            let curPointCenter_Y = 0
            if (this.PointsInfo.Get(i).PointLocation.X >= 0) {
                curPointCenter_X = Math.floor(this.PointsInfo.Get(i).PointLocation.X / this.scaleXY) * this.scaleXY + this.scaleXY / 2
            } else {
                let temp = Math.floor(Math.abs(this.PointsInfo.Get(i).PointLocation.X) / this.scaleXY) * this.scaleXY + this.scaleXY / 2
                curPointCenter_X = (-1) * temp
            }
            if (this.PointsInfo.Get(i).PointLocation.Y >= 0) {
                curPointCenter_Y = Math.floor(this.PointsInfo.Get(i).PointLocation.Y / this.scaleXY) * this.scaleXY + this.scaleXY / 2
            } else {
                let temp = Math.floor(Math.abs(this.PointsInfo.Get(i).PointLocation.Y) / this.scaleXY) * this.scaleXY + this.scaleXY / 2
                curPointCenter_Y = (-1) * temp
            }
            let dis_x = (curPointCenter_X - this.first_x) / this.scaleXY
            let dis_y = (curPointCenter_Y - this.first_y) / this.scaleXY
            let curindex = dis_y * this.count_x + dis_x
            let curpoint = this.HeatMapPointsInfo.Get(curindex.toString())
            if (curpoint !== undefined) {
                let num = (curpoint.PointStrength + this.PointsInfo.Get(i).PointStrength) / 2
                let temppoint = new UE.ColumnarPointsInfo(new UE.Vector2D(curPointCenter_X, curPointCenter_Y), num)
                this.HeatMapPointsInfo.Set(curindex.toString(), temppoint)
                if (num > this.maxNumber) {
                    this.maxNumber = num
                }
            } else {
                let temppoint = new UE.ColumnarPointsInfo(new UE.Vector2D(curPointCenter_X, curPointCenter_Y), this.PointsInfo.Get(i).PointStrength)
                this.HeatMapPointsInfo.Add(curindex.toString(), temppoint)
                if (this.PointsInfo.Get(i).PointStrength > this.maxNumber) {
                    this.maxNumber = this.PointsInfo.Get(i).PointStrength
                }
            }
        }
        let CurArray = NewArray(UE.Vector4)
        for (let i = 0; i < this.count_x * this.count_y; i++) {
            let key = i.toString()
            let value = this.HeatMapPointsInfo.Get(key)
            if (value === undefined) {
                let Cur_x = i % this.count_x
                let Cur_y = 0
                if (i < this.count_x) {
                    Cur_y = 0
                } else {
                    Cur_y = Math.floor(i / this.count_x)
                }
                let value_x = this.first_x + Cur_x * this.scaleXY
                let value_y = this.first_y + Cur_y * this.scaleXY
                let temp = new UE.Vector4(value_x, value_y, this.data.mapHeight, 0)
                CurArray.Add(temp)
            } else {
                let temp = new UE.Vector4(value.PointLocation.X, value.PointLocation.Y, this.data.mapHeight, value.PointStrength / this.maxNumber)
                CurArray.Add(temp)
            }
        }
        this.NiaAsset = UE.NiagaraSystem.Load("/OpenZIAPI/Asset/Niagara/ColumnarNiagara")
        this.Niagara.SetAsset(this.NiaAsset, true)
        this.Niagara.SetTickBehavior(UE.ENiagaraTickBehavior.UsePrereqs)
        this.Niagara.SetNiagaraVariableLinearColor("ColumnarColor", new UE.LinearColor(this.data.columnarColor.X, this.data.columnarColor.Y, this.data.columnarColor.Z, this.data.columnarColor.W))
        this.Niagara.SetNiagaraVariableLinearColor("OtherColor", new UE.LinearColor(this.data.otherColor.X, this.data.otherColor.Y, this.data.otherColor.Z, this.data.otherColor.W))
        this.Niagara.SetNiagaraVariableLinearColor("BorderColor", new UE.LinearColor(0, 0.2, 1, 1))
        this.Niagara.SetNiagaraVariableInt("WidthCount", this.count_x)
        this.Niagara.SetNiagaraVariableInt("HeightCount", this.count_y)
        let Spacing = this.data.spacingRatio * this.scaleXY
        this.Niagara.SetNiagaraVariableVec2("CubeWidth", new UE.Vector2D(this.scaleXY - Spacing / 2, this.scaleXY - Spacing / 2))
        this.Niagara.SetNiagaraVariableVec3("CubeDimensions", new UE.Vector(this.scaleXY, this.scaleXY, 0))
        this.Niagara.SetNiagaraVariableInt("MaxHeight", this.data.maxHeight)
        UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayVector4(this.Niagara, "PointsInfo", CurArray)
        if (this.data.IsVisibleNumbew === true) {
            type UMGColumnarNumber = UE.OpenZIAPI.Asset.UMG.UMG_ColumnarNumber.UMG_ColumnarNumber_C
            let CurWidgetUMG = UE.Class.Load("/OpenZIAPI/Asset/UMG/UMG_ColumnarNumber.UMG_ColumnarNumber_C")
            for (let i = 0; i < this.HeatMapPointsInfo.Num(); i++) {
                let key = this.HeatMapPointsInfo.GetKey(i)
                let name = "UMG_" + i
                let curUMG = new UE.WidgetComponent(this, name)
                curUMG.WidgetClass = CurWidgetUMG
                curUMG.SetDrawAtDesiredSize(true)
                curUMG.SetPivot(new Vector2D(0.5, 1))
                curUMG.SetWidgetSpace(UE.EWidgetSpace.Screen)
                curUMG.K2_AttachToComponent(this.Root, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
                curUMG.RegisterComponent()
                let hit = $ref(new UE.HitResult)
                let CurWorldLocation = new UE.Vector(this.HeatMapPointsInfo.Get(key).PointLocation.X, this.HeatMapPointsInfo.Get(key).PointLocation.Y, this.HeatMapPointsInfo.Get(key).PointStrength / this.maxNumber * this.data.maxHeight + this.data.mapHeight)
                curUMG.K2_SetWorldLocation(CurWorldLocation, false, hit, false)
                let curwidget = curUMG.GetWidget() as UMGColumnarNumber
                curwidget.DisText.SetText(this.HeatMapPointsInfo.Get(key).PointStrength.toString())
                curwidget.DisText.SetColorAndOpacity(new UE.SlateColor(new UE.LinearColor(this.data.NumberColor.X, this.data.NumberColor.Y, this.data.NumberColor.Z, this.data.NumberColor.W), UE.ESlateColorStylingMode.UseColor_Specified))
                this.Widget.Add(curUMG)
            }
        } else {
            for (let i = 0; i < this.Widget.Num(); i++) {
                this.Widget.Get(i).K2_DestroyComponent(this.Widget.Get(i))
            }
            this.Widget.Empty()
        }
    }

    CountDetection(width, height): boolean {
        if (this.count_x * this.count_y > 2000000) {
            console.error("The number of cubes currently exceeds 2 million,and the scaling ratio will be doubled !")
            this.scaleXY = this.scaleXY * 2
            this.count_x = Math.floor(width / this.scaleXY)
            this.count_y = Math.floor(height / this.scaleXY)
            this.CountDetection(width, height)
            return false
        }
        else {
            return true
        }
    }
}
