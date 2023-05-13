///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/16 11:45
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class DynamicWeatherModel extends BaseModel {
    constructor() {
        super()
        this.DefaultData = {
            id: "DynamicWeather_id",
            time: 12,
            UseConfiguration: true,
            configurationName: "surface_nocloud_1",
            IsArtDebugging: false, //art debug mode
            useCustomParameters: false, //Whether to use custom parameters (editor)
            sunTiltAngle: 15, //Sun Tilt Angle -90~90
            sunRotatAngle: 0, //sun rotation angle
            dawnTime: 6, //dawn time
            duskTime: 18, //Dusk time
            moonTiltAngle: 35, //Moon Tilt Angle
            moonRotatAngle: 15, //moon rotation angle
            moonRiseTilt: 1, //moon rise offset
            moonSize: 1.5, //Moon size
            moonRotat: 0, //moon rotation
            starsBrightness: 3, //star brightness
            starrySkyColor: //starry sky color
            {
                X: 0.66911697387695312,
                Y: 0.84460300207138062,
                Z: 1,
                W: 1
            },
            starrySkyMap: "Texture2D'/DynamicWeather/DynamicWeather/Textures/MoonStars/T_Stars02.T_Stars02'", //starry sky map
            moonPhases: 15, //Moon phase
            moonColor: //moon color
            {
                X: 0.52117300033569336,
                Y: 0.64791399240493774,
                Z: 1,
                W: 0
            },
            moonColorBrightness: 1.5, //Moon color intensity
            sunlightIntensity: 2.813291, //sunlight intensity
            sunlightColor: //sunlight color
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 0
            },
            colorTemperature: 8089.6924170000002, //color temperature
            moonlightIntensity: 3, //moonlight intensity
            moonlightColor: //moonlight color
            {
                X: 0.56889599561691284,
                Y: 0.6674569845199585,
                Z: 0.86458301544189453,
                W: 1
            },
            bottomHeight: 6.1890349999999996, //Height of the bottom of the cloud
            height: 20, //cloud height
            traceStartMaxDistance: 205.30192199999999, //The cloud tracing start maximum distance
            traceMaxDistance: 99.817544999999996, //The maximum distance for cloud tracing
            cloudCoverage: 0.58310399999999996, //cloud coverage
            cloudSize: 1.843432, //cloud size
            addCloudDetail: 1, //add cloud details 0~1
            cloudMigrationX: 0.760000000000000001, //custom cloud offset x
            cloudMigrationY: 0.504, //custom cloud offset y
            cloudWindSpeed: 0.20399999999999999, //cloud wind speed
            sunSize: 2, //Sun size
            solarColor: //sun color
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 0
            },
            solarColorIntensity: 10, //sun color intensity
            useMoonModel: true, //use the model moon
            skyModel: "StaticClouds", //sky model
            fogColor: //fog color
            {
                X: 0.44856798648834229,
                Y: 0.49368599057197571,
                Z: 0.54166698455810547,
                W: 1
            },
            fogDensity: 0.001, //fog density
            fogHeightAttenuation: 0.050000000000000003, //fog height attenuation
            hDR360Rotation: 0, //HDR cloud 360-degree rotation
            hDR360RotationSpeed: 0, //HDR cloud 360-degree rotation speed
            hDR_Brightness: 2, //HDR cloud brightness
            hDR_Desaturation: 0, //HDR cloud desaturation
            t_HDR_Night: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/satara_night_no_lamps_4k.satara_night_no_lamps_4k'", //HDR cloud night texture
            t_HDR_Sunrise: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/the_chalk_quarry_4k.the_chalk_quarry_4k'", //HDR cloud sunrise texture
            t_HDR_Day: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/kloofendal_48d_partly_cloudy_puresky_4k.kloofendal_48d_partly_cloudy_puresky_4k'", //HDR cloud daytime texture
            t_HDR_Dusk: "Texture2D'/DynamicWeather/DynamicWeather/Textures/HDR/kloppenheim_06_puresky_4k.kloppenheim_06_puresky_4k'", //HDR cloud dusk texture
            StaticCloudType: "LightCloud", //Static cloud type
            rainIntensity: 0, //Rain intensity
            snowIntensity: 0, //snow intensity
            waterColor: //water color
            {
                X: 0.29328098893165588,
                Y: 0.33123800158500671,
                Z: 0.40000000596046448,
                W: 0
            },
            water_rought: 0, //Rain smoothness
            lightRainPuddlesRainRippleSpeed: 30, //light rain_ puddle rain ripple speed
            lightRainPuddleRainRippleIntensity: 0.5, //light rain _ puddle rain ripple intensity
            lightRainPuddlesRainRippleSize: 2.5, //light rain_puddle rain ripple size
            heavyRainPuddlesRainPointSize: 0.10000000000000001, //heavy rain_puddle raindrop size
            endRainPuddleSlopeStrength: 0.5, //Rain stop_puddle slope strength
            endRainRainDisappearMaskSize: 0.01, //Rain stops_Rain disappears Mask size
            snowUVSize: 1, //Snow UV size
            snowMaskUVSize: 50, //Snow MaskUV size
            twoD_LessCloudy_Cloudy: false, //2D_Less Cloudy_Cloudy
            climate: "Cloudy", //climate
            lightningSpeed: 0.5, //lightning speed
            lightningIntervalTime: 0.0500000000000000003, //Lightning Interval Time
            lightningDuration: 0.900000000000000002, //Duration of lightning
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
            seasonalColorRandomness: 0.070000000000000007, //seasonal color randomness
            windSpeed: 1, //wind speed
            windStrength: 1, //wind strength
            vegetationWindSwayingHeight: 1, //The height of vegetation wind swaying
            windDirectionValue: 0, //wind direction
            climateWindStrength: 1, //climate wind strength
            skylightIntensity: 1, //skylight intensity
            daytime_Cubemap: "TextureCube'/OpenZIAPI/DynamicWeather/A_property_collect/Master_material/M_window/Texture/cubemap_1.cubemap_1'", //Cubemap during the day
            day_SkylightIntensity: 0.299999999999999999, //daytime skylight intensity
            night_Cubemap: "TextureCube'/OpenZIAPI/DynamicWeather/A_property_collect/Master_material/M_window/Texture/cubemap_1.cubemap_1'", //Night Cubemap
            night_SkylightIntensity: 0.40000000000000002, //Night skylight intensity
            rayleigh_Exponential: 2.598193883895874, //Rayleigh index distribution of sky atmosphere


            method: "BM_SOG", //post's bloom method
            intensity: 0.67500001192092896, //post's bloom intensity
            threshold: -1, //post's bloom threshold
            metering_Mode: "AEM_Histogram", //post exposure metering mode
            exposure_Compensation: 1, //post exposure exposure
            intensity_0: 0, //post's chromativ_aberration intensity
            start_Offset: 0, //start offset of post's chromativ_aberration
            shutter_Speed: 60, //post camera shutter speed
            ISO: 100, //post camera's iso
            Aperture: 4, //post camera aperture
            maximum_Aperture: 1.2000000476837158, //The minimum aperture speed of the post camera
            number_Of_Diaphragm_Blades: 5, //The number of aperture blades of the post camera
            contrast_Scale: 1, //post's Local_Exposure contrast scaling
            detail_Strength: 1, //The detail strength of Post's Local_Exposure
            blurred_Luminance_Blend: 0.60000002384185791, //post Local_Exposure blurred brightness blend
            blurred_Luminance_Kernel_Size_Percent: 50, //post's Local_Exposure's blurred brightness size percentage
            middle_Grey_Bias: 0, //The middle gray difference of Local_Exposure of post
            intensity_1: 1, //The intensity of Lens_Flares of the post
            tint: //post's Lens_Flares coloring
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            bokeh_Size: 3, //post Lens_Flares bokeh size
            threshold_0: 8, //post Lens_Flares threshold
            bokeh_Shape: "None", //post Lens_Flares bokeh shape
            vignette_Intensity: 0.40000000596046448, //post's Image_Effects vignette
            temperature_Type: "TEMP_WhiteBalance", //post Temperature color temperature mode
            temp: 6500, //post Temperature color temperature
            tint_0: 0, //post Temperature coloring
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
            highlights_Min: 0.5, //The minimum brightness of Post Highlights
            highlights_Max: 1, //The maximum brightness of Post Highlights
            shadows_Max: 0.090000003576278687, //The maximum shadow of Post Highlights
            method_0: "Lumen", //post's lumen mode
            indirect_Lighting_Color: //The lume color of the lumen of the post
            {
                X: 1,
                Y: 1,
                Z: 1,
                W: 1
            },
            indirect_Lighting_Intensity: 1, //The lume intensity of the lumen of the post
            slope: 0.87999999523162842, //post Movies slope
            toe: 0.55000001192092896, //post Movies toe
            shoulder: 0.25999999046325684, //post Movies shoulder
            black_Clip: 0, //The black part of the Post Movies
            white_Clip: 0.039999999105930328, //The white part of the Post Movies
            method_1: "Lumen", //reflection of post reflections
            quality: 1, //reflection quality of post reflections
            ray_Lighting_Mode: "Default", //post reflections light lighting mode
            intensity_2: 100, //post Ssr intensity
            quality_0: 50, //post Ssr quality
            max_Roughness: 0.60000002384185791, //The maximum roughness of the post's Ssr
            rayleigh_scattering: { //sky atmospheric color
                X: 0.032341,
                Y: 0.094001,
                Z: 0.171875,
                W: 0
            }
        }
        this.DefaultDataRange = {}
    }
}
