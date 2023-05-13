///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/16 11:43
///

import * as UE from 'ue'
import {BaseView} from "../../../System/API/View/BaseView";
import {$ref, $unref} from "puerts";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";
import {Object} from "ue";
import {ProjectSetting} from "../../../System/Setting/SystemSetting";

type DynamicWeather_type = UE.DynamicWeather.DynamicWeather.Blueprints.BP_DynamicSKY.BP_DynamicSKY_C

export interface DynamicWeatherView extends DynamicWeather_type {
};

export class DynamicWeatherView extends BaseView {
    //@ts
    data: any
    jsondata: any
    callback: any
    CameraZ: number
    DefaultConfigurationName: string
    CurrentConfigurationName: string
    IsEarth: boolean
    dataSunTiltAngle: number
    dataMoonTiltAngle: number

    ReceiveBeginPlay(): void {
        super.ReceiveBeginPlay()
        this.Stop24Hour.Add(() => {
            this.Stop24HourMes()
        })
        this.jsondata = undefined
        this.callback = undefined
        this.CameraZ = 0
        this.BottomHeight = 3
        this.Tags.Add("NoFlatten")
        this.DefaultConfigurationName = "surface_nocloud_1"
        this.IsEarth = false
        this.dataSunTiltAngle = 0
        this.dataMoonTiltAngle = 0
        MessageCenter.Add(this,this.UpdataSunTileAngle,NotificationLists.API.ON_PAWN_CENTER_SPHERE)
    }

    UpdataSunTileAngle(isearth){
        this.IsEarth = isearth
        if (this.IsEarth){
            this.SunTiltAngle = 90
            this.MoonTiltAngle = 90
        }
        else {
            this.SunTiltAngle = this.dataSunTiltAngle
            this.MoonTiltAngle = this.dataMoonTiltAngle
        }
        // console.error("太阳倾斜角：" + this.SunTiltAngle)
        // console.error("月亮倾斜角：" + this.MoonTiltAngle)
        // let TimeTemp = this.DayTime + 0.001
        // this.DayTime += 0.01
        // this.Init()
        this.SetSunAndMoonRotation()
        // this.ChangeHour(TimeTemp)
    }

    ReceiveTick(DeltaSeconds: number): void {
        super.ReceiveTick(DeltaSeconds)
        //Turn on when the art is used for effect debugging, and turn off when the art is not in use
        if (this.data.IsArtDebugging) {
            this.Init()
        }

        if (this.IsAutoChangeTime) {
            this.UpdateSkyTime()
        }
    }

    Init(): void {
        this.ClimatePreset()
        this.SetComponentsAttribute()
        this.SetSunAndMoonRotation()
        this.Set_Climate()
        this.SetRainSnowEffect()
        this.Set_Wind()
        this.SetSKY()
        this.Set_RainSnow()
    }

    RefreshView(jsonData): string {
        this.jsondata = jsonData
        this.data = jsonData.data
        this.DayTime = this.data.time
        if (this.data.useCustomParameters){
            this.SunTiltAngle = this.data.sunTiltAngle
            this.SunRotatAngle = this.data.sunRotatAngle
            this.DawnTime = this.data.dawnTime
            this.DuskTime = this.data.duskTime
            this.MoonTiltAngle = this.data.moonTiltAngle
            this.MoonRotatAngle = this.data.moonRotatAngle
            this.MoonRiseTilt = this.data.moonRiseTilt
            this.MoonSize = this.data.moonSize
            this.MoonRotat = this.data.moonRotat
            this.StarsBrightness = this.data.starsBrightness
            this.StarrySkyColor = this.DataToLinearColor(this.data.starrySkyColor)
            this.StarrySkyMap = UE.Texture.Load(this.data.starrySkyMap)
            this.MoonPhases = this.data.moonPhases
            this.MoonColor = this.DataToLinearColor(this.data.moonColor)
            this.MoonColorBrightness = this.data.moonColorBrightness
            this.SunlightIntensity = this.data.sunlightIntensity
            this.SunlightColor = this.DataToLinearColor(this.data.sunlightColor)
            this.ColorTemperature = this.data.colorTemperature
            this.MoonlightIntensity = this.data.moonlightIntensity
            this.MoonlightColor = this.DataToLinearColor(this.data.moonlightColor)
            this.BottomHeight = this.data.bottomHeight
            this.Height = this.data.height
            this.TraceStartMaxDistance = this.data.traceStartMaxDistance
            this.TraceMaxDistance = this.data.traceMaxDistance
            this.CloudCoverage = this.data.cloudCoverage
            this.CloudSize = this.data.cloudSize
            this.AddCloudDetail = this.data.addCloudDetail
            this.CloudMigrationX = this.data.cloudMigrationX
            this.CloudMigrationY = this.data.cloudMigrationY
            this.CloudWindSpeed = this.data.cloudWindSpeed
            this.SunSize = this.data.sunSize
            this.SolarColor = this.DataToLinearColor(this.data.solarColor)
            this.SolarColorIntensity = this.data.solarColorIntensity
            this.UseMoonModel = this.data.useMoonModel
            switch (this.data.skyModel){
                case "VolumetricClouds":
                    this.SkyModel = 0
                    break
                case "NoClouds":
                    this.SkyModel = 1
                    break
                case "StaticClouds":
                    this.SkyModel = 2
                    break
                case "HDRIClouds":
                    this.SkyModel = 3
                    break
                case "TwoDClouds":
                    this.SkyModel = 4
                    break
            }
            this.FogColor = this.DataToLinearColor(this.data.fogColor)
            this.FogDensity = this.data.fogDensity
            this.FogHeightAttenuation = this.data.fogHeightAttenuation
            this.HDR360Rotation = this.data.hDR360Rotation
            this.HDR360RotationSpeed = this.data.hDR360RotationSpeed
            this.HDR_Brightness = this.data.hDR_Brightness
            this.HDR_Desaturation = this.data.hDR_Desaturation
            this.T_HDR_Night = UE.Texture2D.Load(this.data.t_HDR_Night)
            this.T_HDR_Sunrise = UE.Texture2D.Load(this.data.t_HDR_Sunrise)
            this.T_HDR_Day = UE.Texture2D.Load(this.data.t_HDR_Day)
            this.T_HDR_Dusk = UE.Texture2D.Load(this.data.t_HDR_Dusk)
            switch (this.data.StaticCloudType){
                case "LightCloud":
                    this.StaticCloudType = 0
                    break
                case "Cloudy":
                    this.StaticCloudType = 1
                    break
                case "ThickCloud":
                    this.StaticCloudType = 2
                    break
                case "BoYun":
                    this.StaticCloudType = 3
                    break
                case "DarkCloud":
                    this.StaticCloudType = 4
                    break
            }
            this.RainIntensity = this.data.rainIntensity
            this.SnowIntensity = this.data.snowIntensity
            this.WaterColor = this.DataToLinearColor(this.data.waterColor)
            this.water_rought = this.data.water_rought
            this.LightRainPuddlesRainRippleSpeed = this.data.lightRainPuddlesRainRippleSpeed
            this.LightRainPuddleRainRippleIntensity = this.data.lightRainPuddleRainRippleIntensity
            this.LightRainPuddlesRainRippleSize = this.data.lightRainPuddlesRainRippleSize
            this.HeavyRainPuddlesRainPointSize = this.data.heavyRainPuddlesRainPointSize
            this.EndRainPuddleSlopeStrength = this.data.endRainPuddleSlopeStrength
            this.EndRainRainDisappearMaskSize = this.data.endRainRainDisappearMaskSize
            this.SnowUVSize = this.data.snowUVSize
            this.SnowMaskUVSize = this.data.snowMaskUVSize
            this.TwoD_LessCloudy_Cloudy = this.data.twoD_LessCloudy_Cloudy
            switch (this.data.climate){
                case "NoCloud":
                    this.Climate = 0
                    break
                case "Sunny":
                    this.Climate = 1
                    break
                case "Cloudy":
                    this.Climate = 2
                    break
                case "overcast":
                    this.Climate = 3
                    break
                case "Fog":
                    this.Climate = 4
                    break
                case "LightRain":
                    this.Climate = 5
                    break
                case "ModerateRain":
                    this.Climate = 6
                    break
                case "HeavyRain":
                    this.Climate = 7
                    break
                case "LightSnow":
                    this.Climate = 8
                    break
                case "ModerateSnow":
                    this.Climate = 9
                    break
                case "HeavySnow":
                    this.Climate = 10
                    break
                case "Customize":
                    this.Climate = 11
                    break
            }
            this.LightningSpeed = this.data.lightningSpeed
            this.LightningIntervalTime = this.data.lightningIntervalTime
            this.LightningDuration = this.data.lightningDuration
            this.SpringPlantColor = this.DataToLinearColor(this.data.springPlantColor)
            this.AutumnPlantColor = this.DataToLinearColor(this.data.autumnPlantColor)
            this.WinterPlantWiltColor = this.DataToLinearColor(this.data.winterPlantWiltColor)
            this.WinterGrassWitheredColor = this.DataToLinearColor(this.data.winterGrassWitheredColor)
            this.SeasonalColorRandomness = this.data.seasonalColorRandomness
            this.WindSpeed = this.data.windSpeed
            this.WindStrength = this.data.windStrength
            this.VegetationWindSwayingHeight = this.data.vegetationWindSwayingHeight
            this.WindDirectionValue = this.data.windDirectionValue
            this.ClimateWindStrength = this.data.climateWindStrength
            this.SkylightIntensity = this.data.skylightIntensity
            this.daytime_Cubemap = UE.TextureCube.Load(this.data.daytime_Cubemap)
            this.day_SkylightIntensity = this.data.day_SkylightIntensity
            this.night_Cubemap = UE.TextureCube.Load(this.data.night_Cubemap)
            this.night_SkylightIntensity = this.data.night_SkylightIntensity
            this.Rayleigh_Exponential = this.data.rayleigh_Exponential
            switch (this.data.method){
                case "BM_SOG":
                    this.Method = 0
                    break
                case "BM_FFT":
                    this.Method = 1
                    break
            }
            this.Intensity = this.data.intensity
            this.Threshold = this.data.threshold
            switch (this.data.metering_Mode){
                case "AEM_Histogram":
                    this.Metering_Mode = 0
                    break
                case "AEM_Basic":
                    this.Metering_Mode = 1
                    break
                case "AEM_Manual":
                    this.Metering_Mode = 2
                    break
            }
            this.Exposure_Compensation = this.data.exposure_Compensation
            this.Intensity_0 = this.data.intensity_0
            this.Start_Offset = this.data.start_Offset
            this.Shutter_Speed = this.data.shutter_Speed
            this.ISO = this.data.iSO
            this.Aperture = this.data.aperture
            this.Maximum_Aperture = this.data.maximum_Aperture
            this.Number_Of_Diaphragm_Blades = this.data.number_Of_Diaphragm_Blades
            this.Contrast_Scale = this.data.contrast_Scale
            this.Detail_Strength = this.data.detail_Strength
            this.Blurred_Luminance_Blend = this.data.blurred_Luminance_Blend
            this.Blurred_Luminance_Kernel_Size_Percent = this.data.blurred_Luminance_Kernel_Size_Percent
            this.Middle_Grey_Bias = this.data.middle_Grey_Bias
            this.Intensity_1 = this.data.intensity_1
            this.Tint = this.DataToLinearColor(this.data.tint)
            this.Bokeh_Size = this.data.bokeh_Size
            this.Threshold_0 = this.data.threshold_0
            this.Bokeh_Shape = UE.Texture.Load(this.data.bokeh_Shape)
            this.Vignette_Intensity = this.data.vignette_Intensity
            switch (this.data.temperature_Type){
                case "TEMP_WhiteBalance":
                    this.Temperature_Type = 0
                    break
                case "TEMP_ColorTemperature":
                    this.Temperature_Type = 1
                    break
            }
            this.Temp = this.data.temp
            this.Tint_0 = this.data.tint_0
            this.Saturation = this.DataToVector4(this.data.saturation)
            this.Contrast = this.DataToVector4(this.data.contrast)
            this.Gamma = this.DataToVector4(this.data.gamma)
            this.Gain = this.DataToVector4(this.data.gain)
            this.Offset = this.DataToVector4(this.data.offset)
            this.Saturation_0 = this.DataToVector4(this.data.saturation_0)
            this.Contrast_0 = this.DataToVector4(this.data.contrast_0)
            this.Gamma_0 = this.DataToVector4(this.data.gamma_0)
            this.Gain_0 = this.DataToVector4(this.data.gain_0)
            this.Offset_0 = this.DataToVector4(this.data.offset_0)
            this.Saturation_1 = this.DataToVector4(this.data.saturation_1)
            this.Contrast_1 = this.DataToVector4(this.data.contrast_1)
            this.Gamma_1 = this.DataToVector4(this.data.gamma_1)
            this.Gain_1 = this.DataToVector4(this.data.gain_1)
            this.Offset_1 = this.DataToVector4(this.data.offset_1)
            this.Saturation_2 = this.DataToVector4(this.data.saturation_2)
            this.Contrast_2 = this.DataToVector4(this.data.contrast_2)
            this.Gamma_2 = this.DataToVector4(this.data.gamma_2)
            this.Gain_2 = this.DataToVector4(this.data.gain_2)
            this.Offset_2 = this.DataToVector4(this.data.offset_2)
            this.Highlights_Min = this.data.highlights_Min
            this.Highlights_Max = this.data.highlights_Max
            this.Shadows_Max = this.data.shadows_Max
            switch (this.data.method_0){
                case "None":
                    this.Method_0 = 0
                    break
                case "Lumen":
                    this.Method_0 = 1
                    break
                case "ScreenSpace":
                    this.Method_0 = 2
                    break
                case "RayTraced":
                    this.Method_0 = 3
                    break
                case "Plugin":
                    this.Method_0 = 4
                    break
            }
            this.Indirect_Lighting_Color = this.DataToLinearColor(this.data.indirect_Lighting_Color)
            this.Indirect_Lighting_Intensity = this.data.indirect_Lighting_Intensity
            this.Slope = this.data.slope
            this.Toe = this.data.toe
            this.Shoulder = this.data.shoulder
            this.Black_Clip = this.data.black_Clip
            this.White_Clip = this.data.white_Clip
            switch (this.data.method_1){
                case "None":
                    this.Method_1 = 0
                    break
                case "Lumen":
                    this.Method_1 = 1
                    break
                case "ScreenSpace":
                    this.Method_1 = 2
                    break
                case "RayTraced":
                    this.Method_1 = 3
                    break
            }
            this.Quality = this.data.quality
            switch (this.data.ray_Lighting_Mode){
                case "Default":
                    this.Ray_Lighting_Mode = 0
                    break
                case "SurfaceCache":
                    this.Ray_Lighting_Mode = 1
                    break
                case "HitLighting":
                    this.Ray_Lighting_Mode = 2
                    break
            }
            this.Intensity_2 = this.data.intensity_2
            this.Quality_0 = this.data.quality_0
            this.Max_Roughness = this.data.max_Roughness
            this.Rayleigh_scattering = this.DataToLinearColor(this.data.rayleigh_scattering)
        }
        else {
            if (this.data.UseConfiguration) {
                this.CurrentConfigurationName = this.data.configurationName
                this.load_A = this.CurrentConfigurationName
            } else {
                this.load_A = this.DefaultConfigurationName
            }
            let result = this.LoadConfiguration()
            if (!result){
                let CurResult = "Current " + this.load_A + ".json is not exist"
                return CurResult
            }
        }

        this.dataSunTiltAngle = this.SunTiltAngle
        if (this.IsEarth){
            this.SunTiltAngle = 90
            this.MoonTiltAngle = 90
        }
        else {
            this.SunTiltAngle = this.dataSunTiltAngle
            this.MoonTiltAngle = this.dataMoonTiltAngle
        }
        this.Init()
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(new UE.Vector(0, 0, 0), false, FHitResult, false)
        return "success"
    }

    //设置天气
    SetSKY() {
        this.SetSun()
        this.SetMoon()
        this.SetWindowLight()
        this.SetSkyAtmosphere()
        this.SetFog()
        this.SetCloudMode()
        this.SetChangeOfColoud()
        this.SetFourSeasons()
    }

    ReceiveEndPlay(EndPlayReason): void {
        super.ReceiveEndPlay(EndPlayReason);
        MessageCenter.Remove(this,NotificationLists.API.ON_PAWN_CENTER_SPHERE)
    }

    //时间变换
    ChangeHour(DayTime) {
        this.DayTime = DayTime
        if (this.IsAutoChangeTime) {
            return "The 24-hour automatic conversion is currently in progress, and the time cannot be modified"
        } else {
            this.UpdateSkyTime()
            return "success"
        }
    }

    UpdateSkyTime() {
        this.Init()
        // this.SetSunAndMoonRotation()
        // this.SetSun()
        // this.SetMoon()
        // this.SetWindowLight()
        // this.SetSkyAtmosphere()
        // this.SetFog()
        // this.SetChangeOfColoud()
    }

    Auto24HourChange(DayVariation, IsStartFormCurrentTime, IsLoop, Callback) {
        this.callback = Callback
        this.DayVariation = DayVariation
        this.TempDayTime = this.DayTime
        this.IsLoop = IsLoop
        this.Time_0.SetPlayRate(this.DayVariation / 100)
        this.Time_0.SetLooping(IsLoop)
        let playposition
        if (IsStartFormCurrentTime) {
            playposition = this.DayTime / 24
        } else {
            playposition = 0
        }
        this.Time_0.SetPlaybackPosition(playposition, false, false)
        if (!IsLoop) {
            this.Time_1.SetPlayRate(DayVariation / 100)
            this.Time_1.SetLooping(false)
            this.Time_1.SetPlaybackPosition(0, false, false)
            // this.TimeTwoPlay()
        }
        this.TimePlay()
    }

    Stop24HourChange() {
        this.IsAutoChangeTime = false
        this.Stop24HourMes()
    }

    Stop24HourMes() {
        let msg = {
            classDef: "DynamicWeather",
            funcDef: "Stop24HourChange",
            data: undefined,
            callback: this.callback,
            pageID: this.jsondata.pageID,
        }
        msg.data = {"result": "stop 24 hours change"}
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    ChangeFourSeasons(Seasons) {
        this.Seasons = Seasons
        this.SetFourSeasons()
    }

    ChangeClimate(climate_jsondata) {
        this.Climate = climate_jsondata.climate
        if (climate_jsondata.UseConfiguration) {
            this.CurrentConfigurationName = climate_jsondata.configurationName
        } else {
            this.ClimateDefault()
        }
        this.LoadFileSetSky()
        this.Init()
    }

    ClimateDefault() {
        switch (this.Climate) {
            case 0:
                this.CurrentConfigurationName = "surface_nocloud_1"
                break
            case 1:
                this.CurrentConfigurationName = "surface_sunny_1"
                break
            case 2:
                this.CurrentConfigurationName = "surface_cloudy_1"
                break
            case 3:
                this.CurrentConfigurationName = "surface_overcast_1"
                break
            case 4:
                this.CurrentConfigurationName = "surface_fog_1"
                break
            case 5:
                this.CurrentConfigurationName = "surface_lightRain_1"
                break
            case 6:
                this.CurrentConfigurationName = "surface_moderateRain_1"
                break
            case 7:
                this.CurrentConfigurationName = "surface_heavyRain_1"
                break
            case 8:
                this.CurrentConfigurationName = "surface_lightSnow_1"
                break
            case 9:
                this.CurrentConfigurationName = "surface_moderateSnow_1"
                break
            case 10:
                this.CurrentConfigurationName = "surface_heavySnow_1"
                break
            case 11:
                this.CurrentConfigurationName = "surface_customize_1"
                break
        }
    }

    LoadFileSetSky() {
        this.load_A = this.CurrentConfigurationName
        let result = this.LoadConfiguration()
    }

    SaveSkyConfiguration(save_jsondata) {
        this.save_B = save_jsondata.configurationName
        this.SaveConfiguration()
    }

    LoadSkyConfiguration(load_jsondata) {
        this.load_A = load_jsondata.configurationName
        let result = this.LoadConfiguration()
        return result
    }


    SetSunAndMoonRotation() {
        this.SunLightComponent = this.SunLight
        this.MoonLightComponent = this.MoonLight
        this.SetDawnAndDuskTime()
        let temp1 = UE.KismetMathLibrary.MapRangeUnclamped(this.InternalTime, 0.0, 24.0, 0.0, 360.0)
        let tempSun = new UE.Rotator(0, 0, 0)
        this.ConvertAngleToTime(this.SunTiltAngle, this.SunRotatAngle, this.SunRotatAngle, temp1, $ref(tempSun))
        let FHitResult = $ref(new UE.HitResult)
        this.SunLightComponent.K2_SetWorldRotation(tempSun, false, FHitResult, false)
        let temp2 = UE.KismetMathLibrary.MapRangeUnclamped(this.InternalTime + this.MoonRiseTilt, 0.0, 24.0, 0.0, 360.0) + 180.0
        let tempMoon = new UE.Rotator(0, 0, 0)
        this.ConvertAngleToTime(this.MoonTiltAngle, this.MoonRotatAngle, this.MoonRotatAngle, temp2, $ref(tempMoon))
        this.MoonLightComponent.K2_SetWorldRotation(tempMoon, false, FHitResult, false)
        this.Arrow.K2_SetWorldRotation(new UE.Rotator(tempMoon.Pitch, tempMoon.Yaw, this.MoonRotat), false, FHitResult, false)
        let temptime = UE.KismetMathLibrary.Fraction(this.InternalTime / 24) * 24
        let tempValue
        if (temptime < 12) {
            tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 5.5, 6.2, 1.0, 0.0)
        } else {
            tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 17.9, 18.5, 0.0, 1.0)
        }
        this.Stars_MID.SetScalarParameterValue("BP_StarsO", tempValue)
        let tempV1 = UE.KismetMathLibrary.Conv_VectorToLinearColor(UE.KismetMathLibrary.Normal(UE.KismetMathLibrary.Conv_RotatorToVector(this.SunLightComponent.K2_GetComponentRotation()), 0.0001))
        this.Stars_MID.SetVectorParameterValue("BP_Sun_Position", tempV1)
        let tempV2 = UE.KismetMathLibrary.Conv_VectorToLinearColor(UE.KismetMathLibrary.Multiply_VectorFloat(UE.KismetMathLibrary.Conv_RotatorToVector(this.MoonLightComponent.K2_GetComponentRotation()), 100000))
        this.Stars_MID.SetVectorParameterValue("BP_Moon_Position", tempV2)
        let CurBoolSky = UE.KismetMathLibrary.InRange_FloatFloat(this.InternalTime, 7.0, 18.0, true, true)
        if (CurBoolSky) {
            this.SkyLight.SetCubemap(this.daytime_Cubemap)
        } else {
            this.SkyLight.SetCubemap(this.night_Cubemap)
        }
    }

    SetDawnAndDuskTime() {
        let temptime = UE.KismetMathLibrary.Fraction(this.DayTime / 24) * 24

        if (UE.KismetMathLibrary.InRange_FloatFloat(temptime, this.DawnTime, this.DuskTime, true, true)) {
            this.InternalTime = UE.KismetMathLibrary.MapRangeClamped(temptime, this.DawnTime, this.DuskTime, 6.0, 18.0)
        } else {
            if (temptime < this.DawnTime) {
                this.InternalTime = UE.KismetMathLibrary.MapRangeClamped(temptime, 0.0, this.DawnTime, 0.0, 6.0)
            } else {
                this.InternalTime = UE.KismetMathLibrary.MapRangeClamped(temptime, this.DuskTime, 24., 18.0, 24.0)
            }
        }
    }

    // ConvertAngleToTime2(Pitch: number, AngleDeg: number, AngleDeg2: number, AngleDeg3: number): UE.Rotator {
    //     let tempR = new UE.Rotator(0, Pitch, 0)
    //     let Vect1 = UE.KismetMathLibrary.GreaterGreater_VectorRotator(new UE.Vector(0, 0, 1), tempR)
    //     let Vect2 = UE.KismetMathLibrary.GreaterGreater_VectorRotator(new UE.Vector(1, 0, 0), tempR)
    //     let tempV1 = UE.KismetMathLibrary.RotateAngleAxis(Vect1, AngleDeg, new UE.Vector(0, 0, 1))
    //     let tempV2 = UE.KismetMathLibrary.RotateAngleAxis(Vect2, AngleDeg2, new UE.Vector(0, 0, 1))
    //     let tempV3 = UE.KismetMathLibrary.RotateAngleAxis(tempV1, AngleDeg3, tempV2)
    //     let value = UE.KismetMathLibrary.Conv_VectorToRotator(tempV3)
    //     return value
    // }

    SetMoon() {
        let temptime = UE.KismetMathLibrary.Fraction(this.InternalTime / 24) * 24
        let tempValue
        if (temptime < 12) {
            tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 5.5, 6.2, 1.0, 0.0)
        } else {
            tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 17.9, 18.5, 0.0, 1.0)
        }
        this.MoonLightComponent.SetIntensity(this.MoonlightIntensity * tempValue)
        this.MoonLightComponent.SetLightColor(this.MoonlightColor, true)
        if (this.UseMoonModel) {
            this.SM_Moon.SetVisibility(true, false)
            this.SM_Moon.SetWorldScale3D(UE.KismetMathLibrary.Conv_FloatToVector(this.MoonSize * 100000.0))
            this.Stars_MID.SetTextureParameterValue("BP_T_Stars", this.StarrySkyMap)
            this.Stars_MID.SetVectorParameterValue("BP_StarsColor", new UE.LinearColor(this.StarrySkyColor.R, this.StarrySkyColor.G, this.StarrySkyColor.B, this.StarsBrightness))
            this.Moon_MID.SetVectorParameterValue("BP_MoonColor", new UE.LinearColor(this.MoonColor.R, this.MoonColor.G, this.MoonColor.B, this.MoonColorBrightness))
            this.Moon_MID.SetScalarParameterValue("BP_MoonPhase", this.MoonPhases)
            this.Stars_MID.SetScalarParameterValue("BP_Moon_Scale", 0.0)
        } else {
            this.SM_Moon.SetVisibility(false, false)
            this.Stars_MID.SetVectorParameterValue("BP_MoonColor", new UE.LinearColor(this.MoonColor.R, this.MoonColor.G, this.MoonColor.B, this.MoonColorBrightness))
            this.Stars_MID.SetScalarParameterValue("BP_Moon_Scale", this.MoonSize * 10000)
            let temp = UE.KismetMathLibrary.GreaterGreater_VectorRotator(new UE.Vector(0, -1, 0), new UE.Rotator(0, 0, UE.KismetMathLibrary.MapRangeClamped(this.MoonPhases, 0.0, 30.0, 0.0, 360.0)))
            this.Stars_MID.SetVectorParameterValue("BP_MoonPhase", UE.KismetMathLibrary.Conv_VectorToLinearColor(temp))
        }
    }

    SetSun() {
        let temptime = UE.KismetMathLibrary.Fraction(this.InternalTime / 24) * 24
        let tempValue
        if (UE.KismetMathLibrary.InRange_FloatFloat(temptime, this.DawnTime, this.DuskTime, true, true)) {
            tempValue = this.day_SkylightIntensity
        } else {
            tempValue = this.night_SkylightIntensity
        }
        this.SkyLight.SetIntensity(tempValue * this.SkylightIntensity)
        let tempValue1
        if (temptime < 12) {
            tempValue1 = UE.KismetMathLibrary.MapRangeClamped(temptime, 5.5, 6.2, 0.0, 1.0)
        } else {
            tempValue1 = UE.KismetMathLibrary.MapRangeClamped(temptime, 17.9, 18.5, 1.0, 0.0)
        }
        this.SunLightComponent.SetIntensity(this.SunlightIntensity * tempValue1)
        this.SunLightComponent.SetLightColor(this.SunlightColor, true)
        this.SunLightComponent.SetTemperature(this.ColorTemperature)
        this.Stars_MID.SetScalarParameterValue("BP_Sun_Radius", this.SunSize)
        this.Stars_MID.SetScalarParameterValue("BP_Sun_Brightness", this.SolarColorIntensity)
        this.Stars_MID.SetVectorParameterValue("BP_SunColor", this.CLC_Sun_Color.GetLinearColorValue(UE.KismetMathLibrary.MapRangeClamped(temptime, 0, 12, 0, 1)))
    }

    SetSkyAtmosphere() {
        let temp1 = this.InternalTime + this.MoonRiseTilt
        let temptime = UE.KismetMathLibrary.Fraction(temp1 / 24) * 24
        let value
        if (temptime < 12) {
            let tempValue1
            if (temptime < 6) {
                tempValue1 = UE.KismetMathLibrary.MapRangeClamped(temptime, 4, 6, 0, 0.5)
            } else {
                tempValue1 = 1.0
            }
            if (UE.KismetMathLibrary.InRange_FloatFloat(this.InternalTime, 0.0, 6.0, false, false)) {
                value = tempValue1
            } else {
                value = 0.0
            }
        } else {
            let tempValue2
            if (temptime < 18.5) {
                tempValue2 = UE.KismetMathLibrary.MapRangeClamped(temptime, 18.0, 18.1, 0.0, 0.5)
            } else {
                tempValue2 = UE.KismetMathLibrary.MapRangeClamped(temptime, 19.5, 20.0, 0.5, 1.0)
            }
            if (this.InternalTime < temp1) {
                value = 0.0
            } else {
                value = tempValue2
            }
        }
        let CurLinearColor = this.NCB_SkyAtmosphereColor.GetLinearColorValue(value)
        let resultLinearColor = UE.KismetMathLibrary.Multiply_LinearColorLinearColor(CurLinearColor,this.Rayleigh_scattering)
        this.SkyAtmosphere.SetRayleighScattering(resultLinearColor)
    }

    SetVolmetric() {
        this.VolumetricCloud.SetLayerBottomAltitude(this.BottomHeight)
        this.VolumetricCloud.SetLayerHeight(this.Height)
        this.VolumetricCloud.SetTracingStartMaxDistance(this.TraceStartMaxDistance)
        this.VolumetricCloud.SetTracingMaxDistance(this.TraceMaxDistance)
        this.VolumetricCloud_MID.SetScalarParameterValue("BP_GlobalSize", this.CloudSize)
        this.VolumetricCloud_MID.SetScalarParameterValue("BP_AddCloudDetails", this.AddCloudDetail)
        this.VolumetricCloud_MID.SetVectorParameterValue("BP_UserOffset", new UE.LinearColor(this.CloudMigrationX, this.CloudMigrationY, 0, 0))
        let temp = UE.KismetMathLibrary.Conv_VectorToLinearColor(this.WindDirection.GetForwardVector())
        this.VolumetricCloud_MID.SetVectorParameterValue("BP_WindSpeed", new UE.LinearColor(temp.R, temp.G, 0.5, this.CloudWindSpeed * this.WindSpeed))
        this.VolumetricCloud_MID.SetScalarParameterValue("BP_CloudDensity", this.CloudCoverage * this.Climate_CloudCoverage)
    }

    SetFog() {
        let temptime = UE.KismetMathLibrary.Fraction(this.InternalTime / 24) * 24
        let tempValue
        if (temptime < 12) {
            tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 0, 12, 0, 0.5)
        } else {
            tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 12, 24, 0.5, 1.0)
        }
        this.HeightFogComponent = this.ExponentialHeightFog
        this.HeightFogComponent.SetFogDensity(this.FogDensity * this.Climate_FogDensity * this.CF_FogDensity.GetFloatValue(tempValue))
        this.HeightFogComponent.SetFogHeightFalloff(this.CF_FogHeightFalloff.GetFloatValue(temptime) * this.FogHeightAttenuation)
        this.HeightFogComponent.SetFogInscatteringColor(UE.KismetMathLibrary.Multiply_LinearColorLinearColor(this.CLC_FogColor.GetLinearColorValue(tempValue), this.FogColor))
        this.HeightFogComponent.SetDirectionalInscatteringColor(this.CLC_InscatteringColor.GetLinearColorValue(temptime))
        this.ExponentialHeightFog.SetDirectionalInscatteringExponent(this.CF_InscatteringExponent.GetFloatValue(temptime))
    }

    Set_RainSnow() {
        let CurMPC_Climate = UE.MaterialParameterCollection.Load("/DynamicWeather/DynamicWeather/Materials/Climate/zengzi_MPC_DynamicWeather.zengzi_MPC_DynamicWeather")
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "WaterColor", this.WaterColor)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "Rain", this.RainIntensity)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "2Rain_Ripple_Speed", this.LightRainPuddlesRainRippleSpeed)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "2Rain_Ripple_In", this.LightRainPuddleRainRippleIntensity)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "2Rain_RippleUV", this.LightRainPuddlesRainRippleSize)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "3Rain_RaindropsUV", this.HeavyRainPuddlesRainPointSize)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "4Rain_WaterSlope_In", this.EndRainPuddleSlopeStrength)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "5Rain_DisappearMaskUV", this.EndRainRainDisappearMaskSize)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "Snow", this.SnowIntensity)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "SnowUV", this.SnowUVSize)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "GradientMaskUV", this.SnowMaskUVSize)
        let CurMPC_Clouds = UE.MaterialParameterCollection.Load("/DynamicWeather/DynamicWeather/Materials/VolumetricCloud/zengzi_MPC_Clouds.zengzi_MPC_Clouds")
        let temp = UE.KismetMathLibrary.MapRangeClamped(this.RainIntensity, 2.0, 2.5, 0.0, 1.0)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Clouds, "LightningIntensity", temp)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Clouds, "LightningSpeed", this.LightningSpeed)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Clouds, "LightningIntervalTime", this.LightningIntervalTime)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Clouds, "LightningContinuedTime", this.LightningDuration)
    }

    Set_Wind() {
        let FHitResult = $ref(new UE.HitResult)
        this.WindDirection.K2_SetWorldRotation(new UE.Rotator(this.WindDirection.K2_GetComponentRotation().Roll, this.WindDirection.K2_GetComponentRotation().Pitch, this.WindDirectionValue), false, FHitResult, false)
        let CurMPC_Climate = UE.MaterialParameterCollection.Load("/DynamicWeather/DynamicWeather/Materials/Climate/zengzi_MPC_DynamicWeather.zengzi_MPC_DynamicWeather")
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "WindDirection", UE.KismetMathLibrary.Conv_VectorToLinearColor(this.WindDirection.GetForwardVector()))
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "WindSpeed", this.WindSpeed)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "WindStrength", this.WindStrength * this.ClimateWindStrength)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "WindSwayHeight", this.VegetationWindSwayingHeight)
    }

    SetFourSeasons() {
        let CurMPC_Climate = UE.MaterialParameterCollection.Load("/DynamicWeather/DynamicWeather/Materials/Climate/zengzi_MPC_DynamicWeather.zengzi_MPC_DynamicWeather")
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "Seasons", this.Seasons)
        UE.KismetMaterialLibrary.SetScalarParameterValue(this, CurMPC_Climate, "ColorRandom", this.SeasonalColorRandomness)
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "SpringColor", this.SpringPlantColor)
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "AutumnColor", this.AutumnPlantColor)
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "WinterColor", this.WinterPlantWiltColor)
        UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "WinterColorGrass", this.WinterGrassWitheredColor)
    }

    SetCloudMode() {
        if (this.SkyModel === 0) {
            this.VolumetricCloud.SetVisibility(true, false)
        } else {
            this.VolumetricCloud.SetVisibility(false, false)
        }
        if (this.SkyModel === 1) {
            this.VolumetricCloud.SetVisibility(false, false)
            this.SM_HDR_SKY.SetVisibility(false, false)
        }
        if (this.SkyModel === 2) {
            this.VolumetricCloud.SetMaterial(this.StaticCloud_MID)
            this.VolumetricCloud.SetVisibility(true, false)
        } else {
            this.VolumetricCloud.SetMaterial(this.VolumetricCloud_MID)
        }
        if (this.SkyModel === 3) {
            this.SM_HDR_SKY.SetVisibility(true, false)
            this.SkyAtmosphere.SetMieScatteringScale(0.0)
            this.SkyAtmosphere.SetRayleighScatteringScale(0.0)
        } else {
            this.SM_HDR_SKY.SetVisibility(false, false)
            this.SkyAtmosphere.SetMieScatteringScale(0.003996)
            this.SkyAtmosphere.SetRayleighScatteringScale(0.0331)
        }
        if (this.SkyModel === 4) {
            if (this.TwoD_LessCloudy_Cloudy) {
                this.SM_LessCloud.SetVisibility(false, false)
                this.SM_ManyCloud.SetVisibility(true, false)
            } else {
                this.SM_LessCloud.SetVisibility(true, false)
                this.SM_ManyCloud.SetVisibility(false, false)
            }
        } else {
            this.SM_LessCloud.SetVisibility(false, false)
            this.SM_ManyCloud.SetVisibility(false, false)
        }
    }

    SetChangeOfColoud() {
        if (this.SkyModel === 0 || this.SkyModel === 2) {
            this.SetVolmetric()
        }

        if (this.SkyModel === 3) {
            let temp = this.InternalTime + this.MoonRiseTilt
            let temptime = UE.KismetMathLibrary.Fraction(temp / 24) * 24
            let tempValue
            if (temptime < 12) {
                if (temptime < 7) {
                    tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 5.9, 6.5, 0.0, 1.0)
                } else {
                    tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 7, 8, 1, 2)
                }
            } else {
                if (temptime < 18) {
                    tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 17, 17.5, 2, 3)
                } else {
                    tempValue = UE.KismetMathLibrary.MapRangeClamped(temptime, 18, 18.5, 3, 4)
                }
            }
            this.HDR_SKY_MID.SetScalarParameterValue("BP_Time", tempValue)
            this.HDR_SKY_MID.SetScalarParameterValue("HDR_360_RotationAngle", this.HDR360Rotation)
            this.HDR_SKY_MID.SetScalarParameterValue("HDR_RotationSpeed", this.HDR360RotationSpeed)
            this.HDR_SKY_MID.SetScalarParameterValue("HDR_Brightness", this.HDR_Brightness)
            this.HDR_SKY_MID.SetScalarParameterValue("Desaturation", this.HDR_Desaturation)
            this.HDR_SKY_MID.SetTextureParameterValue("T_HDR_Night", this.T_HDR_Night)
            this.HDR_SKY_MID.SetTextureParameterValue("T_HDR_Sunrise", this.T_HDR_Sunrise)
            this.HDR_SKY_MID.SetTextureParameterValue("T_HDR_Day", this.T_HDR_Day)
            this.HDR_SKY_MID.SetTextureParameterValue("T_HDR_Dusk", this.T_HDR_Dusk)
        }
    }

    Set_Climate() {
        if (UE.KismetMathLibrary.InRange_FloatFloat(this.RainIntensity, 0.01, 5, true, true)) {
            if (this.RainIntensity < 3) {
                this.Climate_CloudCoverage = UE.KismetMathLibrary.MapRangeClamped(this.RainIntensity, 0, 0.5, 1.0, 10)
                this.Climate_FogDensity = UE.KismetMathLibrary.MapRangeClamped(this.RainIntensity, 1, 2.5, 1.0, 5)
                this.ClimateWindStrength = UE.KismetMathLibrary.MapRangeClamped(this.RainIntensity, 2.5, 3, 1.0, 15)
            } else {
                this.Climate_CloudCoverage = UE.KismetMathLibrary.MapRangeClamped(this.RainIntensity, 3, 4, 10.0, 1)
                this.Climate_FogDensity = UE.KismetMathLibrary.MapRangeClamped(this.RainIntensity, 3, 4, 5.0, 1)
                this.ClimateWindStrength = UE.KismetMathLibrary.MapRangeClamped(this.RainIntensity, 3, 4, 15.0, 1)
            }
        }
        if (UE.KismetMathLibrary.InRange_FloatFloat(this.SnowIntensity, 0.01, 4.6, true, true)) {
            if (this.SnowIntensity < 2) {
                this.Climate_FogDensity = UE.KismetMathLibrary.MapRangeClamped(this.SnowIntensity, 0.5, 1.5, 1.0, 10)
                this.Climate_CloudCoverage = UE.KismetMathLibrary.MapRangeClamped(this.SnowIntensity, 0.0, 0.5, 1.0, 10)
            } else {
                this.Climate_FogDensity = UE.KismetMathLibrary.MapRangeClamped(this.SnowIntensity, 2, 3, 10.0, 1)
                this.Climate_CloudCoverage = UE.KismetMathLibrary.MapRangeClamped(this.SnowIntensity, 2, 3, 10.0, 1)
            }
        }

        if (UE.KismetMathLibrary.InRange_FloatFloat(this.RainIntensity, 0.01, 5, true, true) || UE.KismetMathLibrary.InRange_FloatFloat(this.SnowIntensity, 0.01, 4.6, true, true)) {
            let FHitResult = $ref(new UE.HitResult)
            UE.GameplayStatics.GetPlayerPawn(this, 0).K2_GetActorLocation()
            this.SceneCaptureComponent2D.K2_SetWorldLocation(new UE.Vector(UE.GameplayStatics.GetPlayerPawn(this, 0).K2_GetActorLocation().X, UE.GameplayStatics.GetPlayerPawn(this, 0).K2_GetActorLocation().Y, UE.GameplayStatics.GetPlayerPawn(this, 0).K2_GetActorLocation().Z + 3000), false, FHitResult, false)
            let CurMPC_Climate = UE.MaterialParameterCollection.Load("/DynamicWeather/DynamicWeather/Materials/Climate/zengzi_MPC_DynamicWeather.zengzi_MPC_DynamicWeather")
            UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "Pos", UE.KismetMathLibrary.Conv_VectorToLinearColor(this.SceneCaptureComponent2D.K2_GetComponentLocation()))
            UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "AT", UE.KismetMathLibrary.Conv_VectorToLinearColor(UE.KismetMathLibrary.Add_VectorVector(this.SceneCaptureComponent2D.K2_GetComponentLocation(), UE.KismetMathLibrary.GetForwardVector(this.SceneCaptureComponent2D.K2_GetComponentRotation()))))
            UE.KismetMaterialLibrary.SetVectorParameterValue(this, CurMPC_Climate, "Up", UE.KismetMathLibrary.Conv_VectorToLinearColor(UE.KismetMathLibrary.GetUpVector(this.SceneCaptureComponent2D.K2_GetComponentRotation())))
        }
    }

    SaveConfiguration() {
        let CurPath = $ref("String")
        UE.BlueprintPathsLibrary.NormalizeDirectoryName(ProjectSetting.ProjectPath,CurPath)
        let FilePath = $unref(CurPath) + "/Content/SkyConfig/" + this.save_B + ".json"
        let result = UE.SerializeObjectLibrary.SaveObjectToJsonFile(this, FilePath, BigInt(0), BigInt(524288 + 65536))
        return result
    }

    LoadConfiguration(): boolean {
        let CurPath = $ref("String")
        UE.BlueprintPathsLibrary.NormalizeDirectoryName(ProjectSetting.ProjectPath,CurPath)
        let FilePath = $unref(CurPath) + "/Content/SkyConfig/" + this.load_A + ".json"
        let result = UE.SerializeObjectLibrary.LoadJsonFileToObject(this, FilePath, BigInt(0), BigInt(524288 + 65536))
        return result
    }

    DataToLinearColor(color): UE.LinearColor{
        let curColor = new UE.LinearColor(color.X,color.Y,color.Z,color.W)
        return  curColor
    }

    DataToVector4(data): UE.Vector4{
        let curVector4 = new UE.Vector4(data.X,data.Y,data.Z,data.W)
        return  curVector4
    }
}
