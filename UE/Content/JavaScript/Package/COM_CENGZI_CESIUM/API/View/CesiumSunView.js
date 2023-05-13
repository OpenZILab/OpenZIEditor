"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CesiumSunView = void 0;
const puerts_1 = require("puerts");
const UE = require("ue");
const MessageManager_1 = require("../../../../System/Core/NotificationCore/MessageManager");
class CesiumSunView {
    CoordinateConverterMgr;
    World;
    CesiumSunViewSky;
    bAutoUpdateTimeZone;
    constructor() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
        this.World = UE.OpenZIFrameworkLibrary.GetCurrentWorld();
        let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
        UE.GameplayStatics.GetAllActorsOfClass(this.World, UE.CesiumSunSky.StaticClass(), OutActorList);
        if ((0, puerts_1.$unref)(OutActorList).Num() == 0) {
            this.CesiumSunViewSky = this.World.SpawnActor(UE.CesiumSunSky.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        }
        else {
            this.CesiumSunViewSky = (0, puerts_1.$unref)(OutActorList)[0];
        }
        this.bAutoUpdateTimeZone = true;
        this.SetTimeZone(8);
        this.CesiumSunViewSky.DirectionalLight.SetIntensity(3);
        this.CesiumSunViewSky.UpdateSun();
        MessageManager_1.MessageCenter.Add(this, this.UpdateTimeZone, "coordinateOriginChange");
    }
    SetTimeZone(Value) {
        if (this.CesiumSunViewSky) {
            this.CesiumSunViewSky.TimeZone = Value;
            return true;
        }
        return "set timeZone fail";
    }
    SetTime(Value) {
        if (this.CesiumSunViewSky) {
            this.CesiumSunViewSky.SolarTime = Value;
            return true;
        }
        return "set time fail";
    }
    SetData(Value) {
        let times = Value.split("/");
        if (times.length == 3 && this.CesiumSunViewSky) {
            this.CesiumSunViewSky.Year = Number(times[0]);
            this.CesiumSunViewSky.Month = Number(times[1]);
            this.CesiumSunViewSky.Day = Number(times[2]);
            return true;
        }
        return "set data fail";
    }
    UpdateTimeZone(location) {
        if (this.bAutoUpdateTimeZone) {
            let Timezone = this.CoordinateConverterMgr.SetGMTBasedOnLng(location.X);
            this.SetTimeZone(Timezone);
            this.CesiumSunViewSky.UpdateSun();
        }
    }
    UpdateSun() {
        this.CesiumSunViewSky.UpdateSun();
    }
}
exports.CesiumSunView = CesiumSunView;
//# sourceMappingURL=CesiumSunView.js.map