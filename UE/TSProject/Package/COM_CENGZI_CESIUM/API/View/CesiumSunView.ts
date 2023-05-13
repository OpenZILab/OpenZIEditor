///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import { $ref, $unref } from "puerts"
import * as UE from "ue"
import { MessageCenter } from "../../../../System/Core/NotificationCore/MessageManager"

export class CesiumSunView {

    CoordinateConverterMgr: UE.CoordinateConverterMgr
    World: UE.World
    CesiumSunViewSky: UE.CesiumSunSky
    bAutoUpdateTimeZone: boolean


    constructor() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
        this.World = UE.OpenZIFrameworkLibrary.GetCurrentWorld()
        let OutActorList = $ref(UE.NewArray(UE.Actor))
        UE.GameplayStatics.GetAllActorsOfClass(this.World, UE.CesiumSunSky.StaticClass(), OutActorList)
        if($unref(OutActorList).Num()== 0){
            this.CesiumSunViewSky = this.World.SpawnActor(UE.CesiumSunSky.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.CesiumSunSky
        }
        else{
            this.CesiumSunViewSky = $unref(OutActorList)[0] as UE.CesiumSunSky
        }
       
        this.bAutoUpdateTimeZone = true
        this.SetTimeZone(8)
        this.CesiumSunViewSky.DirectionalLight.SetIntensity(3)
        this.CesiumSunViewSky.UpdateSun()
        MessageCenter.Add(this,this.UpdateTimeZone,"coordinateOriginChange")
    }

    SetTimeZone(Value) {
        if (this.CesiumSunViewSky) {
            this.CesiumSunViewSky.TimeZone = Value
            return true
        }
        return "set timeZone fail"
    }

    SetTime(Value) {
        if (this.CesiumSunViewSky) {
            this.CesiumSunViewSky.SolarTime = Value
            return true
        }
        return "set time fail"
    }
    SetData(Value: string) {

        let times = Value.split("/")
        if (times.length == 3 && this.CesiumSunViewSky) {
            this.CesiumSunViewSky.Year = Number(times[0])
            this.CesiumSunViewSky.Month = Number(times[1])
            this.CesiumSunViewSky.Day = Number(times[2])
            return true
        }
        return "set data fail"
    }
    UpdateTimeZone(location) {
        if (this.bAutoUpdateTimeZone) {
            let Timezone = this.CoordinateConverterMgr.SetGMTBasedOnLng(location.X)
            this.SetTimeZone(Timezone)
            this.CesiumSunViewSky.UpdateSun()
        }
    }
    UpdateSun() {
        this.CesiumSunViewSky.UpdateSun()
    }
}