///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///

import { $ref, $unref } from 'puerts'
import * as UE from 'ue'
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";

export class CoodinateConverterView {

    data: any
    CesiumGeo: UE.CesiumGeoreference
    GeoSetting: UE.GeoSetting
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    GeoReferencingSystem: UE.GeoReferencingSystem
    constructor() {
        let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld()
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
        this.GeoReferencingSystem = World.SpawnActor(UE.GeoReferencingSystem.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.GeoReferencingSystem
        this.CoordinateConverterMgr.SetGeoReferencingSystem(this.GeoReferencingSystem)
        this.GeoSetting = new UE.GeoSetting()
    }

    RefreshCoordinate(jsonData): boolean {
        this.data = jsonData.data
        if(this.data.planetShape == 0){
            this.GeoSetting.PlanetShape = UE.EPlanetShape.FlatPlanet
        }else{
            this.GeoSetting.PlanetShape = UE.EPlanetShape.RoundPlanet
        }
        this.GeoSetting.ProjectedCRS = this.data.projectionCoordinateSystem
        this.GeoSetting.OriginLongitude = this.data.coordinateOrigin.X
        this.GeoSetting.OriginLatitude = this.data.coordinateOrigin.Y
        this.GeoSetting.OriginAltitude = this.data.coordinateOrigin.Z
        this.GeoSetting.Offset = new UE.Vector(this.data.originOffset.X, this.data.originOffset.Y, this.data.originOffset.Z)
        let LongitudeLatitudeHeight = new UE.Vector(this.GeoSetting.OriginLongitude, this.GeoSetting.OriginLatitude, this.GeoSetting.OriginAltitude)
        this.SetCesiumGeoLngLatHeight(LongitudeLatitudeHeight)
        let beSuccess = this.CoordinateConverterMgr.GeoReferencingGeneralSetting(this.GeoSetting)
        return beSuccess
    }

    GetScale() {
        return this.data.scale
    }

    GetGIS_Type() {
        return this.data.GISType
    }
    SetCesiumGeoLngLatHeight(location) {
        let OutActorList = $ref(UE.NewArray(UE.Actor))
        let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld()
        UE.GameplayStatics.GetAllActorsWithTag(World, "DEFAULT_GEOREFERENCE", OutActorList)
        if ($unref(OutActorList).IsValidIndex(0)) {
            this.CesiumGeo = $unref(OutActorList).Get(0) as UE.CesiumGeoreference

        }else{
            this.CesiumGeo = World.SpawnActor(UE.CesiumGeoreference.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.CesiumGeoreference
            this.CesiumGeo.Tags.Add("DEFAULT_GEOREFERENCE")
        }
        this.CesiumGeo.SetGeoreferenceOriginLongitudeLatitudeHeight(location)
    }
    UpdateGeoLngLatHeight(location) {
        this.GeoSetting.OriginLongitude = location.X
        this.GeoSetting.OriginLatitude = location.Y
        let LongitudeLatitudeHeight =
            new UE.Vector(this.GeoSetting.OriginLongitude, this.GeoSetting.OriginLatitude, 0)
        this.SetCesiumGeoLngLatHeight(LongitudeLatitudeHeight)
        let IsSuccess = this.CoordinateConverterMgr.GeoReferencingGeneralSetting(this.GeoSetting)
        if(IsSuccess){
            MessageCenter.Execute(NotificationLists.API.COORDINATEORIGIN_CHANGE,location)
        }
        return IsSuccess
    }
    UpdateGMTByLng() {
        return this.CoordinateConverterMgr.SetGMTBasedOnLng(this.GeoSetting.OriginLongitude)
    }


    GetOriginLocation(){
        return this.CesiumGeo.TransformEcefToUnreal(new UE.Vector(0,0,0))
    }
}



