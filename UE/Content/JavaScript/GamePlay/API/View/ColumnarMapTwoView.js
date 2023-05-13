"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/02/26 17:37
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnarMapTwoView = void 0;
const UE = require("ue");
const ue_1 = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
class ColumnarMapTwoView extends BaseView_1.BaseView {
    //@C++
    Root;
    CoordinateConverterMgr;
    Niagara;
    NiaAsset;
    PointsInfo;
    Widget;
    //@ts
    data;
    MaxNumber;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric("Root", UE.SceneComponent.StaticClass());
        this.Niagara = this.CreateDefaultSubobjectGeneric("Niagara", UE.NiagaraComponent.StaticClass());
        this.RootComponent = this.Root;
        this.Niagara.SetupAttachment(this.Root, "Niagara");
        this.PointsInfo = (0, ue_1.NewArray)(UE.ColumnarPointsInfo);
        this.Widget = (0, ue_1.NewArray)(UE.WidgetComponent);
        this.MaxNumber = 0.000001;
    }
    ReceiveBeginPlay() {
        this.Init();
    }
    Init() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
    }
    ClearAllData() {
        this.Niagara.SetAsset(undefined, true);
        this.PointsInfo.Empty();
        // this.HeatMapPointsInfo.Empty()
        if (this.Widget.Num() > 0) {
            for (let i = 0; i < this.Widget.Num(); i++) {
                this.Widget.Get(i).K2_DestroyComponent(this.Widget.Get(i));
            }
        }
        this.Widget.Empty();
    }
    RefreshView(jsonData) {
        this.ClearAllData();
        this.data = jsonData.data;
        if (this.data.pointsInfoList.length == 0) {
            return "success";
        }
        this.CoorConvertToUECoor();
        this.CalculateColumnarMapPosition();
        this.DrawColumnar();
        return "success";
    }
    CoorConvertToUECoor() {
        for (let key = 0; key < this.data.pointsInfoList.length; key++) {
            let GeographicPos1 = new UE.GeographicCoordinates(this.data.pointsInfoList[key].X, this.data.pointsInfoList[key].Y, 0);
            let CurEngineLocation1 = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos1, CurEngineLocation1);
            let EngineLocation1 = (0, puerts_1.$unref)(CurEngineLocation1);
            // console.error(EngineLocation1.X + "," + EngineLocation1.Y + "," + EngineLocation1.Z)
            let curpoint = new UE.ColumnarPointsInfo(new UE.Vector2D(EngineLocation1.X, EngineLocation1.Y), this.data.pointsInfoList[key].Z);
            if (this.MaxNumber < Math.abs(this.data.pointsInfoList[key].Z)) {
                this.MaxNumber = Math.abs(this.data.pointsInfoList[key].Z);
            }
            this.PointsInfo.Add(curpoint);
        }
    }
    CalculateColumnarMapPosition() {
        let GeographicPos = new UE.GeographicCoordinates(this.data.pointsInfoList[1].X, this.data.pointsInfoList[1].Y, 0);
        let CurEngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation);
        let EngineLocation = (0, puerts_1.$unref)(CurEngineLocation);
        let min_x = EngineLocation.X;
        let max_x = EngineLocation.X;
        let min_y = EngineLocation.Y;
        let max_y = EngineLocation.Y;
        for (let i = 0; i < this.PointsInfo.Num(); i++) {
            min_x = min_x < this.PointsInfo.Get(i).PointLocation.X ? min_x : this.PointsInfo.Get(i).PointLocation.X;
            max_x = max_x > this.PointsInfo.Get(i).PointLocation.X ? max_x : this.PointsInfo.Get(i).PointLocation.X;
            min_y = min_y < this.PointsInfo.Get(i).PointLocation.Y ? min_y : this.PointsInfo.Get(i).PointLocation.Y;
            max_y = max_y > this.PointsInfo.Get(i).PointLocation.Y ? max_y : this.PointsInfo.Get(i).PointLocation.Y;
        }
        let mapCenter_x = (min_x + max_x) / 2;
        let mapCenter_y = (min_y + max_y) / 2;
        let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.K2_SetActorLocation(new UE.Vector(mapCenter_x, mapCenter_y, this.data.mapHeight), false, FHitResult, false);
        let originCoordinate = (0, puerts_1.$ref)(new UE.GeographicCoordinates(0, 0, 0));
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, new UE.Vector(mapCenter_x, mapCenter_y, this.data.mapHeight), originCoordinate);
        this.CoordinatesToRelative(this.data.pointsInfoList, { X: (0, puerts_1.$unref)(originCoordinate).Longitude, Y: (0, puerts_1.$unref)(originCoordinate).Latitude, Z: 0 });
    }
    DrawColumnar() {
        let CurArray = (0, ue_1.NewArray)(UE.Vector4);
        for (let key = 0; key < this.PointsInfo.Num(); key++) {
            let Cur = this.PointsInfo.Get(key).PointStrength / this.MaxNumber;
            // console.error(Cur + ".................." + (Cur * this.MaxNumber))
            CurArray.Add(new UE.Vector4(this.PointsInfo.Get(key).PointLocation.X, this.PointsInfo.Get(key).PointLocation.Y, this.data.mapHeight, this.PointsInfo.Get(key).PointStrength / this.MaxNumber));
        }
        this.NiaAsset = UE.NiagaraSystem.Load("/OpenZIAPI/Asset/Niagara/ColumnarNiagara_2");
        this.Niagara.SetAsset(this.NiaAsset, true);
        this.Niagara.SetTickBehavior(UE.ENiagaraTickBehavior.UsePrereqs);
        this.Niagara.SetNiagaraVariableLinearColor("ColumnarColor", new UE.LinearColor(this.data.columnarColor.X, this.data.columnarColor.Y, this.data.columnarColor.Z, this.data.columnarColor.W));
        this.Niagara.SetNiagaraVariableVec2("CubeWidth", new UE.Vector2D(this.data.scaleXY, this.data.scaleXY));
        this.Niagara.SetNiagaraVariableInt("MaxHeight", this.data.maxHeight);
        this.Niagara.SetNiagaraVariableInt("Number", this.data.pointsInfoList.length);
        UE.NiagaraDataInterfaceArrayFunctionLibrary.SetNiagaraArrayVector4(this.Niagara, "PointsInfo", CurArray);
        if (this.data.IsVisibleNumbew === true) {
            let CurWidgetUMG = UE.Class.Load("/OpenZIAPI/Asset/UMG/UMG_ColumnarNumber.UMG_ColumnarNumber_C");
            for (let i = 0; i < this.PointsInfo.Num(); i++) {
                let name = "UMG_" + i;
                let curUMG = new UE.WidgetComponent(this, name);
                curUMG.WidgetClass = CurWidgetUMG;
                curUMG.SetDrawAtDesiredSize(true);
                curUMG.SetPivot(new ue_1.Vector2D(0.5, 1));
                curUMG.SetWidgetSpace(UE.EWidgetSpace.Screen);
                curUMG.K2_AttachToComponent(this.Root, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
                curUMG.RegisterComponent();
                let hit = (0, puerts_1.$ref)(new UE.HitResult);
                let CurWorldLocation = new UE.Vector(this.PointsInfo.Get(i).PointLocation.X, this.PointsInfo.Get(i).PointLocation.Y, this.PointsInfo.Get(i).PointStrength / this.MaxNumber * this.data.maxHeight + this.data.mapHeight);
                // console.error(CurWorldLocation.X + "," + CurWorldLocation.Y + "," + CurWorldLocation.Z)
                curUMG.K2_SetWorldLocation(CurWorldLocation, false, hit, false);
                let curwidget = curUMG.GetWidget();
                let temp = UE.KismetTextLibrary.Conv_FloatToText(this.PointsInfo.Get(i).PointStrength, UE.ERoundingMode.HalfFromZero, false, true, 1, 423, 0, 2);
                let CurString = temp + this.data.unit;
                curwidget.DisText.SetText(CurString);
                curwidget.DisText.SetColorAndOpacity(new UE.SlateColor(new UE.LinearColor(this.data.NumberColor.X, this.data.NumberColor.Y, this.data.NumberColor.Z, this.data.NumberColor.W), UE.ESlateColorStylingMode.UseColor_Specified));
                this.Widget.Add(curUMG);
            }
        }
        else {
            if (this.Widget.Num() > 0) {
                for (let i = 0; i < this.Widget.Num(); i++) {
                    this.Widget.Get(i).K2_DestroyComponent(this.Widget.Get(i));
                }
                this.Widget.Empty();
            }
        }
    }
}
exports.ColumnarMapTwoView = ColumnarMapTwoView;
//# sourceMappingURL=ColumnarMapTwoView.js.map