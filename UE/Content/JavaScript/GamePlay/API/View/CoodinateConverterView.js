"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoodinateConverterView = void 0;
const puerts_1 = require("puerts");
const UE = require("ue");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
class CoodinateConverterView {
    data;
    CesiumGeo;
    GeoSetting;
    CoordinateConverterMgr;
    GeoReferencingSystem;
    constructor() {
        let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld();
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
        this.GeoReferencingSystem = World.SpawnActor(UE.GeoReferencingSystem.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        this.CoordinateConverterMgr.SetGeoReferencingSystem(this.GeoReferencingSystem);
        this.GeoSetting = new UE.GeoSetting();
    }
    RefreshCoordinate(jsonData) {
        this.data = jsonData.data;
        if (this.data.planetShape == 0) {
            this.GeoSetting.PlanetShape = UE.EPlanetShape.FlatPlanet;
        }
        else {
            this.GeoSetting.PlanetShape = UE.EPlanetShape.RoundPlanet;
        }
        this.GeoSetting.ProjectedCRS = this.data.projectionCoordinateSystem;
        this.GeoSetting.OriginLongitude = this.data.coordinateOrigin.X;
        this.GeoSetting.OriginLatitude = this.data.coordinateOrigin.Y;
        this.GeoSetting.OriginAltitude = this.data.coordinateOrigin.Z;
        this.GeoSetting.Offset = new UE.Vector(this.data.originOffset.X, this.data.originOffset.Y, this.data.originOffset.Z);
        let LongitudeLatitudeHeight = new UE.Vector(this.GeoSetting.OriginLongitude, this.GeoSetting.OriginLatitude, this.GeoSetting.OriginAltitude);
        this.SetCesiumGeoLngLatHeight(LongitudeLatitudeHeight);
        let beSuccess = this.CoordinateConverterMgr.GeoReferencingGeneralSetting(this.GeoSetting);
        return beSuccess;
    }
    GetScale() {
        return this.data.scale;
    }
    GetGIS_Type() {
        return this.data.GISType;
    }
    SetCesiumGeoLngLatHeight(location) {
        let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
        let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld();
        UE.GameplayStatics.GetAllActorsWithTag(World, "DEFAULT_GEOREFERENCE", OutActorList);
        if ((0, puerts_1.$unref)(OutActorList).IsValidIndex(0)) {
            this.CesiumGeo = (0, puerts_1.$unref)(OutActorList).Get(0);
        }
        else {
            this.CesiumGeo = World.SpawnActor(UE.CesiumGeoreference.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
            this.CesiumGeo.Tags.Add("DEFAULT_GEOREFERENCE");
        }
        this.CesiumGeo.SetGeoreferenceOriginLongitudeLatitudeHeight(location);
    }
    UpdateGeoLngLatHeight(location) {
        this.GeoSetting.OriginLongitude = location.X;
        this.GeoSetting.OriginLatitude = location.Y;
        let LongitudeLatitudeHeight = new UE.Vector(this.GeoSetting.OriginLongitude, this.GeoSetting.OriginLatitude, 0);
        this.SetCesiumGeoLngLatHeight(LongitudeLatitudeHeight);
        let IsSuccess = this.CoordinateConverterMgr.GeoReferencingGeneralSetting(this.GeoSetting);
        if (IsSuccess) {
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.COORDINATEORIGIN_CHANGE, location);
        }
        return IsSuccess;
    }
    UpdateGMTByLng() {
        return this.CoordinateConverterMgr.SetGMTBasedOnLng(this.GeoSetting.OriginLongitude);
    }
    GetOriginLocation() {
        return this.CesiumGeo.TransformEcefToUnreal(new UE.Vector(0, 0, 0));
    }
}
exports.CoodinateConverterView = CoodinateConverterView;
//# sourceMappingURL=CoodinateConverterView.js.map