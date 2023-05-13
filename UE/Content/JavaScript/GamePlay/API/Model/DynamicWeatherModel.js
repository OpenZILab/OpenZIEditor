"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/16 11:45
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicWeatherModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class DynamicWeatherModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "DynamicWeather_id",
            time: 12,
            UseConfiguration: true,
            configurationName: "surface_nocloud_1",
            IsArtDebugging: false,
            useCustomParameters: false,
            sunTiltAngle: 15,
            sunRotatAngle: 0,
            dawnTime: 6,
            duskTime: 18,
            moonTiltAngle: 35,
            moonRotatAngle: 15,
            moonRiseTilt: 1,
            moonSize: 1.5,
            moonRotat: 0,
            starsBrightness: 3,
            starrySkyColor: //starry sky color
            {
                X: 0.66911697387695312,
                Y: 0.84460300207138062,
                Z: 1,
                W: 1
            },
            starrySkyMap: "Texture2D'/DynamicWeather/DynamicWeather/Textures/MoonStars/T_Stars02.T_Stars02'",
            moonPhases: 15,
            moonColor: //moon color
            {
                X: 0.52117300033569336,
                Y: 0.64791399240493774,
                Z: 1,
                W: 0
            },
            moonColorBrightness: 1.5,
            sunlightIntensity: 2.813291,
            sunlightColor: //sunlight color
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 0
            },
            colorTemperature: 8089.6924170000002,
            moonlightIntensity: 3,
            moonlightColor: //moonlight color
            {
                X: 0.56889599561691284,
                Y: 0.6674569845199585,
                Z: 0.86458301544189453,
                W: 1
            },
            bottomHeight: 6.1890349999999996,
            height: 20,
            traceStartMaxDistance: 205.30192199999999,
            traceMaxDistance: 99.817544999999996,
            cloudCoverage: 0.58310399999999996,
            cloudSize: 1.843432,
            addCloudDetail: 1,
            cloudMigrationX: 0.760000000000000001,
            cloudMigrationY: 0.504,
            cloudWindSpeed: 0.20399999999999999,
            sunSize: 2,
            solarColor: //sun color
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 0
            },
            solarColorIntensity: 10,
            useMoonModel: true,
            skyModel: "StaticClouds",
            fogColor: //fog color
            {
                X: 0.44856798648834229,
                Y: 0.49368599057197571,
                Z: 0.54166698455810547,
                W: 1
            },
            fogDensity: 0.001,
            fogHeightAttenuation: 0.050000000000000003,
            hDR360Rotation: 0,
            hDR360RotationSpeed: 0,
            hDR_Brightness: 2,
            hDR_Desaturation: 0,
            t_HDR_Night: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/satara_night_no_lamps_4k.satara_night_no_lamps_4k'",
            t_HDR_Sunrise: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/the_chalk_quarry_4k.the_chalk_quarry_4k'",
            t_HDR_Day: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/kloofendal_48d_partly_cloudy_puresky_4k.kloofendal_48d_partly_cloudy_puresky_4k'",
            t_HDR_Dusk: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/kloppenheim_06_puresky_4k.kloppenheim_06_puresky_4k'",
            StaticCloudType: "LightCloud",
            rainIntensity: 0,
            snowIntensity: 0,
            waterColor: //water color
            {
                X: 0.29328098893165588,
                Y: 0.33123800158500671,
                Z: 0.40000000596046448,
                W: 0
            },
            water_rought: 0,
            lightRainPuddlesRainRippleSpeed: 30,
            lightRainPuddleRainRippleIntensity: 0.5,
            lightRainPuddlesRainRippleSize: 2.5,
            heavyRainPuddlesRainPointSize: 0.10000000000000001,
            endRainPuddleSlopeStrength: 0.5,
            endRainRainDisappearMaskSize: 0.01,
            snowUVSize: 1,
            snowMaskUVSize: 50,
            twoD_LessCloudy_Cloudy: false,
            climate: "Cloudy",
            lightningSpeed: 0.5,
            lightningIntervalTime: 0.0500000000000000003,
            lightningDuration: 0.900000000000000002,
            springPlantColor: //spring plant color
            {
                X: 3.4513199329376221,
                Y: 5,
                Z: 0,
                W: 1
            },
            autumnPlantColor: //autumn plant color
            {
                X: 10,
                Y: 1.5894420146942139,
                Z: 0,
                W: 1
            },
            winterPlantWiltColor: //Winter plant withered color
            {
                X: 1,
                Y: 0.25732800364494324,
                Z: 0,
                W: 0
            },
            winterGrassWitheredColor: //Winter grass withered color
            {
                X: 3,
                Y: 2.019474983215332,
                Z: 0.95270800590515137,
                W: 0
            },
            seasonalColorRandomness: 0.070000000000000007,
            windSpeed: 1,
            windStrength: 1,
            vegetationWindSwayingHeight: 1,
            windDirectionValue: 0,
            climateWindStrength: 1,
            skylightIntensity: 1,
            daytime_Cubemap: "TextureCube'/OpenZIAPI/DynamicWeather/A_property_collect/Master_material/M_window/Texture/cubemap_1.cubemap_1'",
            day_SkylightIntensity: 0.299999999999999999,
            night_Cubemap: "TextureCube'/OpenZIAPI/DynamicWeather/A_property_collect/Master_material/M_window/Texture/cubemap_1.cubemap_1'",
            night_SkylightIntensity: 0.40000000000000002,
            rayleigh_Exponential: 2.598193883895874,
            method: "BM_SOG",
            intensity: 0.67500001192092896,
            threshold: -1,
            metering_Mode: "AEM_Histogram",
            exposure_Compensation: 1,
            intensity_0: 0,
            start_Offset: 0,
            shutter_Speed: 60,
            ISO: 100,
            Aperture: 4,
            maximum_Aperture: 1.2000000476837158,
            number_Of_Diaphragm_Blades: 5,
            contrast_Scale: 1,
            detail_Strength: 1,
            blurred_Luminance_Blend: 0.60000002384185791,
            blurred_Luminance_Kernel_Size_Percent: 50,
            middle_Grey_Bias: 0,
            intensity_1: 1,
            tint: //post's Lens_Flares coloring
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            bokeh_Size: 3,
            threshold_0: 8,
            bokeh_Shape: "None",
            vignette_Intensity: 0.40000000596046448,
            temperature_Type: "TEMP_WhiteBalance",
            temp: 6500,
            tint_0: 0,
            saturation: //post Global saturation
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            contrast: //post's Global contrast
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gamma: //post's Global gamma
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gain: //post's Global gain
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            offset: //post's Global deviation
            {
                X: 0,
                Y: 0,
                Z: 0,
                W: 0
            },
            saturation_0: //post's shadows saturation
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            contrast_0: //post shadows contrast
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gamma_0: //post shadows gamma
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gain_0: //post shadows gain
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            offset_0: //post's shadows deviation
            {
                X: 0,
                Y: 0,
                Z: 0,
                W: 0
            },
            saturation_1: //post Midtones saturation
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            contrast_1: //post Midtones contrast
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gamma_1: //post Midtones gamma
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gain_1: //post Midtones gain
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            offset_1: //post Midtones deviation
            {
                X: 0,
                Y: 0,
                Z: 0,
                W: 0
            },
            saturation_2: //post's Hights saturation
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            contrast_2: //post's Highlights contrast
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gamma_2: //post Highlights gamma
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            gain_2: //post's Hights gain
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            offset_2: //post's Hights deviation
            {
                X: 0,
                Y: 0,
                Z: 0,
                W: 0
            },
            highlights_Min: 0.5,
            highlights_Max: 1,
            shadows_Max: 0.090000003576278687,
            method_0: "Lumen",
            indirect_Lighting_Color: //The lume color of the lumen of the post
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            indirect_Lighting_Intensity: 1,
            slope: 0.87999999523162842,
            toe: 0.55000001192092896,
            shoulder: 0.25999999046325684,
            black_Clip: 0,
            white_Clip: 0.039999999105930328,
            method_1: "Lumen",
            quality: 1,
            ray_Lighting_Mode: "Default",
            intensity_2: 100,
            quality_0: 50,
            max_Roughness: 0.60000002384185791,
            rayleigh_scattering: {
                X: 0.032341,
                Y: 0.094001,
                Z: 0.171875,
                W: 0
            }
        };
        this.DefaultDataRange = {};
    }
}
exports.DynamicWeatherModel = DynamicWeatherModel;
//# sourceMappingURL=DynamicWeatherModel.js.map