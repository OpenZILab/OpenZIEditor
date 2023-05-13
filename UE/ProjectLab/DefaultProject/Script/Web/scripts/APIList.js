///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2023/4/23 09:00
///

APIList = [
    {
        "name": "数字孪生体",
        "class": "DigitalTwin",
        "description": "数字孪生体",
        "category": "API|编辑器|数字孪生体",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新数字孪生体",
                "jsondata": {
                    "id": "DigitalTwin_id",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664",
                    "digitalTwinContent": ""
                }
            },
            {
                "function": "Add",
                "description": "添加数字孪生体",
                "jsondata": {
                    "id": "DigitalTwin_id",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664",
                    "digitalTwinContent": ""
                }
            },
            {
                "function": "ToggleTimeline",
                "description": "切换时间线",
                "jsondata": {
                    "id": "DigitalTwin_id",
                    "timeLine": "001",
                }
            },
            {
                "function": "Update",
                "description": "更新数字孪生体",
                "jsondata": {
                    "id": "DigitalTwin_id",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664",
                    "digitalTwinContent": ""
                }
            },
            {
                "function": "Delete",
                "description": "删除数字孪生体",
                "jsondata": {
                    "ids": ["DigitalTwin_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清空数字孪生体",
                "jsondata": {}
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["DigitalTwin_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["DigitalTwin_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {

                }
            },
            {
                "function": "GetTwinAPIList",
                "description": "获取数字孪生体所有接口",
                "jsondata": {
                    "type": "",
                }
            }
        ]
    },
    {
        "name": "预制体",
        "class": "Prefab",
        "description": "预制体",
        "category": "API|编辑器|预制体",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新预制体",
                "jsondata": {
                    "id": "Prefab_id",
                    "prefabType": "Prefab",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664"
                }
            },
            {
                "function": "Add",
                "description": "添加预制体",
                "jsondata": {
                    "id": "Prefab_id",
                    "prefabType": "Prefab",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664"
                }
            },
            {
                "function": "Update",
                "description": "更新预制体",
                "jsondata": {
                    "id": "Prefab_id",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664"
                }
            },
            {
                "function": "Delete",
                "description": "删除预制体",
                "jsondata": {
                    "ids": ["Prefab_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清空预制体",
                "jsondata": {}
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["Prefab_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["Prefab_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "自定义场景",
        "class": "SceneAPI",
        "description": "自定义场景操作",
        "category": "API|编辑器|自定义场景",
        "actions": [
            {
                "function": "ChangeScene",
                "description": "切换场景",
                "jsondata": {
                    "SceneName": "XX场景"
                }
            }
        ]
    },
    {
        "name": "网页",
        "class": "WebPage",
        "description": "网页",
        "category": "API|编辑器|网页",
        "actions": [
            {
                "function": "LoadWebPage",
                "description": "加载网页",
                "jsondata": {
                    "url": "www.baidu.com"
                }
            },
            {
                "function": "UnloadWebPage",
                "description": "卸载网页",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "坐标系",
        "class": "CoodinateConventer",
        "description": "API坐标系",
        "category": "API|数据|坐标系",
        "actions": [
            {
                "function": "Refresh",
                "description": "切换场景地板坐标系",
                "jsondata": {
                    "coordinateOrigin": "116.38980519225,39.916786010213,0.0",
                    "projectionCoordinateSystem": "EPSG:4544",
                    "planetShape": 1,
                    "GISType": 0,
                    "originOffset": "0,0,0",
                    "scale": 100
                }
            }
        ]
    },
    {
        "name": "关卡管理",
        "class": "Level",
        "description": "API/关卡管理",
        "category": "API|关卡|关卡管理",
        "actions": [
            {
                "function": "LoadLevel",
                "description": "关卡切换",
                "jsondata": {
                    "levelName": "GeoLevel",
                    "removeOthersLevel": false,
                    "bHidden": false
                }
            },
            {
                "function": "ShowLevel",
                "description": "关卡显隐",
                "jsondata": {
                    "levelName": "GeoLevel",
                    "bShow": false
                }
            }
        ]
    },
    {
        "name": "控制器管理",
        "class": "ChangePawn",
        "description": "控制器管理",
        "category": "API|交互|控制器|管理",
        "actions": [
            {
                "function": "ChangePawn",
                "description": "切换pawn",
                "jsondata": {
                    "pawn_path": "/OpenZIAPI/API/View/Pawn/NewPawn.NewPawn_C",
                    "generate_new": true,
                    "delete_old": false,
                    "location": "10000,0,7000"
                }
            },
            {
                "function": "ChangeDefaultPawn",
                "description": "切换默认Pawn",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "CesiumPawn管理",
        "class": "CesiumPawn",
        "description": "CesiumPawn管理",
        "category": "API|交互|控制器|CesiumPawn管理",
        "actions": [
            {
                "function": "SpawnObject",
                "description": "切换到CesiumPawn",
                "jsondata": {
                    "cameraMode": "rts",
                    "RedirectionOrigin": true,
                    "GISType": 0,
                    "coordinates": "116.38980519225,39.916786010213,0",
                    "pitch": -30,
                    "pitchRange": "-90,-15",
                    "yaw": 0,
                    "distance": 2000,
                    "distanceRange": "4,5000",
                    "autoRotate": true,
                    "autoRotateCountdown": 10,
                    "autoRotateDirection": -1,
                    "movementTime": 2,
                    "fov": 90,
                    "cameraCollision": false,
                    "shiftFactor": 1,
                    "zoomFactor": 0.2,
                    "twiddleFactor": 0.1,
                    "clickHighLight": true,
                    "clickInfos": true,
                    "enableDoubleclickFocus": false,
                    "buseDefaultDistance": false,
                    "doubleClickFocusDistance": 100
                }
            }
        ]
    },
    {
        "name": "Axes轴管理",
        "class": "AxesTool",
        "description": "Axes轴管理",
        "category": "API|交互|控制器|Axes轴",
        "actions": [
            {
                "function": "OpenAxesTool",
                "description": "开启Axes工具",
                "jsondata": {}
            },
            {
                "function": "CloseAxesTool",
                "description": "关闭Axes工具",
                "jsondata": {}
            },
            {
                "function": "SetAxesToolSelectMoth",
                "description": "设置Axes工具选中是否选中组件",
                "jsondata": {
                    "component": true
                }
            },
            {
                "function": "SetAxesSelectionOutline",
                "description": "设置Axes工具选中描边效果",
                "jsondata": {
                    "strength": 2,
                    "thickness": 2,
                    "selectionColor": "1,0,0,1",
                }
            }
        ]
    },
    {
        "name": "控制器操作",
        "class": "CesiumPawn",
        "description": "控制器操作",
        "category": "API|交互|控制器|操作",
        "actions": [
            {
                "function": "GetCameraInfo",
                "description": "获取控制器信息",
                "jsondata": {}
            },
            {
                "function": "SetCameraInfo",
                "displayName": "设置控制器信息_不重定向原点",
                "description": "设置控制器信息_不重定向原点",
                "jsondata": {
                    "cameraMode": "rts",
                    "RedirectionOrigin": false,
                    "GISType": 0,
                    "coordinates": "116.38980519225,39.916786010213,0.0",
                    "pitch": -30,
                    "pitchRange": "-90,-15",
                    "yaw": 0,
                    "distance": 2000,
                    "distanceRange": "4,5000",
                    "autoRotate": true,
                    "autoRotateCountdown": 10,
                    "autoRotateDirection": -1,
                    "movementTime": 1.5,
                    "fov": 90,
                    "cameraCollision": false,
                    "shiftFactor": 1,
                    "zoomFactor": 0.2,
                    "twiddleFactor": 0.1,
                    "clickHighLight": true,
                    "clickInfos": true,
                    "enableDoubleclickFocus": false,
                    "buseDefaultDistance": false,
                    "doubleClickFocusDistance": 100
                }
            },
            {
                "function": "SetCameraInfo",
                "displayName": "设置控制器信息_重定向原点",
                "description": "设置控制器信息_重定向原点",
                "jsondata": {
                    "cameraMode": "rts",
                    "RedirectionOrigin": true,
                    "GISType": 0,
                    "coordinates": "116.38980519225,39.916786010213,0.0",
                    "pitch": -30,
                    "pitchRange": "-90,-15",
                    "yaw": 0,
                    "distance": 2000,
                    "distanceRange": "4,5000",
                    "autoRotate": true,
                    "autoRotateCountdown": 10,
                    "autoRotateDirection": -1,
                    "movementTime": 1.5,
                    "fov": 90,
                    "cameraCollision": false,
                    "shiftFactor": 1,
                    "zoomFactor": 0.2,
                    "twiddleFactor": 0.1,
                    "clickHighLight": true,
                    "clickInfos": true,
                    "enableDoubleclickFocus": false,
                    "buseDefaultDistance": false,
                    "doubleClickFocusDistance": 100
                }
            }
        ]
    },
    {
        "name": "Cesium地形服务管理",
        "class": "CesiumTerrain",
        "description": "Cesium地形服务管理",
        "category": "API|Cesium|地形",
        "actions": [
            {
                "function": "Add",
                "description": "地形-添加",
                "jsondata": {
                    "id": "cesiumTerrain_id",
                    "sourceType": "CesiumIon",
                    "url": "",
                    "ion": 1,
                    "maximumScreenSpaceError": 16.0,
                    "preloadAncestors": true,
                    "preloadSiblings": true,
                    "forbidHoles": false,
                    "maximumSimultaneousTileLoads": 20,
                    "maximumCachedBytes": 256 * 1024 * 1024,
                    "loadingDescendantLimit": 20,
                    "enableFrustumCulling": true,
                    "enableFogCulling": true
                }
            },
            {
                "function": "Delete",
                "description": "地形-删除",
                "jsondata": {
                    "ids": ["cesiumTerrain_id"]
                }
            },
            {
                "function": "Clear",
                "description": "地形-清除",
                "jsondata": {}
            },
            {
                "function": "Show",
                "description": "地形-显示",
                "jsondata": {
                    "ids": ["cesiumTerrain_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "地形-隐藏",
                "jsondata": {
                    "ids": ["cesiumTerrain_id"],
                }
            },
            {
                "function": "Update",
                "description": "地形-更新",
                "jsondata": {
                    "id": "cesiumTerrain_id",
                    "sourceType": "CesiumIon",
                    "url": "",
                    "ion": 1,
                    "maximumScreenSpaceError": 16.0,
                    "preloadAncestors": true,
                    "preloadSiblings": true,
                    "forbidHoles": false,
                    "maximumSimultaneousTileLoads": 20,
                    "maximumCachedBytes": 256 * 1024 * 1024,
                    "loadingDescendantLimit": 20,
                    "enableFrustumCulling": true,
                    "enableFogCulling": true
                }
            },
            {
                "function": "GetAllCesiumTerrain",
                "description": "地形-获取所有地形",
                "jsondata": {
                }
            },
            {
                "function": "GetCesiumTerrainById",
                "description": "地形-通过Id获取地形",
                "jsondata": {
                    "id": "cesiumTerrain_id",
                }
            }
        ]
    },
    {
        "name": "Cesium影像服务管理",
        "class": "CesiumRasterOverlay",
        "description": "  Cesium影像服务管理",
        "category": "API|Cesium|影像",
        "actions": [
            {
                "function": "Add",
                "description": "影像-添加",
                "jsondata": {
                    "id": "cesiumOverlay_id",
                    "terrainId": "cesiumTerrain_id",
                    "type": "ION",
                    "url": "",
                    "ionAssetID": 3,
                    'ionAccessToken': "",
                    "bSpecifyZoomLevels": false,
                    "layers": "",
                    "tileWidth": 256,
                    "tileHeight": 256,
                    "minimumLevel": 0,
                    "maximumLevel": 14,
                    "materialLayerkey": "Overlay0",
                    "maximumScreenSpaceError": 2.0,
                    "maximumTextureSize": 2048,
                    "maximumSimultaneoustileloads": 20,
                    "subTileCacheBytes": 16 * 1024 * 1024
                }
            },
            {
                "function": "Delete",
                "description": "影像-删除",
                "jsondata": {
                    "ids": ["cesiumOverlay_id"]
                }
            },
            {
                "function": "Clear",
                "description": "影像-清除",
                "jsondata": {}
            },
            {
                "function": "Show",
                "description": "影像-显示",
                "jsondata": {
                    "ids": ["cesiumOverlay_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "影像-隐藏",
                "jsondata": {
                    "ids": ["cesiumOverlay_id"]
                }
            },
            {
                "function": "Update",
                "description": "影像-更新",
                "jsondata": {
                    "id": "cesiumOverlay_id",
                    "terrainId": "cesiumTerrain_id",
                    "type": "ION",
                    "url": "",
                    "ionAssetID": 2,
                    'ionAccessToken': "",
                    "bSpecifyZoomLevels": false,
                    "layers": "",
                    "tileWidth": 256,
                    "tileHeight": 256,
                    "minimumLevel": 0,
                    "maximumLevel": 14,
                    "materialLayerkey": "Overlay0",
                    "maximumScreenSpaceError": 2.0,
                    "maximumTextureSize": 2048,
                    "maximumsimultaneoustileloads": 20,
                    "subTileCacheBytes": 16 * 1024 * 1024
                }
            },
            {
                "function": "GetAllCesiumOverlay",
                "description": "影像-获取所有影像",
                "jsondata": {
                }
            },
            {
                "function": "GetCesiumOverlayById",
                "description": "影像-通过Id获取影像",
                "jsondata": {
                    "id": "cesiumOverlay_id",
                }
            }
        ]
    },
    {
        "name": "Cesium_3dTileset服务管理",
        "class": "Cesium3DTileset",
        "description": "Cesium_3dTileset服务管理",
        "category": "API|Cesium|3dTileset",
        "actions": [
            {
                "function": "Add",
                "description": "3dTileset-添加",
                "jsondata": {
                    "id": "cesium3DTileset_id",
                    "sourceType": "CesiumIon",
                    "url": "file:///D:/Data/OSGB/osgb/3dtiles.tileset.json",
                    "ion": 96188,
                    "maximumScreenSpaceError": 16.0,
                    "preloadAncestors": true,
                    "preloadSiblings": true,
                    "forbidHoles": false,
                    "maximumSimultaneousTileLoads": 20,
                    "maximumCachedBytes": 256 * 1024 * 1024,
                    "loadingDescendantLimit": 20,
                    "enableFrustumCulling": true,
                    "enableFogCulling": true
                }
            },
            {
                "function": "Delete",
                "description": "3dTileset-删除",
                "jsondata": {
                    "ids": ["cesium3DTileset_id"]
                }
            },
            {
                "function": "Clear",
                "description": "3dTileset-清除",
                "jsondata": {}
            },
            {
                "function": "Show",
                "description": "3dTileset-显示",
                "jsondata": {
                    "ids": ["cesium3DTileset_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "3dTileset-隐藏",
                "jsondata": {
                    "ids": ["cesium3DTileset_id"]
                }
            },
            {
                "function": "Update",
                "description": "3dTileset-更新",
                "jsondata": {
                    "id": "cesium3DTileset_id",
                    "sourceType": "CesiumIon",
                    "url": "file:///D:/Data/OSGB/osgb/3dtiles.tileset.json",
                    "ion": 96188,
                    "maximumScreenSpaceError": 16.0,
                    "preloadAncestors": true,
                    "preloadSiblings": true,
                    "forbidHoles": false,
                    "maximumSimultaneousTileLoads": 20,
                    "maximumCachedBytes": 256 * 1024 * 1024,
                    "loadingDescendantLimit": 20,
                    "enableFrustumCulling": true,
                    "enableFogCulling": true
                }
            },
            {
                "function": "GetAllCesium3DTileset",
                "description": "3dTileset-获取所有3DTileset",
                "jsondata": {
                }
            },
            {
                "function": "GetCesium3DTilesetById",
                "description": "3dTileset-通过Id获取3DTileset",
                "jsondata": {
                    "id": "cesium3DTileset_id",
                }
            }
        ]
    },
    {
        "name": "Cesium获取建筑信息",
        "class": "CesiumPawn",
        "description": "Cesium获取建筑信息",
        "category": "API|Cesium|控制器",
        "actions": [
            {
                "function": "SetOpenMetaData",
                "description": "通过点击鼠标中键获取Cesium建筑细节信息",
                "jsondata": {
                    "bOpenGetMetaData": true
                }
            }
        ]
    },
    {
        "name": "天气调节",
        "class": "CesiumSun",
        "description": "天气调节",
        "category": "API|环境|时间",
        "actions": [
            {
                "function": "UpdateDataTime",
                "description": "更新时间",
                "jsondata": {
                    "bAutoUpdateTimeZone": true,
                    "TimeZone": 8,
                    "Time": 8,
                    "Data": "2022/09/14"
                }
            }
        ]
    },
    {
        "name": "天气系统",
        "class": "DynamicWeather",
        "description": "天气系统",
        "category": "API|环境|天气系统",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "自定义添加或者更新天气系统",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "time": 12,
                    "UseConfiguration": true,
                    "configurationName": "surface_nocloud_1",
                    "IsArtDebugging": false,
                    "useCustomParameters": false,
                    "sunTiltAngle": 15,
                    "sunRotatAngle": 0,
                    "dawnTime": 6,
                    "duskTime": 18,
                    "moonTiltAngle": 35,
                    "moonRotatAngle": 15,
                    "moonRiseTilt": 1,
                    "moonSize": 1.5,
                    "moonRotat": 0,
                    "starsBrightness": 3,
                    "starrySkyColor": "0.6691169738769531,0.8446030020713806,1,1",
                    "starrySkyMap": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/MoonStars/T_Stars02.T_Stars02'",
                    "moonPhases": 15,
                    "moonColor": "0.5211730003356934,0.6479139924049377,1,0",
                    "moonColorBrightness": 1.5,
                    "sunlightIntensity": 4,
                    "sunlightColor": "1, 0.97344601154327393, 0.83879899978637695, 0",
                    "colorTemperature": 6500,
                    "moonlightIntensity": 3,
                    "moonlightColor": "0.5688959956169128,0.6674569845199585,0.8645830154418945,1",
                    "bottomHeight": 0,
                    "height": 20,
                    "traceStartMaxDistance": 350,
                    "traceMaxDistance": 100,
                    "cloudCoverage": 0.4,
                    "cloudSize": 1,
                    "addCloudDetail": 1,
                    "cloudMigrationX": 0,
                    "cloudMigrationY": 0,
                    "cloudWindSpeed": 0.1,
                    "sunSize": 2,
                    "solarColor": "1,1,1,0",
                    "solarColorIntensity": 10,
                    "useMoonModel": true,
                    "skyModel": "NoClouds",
                    "fogColor": "0.44699999690055847, 0.6380000114440918, 1, 1",
                    "fogDensity": 0,
                    "fogHeightAttenuation": 0.2,
                    "hDR360Rotation": 0,
                    "hDR360RotationSpeed": 0,
                    "hDR_Brightness": 2,
                    "hDR_Desaturation": 0,
                    "t_HDR_Night": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/satara_night_no_lamps_4k.satara_night_no_lamps_4k'",
                    "t_HDR_Sunrise": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/the_chalk_quarry_4k.the_chalk_quarry_4k'",
                    "t_HDR_Day": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/kloofendal_48d_partly_cloudy_puresky_4k.kloofendal_48d_partly_cloudy_puresky_4k'",
                    "t_HDR_Dusk": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/kloppenheim_06_puresky_4k.kloppenheim_06_puresky_4k'",
                    "StaticCloudType": "LightCloud",
                    "rainIntensity": 0,
                    "snowIntensity": 0,
                    "waterColor": "0.81955301761627197, 0.83556902408599854, 0.86458301544189453, 0",
                    "water_rought": 0,
                    "lightRainPuddlesRainRippleSpeed": 30,
                    "lightRainPuddleRainRippleIntensity": 0.5,
                    "lightRainPuddlesRainRippleSize": 2.5,
                    "heavyRainPuddlesRainPointSize": 0.1,
                    "endRainPuddleSlopeStrength": 0.5,
                    "endRainRainDisappearMaskSize": 0.01,
                    "snowUVSize": 1,
                    "snowMaskUVSize": 50,
                    "twoD_LessCloudy_Cloudy": false,
                    "climate": "NoCloud",
                    "lightningSpeed": 0.5,
                    "lightningIntervalTime": 0.05,
                    "lightningDuration": 0.9,
                    "springPlantColor": "3.451319932937622,5,0,1",
                    "autumnPlantColor": "10,1.5894420146942139,0,1",
                    "winterPlantWiltColor": "1,0.25732800364494324,0,0",
                    "winterGrassWitheredColor": "3,2.019474983215332,0.9527080059051514,0",
                    "seasonalColorRandomness": 0.07,
                    "windSpeed": 1,
                    "windStrength": 1,
                    "vegetationWindSwayingHeight": 1,
                    "windDirectionValue": 0,
                    "climateWindStrength": 1,
                    "skylightIntensity": 2,
                    "daytime_Cubemap": "TextureCube'/OpenZIAPI/DynamicWeather/A_property_collect/Master_material/M_window/Texture/cubemap_1.cubemap_1'",
                    "day_SkylightIntensity": 0.55200000000000005,
                    "night_Cubemap": "TextureCube'/OpenZIAPI/DynamicWeather/A_property_collect/Master_material/M_window/Texture/daylight3.daylight3'",
                    "night_SkylightIntensity": 5,
                    "rayleigh_Exponential": 8,
                    "method": "BM_SOG",
                    "intensity": 0.15,
                    "threshold": -1,
                    "metering_Mode": "AEM_Histogram",
                    "exposure_Compensation": 1,
                    "intensity_0": 1,
                    "start_Offset": 0,
                    "shutter_Speed": 60,
                    "iSO": 100,
                    "aperture": 4,
                    "maximum_Aperture": 1.2,
                    "number_Of_Diaphragm_Blades": 5,
                    "contrast_Scale": 1,
                    "detail_Strength": 1,
                    "blurred_Luminance_Blend": 0.6,
                    "blurred_Luminance_Kernel_Size_Percent": 50,
                    "middle_Grey_Bias": 0,
                    "intensity_1": 1,
                    "tint": "1,1,1,1",
                    "bokeh_Size": 3,
                    "threshold_0": 8,
                    "bokeh_Shape": "None",
                    "vignette_Intensity": 0.4,
                    "temperature_Type": "TEMP_WhiteBalance",
                    "temp": 6500,
                    "tint_0": 0,
                    "saturation": "1,1,1,1.2",
                    "contrast": "1,1,1,1",
                    "gamma": "1,1,1,1",
                    "gain": "1,1,1,1",
                    "offset": "0,0,0,0",
                    "saturation_0": "1,1,1,1",
                    "contrast_0": "1,1,1,1",
                    "gamma_0": "1,1,1,1",
                    "gain_0": "1,1,1,1",
                    "offset_0": "0,0,0,0",
                    "saturation_1": "1,1,1,1",
                    "contrast_1": "1,1,1,1",
                    "gamma_1": "1,1,1,1",
                    "gain_1": "1,1,1,1",
                    "offset_1": "0,0,0,0",
                    "saturation_2": "1,1,1,1",
                    "contrast_2": "1,1,1,1",
                    "gamma_2": "1,1,1,1",
                    "gain_2": "1,1,1,1",
                    "offset_2": "0,0,0,0",
                    "highlights_Min": 0.5,
                    "highlights_Max": 1,
                    "shadows_Max": 0.09,
                    "method_0": "Lumen",
                    "indirect_Lighting_Color": "1,1,1,1",
                    "indirect_Lighting_Intensity": 1,
                    "slope": 0.88,
                    "toe": 0.55,
                    "shoulder": 0.26,
                    "black_Clip": 0,
                    "white_Clip": 0.04,
                    "method_1": "Lumen",
                    "quality": 1,
                    "ray_Lighting_Mode": "Default",
                    "intensity_2": 100,
                    "quality_0": 50,
                    "max_Roughness": 0.6,
                    "rayleigh_scattering": "0.032341,0.094001,0.171875,0"
                }
            },
            {
                "function": "Add",
                "description": "自定义添加天气系统",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "time": 12,
                    "UseConfiguration": true,
                    "configurationName": "surface_nocloud_1",
                    "IsArtDebugging": false,
                    "useCustomParameters": false,
                    "sunTiltAngle": 15,
                    "sunRotatAngle": 0,
                    "dawnTime": 6,
                    "duskTime": 18,
                    "moonTiltAngle": 35,
                    "moonRotatAngle": 15,
                    "moonRiseTilt": 1,
                    "moonSize": 1.5,
                    "moonRotat": 0,
                    "starsBrightness": 3,
                    "starrySkyColor": "0.6691169738769531,0.8446030020713806,1,1",
                    "starrySkyMap": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/MoonStars/T_Stars02.T_Stars02'",
                    "moonPhases": 15,
                    "moonColor": "0.5211730003356934,0.6479139924049377,1,0",
                    "moonColorBrightness": 1.5,
                    "sunlightIntensity": 4,
                    "sunlightColor": "1, 0.97344601154327393, 0.83879899978637695, 0",
                    "colorTemperature": 6500,
                    "moonlightIntensity": 3,
                    "moonlightColor": "0.5688959956169128,0.6674569845199585,0.8645830154418945,1",
                    "bottomHeight": 0,
                    "height": 20,
                    "traceStartMaxDistance": 350,
                    "traceMaxDistance": 100,
                    "cloudCoverage": 0.4,
                    "cloudSize": 1,
                    "addCloudDetail": 1,
                    "cloudMigrationX": 0,
                    "cloudMigrationY": 0,
                    "cloudWindSpeed": 0.1,
                    "sunSize": 2,
                    "solarColor": "1,1,1,0",
                    "solarColorIntensity": 10,
                    "useMoonModel": true,
                    "skyModel": "NoClouds",
                    "fogColor": "0.44699999690055847, 0.6380000114440918, 1, 1",
                    "fogDensity": 0,
                    "fogHeightAttenuation": 0.2,
                    "hDR360Rotation": 0,
                    "hDR360RotationSpeed": 0,
                    "hDR_Brightness": 2,
                    "hDR_Desaturation": 0,
                    "t_HDR_Night": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/satara_night_no_lamps_4k.satara_night_no_lamps_4k'",
                    "t_HDR_Sunrise": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/the_chalk_quarry_4k.the_chalk_quarry_4k'",
                    "t_HDR_Day": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/kloofendal_48d_partly_cloudy_puresky_4k.kloofendal_48d_partly_cloudy_puresky_4k'",
                    "t_HDR_Dusk": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/kloppenheim_06_puresky_4k.kloppenheim_06_puresky_4k'",
                    "StaticCloudType": "LightCloud",
                    "rainIntensity": 0,
                    "snowIntensity": 0,
                    "waterColor": "0.81955301761627197, 0.83556902408599854, 0.86458301544189453, 0",
                    "water_rought": 0,
                    "lightRainPuddlesRainRippleSpeed": 30,
                    "lightRainPuddleRainRippleIntensity": 0.5,
                    "lightRainPuddlesRainRippleSize": 2.5,
                    "heavyRainPuddlesRainPointSize": 0.1,
                    "endRainPuddleSlopeStrength": 0.5,
                    "endRainRainDisappearMaskSize": 0.01,
                    "snowUVSize": 1,
                    "snowMaskUVSize": 50,
                    "twoD_LessCloudy_Cloudy": false,
                    "climate": "NoCloud",
                    "lightningSpeed": 0.5,
                    "lightningIntervalTime": 0.05,
                    "lightningDuration": 0.9,
                    "springPlantColor": "3.451319932937622,5,0,1",
                    "autumnPlantColor": "10,1.5894420146942139,0,1",
                    "winterPlantWiltColor": "1,0.25732800364494324,0,0",
                    "winterGrassWitheredColor": "3,2.019474983215332,0.9527080059051514,0",
                    "seasonalColorRandomness": 0.07,
                    "windSpeed": 1,
                    "windStrength": 1,
                    "vegetationWindSwayingHeight": 1,
                    "windDirectionValue": 0,
                    "climateWindStrength": 1,
                    "skylightIntensity": 2,
                    "daytime_Cubemap": "TextureCube'/DynamicWeather/DynamicWeather/A_property_collect/Master_material/M_window/Texture/cubemap_1.cubemap_1'",
                    "day_SkylightIntensity": 0.55200000000000005,
                    "night_Cubemap": "TextureCube'/DynamicWeather/DynamicWeather/A_property_collect/Master_material/M_window/Texture/daylight3.daylight3'",
                    "night_SkylightIntensity": 5,
                    "rayleigh_Exponential": 8,
                    "method": "BM_SOG",
                    "intensity": 0.15,
                    "threshold": -1,
                    "metering_Mode": "AEM_Histogram",
                    "exposure_Compensation": 1,
                    "intensity_0": 1,
                    "start_Offset": 0,
                    "shutter_Speed": 60,
                    "iSO": 100,
                    "aperture": 4,
                    "maximum_Aperture": 1.2,
                    "number_Of_Diaphragm_Blades": 5,
                    "contrast_Scale": 1,
                    "detail_Strength": 1,
                    "blurred_Luminance_Blend": 0.6,
                    "blurred_Luminance_Kernel_Size_Percent": 50,
                    "middle_Grey_Bias": 0,
                    "intensity_1": 1,
                    "tint": "1,1,1,1",
                    "bokeh_Size": 3,
                    "threshold_0": 8,
                    "bokeh_Shape": "None",
                    "vignette_Intensity": 0.4,
                    "temperature_Type": "TEMP_WhiteBalance",
                    "temp": 6500,
                    "tint_0": 0,
                    "saturation": "1,1,1,1.2",
                    "contrast": "1,1,1,1",
                    "gamma": "1,1,1,1",
                    "gain": "1,1,1,1",
                    "offset": "0,0,0,0",
                    "saturation_0": "1,1,1,1",
                    "contrast_0": "1,1,1,1",
                    "gamma_0": "1,1,1,1",
                    "gain_0": "1,1,1,1",
                    "offset_0": "0,0,0,0",
                    "saturation_1": "1,1,1,1",
                    "contrast_1": "1,1,1,1",
                    "gamma_1": "1,1,1,1",
                    "gain_1": "1,1,1,1",
                    "offset_1": "0,0,0,0",
                    "saturation_2": "1,1,1,1",
                    "contrast_2": "1,1,1,1",
                    "gamma_2": "1,1,1,1",
                    "gain_2": "1,1,1,1",
                    "offset_2": "0,0,0,0",
                    "highlights_Min": 0.5,
                    "highlights_Max": 1,
                    "shadows_Max": 0.09,
                    "method_0": "Lumen",
                    "indirect_Lighting_Color": "1,1,1,1",
                    "indirect_Lighting_Intensity": 1,
                    "slope": 0.88,
                    "toe": 0.55,
                    "shoulder": 0.26,
                    "black_Clip": 0,
                    "white_Clip": 0.04,
                    "method_1": "Lumen",
                    "quality": 1,
                    "ray_Lighting_Mode": "Default",
                    "intensity_2": 100,
                    "quality_0": 50,
                    "max_Roughness": 0.6,
                    "rayleigh_scattering": "0.032341,0.094001,0.171875,0"
                }
            },
            {
                "function": "Delete",
                "description": "删除天气系统",
                "jsondata": {
                    "ids": ["DynamicWeather_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除天气系统",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "自定义更新天气系统",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "time": 12,
                    "UseConfiguration": true,
                    "configurationName": "surface_nocloud_1",
                    "IsArtDebugging": false,
                    "useCustomParameters": false,
                    "sunTiltAngle": 15,
                    "sunRotatAngle": 0,
                    "dawnTime": 6,
                    "duskTime": 18,
                    "moonTiltAngle": 35,
                    "moonRotatAngle": 15,
                    "moonRiseTilt": 1,
                    "moonSize": 1.5,
                    "moonRotat": 0,
                    "starsBrightness": 3,
                    "starrySkyColor": "0.6691169738769531,0.8446030020713806,1,1",
                    "starrySkyMap": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/MoonStars/T_Stars02.T_Stars02'",
                    "moonPhases": 15,
                    "moonColor": "0.5211730003356934,0.6479139924049377,1,0",
                    "moonColorBrightness": 1.5,
                    "sunlightIntensity": 4,
                    "sunlightColor": "1, 0.97344601154327393, 0.83879899978637695, 0",
                    "colorTemperature": 6500,
                    "moonlightIntensity": 3,
                    "moonlightColor": "0.5688959956169128,0.6674569845199585,0.8645830154418945,1",
                    "bottomHeight": 0,
                    "height": 20,
                    "traceStartMaxDistance": 350,
                    "traceMaxDistance": 100,
                    "cloudCoverage": 0.4,
                    "cloudSize": 1,
                    "addCloudDetail": 1,
                    "cloudMigrationX": 0,
                    "cloudMigrationY": 0,
                    "cloudWindSpeed": 0.1,
                    "sunSize": 2,
                    "solarColor": "1,1,1,0",
                    "solarColorIntensity": 10,
                    "useMoonModel": true,
                    "skyModel": "NoClouds",
                    "fogColor": "0.44699999690055847, 0.6380000114440918, 1, 1",
                    "fogDensity": 0,
                    "fogHeightAttenuation": 0.2,
                    "hDR360Rotation": 0,
                    "hDR360RotationSpeed": 0,
                    "hDR_Brightness": 2,
                    "hDR_Desaturation": 0,
                    "t_HDR_Night": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/satara_night_no_lamps_4k.satara_night_no_lamps_4k'",
                    "t_HDR_Sunrise": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/the_chalk_quarry_4k.the_chalk_quarry_4k'",
                    "t_HDR_Day": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/kloofendal_48d_partly_cloudy_puresky_4k.kloofendal_48d_partly_cloudy_puresky_4k'",
                    "t_HDR_Dusk": "Texture2D'/DynamicWeather/DynamicWeather/DynamicWeather/Textures/HDR/kloppenheim_06_puresky_4k.kloppenheim_06_puresky_4k'",
                    "StaticCloudType": "LightCloud",
                    "rainIntensity": 0,
                    "snowIntensity": 0,
                    "waterColor": "0.81955301761627197, 0.83556902408599854, 0.86458301544189453, 0",
                    "water_rought": 0,
                    "lightRainPuddlesRainRippleSpeed": 30,
                    "lightRainPuddleRainRippleIntensity": 0.5,
                    "lightRainPuddlesRainRippleSize": 2.5,
                    "heavyRainPuddlesRainPointSize": 0.1,
                    "endRainPuddleSlopeStrength": 0.5,
                    "endRainRainDisappearMaskSize": 0.01,
                    "snowUVSize": 1,
                    "snowMaskUVSize": 50,
                    "twoD_LessCloudy_Cloudy": false,
                    "climate": "NoCloud",
                    "lightningSpeed": 0.5,
                    "lightningIntervalTime": 0.05,
                    "lightningDuration": 0.9,
                    "springPlantColor": "3.451319932937622,5,0,1",
                    "autumnPlantColor": "10,1.5894420146942139,0,1",
                    "winterPlantWiltColor": "1,0.25732800364494324,0,0",
                    "winterGrassWitheredColor": "3,2.019474983215332,0.9527080059051514,0",
                    "seasonalColorRandomness": 0.07,
                    "windSpeed": 1,
                    "windStrength": 1,
                    "vegetationWindSwayingHeight": 1,
                    "windDirectionValue": 0,
                    "climateWindStrength": 1,
                    "skylightIntensity": 2,
                    "daytime_Cubemap": "TextureCube'/DynamicWeather/DynamicWeather/A_property_collect/Master_material/M_window/Texture/cubemap_1.cubemap_1'",
                    "day_SkylightIntensity": 0.55200000000000005,
                    "night_Cubemap": "TextureCube'/DynamicWeather/DynamicWeather/A_property_collect/Master_material/M_window/Texture/daylight3.daylight3'",
                    "night_SkylightIntensity": 5,
                    "rayleigh_Exponential": 8,
                    "method": "BM_SOG",
                    "intensity": 0.15,
                    "threshold": -1,
                    "metering_Mode": "AEM_Histogram",
                    "exposure_Compensation": 1,
                    "intensity_0": 1,
                    "start_Offset": 0,
                    "shutter_Speed": 60,
                    "iSO": 100,
                    "aperture": 4,
                    "maximum_Aperture": 1.2,
                    "number_Of_Diaphragm_Blades": 5,
                    "contrast_Scale": 1,
                    "detail_Strength": 1,
                    "blurred_Luminance_Blend": 0.6,
                    "blurred_Luminance_Kernel_Size_Percent": 50,
                    "middle_Grey_Bias": 0,
                    "intensity_1": 1,
                    "tint": "1,1,1,1",
                    "bokeh_Size": 3,
                    "threshold_0": 8,
                    "bokeh_Shape": "None",
                    "vignette_Intensity": 0.4,
                    "temperature_Type": "TEMP_WhiteBalance",
                    "temp": 6500,
                    "tint_0": 0,
                    "saturation": "1,1,1,1.2",
                    "contrast": "1,1,1,1",
                    "gamma": "1,1,1,1",
                    "gain": "1,1,1,1",
                    "offset": "0,0,0,0",
                    "saturation_0": "1,1,1,1",
                    "contrast_0": "1,1,1,1",
                    "gamma_0": "1,1,1,1",
                    "gain_0": "1,1,1,1",
                    "offset_0": "0,0,0,0",
                    "saturation_1": "1,1,1,1",
                    "contrast_1": "1,1,1,1",
                    "gamma_1": "1,1,1,1",
                    "gain_1": "1,1,1,1",
                    "offset_1": "0,0,0,0",
                    "saturation_2": "1,1,1,1",
                    "contrast_2": "1,1,1,1",
                    "gamma_2": "1,1,1,1",
                    "gain_2": "1,1,1,1",
                    "offset_2": "0,0,0,0",
                    "highlights_Min": 0.5,
                    "highlights_Max": 1,
                    "shadows_Max": 0.09,
                    "method_0": "Lumen",
                    "indirect_Lighting_Color": "1,1,1,1",
                    "indirect_Lighting_Intensity": 1,
                    "slope": 0.88,
                    "toe": 0.55,
                    "shoulder": 0.26,
                    "black_Clip": 0,
                    "white_Clip": 0.04,
                    "method_1": "Lumen",
                    "quality": 1,
                    "ray_Lighting_Mode": "Default",
                    "intensity_2": 100,
                    "quality_0": 50,
                    "max_Roughness": 0.6,
                    "rayleigh_scattering": "0.032341,0.094001,0.171875,0"
                }
            },
            {
                "function": "ChangeHour",
                "description": "修改天气时间",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "time": 16
                }
            },
            {
                "function": "Auto24HourChange",
                "description": "24小时自动变换",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "DayVariation": 10,
                    "IsStartFormCurrentTime": true,
                    "IsLoop": false,
                }
            },
            {
                "function": "ChangeFourSeasons",
                "description": "季节切换",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "Seasons": 1,
                }
            },
            {
                "function": "ChangeClimate",
                "description": "气候切换",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "climate": 1,
                    "UseConfiguration": false,
                    "configurationName": "surface_sunny_1"
                }
            },
            {
                "function": "SaveSkyConfiguration",
                "description": "保存天气系统当前配置",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "configurationName": "customize_sunny"
                }
            },
            {
                "function": "LoadSkyConfiguration",
                "description": "加载天气系统配置",
                "jsondata": {
                    "id": "DynamicWeather_id",
                    "configurationName": "surface_sunny_1"
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["DynamicWeather_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["DynamicWeather_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "标绘点",
        "class": "DrawPoint",
        "description": "标绘点",
        "category": "API|标绘|常规|标绘点",
        "actions": [
            {
                "function": "StartDraw",
                "description": "开始绘制点",
                "jsondata": {
                    "id": "Draw_id1",
                    "pointColor": "1,0.1,0.1,1",
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            }
        ]
    },
    {
        "name": "标绘线",
        "class": "DrawLine",
        "description": "标绘线",
        "category": "API|标绘|常规|标绘线",
        "actions": [
            {
                "function": "StartDraw",
                "description": "开始绘制线",
                "jsondata": {
                    "id": "Draw_id2",
                    "pointColor": "1,0.1,0.1,1",
                    "lineColor": "0.15,1,0.33,0.4",
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            }
        ]
    },
    {
        "name": "标绘面",
        "class": "DrawPlane",
        "description": "标绘面",
        "category": "API|标绘|常规|标绘面",
        "actions": [
            {
                "function": "StartDraw",
                "description": "开始绘制面",
                "jsondata": {
                    "id": "Draw_id3",
                    "pointColor": "1,0.1,0.1,1",
                    "lineColor": "0.15,1,0.33,0.4",
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            }
        ]
    },
    {
        "name": "标绘",
        "class": "Draw",
        "description": "标绘",
        "category": "API|标绘|常规|标绘",
        "actions": [
            {
                "function": "EndAllDraw",
                "description": "结束绘制",
                "jsondata": {}
            },
            {
                "function": "DeleteDraw",
                "description": "删除标绘",
                "jsondata": {
                    "ids": ["Draw_id1"],
                    "drawType": "DrawPoint"
                }
            },
            {
                "function": "ClearAllDraw",
                "description": "清屏标绘",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "POI打点管理",
        "class": "POI",
        "description": "POI打点管理",
        "category": "API|标绘|高级|POI打点",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新POI点",
                "jsondata": {
                    "id": "poi_id",
                    "defaultStyle": "default",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664",
                    "bAutoHeight": true,
                    "poiAlwaysVisible": true,
                    "poiVisibleRange": "0,2000",
                    "imageType": 1,
                    "imageAddress": "Texture/Online.png",
                    "imageForceRefresh": false,
                    "imageSize": "44,45",
                    "imagePivot": "0.5,1",
                    "imageOffset": "0,0",
                    "labelImageType": 0,
                    "labelImageAddress": "",
                    "labelImageSize": "44,45",
                    "label": "poi title",
                    "labelFontName": "muyao",
                    "labelFontSize": 12,
                    "labelFontColor": "1,0,0,1",
                    "labelFontJustification": 0,
                    "labelBackgroundColor": "1,1,0,0.2",
                    "labelPivot": "0,0",
                    "labelOffset": "0,-0",
                    "labelAlwaysVisible": true,
                    "labelVisibleRange": "0,2000",
                    "focusDistance": 100,
                    "sendScreemCoordinates": false,
                    "tickTime": 0.1,
                    "autoMove": false,
                    "followerFromType": "OpticalFlowLine",
                    "followerFromId": "OpticalFlowLine_id"
                }
            },
            {
                "function": "Add",
                "description": "添加POI点",
                "jsondata": {
                    "id": "poi_id",
                    "defaultStyle": "default",
                    "GISType": 0,
                    "coordinates": "116.38983567822,39.917091354324,63.499998580664",
                    "bAutoHeight": true,
                    "poiAlwaysVisible": true,
                    "poiVisibleRange": "0,2000",
                    "imageType": 1,
                    "imageAddress": "Texture/Online.png",
                    "imageForceRefresh": false,
                    "imageSize": "44,45",
                    "imagePivot": "0.5,1",
                    "imageOffset": "0,0",
                    "labelImageType": 0,
                    "labelImageAddress": "",
                    "labelImageSize": "44,45",
                    "label": "poi title",
                    "labelFontName": "muyao",
                    "labelFontSize": 12,
                    "labelFontColor": "1,0,0,1",
                    "labelFontJustification": 0,
                    "labelBackgroundColor": "1,1,0,0.2",
                    "labelPivot": "0,0",
                    "labelOffset": "0,-0",
                    "labelAlwaysVisible": true,
                    "labelVisibleRange": "0,2000",
                    "focusDistance": 100,
                    "sendScreemCoordinates": false,
                    "tickTime": 0.1,
                    "autoMove": false,
                    "followerFromType": "OpticalFlowLine",
                    "followerFromId": "OpticalFlowLine_id"
                }
            },
            {
                "function": "Delete",
                "description": "删除POI点",
                "jsondata": {
                    "ids": ["poi_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清空POI点",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新POI点",
                "jsondata": {
                    "id": "poi_id",
                    "defaultStyle": "default",
                    "GISType": 0,
                    "coordinates": "116.38983340948,39.917091336792,63.499998580664",
                    "bAutoHeight": true,
                    "poiAlwaysVisible": true,
                    "poiVisibleRange": "0,2000",
                    "imageType": 0,
                    "imageAddress": "",
                    "imageForceRefresh": false,
                    "imageSize": "44,45",
                    "imagePivot": "0.5,1",
                    "imageOffset": "0,0",
                    "labelImageType": 0,
                    "labelImageAddress": "",
                    "labelImageSize": "44,45",
                    "label": "poi title",
                    "labelFontName": "muyao",
                    "labelFontSize": 12,
                    "labelFontColor": "1,1,0,1",
                    "labelFontJustification": 0,
                    "labelBackgroundColor": "1,0,0,0.2",
                    "labelPivot": "0.5,2",
                    "labelOffset": "0,-45",
                    "labelAlwaysVisible": true,
                    "labelVisibleRange": "0,1000",
                    "focusDistance": 100,
                    "sendScreemCoordinates": false,
                    "tickTime": 0.1,
                    "autoMove": false,
                    "followerFromType": "OpticalFlowLine",
                    "followerFromId": "OpticalFlowLine_id"
                }
            }, {
                "function": "Focus",
                "description": "聚焦POI点",
                "jsondata": {
                    "id": "poi_id",
                    "focusDistance": 100
                }
            },
            {
                "function": "Show",
                "description": "显示POI点",
                "jsondata": {
                    "ids": ["poi_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏POI点",
                "jsondata": {
                    "ids": ["poi_id"]
                }
            },
            {
                "function": "ScreenCoordinates",
                "description": "发送屏幕坐标",
                "jsondata": {
                    "id": "poi_id",
                    "sendScreemCoordinates": true,
                    "tickTime": 0.1
                }
            },
            {
                "function": "CloseAllScreenCoordinates",
                "description": "停止所有POI发送屏幕坐标",
                "jsondata": {
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "压平管理",
        "class": "Flatten",
        "description": "压平管理",
        "category": "API|分析|可视化|压平管理",
        "actions": [
            {
                "function": "Add",
                "description": "添加压平",
                "jsondata": {
                    "id": "Flatten_id"
                }
            },
            {
                "function": "Delete",
                "description": "删除压平",
                "jsondata": {
                    "ids": ["Flatten_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清空压平",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "挖坑管理",
        "class": "Trenching",
        "description": "挖坑管理",
        "category": "API|分析|可视化|挖坑管理",
        "actions": [
            {
                "function": "Add",
                "description": "添加挖坑",
                "jsondata": {
                    "id": "Trenching_id",
                    "depth": 500,
                    "SideMaterial": "Material'/OpenZIAPI/CesiumTools/Material/M_Side.M_Side'",
                    "ButtomMaterial": "Material'/OpenZIAPI/CesiumTools/Material/M_Buttom.M_Buttom'"
                }
            },
            {
                "function": "Delete",
                "description": "删除挖坑",
                "jsondata": {
                    "ids": ["Trenching_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清空挖坑",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "窗口管理",
        "class": "Window",
        "description": "窗口管理",
        "category": "API|标绘|高级|窗口管理",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新窗口",
                "jsondata": {
                    "id": "Window_id",
                    "GISType": 0,
                    "coordinates": "116.38983276671,39.91709085951,61",
                    "url": "https://www.baidu.com/",
                    "isVisible": true,
                    "size": "400,300",
                    "pivot": "0,0",
                    "offset": "0,0",
                    "showCloseButton": true,
                    "closeOffset": "0,0",
                    "autoMove": false,
                    "followerFromType": "OpticalFlowLine",
                    "followerFromId": "OpticalFlowLine_id"
                }
            },
            {
                "function": "Add",
                "description": "添加窗口",
                "jsondata": {
                    "id": "Window_id",
                    "GISType": 0,
                    "coordinates": "116.38983276671,39.91709085951,61",
                    "url": "https://www.baidu.com/",
                    "isVisible": true,
                    "size": "400,300",
                    "pivot": "0,0",
                    "offset": "0,0",
                    "showCloseButton": true,
                    "closeOffset": "0,0",
                    "autoMove": false,
                    "followerFromType": "OpticalFlowLine",
                    "followerFromId": "OpticalFlowLine_id"
                }
            },
            {
                "function": "Delete",
                "description": "删除窗口",
                "jsondata": {
                    "ids": ["Window_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除窗口",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新窗口",
                "jsondata": {
                    "id": "Window_id",
                    "GISType": 0,
                    "coordinates": "116.38983276671,39.91709085951,61",
                    "url": "https://www.bilibili.com/",
                    "isVisible": true,
                    "size": "600,400",
                    "pivot": "0,0.5",
                    "offset": "44,0",
                    "showCloseButton": true,
                    "closeOffset": "0,0",
                    "autoMove": false,
                    "followerFromType": "OpticalFlowLine",
                    "followerFromId": "OpticalFlowLine_id"
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["Window_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["Window_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "地理围栏",
        "class": "GeoFence",
        "description": "地理围栏",
        "category": "API|标绘|高级|地理围栏",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新地理围栏",
                "jsondata": {
                    "id": "GeoFence_id",
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"],
                    "height": 200,
                    "bottomVisible": true,
                    "FencewallColor": "0.5, 0.5, 1, 0.4",
                    "FencewallLineNumber": 5,
                    "FencebottomColor": "0, 1, 1, 0.5",
                    "FencewallUseCustomMaterial": false,
                    "FencewallMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst",
                    "FencebottomUseCustomMaterial": false,
                    "FencebottomMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst"
                }
            },
            {
                "function": "Add",
                "description": "添加地理围栏",
                "jsondata": {
                    "id": "GeoFence_id",
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"],
                    "height": 200,
                    "bottomVisible": true,
                    "FencewallColor": "0.5, 0.5, 1, 0.4",
                    "FencewallLineNumber": 5,
                    "FencebottomColor": "0, 1, 1, 0.5",
                    "FencewallUseCustomMaterial": false,
                    "FencewallMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst",
                    "FencebottomUseCustomMaterial": false,
                    "FencebottomMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst"
                }
            },
            {
                "function": "Delete",
                "description": "删除地理围栏",
                "jsondata": {
                    "ids": ["GeoFence_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除地理围栏",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新地理围栏",
                "jsondata": {
                    "id": "GeoFence_id",
                    "GISType": 0,
                    "coordinatesList": ["116.3898698249,39.91704842816,63.0", "116.38973993812,39.916965076791,63.0", "116.38982481766,39.917127770482,63.0", "116.38992599799,39.917219867035,63.0", "116.38993005391,39.917121333103,63.0", "116.39001931372,39.917201834279,63.0", "116.38997956213,39.917077263785,63.0"],
                    "height": 300,
                    "bottomVisible": true,
                    "FencewallColor": "1, 1, 0, 0.4",
                    "FencewallLineNumber": 5,
                    "FencebottomColor": "0.5, 0.5 , 1, 0.5",
                    "FencewallUseCustomMaterial": true,
                    "FencewallMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst",
                    "FencebottomUseCustomMaterial": true,
                    "FencebottomMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst"
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["GeoFence_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["GeoFence_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "三维叠加",
        "class": "GeoOverlay",
        "description": "三维叠加",
        "category": "API|标绘|高级|三维叠加",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新三维叠加",
                "jsondata": {
                    "id": "ColorBlock_id",
                    "GISType": 0,
                    "coordinatesList": ["116.38997188841,39.917134560149,63.5", "116.38986354368,39.917097311061,63.5", "116.38996064631,39.917024507784,63.5", "116.38972756563,39.917053616969,63.5", "116.38980041122,39.91709120628,63.5", "116.38973638709,39.917172468675,63.5", "116.3898559413,39.917153758961,63.5"],
                    "height": 200,
                    "fillColor": "1,0.5,0.5,0.8",
                    "OverlaywallUseCustomMaterial": false,
                    "OverlaywallMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst",
                    "OverlayTopUseCustomMaterial": false,
                    "OverlayTopMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst"
                }
            },
            {
                "function": "Add",
                "description": "添加三维叠加",
                "jsondata": {
                    "id": "ColorBlock_id",
                    "GISType": 0,
                    "coordinatesList": ["116.38997188841,39.917134560149,63.5", "116.38986354368,39.917097311061,63.5", "116.38996064631,39.917024507784,63.5", "116.38972756563,39.917053616969,63.5", "116.38980041122,39.91709120628,63.5", "116.38973638709,39.917172468675,63.5", "116.3898559413,39.917153758961,63.5"],
                    "height": 200,
                    "fillColor": "1,0.5,0.5,0.8",
                    "OverlaywallUseCustomMaterial": false,
                    "OverlaywallMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst",
                    "OverlayTopUseCustomMaterial": false,
                    "OverlayTopMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst"
                }
            },
            {
                "function": "Delete",
                "description": "删除三维叠加",
                "jsondata": {
                    "ids": ["ColorBlock_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除三维叠加",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新三维叠加",
                "jsondata": {
                    "id": "ColorBlock_id",
                    "GISType": 0,
                    "coordinatesList": ["116.38984745965,39.917008097341,62", "116.38974039971,39.917109913217,62", "116.38982677466,39.917177103322,62", "116.38992173593,39.917094902987,62"],
                    "height": 200,
                    "fillColor": "0.5,0.5,1,0.6",
                    "OverlaywallUseCustomMaterial": false,
                    "OverlaywallMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst",
                    "OverlayTopUseCustomMaterial": false,
                    "OverlayTopMaterial": "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst"
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["ColorBlock_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["ColorBlock_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "箭头线",
        "class": "OpticalFlowLine",
        "description": "箭头线",
        "category": "API|标绘|高级|箭头线",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新箭头线",
                "jsondata": {
                    "id": "OpticalFlowLine_id",
                    "GISType": 0,
                    "coordinatesList": ["116.3930063041683,39.91833893987431,63.5", "116.38896403800288,39.919380150710644,63.5", "116.38655531735544,39.91800037576311,63.5", "116.38615281804239,39.91440356136049,63.5"],
                    "loop": false,
                    "splinePointType": 1,
                    "meshDirection": 0,
                    "width": 50,
                    "style": 2,
                    "brightness": 1,
                    "baseColor": "1,0,0,1",
                    "tilling": 8000,
                    "speed": 1,
                    "isOpenStroke": false,
                    "baseOpacity": 1,
                    "strokeWidth": 0,
                    "moveChildActor": false,
                    "timeRate": 1
                }
            },
            {
                "function": "Add",
                "description": "添加箭头线",
                "jsondata": {
                    "id": "OpticalFlowLine_id",
                    "GISType": 0,
                    "coordinatesList": ["116.3930063041683,39.91833893987431,63.5", "116.38896403800288,39.919380150710644,63.5", "116.38655531735544,39.91800037576311,63.5", "116.38615281804239,39.91440356136049,63.5"],
                    "loop": false,
                    "splinePointType": 1,
                    "meshDirection": 0,
                    "width": 50,
                    "style": 2,
                    "brightness": 1,
                    "baseColor": "1,0,0,1",
                    "tilling": 8000,
                    "speed": 1,
                    "isOpenStroke": false,
                    "baseOpacity": 1,
                    "strokeWidth": 0,
                    "moveChildActor": false,
                    "timeRate": 1
                }
            },
            {
                "function": "Delete",
                "description": "删除箭头线",
                "jsondata": {
                    "ids": ["OpticalFlowLine_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除箭头线",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新箭头线",
                "jsondata": {
                    "id": "OpticalFlowLine_id",
                    "GISType": 0,
                    "coordinatesList": ["116.3930063041683,39.91833893987431,63.5", "116.38896403800288,39.919380150710644,63.5", "116.38655531735544,39.91800037576311,63.5", "116.38615281804239,39.91440356136049,63.5"],
                    "loop": true,
                    "splinePointType": 1,
                    "meshDirection": 0,
                    "width": 100,
                    "style": 2,
                    "brightness": 50,
                    "baseColor": "1,1,0,1",
                    "tilling": 30000,
                    "speed": 0.5,
                    "isOpenStroke": false,
                    "baseOpacity": 1,
                    "strokeWidth": 0,
                    "moveChildActor": true,
                    "timeRate": 1
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["OpticalFlowLine_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["OpticalFlowLine_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "光流线",
        "class": "LightEffectFlowLine",
        "description": "光流线",
        "category": "API|标绘|高级|光流线",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新光流线",
                "jsondata": {
                    "id": "LightEffectFlowLine_id",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.39414548327954,39.91875746547046,63",
                        "116.39312217286418,39.919460881757416,63",
                        "116.39172233827637,39.91996449307006,63",
                        "116.39010153545644,39.920136474576935,63",
                        "116.38889840757727,39.92015537365833,63",
                        "116.38780866208032,39.91995552218939,63",
                        "116.38745681112292,39.91946913304699,63",
                        "116.38712185401018,39.919030970731974,63",
                        "116.38683035966918,39.91828441572232,63",
                        "116.38660423674543,39.91730765418114,63",
                        "116.3865508621549,39.915997165537945,63",
                        "116.38770131516696,39.914442085478505,63",
                        "116.3892747457393,39.9137731788525,63",
                        "116.39119800814954,39.91351477730463,63",
                        "116.39266408927088,39.913663792564854,63",
                        "116.39375054624938,39.914787472355634,63",
                        "116.39308775278595,39.91636786658868,63",
                        "116.39150090787754,39.91750248857527,63",
                        "116.39001662381074,39.9177391543777,63",
                        "116.38854697554201,39.91774096760977,63",
                        "116.38780371732304,39.91719579106268,63",
                        "116.38720825947654,39.916360933801315,63",
                        "116.38662653439448,39.91499933124664,63",
                        "116.3855979000234,39.914277410512355,63",
                        "116.38453770122429,39.91498513029167,63",
                        "116.3841967270234,39.91604934321027,63",
                        "116.3844118471182,39.91725337217975,63",
                        "116.38480795535062,39.91886280652889,63",
                        "116.38536344891239,39.92022730232914,63",
                    ],
                    "loop": false,
                    "splinePointType": 1,
                    "lineColor": "1, 0.553527, 0.114583, 1",
                    "lineGlow": 30,
                    "lineRadius": 4,
                    "flowNumber": 2,
                    "flowColor": "1, 0.553527, 0.114583, 1",
                    "flowScale": 60,
                    "flowRate": 1,
                    "lifeTime": 5
                }
            },
            {
                "function": "Add",
                "description": "添加光流线",
                "jsondata": {
                    "id": "LightEffectFlowLine_id",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.39414548327954,39.91875746547046,63",
                        "116.39312217286418,39.919460881757416,63",
                        "116.39172233827637,39.91996449307006,63",
                        "116.39010153545644,39.920136474576935,63",
                        "116.38889840757727,39.92015537365833,63",
                        "116.38780866208032,39.91995552218939,63",
                        "116.38745681112292,39.91946913304699,63",
                        "116.38712185401018,39.919030970731974,63",
                        "116.38683035966918,39.91828441572232,63",
                        "116.38660423674543,39.91730765418114,63",
                        "116.3865508621549,39.915997165537945,63",
                        "116.38770131516696,39.914442085478505,63",
                        "116.3892747457393,39.9137731788525,63",
                        "116.39119800814954,39.91351477730463,63",
                        "116.39266408927088,39.913663792564854,63",
                        "116.39375054624938,39.914787472355634,63",
                        "116.39308775278595,39.91636786658868,63",
                        "116.39150090787754,39.91750248857527,63",
                        "116.39001662381074,39.9177391543777,63",
                        "116.38854697554201,39.91774096760977,63",
                        "116.38780371732304,39.91719579106268,63",
                        "116.38720825947654,39.916360933801315,63",
                        "116.38662653439448,39.91499933124664,63",
                        "116.3855979000234,39.914277410512355,63",
                        "116.38453770122429,39.91498513029167,63",
                        "116.3841967270234,39.91604934321027,63",
                        "116.3844118471182,39.91725337217975,63",
                        "116.38480795535062,39.91886280652889,63",
                        "116.38536344891239,39.92022730232914,63",
                    ],
                    "loop": false,
                    "splinePointType": 1,
                    "lineColor": "1, 0.553527, 0.114583, 1",
                    "lineGlow": 30,
                    "lineRadius": 4,
                    "flowNumber": 2,
                    "flowColor": "1, 0.553527, 0.114583, 1",
                    "flowScale": 60,
                    "flowRate": 1,
                    "lifeTime": 5
                }
            },
            {
                "function": "Delete",
                "description": "删除光流线",
                "jsondata": {
                    "ids": ["LightEffectFlowLine_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除光流线",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新光流线",
                "jsondata": {
                    "id": "LightEffectFlowLine_id",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.39414548327954,39.91875746547046,63",
                        "116.39312217286418,39.919460881757416,63",
                        "116.39172233827637,39.91996449307006,63",
                        "116.39010153545644,39.920136474576935,63",
                        "116.38889840757727,39.92015537365833,63",
                        "116.38780866208032,39.91995552218939,63",
                        "116.38745681112292,39.91946913304699,63",
                        "116.38712185401018,39.919030970731974,63",
                        "116.38683035966918,39.91828441572232,63",
                        "116.38660423674543,39.91730765418114,63",
                        "116.3865508621549,39.915997165537945,63",
                        "116.38770131516696,39.914442085478505,63",
                        "116.3892747457393,39.9137731788525,63",
                        "116.39119800814954,39.91351477730463,63",
                        "116.39266408927088,39.913663792564854,63",
                        "116.39375054624938,39.914787472355634,63",
                        "116.39308775278595,39.91636786658868,63",
                        "116.39150090787754,39.91750248857527,63",
                        "116.39001662381074,39.9177391543777,63",
                        "116.38854697554201,39.91774096760977,63",
                        "116.38780371732304,39.91719579106268,63",
                        "116.38720825947654,39.916360933801315,63",
                        "116.38662653439448,39.91499933124664,63",
                        "116.3855979000234,39.914277410512355,63",
                        "116.38453770122429,39.91498513029167,63",
                        "116.3841967270234,39.91604934321027,63",
                        "116.3844118471182,39.91725337217975,63",
                        "116.38480795535062,39.91886280652889,63",
                        "116.38536344891239,39.92022730232914,63",
                    ],
                    "loop": false,
                    "splinePointType": 1,
                    "lineColor": "1, 0.553527, 0.114583, 1",
                    "lineGlow": 20,
                    "lineRadius": 1,
                    "flowNumber": 8,
                    "flowColor": "1, 0.553527, 0.114583, 1",
                    "flowScale": 40,
                    "flowRate": 0.5,
                    "lifeTime": 0.1
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["LightEffectFlowLine_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["LightEffectFlowLine_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "OD线",
        "class": "OriginDestinationLine",
        "description": "OD线",
        "category": "API|标绘|高级|OD线",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新OD线",
                "jsondata": {
                    "id": "OriginDestinationLine_id",
                    "GISType": 0,
                    "start": "116.38523648624017,39.92164128241577,62.0",
                    "end": "116.39425393655655,39.91212139809042,62.0",
                    "middleHeight": 20000,
                    "lineColor": "1, 0, 0, 1",
                    "lineGlow": 2,
                    "lineRadius": 1,
                    "flowColor": "0, 1, 0, 1",
                    "flowScale": 40,
                    "flowRate": 0.5
                }
            },
            {
                "function": "Add",
                "description": "添加OD线",
                "jsondata": {
                    "id": "OriginDestinationLine_id",
                    "GISType": 0,
                    "start": "116.38523648624017,39.92164128241577,62.0",
                    "end": "116.39425393655655,39.91212139809042,62.0",
                    "middleHeight": 20000,
                    "lineColor": "1, 0, 0, 1",
                    "lineGlow": 2,
                    "lineRadius": 1,
                    "flowColor": "0, 1, 0, 1",
                    "flowScale": 40,
                    "flowRate": 0.5
                }
            },
            {
                "function": "Delete",
                "description": "删除OD线",
                "jsondata": {
                    "ids": ["OriginDestinationLine_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除OD线",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新OD线",
                "jsondata": {
                    "id": "OriginDestinationLine_id",
                    "GISType": 0,
                    "start": "116.38523648624017,39.92164128241577,62.0",
                    "end": "116.39425393655655,39.91212139809042,62.0",
                    "middleHeight": 20000,
                    "lineColor": "1, 0, 0, 1",
                    "lineGlow": 2,
                    "lineRadius": 1,
                    "flowColor": "0, 0, 1, 1",
                    "flowScale": 60,
                    "flowRate": 1
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["OriginDestinationLine_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["OriginDestinationLine_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "报警/预警点位",
        "class": "AlarmAnchor",
        "description": "报警/预警点位",
        "category": "API|标绘|高级|预警点位",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新报警/预警",
                "jsondata": {
                    "id": "AlarmAnchor_id",
                    "GISType": 0,
                    "coordinates": "116.38983397388103,39.916755239741065,61",
                    "checkFloor": false,
                    "isAutoScale": false,
                    "scale": 1,
                    "customStyle": false,
                    "meshStyle": "/Engine/EditorMeshes/ColorCalibrator/SM_ColorCalibrator.SM_ColorCalibrator",
                    "focusDistance": 10,
                    "sendScreemCoordinates": false,
                    "tickTime": 0
                }
            },
            {
                "function": "Add",
                "description": "添加报警/预警",
                "jsondata": {
                    "id": "AlarmAnchor_id",
                    "GISType": 0,
                    "coordinates": "116.38983397388103,39.916755239741065,61",
                    "checkFloor": false,
                    "isAutoScale": false,
                    "scale": 1,
                    "customStyle": false,
                    "meshStyle": "/Engine/EditorMeshes/ColorCalibrator/SM_ColorCalibrator.SM_ColorCalibrator",
                    "focusDistance": 10,
                    "sendScreemCoordinates": false,
                    "tickTime": 0
                }
            },
            {
                "function": "Delete",
                "description": "删除报警/预警",
                "jsondata": {
                    "ids": ["AlarmAnchor_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除报警/预警",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新报警/预警",
                "jsondata": {
                    "id": "AlarmAnchor_id",
                    "GISType": 0,
                    "coordinates": "116.38990301598,39.917019389506,62",
                    "checkFloor": false,
                    "isAutoScale": false,
                    "scale": 1,
                    "customStyle": false,
                    "meshStyle": "/Engine/EditorMeshes/ColorCalibrator/SM_ColorCalibrator.SM_ColorCalibrator",
                    "focusDistance": 500,
                    "sendScreemCoordinates": false,
                    "tickTime": 0
                }
            },
            {
                "function": "Focus",
                "description": "聚焦报警预警点位",
                "jsondata": {
                    "id": "AlarmAnchor_id",
                    "focusDistance": 10
                }
            },
            {
                "function": "ScreenCoordinates",
                "description": "发送屏幕坐标",
                "jsondata": {
                    "id": "AlarmAnchor_id",
                    "sendScreemCoordinates": true,
                    "tickTime": 0.1
                }
            },
            {
                "function": "CloseAllScreenCoordinates",
                "description": "停止所有报警点位发送屏幕坐标",
                "jsondata": {
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["AlarmAnchor_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["AlarmAnchor_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "屏幕坐标",
        "class": "ScreenCoordinates",
        "description": "屏幕坐标",
        "category": "API|标绘|高级|屏幕坐标",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新屏幕坐标",
                "jsondata": {
                    "id": "WebPoi_id",
                    "GISType": 0,
                    "coordinates": "116.3898610252833,39.9167791795993,62.0",
                    "tickTime": 0,
                    "isOnce": false
                }
            },
            {
                "function": "Add",
                "description": "添加屏幕坐标",
                "jsondata": {
                    "id": "WebPoi_id",
                    "GISType": 0,
                    "coordinates": "116.3898610252833,39.9167791795993,62.0",
                    "tickTime": 0,
                    "isOnce": false
                }
            },
            {
                "function": "Delete",
                "description": "删除屏幕坐标",
                "jsondata": {
                    "ids": ["WebPoi_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除屏幕坐标",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新屏幕坐标",
                "jsondata": {
                    "id": "WebPoi_id",
                    "GISType": 0,
                    "coordinates": "116.38983350077,39.917091807318,63.4999999664724",
                    "tickTime": 1,
                    "isOnce": false
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["WebPoi_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["WebPoi_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "测量坐标点",
        "class": "MeasureCoordinates",
        "description": "测量坐标点",
        "category": "API|分析|测量|坐标",
        "actions": [
            {
                "function": "StartMeasure",
                "description": "测量坐标点",
                "jsondata": {
                    "id": "Measure_id1",
                    "pointColor": "1,0.1,0.1,1",
                    "MinDistance": 100000,
                    "MaxDistance": 1000000,
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            }
        ]
    },
    {
        "name": "测量距离",
        "class": "MeasureDistance",
        "description": "测量距离",
        "category": "API|分析|测量|距离",
        "actions": [
            {
                "function": "StartMeasure",
                "displayName": "测量水平距离",
                "description": "测量水平距离",
                "jsondata": {
                    "id": "Measure_id2",
                    "measureType": 1,
                    "pointColor": "1,0.1,0.1,1",
                    "lineColor": "0.15,1,0.33,0.4",
                    "MinDistance": 100000,
                    "MaxDistance": 1000000,
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            },
            {
                "function": "StartMeasure",
                "displayName": "测量高度",
                "description": "测量高度",
                "jsondata": {
                    "id": "Measure_id3",
                    "measureType": 2,
                    "pointColor": "1,0.1,0.1,1",
                    "lineColor": "0.15,1,0.33,0.4",
                    "MinDistance": 100000,
                    "MaxDistance": 1000000,
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            },
            {
                "function": "StartMeasure",
                "displayName": "测量直线距离",
                "description": "测量直线距离",
                "jsondata": {
                    "id": "Measure_id4",
                    "measureType": 3,
                    "pointColor": "1,0.1,0.1,1",
                    "lineColor": "0.15,1,0.33,0.4",
                    "MinDistance": 100000,
                    "MaxDistance": 1000000,
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            }
        ]
    },
    {
        "name": "测量面积",
        "class": "MeasureArea",
        "description": "测量面积",
        "category": "API|分析|测量|面积",
        "actions": [
            {
                "function": "StartMeasure",
                "description": "测量面积",
                "jsondata": {
                    "id": "Measure_id5",
                    "pointColor": "1,0.1,0.1,1",
                    "lineColor": "0.15,1,0.33,0.4",
                    "MinDistance": 100000,
                    "MaxDistance": 1000000,
                    "isAuto": false,
                    "GISType": 0,
                    "coordinatesList": ["116.3898634684696,39.916781862316796,61.26", "116.38981574879664,39.91678419254912,61.26", "116.38980658857776,39.916731975154484,61.26", "116.38987688276214,39.91672277307296,61.26"]
                }
            }
        ]
    },
    {
        "name": "测量",
        "class": "Measure",
        "description": "测量",
        "category": "API|分析|测量|测量",
        "actions": [
            {
                "function": "EndMeasure",
                "description": "结束测量",
                "jsondata": {}
            },
            {
                "function": "DeleteMeasure",
                "description": "删除测量",
                "jsondata": {
                    "ids": ["Measure_id1"],
                    "measureType": "MeasureCoordinates",
                }
            },
            {
                "function": "ClearMeasure",
                "description": "清屏测量",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "API管理",
        "class": "APIManager",
        "description": "API管理",
        "category": "API|其他|API管理",
        "actions": [
            {
                "function": "ClearAllAPI",
                "description": "清空所有API",
                "jsondata": {

                }
            }, {
                "function": "ClearAPIByType",
                "description": "清空对应类型API",
                "jsondata": {
                    "apiType": "Scene",
                }
            }
        ]
    },
    {
        "name": "控制台指令",
        "class": "Console",
        "description": "控制台指令",
        "category": "API|其他|控制台指令",
        "actions": [
            {
                "function": "Console",
                "description": "控制台指令",
                "jsondata": {
                    "Command": "stat fps"
                }
            }
        ]
    },
    {
        "name": "镜头漫游",
        "class": "SceneViewing",
        "description": "镜头漫游",
        "category": "API|分析|可视化|镜头漫游",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新镜头漫游",
                "jsondata": {
                    "id": "SceneViewing_id",
                    "GISType": 0,
                    "pointsInfoList": [
                        {
                            "coordinates": "116.3676545551892,39.918988830202764,517.6380670648159",
                            "lensRotation": "-21.26492309570312,-1.7966918945312491,0",
                            "point_type": 4,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.36813253405793,39.919441964636675,503.52820497079045",
                            "lensRotation": "-27.818603515624996,13.315539360046388,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.3719426812221,39.92071745914556,365.5552311060498",
                            "lensRotation": "-34.817932128906264,37.28853225708009,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37615919141905,39.920716760020106,254.3931441178358",
                            "lensRotation": "-34.81793212890624,60.77695083618164,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37916663971858,39.91811784784391,165.78857690650008",
                            "lensRotation": "-40.01910400390623,165.5058898925781,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37805414442042,39.91508312619519,241.06199394838788",
                            "lensRotation": "-38.41116333007815,-152.84829711914065,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        }
                    ],
                    "speed": 8000,
                    "isUsedPointsInfo": true,
                    "isUsedLensRotation": true,
                    "defaultPointsType": 1,
                    "isLoopPlay": false,
                    "isEndToEnd": false,
                    "isShowPointCamera": true,
                    "isShowSplineMesh": true,
                    "isPlaying": false
                }
            },
            {
                "function": "Add",
                "description": "添加镜头漫游",
                "jsondata": {
                    "id": "SceneViewing_id",
                    "GISType": 0,
                    "pointsInfoList": [
                        {
                            "coordinates": "116.3676545551892,39.918988830202764,517.6380670648159",
                            "lensRotation": "-21.26492309570312,-1.7966918945312491,0",
                            "point_type": 4,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.36813253405793,39.919441964636675,503.52820497079045",
                            "lensRotation": "-27.818603515624996,13.315539360046388,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.3719426812221,39.92071745914556,365.5552311060498",
                            "lensRotation": "-34.817932128906264,37.28853225708009,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37615919141905,39.920716760020106,254.3931441178358",
                            "lensRotation": "-34.81793212890624,60.77695083618164,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37916663971858,39.91811784784391,165.78857690650008",
                            "lensRotation": "-40.01910400390623,165.5058898925781,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37805414442042,39.91508312619519,241.06199394838788",
                            "lensRotation": "-38.41116333007815,-152.84829711914065,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        }
                    ],
                    "speed": 8000,
                    "isUsedPointsInfo": true,
                    "isUsedLensRotation": true,
                    "defaultPointsType": 1,
                    "isLoopPlay": false,
                    "isEndToEnd": false,
                    "isShowPointCamera": true,
                    "isShowSplineMesh": true,
                    "isPlaying": false
                }
            },
            {
                "function": "Delete",
                "description": "删除镜头漫游",
                "jsondata": {
                    "ids": ["SceneViewing_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除镜头漫游",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新镜头漫游",
                "jsondata": {
                    "id": "SceneViewing_id",
                    "GISType": 0,
                    "pointsInfoList": [
                        {
                            "coordinates": "116.3676545551892,39.918988830202764,517.6380670648159",
                            "lensRotation": "-21.26492309570312,-1.7966918945312491,0",
                            "point_type": 4,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.36813253405793,39.919441964636675,503.52820497079045",
                            "lensRotation": "-27.818603515624996,13.315539360046388,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.3719426812221,39.92071745914556,365.5552311060498",
                            "lensRotation": "-34.817932128906264,37.28853225708009,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37615919141905,39.920716760020106,254.3931441178358",
                            "lensRotation": "-34.81793212890624,60.77695083618164,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37916663971858,39.91811784784391,165.78857690650008",
                            "lensRotation": "-40.01910400390623,165.5058898925781,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        },
                        {
                            "coordinates": "116.37805414442042,39.91508312619519,241.06199394838788",
                            "lensRotation": "-38.41116333007815,-152.84829711914065,0",
                            "point_type": 1,
                            "arriveTangent": "0,0,0",
                            "leaveTangent": "0,0,0"
                        }
                    ],
                    "speed": 8000,
                    "isUsedPointsInfo": true,
                    "isUsedLensRotation": true,
                    "defaultPointsType": 1,
                    "isLoopPlay": true,
                    "isEndToEnd": true,
                    "isShowPointCamera": true,
                    "isShowSplineMesh": true,
                    "isPlaying": false
                }
            },
            {
                "function": "StartAddScenePoint",
                "description": "开始添加镜头点",
                "jsondata": {
                    "id": "SceneViewing_id"
                }
            },
            {
                "function": "EndAddScenePoint",
                "description": "结束添加镜头点",
                "jsondata": {
                    "id": "SceneViewing_id"
                }
            },
            {
                "function": "StartPlay",
                "description": "开始播放",
                "jsondata": {
                    "id": "SceneViewing_id"
                }
            },
            {
                "function": "StopPlay",
                "description": "结束播放",
                "jsondata": {
                    "id": "SceneViewing_id"
                }
            },
            {
                "function": "HiddenCameraMesh",
                "description": "显示/隐藏镜头点物体",
                "jsondata": {
                    "id": "SceneViewing_id",
                    "IsHidden": false
                }
            },
            {
                "function": "HiddenSplineMesh",
                "description": "显示/隐藏路径线",
                "jsondata": {
                    "id": "SceneViewing_id",
                    "IsHidden": false
                }
            },
            {
                "function": "GetSceneViewingInfos",
                "description": "获取漫游镜头信息",
                "jsondata": {
                    "id": "SceneViewing_id"
                }
            },
            {
                "function": "HiddenAllSceneViewing",
                "description": "显示/隐藏场景里面所有的镜头漫游",
                "jsondata": {
                    "HiddenAll": false
                }
            }
        ]
    },
    {
        "name": "可视域分析",
        "class": "ViewshedAnalysis",
        "description": "可视域分析",
        "category": "API|分析|可视化|可视域",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新可视域",
                "jsondata": {
                    "id": "ViewshedAnalysis_id",
                    "GISType": 0,
                    "coordinates": "116.37341685363799,39.91866220934027,60.0",
                    "Fov": 120,
                    "CaptureWidth": 1000000,
                    "IsAuto": false,
                    "CamerScale": 50
                }
            },
            {
                "function": "Add",
                "description": "添加可视域",
                "jsondata": {
                    "id": "ViewshedAnalysis_id",
                    "GISType": 0,
                    "coordinates": "116.37341685363799,39.91866220934027,60.0",
                    "Fov": 120,
                    "CaptureWidth": 1000000,
                    "IsAuto": false,
                    "CamerScale": 50
                }
            },
            {
                "function": "Delete",
                "description": "删除可视域",
                "jsondata": {
                    "ids": ["ViewshedAnalysis_id"]
                }
            },
            {
                "function": "Clear",
                "description": "清除可视域",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新可视域",
                "jsondata": {
                    "id": "ViewshedAnalysis_id",
                    "GISType": 0,
                    "coordinates": "116.37341685363799,39.91866220934027,60.0",
                    "Fov": 120,
                    "CaptureWidth": 1000000,
                    "IsAuto": false,
                    "CamerScale": 50
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["ViewshedAnalysis_id"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["ViewshedAnalysis_id"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "天际线",
        "class": "Skyline",
        "description": "天际线",
        "category": "API|分析|可视化|天际线",
        "actions": [
            {
                "function": "OpenSkyline",
                "description": "开启天际线",
                "jsondata": {}
            },
            {
                "function": "CloseSkyline",
                "description": "关闭天际线",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "热力图",
        "class": "HeatMap",
        "description": "热力图",
        "category": "API|分析|可视化|热力图",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新热力图",
                "jsondata": {
                    "id": "银行热力图",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.38826230515,39.917035670107",
                        "116.38386037092,39.913609180676",
                        "116.38409012109,39.913534393569",
                        "116.38433332453,39.913470674972",
                        "116.38573082174,39.91340988487",
                        "116.38474160877,39.91425388492",
                        "116.38600997474,39.914130938494",
                        "116.38700004691,39.9129249229",
                        "116.38745203175,39.91415780768",
                        "116.38830698193,39.913446649551",
                        "116.38959385773,39.91355160297",
                        "116.38970844092,39.913072847445",
                        "116.39196964199,39.914236491753",
                        "116.39145738661,39.913235817386",
                        "116.39238298273,39.91315992901",
                        "116.39344939162,39.913520590096",
                        "116.39338589978,39.913115104295",
                        "116.39373680271,39.913352955278",
                        "116.39354476752,39.913174882925",
                        "116.39395827563,39.913196281001",
                        "116.39393096742,39.9127858139",
                        "116.39279246356,39.917004224738",
                        "116.38910751064,39.915973971151",
                        "116.38928729078,39.91839080315",
                        "116.38967022991,39.917801068375",
                        "116.38952066239,39.917537196717",
                        "116.38992513155,39.917569391278",
                        "116.38983978571,39.917616643894",
                        "116.3895857105,39.917146158843",
                        "116.39031987301,39.917313484254",
                        "116.39052868721,39.916650171896",
                        "116.39108607288,39.916930296437",
                        "116.39098395818,39.917669427594",
                        "116.3920941453,39.917688854596",
                        "116.39255397684,39.917728728596",
                        "116.39277638371,39.918571749852",
                        "116.39437932075,39.918706273947",
                        "116.3942946789,39.917445069775",
                        "116.39542321092,39.918783559479",
                        "116.39450129652,39.920523560235",
                        "116.39192391243,39.92031923884",
                        "116.3892311414,39.920954930988",
                        "116.38629731063,39.921080050287",
                        "116.38554269472,39.92006233913",
                        "116.38516510417,39.919193629115",
                        "116.38509640116,39.921323320096",
                        "116.38491740744,39.921935504806",
                        "116.38418835156,39.91778555346",
                        "116.38454438375,39.918797790153",
                        "116.38563327238,39.918511912127",
                        "116.38602612514,39.919669082062",
                        "116.39473935488,39.917231987181",
                        "116.39515611278,39.917658478473",
                        "116.39415492833,39.916041479292",
                        "116.39183626272,39.917391698467",
                        "116.39201581797,39.916305299989",
                        "116.39352368159,39.917428886085",
                        "116.39275646062,39.918923314946",
                        "116.38904154259,39.918332204336",
                        "116.38671925874,39.916951551081",
                        "116.38887754897,39.916216320052",
                        "116.38930697661,39.917142535124",
                        "116.38920617499,39.917223061672",
                        "116.38850085941,39.916377194515",
                        "116.38995808582,39.916445289961",
                        "116.39025651866,39.9170731792",
                        "116.39020075592,39.917140771833",
                        "116.38934592914,39.916776633132"],
                    "pointMaxRadius": 4000,
                    "heightScale": 1,
                    "contrast": 1,
                    "mapHeight": 6100
                }
            },
            {
                "function": "Add",
                "description": "添加热力图",
                "jsondata": {
                    "id": "银行热力图",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.38826230515,39.917035670107",
                        "116.38386037092,39.913609180676",
                        "116.38409012109,39.913534393569",
                        "116.38433332453,39.913470674972",
                        "116.38573082174,39.91340988487",
                        "116.38474160877,39.91425388492",
                        "116.38600997474,39.914130938494",
                        "116.38700004691,39.9129249229",
                        "116.38745203175,39.91415780768",
                        "116.38830698193,39.913446649551",
                        "116.38959385773,39.91355160297",
                        "116.38970844092,39.913072847445",
                        "116.39196964199,39.914236491753",
                        "116.39145738661,39.913235817386",
                        "116.39238298273,39.91315992901",
                        "116.39344939162,39.913520590096",
                        "116.39338589978,39.913115104295",
                        "116.39373680271,39.913352955278",
                        "116.39354476752,39.913174882925",
                        "116.39395827563,39.913196281001",
                        "116.39393096742,39.9127858139",
                        "116.39279246356,39.917004224738",
                        "116.38910751064,39.915973971151",
                        "116.38928729078,39.91839080315",
                        "116.38967022991,39.917801068375",
                        "116.38952066239,39.917537196717",
                        "116.38992513155,39.917569391278",
                        "116.38983978571,39.917616643894",
                        "116.3895857105,39.917146158843",
                        "116.39031987301,39.917313484254",
                        "116.39052868721,39.916650171896",
                        "116.39108607288,39.916930296437",
                        "116.39098395818,39.917669427594",
                        "116.3920941453,39.917688854596",
                        "116.39255397684,39.917728728596",
                        "116.39277638371,39.918571749852",
                        "116.39437932075,39.918706273947",
                        "116.3942946789,39.917445069775",
                        "116.39542321092,39.918783559479",
                        "116.39450129652,39.920523560235",
                        "116.39192391243,39.92031923884",
                        "116.3892311414,39.920954930988",
                        "116.38629731063,39.921080050287",
                        "116.38554269472,39.92006233913",
                        "116.38516510417,39.919193629115",
                        "116.38509640116,39.921323320096",
                        "116.38491740744,39.921935504806",
                        "116.38418835156,39.91778555346",
                        "116.38454438375,39.918797790153",
                        "116.38563327238,39.918511912127",
                        "116.38602612514,39.919669082062",
                        "116.39473935488,39.917231987181",
                        "116.39515611278,39.917658478473",
                        "116.39415492833,39.916041479292",
                        "116.39183626272,39.917391698467",
                        "116.39201581797,39.916305299989",
                        "116.39352368159,39.917428886085",
                        "116.39275646062,39.918923314946",
                        "116.38904154259,39.918332204336",
                        "116.38671925874,39.916951551081",
                        "116.38887754897,39.916216320052",
                        "116.38930697661,39.917142535124",
                        "116.38920617499,39.917223061672",
                        "116.38850085941,39.916377194515",
                        "116.38995808582,39.916445289961",
                        "116.39025651866,39.9170731792",
                        "116.39020075592,39.917140771833",
                        "116.38934592914,39.916776633132"],
                    "pointMaxRadius": 4000,
                    "heightScale": 1,
                    "contrast": 1,
                    "mapHeight": 6100
                }
            },
            {
                "function": "Delete",
                "description": "删除热力图",
                "jsondata": {
                    "ids": ["银行热力图"]
                }
            },
            {
                "function": "Clear",
                "description": "清除热力图",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新热力图",
                "jsondata": {
                    "id": "银行热力图",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.38826230515,39.917035670107",
                        "116.38386037092,39.913609180676",
                        "116.38409012109,39.913534393569",
                        "116.38433332453,39.913470674972",
                        "116.38573082174,39.91340988487",
                        "116.38474160877,39.91425388492",
                        "116.38600997474,39.914130938494",
                        "116.38700004691,39.9129249229",
                        "116.38745203175,39.91415780768",
                        "116.38830698193,39.913446649551",
                        "116.38959385773,39.91355160297",
                        "116.38970844092,39.913072847445",
                        "116.39196964199,39.914236491753",
                        "116.39145738661,39.913235817386",
                        "116.39238298273,39.91315992901",
                        "116.39344939162,39.913520590096",
                        "116.39338589978,39.913115104295",
                        "116.39373680271,39.913352955278",
                        "116.39354476752,39.913174882925",
                        "116.39395827563,39.913196281001",
                        "116.39393096742,39.9127858139",
                        "116.39279246356,39.917004224738",
                        "116.38910751064,39.915973971151",
                        "116.38928729078,39.91839080315",
                        "116.38967022991,39.917801068375",
                        "116.38952066239,39.917537196717",
                        "116.38992513155,39.917569391278",
                        "116.38983978571,39.917616643894",
                        "116.3895857105,39.917146158843",
                        "116.39031987301,39.917313484254",
                        "116.39052868721,39.916650171896",
                        "116.39108607288,39.916930296437",
                        "116.39098395818,39.917669427594",
                        "116.3920941453,39.917688854596",
                        "116.39255397684,39.917728728596",
                        "116.39277638371,39.918571749852",
                        "116.39437932075,39.918706273947",
                        "116.3942946789,39.917445069775",
                        "116.39542321092,39.918783559479",
                        "116.39450129652,39.920523560235",
                        "116.39192391243,39.92031923884",
                        "116.3892311414,39.920954930988",
                        "116.38629731063,39.921080050287",
                        "116.38554269472,39.92006233913",
                        "116.38516510417,39.919193629115",
                        "116.38509640116,39.921323320096",
                        "116.38491740744,39.921935504806",
                        "116.38418835156,39.91778555346",
                        "116.38454438375,39.918797790153",
                        "116.38563327238,39.918511912127",
                        "116.38602612514,39.919669082062",
                        "116.39473935488,39.917231987181",
                        "116.39515611278,39.917658478473",
                        "116.39415492833,39.916041479292",
                        "116.39183626272,39.917391698467",
                        "116.39201581797,39.916305299989",
                        "116.39352368159,39.917428886085",
                        "116.39275646062,39.918923314946",
                        "116.38904154259,39.918332204336",
                        "116.38671925874,39.916951551081",
                        "116.38887754897,39.916216320052",
                        "116.38930697661,39.917142535124",
                        "116.38920617499,39.917223061672",
                        "116.38850085941,39.916377194515",
                        "116.38995808582,39.916445289961",
                        "116.39025651866,39.9170731792",
                        "116.39020075592,39.917140771833",
                        "116.38934592914,39.916776633132",
                        "116.38500793317,39.921884234289",
                        "116.38499496505,39.921805149482",
                        "116.38508315946,39.921806912259",
                        "116.38511574251,39.921871701183",
                        "116.38523315647,39.921904619635",
                        "116.38527481051,39.921872077358",
                        "116.38531519225,39.921699998708",
                        "116.38527064674,39.921785389275",
                        "116.3850085337,39.921750969638",
                        "116.38503235013,39.921725777572",
                        "116.38518378259,39.921703011647",
                        "116.38501442261,39.921652775918",
                        "116.38503827542,39.921628012713",
                        "116.38499307113,39.921595832902",
                        "116.38494058317,39.921559425854",
                        "116.38491861167,39.92142532205",
                        "116.38496830484,39.921282563427",
                        "116.38482815064,39.920784664601",
                        "116.38483147045,39.920731814036",
                        "116.38472095253,39.920380049707",
                        "116.38466464777,39.92016091291",
                        "116.38449765772,39.91965876578",
                        "116.38449233789,39.919535130983",
                        "116.38453123591,39.919417941667",
                        "116.38462031796,39.919962239086",
                        "116.38443531306,39.918831820018",
                        "116.38446405419,39.918820619449",
                        "116.3844260661,39.918686896882",
                        "116.3843186134,39.917414854581",
                        "116.38428623835,39.917129919971",
                        "116.38434266864,39.917648849756",
                        "116.38436124201,39.917235776606",
                        "116.38434730624,39.917326127468",
                        "116.38413714926,39.916133977411",
                        "116.38399616571,39.915798134904",
                        "116.3842159552,39.915916515238",
                        "116.38395682378,39.914688781548",
                        "116.38518613676,39.914542205581",
                        "116.38412931176,39.914181484483",
                        "116.3850860396,39.913783814892",
                        "116.3838273048,39.913728435159",
                        "116.38492072472,39.913478345083",
                        "116.38386032729,39.913412327322",
                        "116.38468688192,39.913353373209",
                        "116.38477931663,39.913397001304",
                        "116.38466051123,39.913787579814",
                        "116.38468766008,39.913803333036",
                        "116.38479556235,39.913923078142",
                        "116.38480339349,39.914008377911",
                        "116.38593426473,39.913505061443",
                        "116.38610258263,39.913335466814",
                        "116.38595907096,39.913902062171",
                        "116.3858016788,39.914558650782",
                        "116.38538593289,39.914712902481",
                        "116.38531204053,39.914949755388",
                        "116.38532885236,39.91513296154",
                        "116.38546604559,39.915443046937",
                        "116.3854656853,39.915786747863",
                        "116.38551782232,39.916138921414",
                        "116.38557338823,39.916479847445",
                        "116.38563616504,39.916781447286",
                        "116.38626271843,39.916132081201",
                        "116.38626290026,39.915899229696",
                        "116.38622711561,39.915781559388",
                        "116.38735559429,39.915920615374",
                        "116.38706739856,39.916404601698",
                        "116.38694313662,39.915537988426",
                        "116.38773440833,39.914643616014",
                        "116.3878664975,39.914870585606",
                        "116.38756140778,39.914404091113",
                        "116.38868103332,39.913796403723",
                        "116.38818165164,39.913973443408",
                        "116.38793106175,39.913382463973",
                        "116.38728737282,39.913274434892",
                        "116.38714872277,39.913280580096",
                        "116.38848486012,39.913058125357",
                        "116.38899237609,39.913002212744",
                        "116.38931010106,39.913053426669",
                        "116.38818040753,39.91330473076",
                        "116.38990246632,39.913090715434",
                        "116.39079311123,39.913121133167",
                        "116.39081026084,39.913725329022",
                        "116.39032593927,39.913702346468",
                        "116.3918312583,39.913115424631",
                        "116.39232105763,39.912911108548",
                        "116.39253699873,39.913624279258",
                        "116.39193796352,39.913766651925",
                        "116.39320215885,39.913282200612",
                        "116.39362337219,39.914336309673",
                        "116.39260905945,39.914799082668",
                        "116.39247826116,39.914715020832",
                        "116.39304147117,39.915588377752",
                        "116.39171991901,39.915856295339",
                        "116.39134704872,39.915291564593",
                        "116.39208409686,39.915694860458",
                        "116.3902697501,39.916259966344",
                        "116.39018516645,39.915560086544",
                        "116.39078979947,39.917075955485",
                        "116.38867604077,39.917643232887",
                        "116.3888059427,39.91687112003",
                        "116.38949379908,39.917865515516",
                        "116.38804792566,39.918371591759",
                        "116.38819151481,39.917699214412",
                        "116.38870889562,39.918636159996",
                        "116.38772674185,39.919171930341",
                        "116.38741119949,39.918586361143",
                        "116.38873440969,39.919300031074",
                        "116.38798004144,39.920156345487",
                        "116.38671661263,39.919077350992",
                        "116.3878462565,39.920716289728",
                        "116.38755423802,39.921138885213",
                        "116.3883538463,39.92133622981",
                        "116.38906716439,39.921302627886",
                        "116.39035952966,39.920826672885",
                        "116.39030377689,39.920477752371",
                        "116.39101249829,39.920834651176",
                        "116.39123862168,39.920947392392",
                        "116.39096999761,39.920235571336",
                        "116.39107622721,39.919951708516",
                        "116.39244880697,39.920120323543",
                        "116.39149130537,39.920226348115",
                        "116.39152823147,39.919398634411",
                        "116.39204597039,39.918960390399",
                        "116.39230880265,39.919512062808",
                        "116.39205108424,39.919303060138",
                        "116.39263280857,39.91832332704",
                        "116.39316158754,39.918727853178",
                        "116.39280717703,39.918383202634",
                        "116.39324754653,39.917861952161",
                        "116.39361912989,39.917753534562",
                        "116.39378172394,39.917193384276",
                        "116.39370545333,39.916248624507",
                        "116.39355974562,39.912711377489",
                        "116.39420141422,39.912727045125",
                        "116.39429716914,39.913290169689",
                        "116.39435986695,39.912526204472",
                        "116.39393908359,39.91248647235",
                        "116.39297190675,39.912560999841",
                        "116.39288112348,39.912829851515",
                        "116.39195926964,39.912619006914",
                        "116.39171862921,39.912624051496",
                        "116.38993001198,39.912843134138",
                        "116.38892490602,39.912932596266",
                        "116.38804445745,39.912975998014",
                        "116.38765672128,39.913018811803",
                        "116.38720897116,39.91304672824",
                        "116.38582506597,39.913156487896",
                        "116.38567574564,39.913108449038",
                        "116.39581160097,39.920248985831",
                        "116.39524754877,39.920517834321",
                        "116.39472714975,39.920713197249",
                        "116.39598168843,39.920781051117",
                        "116.3959131737,39.920558426334",
                        "116.39566375777,39.920402180548",
                        "116.39538077341,39.920078136766",
                        "116.39535752529,39.919657898914",
                        "116.39571917018,39.920006400691",
                        "116.39550510158,39.918992923958",
                        "116.39548226904,39.918802609685",
                        "116.39517969375,39.918078816261",
                        "116.39509415143,39.91771692627",
                        "116.39404472159,39.917698100619",
                        "116.39403206324,39.917632166824",
                        "116.39502046819,39.917489312797",
                        "116.39530983366,39.917043008842",
                        "116.3934900433,39.917299973939",
                        "116.39222300858,39.917495877234",
                        "116.39263831811,39.917393654359",
                        "116.39530067586,39.916808802511",
                        "116.39539376823,39.916530861768",
                        "116.3950478794,39.916235359725",
                        "116.39494195875,39.915914237883",
                        "116.39332017844,39.91610447928",
                        "116.39299521256,39.916062836739",
                        "116.39214402,39.916289811429",
                        "116.39196850963,39.916275946648",
                        "116.39168348668,39.915812214904",
                        "116.39277832028,39.91552328515",
                        "116.38856471649,39.916485748331",
                        "116.38854814497,39.916511954905",
                        "116.38829454496,39.917694151071",
                        "116.38798658585,39.918097282161",
                        "116.38677866597,39.918938293809",
                        "116.3868449268,39.919167718687",
                        "116.38832228117,39.920012741124",
                        "116.38846045826,39.920054353175",
                        "116.38994512792,39.919368120879",
                        "116.38936796575,39.919103679249",
                        "116.38880707431,39.918646751899",
                        "116.38861985628,39.918408769702",
                        "116.38880461727,39.917883790402",
                        "116.389263215,39.917777203492",
                        "116.38927455671,39.918011072573",
                        "116.38859968665,39.917872852386",
                        "116.38941271195,39.917224876965",
                        "116.38989138803,39.917484302053",
                        "116.38890044125,39.917940371576",
                        "116.38861213803,39.917268735222",
                        "116.38990240583,39.917382623904",
                        "116.39025019031,39.918206253527",
                        "116.38836267838,39.91869582615",
                        "116.38756618106,39.918177313186",
                        "116.38821196399,39.917290655649",
                        "116.38989771097,39.916782015196",
                        "116.39117178635,39.917287065485",
                        "116.39163916387,39.918345222761",
                        "116.39062543317,39.919258996253",
                        "116.3891611457,39.91971557633",
                        "116.38772829401,39.919320585121",
                        "116.38715141705,39.917744873161",
                        "116.38818766338,39.917682014218",
                        "116.39056059659,39.917961904273",
                        "116.39154632978,39.917461192044",
                        "116.39172349721,39.916284123028",
                        "116.38939165098,39.915702336959",
                        "116.38657998667,39.915507450546",
                        "116.38791714342,39.914780011429",
                        "116.39012838172,39.914274136629",
                        "116.39194473494,39.914127996248",
                        "116.39218264579,39.914330760203",
                        "116.39139781193,39.916386618914",
                        "116.39011795357,39.916561238445"],
                    "pointMaxRadius": 4000,
                    "heightScale": 1,
                    "contrast": 1,
                    "mapHeight": 6100
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["银行热力图"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["银行热力图"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "数值柱状图",
        "class": "ColumnarMap",
        "description": "数值柱状图",
        "category": "API|分析|可视化|数值柱状图",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新数值柱状图",
                "jsondata": {
                    "id": "银行数值柱状图",
                    "GISType": 0,
                    "pointsInfoList": [
                        "116.39546586606066,39.920386278244116,1303",
                        "116.39588913073491,39.92025052118538,313",
                        "116.39500101589188,39.92041866330524,2830",
                        "116.39453981015717,39.920434101202595,2253",
                        "116.39344873348709,39.92034143015551,2112",
                        "116.39357870096208,39.91945011564764,3007",
                        "116.39456691547068,39.91901183235009,3729",
                        "116.39391218166526,39.91741438527251,1770",
                        "116.39304320270047,39.91919215018857,4015",
                        "116.39350814132918,39.918410578007894,232",
                        "116.39395612445816,39.918379209034704,3649",
                        "116.39280241698889,39.917578075918556,638",
                        "116.39279409131125,39.918408625252155,3447",
                        "116.39236704390126,39.91847625166199,2055",
                        "116.39247320242448,39.9183183195607,4832",
                        "116.39181897918101,39.917929072394614,3904",
                        "116.39271560882871,39.917960035276906,3147",
                        "116.39266988320774,39.91799553722336,1844",
                        "116.39248648172854,39.9180093978923,1384",
                        "116.39293435143308,39.91788885604308,3070",
                        "116.39346462230033,39.91818509487418,1008",
                        "116.39298160714803,39.91843106725321,3707",
                        "116.39260826738834,39.91889429730416,2217",
                        "116.39363638340028,39.91902893946898,2422",
                        "116.39367469572576,39.91906573159262,3167",
                        "116.39298870226015,39.918923547359846,4919",
                        "116.39308182841246,39.919235524354896,2109",
                        "116.39248984316556,39.91974557393171,17",
                        "116.39243116139252,39.91904930417013,3748",
                        "116.3921423249183,39.9184867900108,2523",
                        "116.39230942104166,39.91835549636261,279",
                        "116.39235547946987,39.91730486216283,30",
                        "116.39373834966197,39.91812747857702,941",
                        "116.39330813115565,39.91844817532686,2863",
                        "116.39355517523846,39.91906169458491,1563",
                        "116.39285547977704,39.91889000497892,3714",
                        "116.3925138185691,39.91855366460286,3459",
                        "116.39349924421289,39.91870134587736,2341",
                        "116.3926900925729,39.916913355215314,2826",
                        "116.39377033311527,39.91745545441816,316",
                        "116.39334581292724,39.917716798290435,4787",
                        "116.39276381420335,39.91702619190879,3702",
                        "116.39152639642718,39.91787639889882,3805",
                        "116.39186130364493,39.919262169744954,4223",
                        "116.39199627316522,39.91845029710977,1143",
                        "116.39134494259545,39.918650919178894,4719",
                        "116.39184859299421,39.91891152627968,1064",
                        "116.39035127251277,39.92033933465326,915",
                        "116.39058626355823,39.921181917143755,2700",
                        "116.38815747284576,39.921229570082374,2776",
                        "116.3869162100133,39.92099101198541,4600",
                        "116.38606327961003,39.92088375549801,3531",
                        "116.38558190512943,39.92124316656234,491",
                        "116.38502853050996,39.921436490509954,3003",
                        "116.38518274697392,39.92112997360924,2515",
                        "116.38480010500875,39.92063431028889,4685",
                        "116.38505812432423,39.920277132637096,3348",
                        "116.38502856903533,39.91991847070818,4844",
                        "116.38505074079816,39.919845452777835,3763",
                        "116.38499300602642,39.91931250172527,4401",
                        "116.38479618028221,39.91867574761637,3786",
                        "116.38497571406012,39.918006435312265,209",
                        "116.38505304606318,39.916246235985504,4145",
                        "116.38419963746031,39.91651247700239,3306",
                        "116.38495194815685,39.917275307044996,3861",
                        "116.38450862675064,39.91738526456147,473",
                        "116.38491323380815,39.91607608554082,2369",
                        "116.38462324416304,39.91693140315718,4582",
                        "116.38468141347005,39.91547674968017,3929",
                        "116.38453623850884,39.915951036630815,3298",
                        "116.38446452793974,39.91488007683549,906",
                        "116.38413584846924,39.91535224150599,1052",
                        "116.38388587646703,39.91438365998269,2574",
                        "116.38372957223896,39.913755218611215,3362",
                        "116.38357954110104,39.913341848321515,2070",
                        "116.38359050850681,39.913072529191666,3385",
                        "116.38479582687646,39.91291163495954,1628",
                        "116.38532817044276,39.91290821712041,1831",
                        "116.38460257499521,39.9136414167586,2632",
                        "116.38422288508775,39.91328433407119,2729",
                        "116.38564165492949,39.9145061137151,3407",
                        "116.38476357782925,39.914777941459405,2826",
                        "116.38730094578483,39.91325156704095,1522",
                        "116.38570827156144,39.913266315191215,3879",
                        "116.38564098706975,39.91429279019809,1254",
                        "116.38607268429777,39.913880551100384,271",
                        "116.38681616616131,39.91410502202563,3707",
                        "116.38757447551767,39.914805028152074,1059",
                        "116.38643698731788,39.91565233806538,3852",
                        "116.38535801323127,39.91550491466098,366",
                        "116.3891504627614,39.912992754554594,4354",
                        "116.38708242038429,39.91284276480136,1704",
                        "116.38675741864675,39.91307777971226,533",
                        "116.39240021723386,39.91203961922966,416",
                        "116.39088958593717,39.91369568191043,280",
                        "116.3893969061772,39.913304001963255,3329",
                        "116.3913924326285,39.91213995756921,2081",
                        "116.39253355818317,39.91248338686866,1676",
                        "116.39369496635288,39.912250340010154,3062",
                        "116.39417095709626,39.911926794860605,1278",
                        "116.39424665010839,39.912819379191994,143",
                        "116.39378298966379,39.913931896888016,3757",
                        "116.39420385047332,39.91420631170456,1504",
                        "116.39479383933421,39.91359850432041,3243",
                        "116.39394323259705,39.91313910959829,1994",
                        "116.39292432250389,39.912975812880596,4770",
                        "116.39297324562537,39.91231718745968,3270",
                        "116.39128224246258,39.9130651869611,4041",
                        "116.3905048520029,39.912622054798156,4841",
                        "116.38997285345793,39.91260724269783,1878",
                        "116.38901007809139,39.9127467301489,4624",
                        "116.38783785840663,39.91314480473623,575",
                        "116.38901095384013,39.914291973914764,3734",
                        "116.39009005016536,39.913815731048885,2055",
                        "116.3886319732281,39.91384171460954,4741",
                        "116.38862118433015,39.913863738172985,2423",
                        "116.38786484694182,39.915146606461185,3334",
                        "116.38760861298825,39.91581535626084,2740",
                        "116.39093356083602,39.914443198901814,2239",
                        "116.39111246243156,39.91449867551647,74",
                        "116.38870710455242,39.9154530997113,317",
                        "116.39134511338223,39.91498967982153,4720",
                        "116.3926924444077,39.91431255767884,4372",
                        "116.39287617764691,39.913859087806024,1608",
                        "116.39436042437727,39.91546062985867,1143",
                        "116.39230440428652,39.916182565636156,1196",
                        "116.39084277682889,39.9158214251168,3239",
                        "116.3913875946863,39.916343782793184,2372",
                        "116.38994187938526,39.91738067589644,3593",
                        "116.38923919176514,39.91720571665613,4648",
                        "116.38615757227731,39.91699942999865,3972",
                        "116.38778365986678,39.91814276305259,1137",
                        "116.38800426515033,39.91881542963925,1803",
                        "116.38679416574533,39.917806699541174,2527",
                        "116.39014172749721,39.91812691940354,4631",
                        "116.38942675876021,39.917831311260294,254",
                        "116.38910654461871,39.91746405909706,3249",
                        "116.39033887264112,39.91769235276877,3589",
                        "116.39045726930478,39.91772423050217,3037",
                        "116.39123673742279,39.917357920654744,3673",
                        "116.39110434463939,39.91699316718051,775",
                        "116.39090949647661,39.916820993458884,1238",
                        "116.39128084407915,39.915672653368716,106",
                        "116.39059048345922,39.91606440474331,3180",
                        "116.38981808043722,39.916700458736344,3513",
                        "116.38923520385374,39.916791957740486,617",
                        "116.38869707946506,39.91680012282997,4872",
                        "116.38955542876784,39.91611775058062,4608",
                        "116.3897751472844,39.91590037573015,1325",
                        "116.3895098703623,39.91561365259438,990",
                        "116.39071711434234,39.91605997958589,3225",
                        "116.39037024691264,39.91601597939171,2526",
                        "116.39074112748331,39.91701845194918,2686",
                        "116.38865836744004,39.91693894130301,23",
                        "116.38860462879497,39.91688296091889,1324",
                        "116.3893852515347,39.917286971311384,49",
                        "116.38985957535928,39.91807345512889,2225",
                        "116.38984629647527,39.91800087079573,2346",
                        "116.38970236498817,39.91776774088332,2123",
                        "116.39003758679843,39.91786606833053,4927",
                        "116.38987801198526,39.91785380334814,1840",
                        "116.38953128755432,39.91750232359018,2421",
                        "116.39024570730588,39.917460028323035,2720",
                        "116.39597126940393,39.91947722326156,3768",
                        "116.39553329736752,39.916276748163476,2225",
                        "116.39531520279999,39.91566446002591,2123",
                        "116.3954092361173,39.915636085663586,3225"],
                    "columnarColor": "1,0,0,0.5",
                    "otherColor": "0,1,0,0.2",
                    "borderColor": "0,0.2,1,1",
                    "scaleXY": 4000,
                    "spacingRatio": 1,
                    "maxHeight": 10000,
                    "mapHeight": 6100,
                    "IsVisibleNumbew": false,
                    "NumberColor": "0,1,0,1"
                }
            },
            {
                "function": "Add",
                "description": "添加数值柱状图",
                "jsondata": {
                    "id": "银行数值柱状图",
                    "GISType": 0,
                    "pointsInfoList": [
                        "116.39546586606066,39.920386278244116,1303",
                        "116.39588913073491,39.92025052118538,313",
                        "116.39500101589188,39.92041866330524,2830",
                        "116.39453981015717,39.920434101202595,2253",
                        "116.39344873348709,39.92034143015551,2112",
                        "116.39357870096208,39.91945011564764,3007",
                        "116.39456691547068,39.91901183235009,3729",
                        "116.39391218166526,39.91741438527251,1770",
                        "116.39304320270047,39.91919215018857,4015",
                        "116.39350814132918,39.918410578007894,232",
                        "116.39395612445816,39.918379209034704,3649",
                        "116.39280241698889,39.917578075918556,638",
                        "116.39279409131125,39.918408625252155,3447",
                        "116.39236704390126,39.91847625166199,2055",
                        "116.39247320242448,39.9183183195607,4832",
                        "116.39181897918101,39.917929072394614,3904",
                        "116.39271560882871,39.917960035276906,3147",
                        "116.39266988320774,39.91799553722336,1844",
                        "116.39248648172854,39.9180093978923,1384",
                        "116.39293435143308,39.91788885604308,3070",
                        "116.39346462230033,39.91818509487418,1008",
                        "116.39298160714803,39.91843106725321,3707",
                        "116.39260826738834,39.91889429730416,2217",
                        "116.39363638340028,39.91902893946898,2422",
                        "116.39367469572576,39.91906573159262,3167",
                        "116.39298870226015,39.918923547359846,4919",
                        "116.39308182841246,39.919235524354896,2109",
                        "116.39248984316556,39.91974557393171,17",
                        "116.39243116139252,39.91904930417013,3748",
                        "116.3921423249183,39.9184867900108,2523",
                        "116.39230942104166,39.91835549636261,279",
                        "116.39235547946987,39.91730486216283,30",
                        "116.39373834966197,39.91812747857702,941",
                        "116.39330813115565,39.91844817532686,2863",
                        "116.39355517523846,39.91906169458491,1563",
                        "116.39285547977704,39.91889000497892,3714",
                        "116.3925138185691,39.91855366460286,3459",
                        "116.39349924421289,39.91870134587736,2341",
                        "116.3926900925729,39.916913355215314,2826",
                        "116.39377033311527,39.91745545441816,316",
                        "116.39334581292724,39.917716798290435,4787",
                        "116.39276381420335,39.91702619190879,3702",
                        "116.39152639642718,39.91787639889882,3805",
                        "116.39186130364493,39.919262169744954,4223",
                        "116.39199627316522,39.91845029710977,1143",
                        "116.39134494259545,39.918650919178894,4719",
                        "116.39184859299421,39.91891152627968,1064",
                        "116.39035127251277,39.92033933465326,915",
                        "116.39058626355823,39.921181917143755,2700",
                        "116.38815747284576,39.921229570082374,2776",
                        "116.3869162100133,39.92099101198541,4600",
                        "116.38606327961003,39.92088375549801,3531",
                        "116.38558190512943,39.92124316656234,491",
                        "116.38502853050996,39.921436490509954,3003",
                        "116.38518274697392,39.92112997360924,2515",
                        "116.38480010500875,39.92063431028889,4685",
                        "116.38505812432423,39.920277132637096,3348",
                        "116.38502856903533,39.91991847070818,4844",
                        "116.38505074079816,39.919845452777835,3763",
                        "116.38499300602642,39.91931250172527,4401",
                        "116.38479618028221,39.91867574761637,3786",
                        "116.38497571406012,39.918006435312265,209",
                        "116.38505304606318,39.916246235985504,4145",
                        "116.38419963746031,39.91651247700239,3306",
                        "116.38495194815685,39.917275307044996,3861",
                        "116.38450862675064,39.91738526456147,473",
                        "116.38491323380815,39.91607608554082,2369",
                        "116.38462324416304,39.91693140315718,4582",
                        "116.38468141347005,39.91547674968017,3929",
                        "116.38453623850884,39.915951036630815,3298",
                        "116.38446452793974,39.91488007683549,906",
                        "116.38413584846924,39.91535224150599,1052",
                        "116.38388587646703,39.91438365998269,2574",
                        "116.38372957223896,39.913755218611215,3362",
                        "116.38357954110104,39.913341848321515,2070",
                        "116.38359050850681,39.913072529191666,3385",
                        "116.38479582687646,39.91291163495954,1628",
                        "116.38532817044276,39.91290821712041,1831",
                        "116.38460257499521,39.9136414167586,2632",
                        "116.38422288508775,39.91328433407119,2729",
                        "116.38564165492949,39.9145061137151,3407",
                        "116.38476357782925,39.914777941459405,2826",
                        "116.38730094578483,39.91325156704095,1522",
                        "116.38570827156144,39.913266315191215,3879",
                        "116.38564098706975,39.91429279019809,1254",
                        "116.38607268429777,39.913880551100384,271",
                        "116.38681616616131,39.91410502202563,3707",
                        "116.38757447551767,39.914805028152074,1059",
                        "116.38643698731788,39.91565233806538,3852",
                        "116.38535801323127,39.91550491466098,366",
                        "116.3891504627614,39.912992754554594,4354",
                        "116.38708242038429,39.91284276480136,1704",
                        "116.38675741864675,39.91307777971226,533",
                        "116.39240021723386,39.91203961922966,416",
                        "116.39088958593717,39.91369568191043,280",
                        "116.3893969061772,39.913304001963255,3329",
                        "116.3913924326285,39.91213995756921,2081",
                        "116.39253355818317,39.91248338686866,1676",
                        "116.39369496635288,39.912250340010154,3062",
                        "116.39417095709626,39.911926794860605,1278",
                        "116.39424665010839,39.912819379191994,143",
                        "116.39378298966379,39.913931896888016,3757",
                        "116.39420385047332,39.91420631170456,1504",
                        "116.39479383933421,39.91359850432041,3243",
                        "116.39394323259705,39.91313910959829,1994",
                        "116.39292432250389,39.912975812880596,4770",
                        "116.39297324562537,39.91231718745968,3270",
                        "116.39128224246258,39.9130651869611,4041",
                        "116.3905048520029,39.912622054798156,4841",
                        "116.38997285345793,39.91260724269783,1878",
                        "116.38901007809139,39.9127467301489,4624",
                        "116.38783785840663,39.91314480473623,575",
                        "116.38901095384013,39.914291973914764,3734",
                        "116.39009005016536,39.913815731048885,2055",
                        "116.3886319732281,39.91384171460954,4741",
                        "116.38862118433015,39.913863738172985,2423",
                        "116.38786484694182,39.915146606461185,3334",
                        "116.38760861298825,39.91581535626084,2740",
                        "116.39093356083602,39.914443198901814,2239",
                        "116.39111246243156,39.91449867551647,74",
                        "116.38870710455242,39.9154530997113,317",
                        "116.39134511338223,39.91498967982153,4720",
                        "116.3926924444077,39.91431255767884,4372",
                        "116.39287617764691,39.913859087806024,1608",
                        "116.39436042437727,39.91546062985867,1143",
                        "116.39230440428652,39.916182565636156,1196",
                        "116.39084277682889,39.9158214251168,3239",
                        "116.3913875946863,39.916343782793184,2372",
                        "116.38994187938526,39.91738067589644,3593",
                        "116.38923919176514,39.91720571665613,4648",
                        "116.38615757227731,39.91699942999865,3972",
                        "116.38778365986678,39.91814276305259,1137",
                        "116.38800426515033,39.91881542963925,1803",
                        "116.38679416574533,39.917806699541174,2527",
                        "116.39014172749721,39.91812691940354,4631",
                        "116.38942675876021,39.917831311260294,254",
                        "116.38910654461871,39.91746405909706,3249",
                        "116.39033887264112,39.91769235276877,3589",
                        "116.39045726930478,39.91772423050217,3037",
                        "116.39123673742279,39.917357920654744,3673",
                        "116.39110434463939,39.91699316718051,775",
                        "116.39090949647661,39.916820993458884,1238",
                        "116.39128084407915,39.915672653368716,106",
                        "116.39059048345922,39.91606440474331,3180",
                        "116.38981808043722,39.916700458736344,3513",
                        "116.38923520385374,39.916791957740486,617",
                        "116.38869707946506,39.91680012282997,4872",
                        "116.38955542876784,39.91611775058062,4608",
                        "116.3897751472844,39.91590037573015,1325",
                        "116.3895098703623,39.91561365259438,990",
                        "116.39071711434234,39.91605997958589,3225",
                        "116.39037024691264,39.91601597939171,2526",
                        "116.39074112748331,39.91701845194918,2686",
                        "116.38865836744004,39.91693894130301,23",
                        "116.38860462879497,39.91688296091889,1324",
                        "116.3893852515347,39.917286971311384,49",
                        "116.38985957535928,39.91807345512889,2225",
                        "116.38984629647527,39.91800087079573,2346",
                        "116.38970236498817,39.91776774088332,2123",
                        "116.39003758679843,39.91786606833053,4927",
                        "116.38987801198526,39.91785380334814,1840",
                        "116.38953128755432,39.91750232359018,2421",
                        "116.39024570730588,39.917460028323035,2720",
                        "116.39597126940393,39.91947722326156,3768",
                        "116.39553329736752,39.916276748163476,2225",
                        "116.39531520279999,39.91566446002591,2123",
                        "116.3954092361173,39.915636085663586,3225"],
                    "columnarColor": "1,0,0,0.5",
                    "otherColor": "0,1,0,0.2",
                    "borderColor": "0,0.2,1,1",
                    "scaleXY": 4000,
                    "spacingRatio": 1,
                    "maxHeight": 10000,
                    "mapHeight": 6100,
                    "IsVisibleNumbew": false,
                    "NumberColor": "0,1,0,1"
                }
            },
            {
                "function": "Delete",
                "description": "删除数值柱状图",
                "jsondata": {
                    "ids": ["银行数值柱状图"]
                }
            },
            {
                "function": "Clear",
                "description": "清除数值柱状图",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新数值柱状图",
                "jsondata": {
                    "id": "银行数值柱状图",
                    "GISType": 0,
                    "pointsInfoList": [
                        "116.39546586606066,39.920386278244116,1303",
                        "116.39588913073491,39.92025052118538,313",
                        "116.39500101589188,39.92041866330524,2830",
                        "116.39453981015717,39.920434101202595,2253",
                        "116.39344873348709,39.92034143015551,2112",
                        "116.39357870096208,39.91945011564764,3007",
                        "116.39456691547068,39.91901183235009,3729",
                        "116.39391218166526,39.91741438527251,1770",
                        "116.39304320270047,39.91919215018857,4015",
                        "116.39350814132918,39.918410578007894,232",
                        "116.39395612445816,39.918379209034704,3649",
                        "116.39280241698889,39.917578075918556,638",
                        "116.39279409131125,39.918408625252155,3447",
                        "116.39236704390126,39.91847625166199,2055",
                        "116.39247320242448,39.9183183195607,4832",
                        "116.39181897918101,39.917929072394614,3904",
                        "116.39271560882871,39.917960035276906,3147",
                        "116.39266988320774,39.91799553722336,1844",
                        "116.39248648172854,39.9180093978923,1384",
                        "116.39293435143308,39.91788885604308,3070",
                        "116.39346462230033,39.91818509487418,1008",
                        "116.39298160714803,39.91843106725321,3707",
                        "116.39260826738834,39.91889429730416,2217",
                        "116.39363638340028,39.91902893946898,2422",
                        "116.39367469572576,39.91906573159262,3167",
                        "116.39298870226015,39.918923547359846,4919",
                        "116.39308182841246,39.919235524354896,2109",
                        "116.39248984316556,39.91974557393171,17",
                        "116.39243116139252,39.91904930417013,3748",
                        "116.3921423249183,39.9184867900108,2523",
                        "116.39230942104166,39.91835549636261,279",
                        "116.39235547946987,39.91730486216283,30",
                        "116.39373834966197,39.91812747857702,941",
                        "116.39330813115565,39.91844817532686,2863",
                        "116.39355517523846,39.91906169458491,1563",
                        "116.39285547977704,39.91889000497892,3714",
                        "116.3925138185691,39.91855366460286,3459",
                        "116.39349924421289,39.91870134587736,2341",
                        "116.3926900925729,39.916913355215314,2826",
                        "116.39377033311527,39.91745545441816,316",
                        "116.39334581292724,39.917716798290435,4787",
                        "116.39276381420335,39.91702619190879,3702",
                        "116.39152639642718,39.91787639889882,3805",
                        "116.39186130364493,39.919262169744954,4223",
                        "116.39199627316522,39.91845029710977,1143",
                        "116.39134494259545,39.918650919178894,4719",
                        "116.39184859299421,39.91891152627968,1064",
                        "116.39035127251277,39.92033933465326,915",
                        "116.39058626355823,39.921181917143755,2700",
                        "116.38815747284576,39.921229570082374,2776",
                        "116.3869162100133,39.92099101198541,4600",
                        "116.38606327961003,39.92088375549801,3531",
                        "116.38558190512943,39.92124316656234,491",
                        "116.38502853050996,39.921436490509954,3003",
                        "116.38518274697392,39.92112997360924,2515",
                        "116.38480010500875,39.92063431028889,4685",
                        "116.38505812432423,39.920277132637096,3348",
                        "116.38502856903533,39.91991847070818,4844",
                        "116.38505074079816,39.919845452777835,3763",
                        "116.38499300602642,39.91931250172527,4401",
                        "116.38479618028221,39.91867574761637,3786",
                        "116.38497571406012,39.918006435312265,209",
                        "116.38505304606318,39.916246235985504,4145",
                        "116.38419963746031,39.91651247700239,3306",
                        "116.38495194815685,39.917275307044996,3861",
                        "116.38450862675064,39.91738526456147,473",
                        "116.38491323380815,39.91607608554082,2369",
                        "116.38462324416304,39.91693140315718,4582",
                        "116.38468141347005,39.91547674968017,3929",
                        "116.38453623850884,39.915951036630815,3298",
                        "116.38446452793974,39.91488007683549,906",
                        "116.38413584846924,39.91535224150599,1052",
                        "116.38388587646703,39.91438365998269,2574",
                        "116.38372957223896,39.913755218611215,3362",
                        "116.38357954110104,39.913341848321515,2070",
                        "116.38359050850681,39.913072529191666,3385",
                        "116.38479582687646,39.91291163495954,1628",
                        "116.38532817044276,39.91290821712041,1831",
                        "116.38460257499521,39.9136414167586,2632",
                        "116.38422288508775,39.91328433407119,2729",
                        "116.38564165492949,39.9145061137151,3407",
                        "116.38476357782925,39.914777941459405,2826",
                        "116.38730094578483,39.91325156704095,1522",
                        "116.38570827156144,39.913266315191215,3879",
                        "116.38564098706975,39.91429279019809,1254",
                        "116.38607268429777,39.913880551100384,271",
                        "116.38681616616131,39.91410502202563,3707",
                        "116.38757447551767,39.914805028152074,1059",
                        "116.38643698731788,39.91565233806538,3852",
                        "116.38535801323127,39.91550491466098,366",
                        "116.3891504627614,39.912992754554594,4354",
                        "116.38708242038429,39.91284276480136,1704",
                        "116.38675741864675,39.91307777971226,533",
                        "116.39240021723386,39.91203961922966,416",
                        "116.39088958593717,39.91369568191043,280",
                        "116.3893969061772,39.913304001963255,3329",
                        "116.3913924326285,39.91213995756921,2081",
                        "116.39253355818317,39.91248338686866,1676",
                        "116.39369496635288,39.912250340010154,3062",
                        "116.39417095709626,39.911926794860605,1278",
                        "116.39424665010839,39.912819379191994,143",
                        "116.39378298966379,39.913931896888016,3757",
                        "116.39420385047332,39.91420631170456,1504",
                        "116.39479383933421,39.91359850432041,3243",
                        "116.39394323259705,39.91313910959829,1994",
                        "116.39292432250389,39.912975812880596,4770",
                        "116.39297324562537,39.91231718745968,3270",
                        "116.39128224246258,39.9130651869611,4041",
                        "116.3905048520029,39.912622054798156,4841",
                        "116.38997285345793,39.91260724269783,1878",
                        "116.38901007809139,39.9127467301489,4624",
                        "116.38783785840663,39.91314480473623,575",
                        "116.38901095384013,39.914291973914764,3734",
                        "116.39009005016536,39.913815731048885,2055",
                        "116.3886319732281,39.91384171460954,4741",
                        "116.38862118433015,39.913863738172985,2423",
                        "116.38786484694182,39.915146606461185,3334",
                        "116.38760861298825,39.91581535626084,2740",
                        "116.39093356083602,39.914443198901814,2239",
                        "116.39111246243156,39.91449867551647,74",
                        "116.38870710455242,39.9154530997113,317",
                        "116.39134511338223,39.91498967982153,4720",
                        "116.3926924444077,39.91431255767884,4372",
                        "116.39287617764691,39.913859087806024,1608",
                        "116.39436042437727,39.91546062985867,1143",
                        "116.39230440428652,39.916182565636156,1196",
                        "116.39084277682889,39.9158214251168,3239",
                        "116.3913875946863,39.916343782793184,2372",
                        "116.38994187938526,39.91738067589644,3593",
                        "116.38923919176514,39.91720571665613,4648",
                        "116.38615757227731,39.91699942999865,3972",
                        "116.38778365986678,39.91814276305259,1137",
                        "116.38800426515033,39.91881542963925,1803",
                        "116.38679416574533,39.917806699541174,2527",
                        "116.39014172749721,39.91812691940354,4631",
                        "116.38942675876021,39.917831311260294,254",
                        "116.38910654461871,39.91746405909706,3249",
                        "116.39033887264112,39.91769235276877,3589",
                        "116.39045726930478,39.91772423050217,3037",
                        "116.39123673742279,39.917357920654744,3673",
                        "116.39110434463939,39.91699316718051,775",
                        "116.39090949647661,39.916820993458884,1238",
                        "116.39128084407915,39.915672653368716,106",
                        "116.39059048345922,39.91606440474331,3180",
                        "116.38981808043722,39.916700458736344,3513",
                        "116.38923520385374,39.916791957740486,617",
                        "116.38869707946506,39.91680012282997,4872",
                        "116.38955542876784,39.91611775058062,4608",
                        "116.3897751472844,39.91590037573015,1325",
                        "116.3895098703623,39.91561365259438,990",
                        "116.39071711434234,39.91605997958589,3225",
                        "116.39037024691264,39.91601597939171,2526",
                        "116.39074112748331,39.91701845194918,2686",
                        "116.38865836744004,39.91693894130301,23",
                        "116.38860462879497,39.91688296091889,1324",
                        "116.3893852515347,39.917286971311384,49",
                        "116.38985957535928,39.91807345512889,2225",
                        "116.38984629647527,39.91800087079573,2346",
                        "116.38970236498817,39.91776774088332,2123",
                        "116.39003758679843,39.91786606833053,4927",
                        "116.38987801198526,39.91785380334814,1840",
                        "116.38953128755432,39.91750232359018,2421",
                        "116.39024570730588,39.917460028323035,2720",
                        "116.39597126940393,39.91947722326156,3768",
                        "116.39553329736752,39.916276748163476,2225",
                        "116.39531520279999,39.91566446002591,2123",
                        "116.3954092361173,39.915636085663586,3225"],
                    "columnarColor": "1,0,0,1",
                    "otherColor": "0,1,0,1",
                    "borderColor": "0,0.2,1,1",
                    "scaleXY": 4000,
                    "spacingRatio": 0.1,
                    "maxHeight": 10000,
                    "mapHeight": 6100,
                    "IsVisibleNumbew": false,
                    "NumberColor": "0,1,0,1"
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["银行数值柱状图"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["银行数值柱状图"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "单值柱状图",
        "class": "ColumnarMapTwo",
        "description": "单值柱状图",
        "category": "API|分析|可视化|单值柱状图",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者添加单值柱状图",
                "jsondata": {
                    "id": "单值柱状图",
                    "GISType": 0,
                    "pointsInfoList": ["116.39015956174977,39.9170116543882,60", "116.38985980103162,39.917123580267074,90", "116.3895588951193,39.91700807214602,10", "116.38930484180186,39.91680720222992,50", "116.38929033171428,39.91660669283614,65", "116.38962554236528,39.91663036367467,28", "116.38940584052425,39.91642632131502,49", "116.39018644170022,39.91644485649346,28"],
                    "columnarColor": "1,0,0,0.5",
                    "scaleXY": 1000,
                    "maxHeight": 3000,
                    "mapHeight": 6200,
                    "IsVisibleNumbew": false,
                    "NumberColor": "0,1,0,1",
                    "unit": ""
                }
            },
            {
                "function": "Add",
                "description": "添加单值柱状图",
                "jsondata": {
                    "id": "单值柱状图",
                    "GISType": 0,
                    "pointsInfoList": ["116.39015956174977,39.9170116543882,60", "116.38985980103162,39.917123580267074,90", "116.3895588951193,39.91700807214602,10", "116.38930484180186,39.91680720222992,50", "116.38929033171428,39.91660669283614,65", "116.38962554236528,39.91663036367467,28", "116.38940584052425,39.91642632131502,49", "116.39018644170022,39.91644485649346,28"],
                    "columnarColor": "1,0,0,0.5",
                    "scaleXY": 1000,
                    "maxHeight": 3000,
                    "mapHeight": 6200,
                    "IsVisibleNumbew": false,
                    "NumberColor": "0,1,0,1",
                    "unit": ""
                }
            },
            {
                "function": "Delete",
                "description": "删除单值柱状图",
                "jsondata": {
                    "ids": ["单值柱状图"]
                }
            },
            {
                "function": "Clear",
                "description": "清除单值柱状图",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新单值柱状图",
                "jsondata": {
                    "id": "单值柱状图",
                    "GISType": 0,
                    "pointsInfoList": ["116.39015956174977,39.9170116543882,60", "116.38985980103162,39.917123580267074,90", "116.3895588951193,39.91700807214602,10", "116.38930484180186,39.91680720222992,50", "116.38929033171428,39.91660669283614,65", "116.38962554236528,39.91663036367467,28", "116.38940584052425,39.91642632131502,49", "116.39018644170022,39.91644485649346,28"],
                    "columnarColor": "1,0,0,0.5",
                    "scaleXY": 1000,
                    "maxHeight": 3000,
                    "mapHeight": 6200,
                    "IsVisibleNumbew": false,
                    "NumberColor": "0,1,0,1",
                    "unit": ""
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["单值柱状图"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["单值柱状图"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "热力线",
        "class": "TrafficCongestionMap",
        "description": "热力线",
        "category": "API|分析|可视化|热力线",
        "actions": [
            {
                "function": "AddORUpdate",
                "description": "添加或者更新热力线",
                "jsondata": {
                    "id": "交通导航线",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.38928428515,39.913466469641,63",
                        "116.38893011229,39.913563374866,63",
                        "116.38838143156,39.913790779724,63",
                        "116.38771751626,39.914270755101,63",
                        "116.38785305607,39.914811718959,63",
                        "116.38830480495,39.915177608172,63",
                        "116.38915667642,39.915177524451,63",
                        "116.39002676914,39.915063173497,63",
                        "116.39091282868,39.915012097819,63",
                        "116.39166448664,39.913885992705,63",
                        "116.39232953391,39.913771082535,63",
                        "116.39304602213,39.914551749225,63",
                        "116.39329467099,39.915468670558,63",
                        "116.39273383159,39.916308013575,63",
                        "116.39194432061,39.91662427091,63",
                        "116.39094844348,39.916608247581,63",
                        "116.38969090475,39.916653099648,63",
                        "116.38866686169,39.916957842769,63",
                        "116.38768677747,39.917318202488,63",
                        "116.38708904594,39.918062499778,63",
                        "116.38718393267,39.919234825417,63",
                        "116.38758206142,39.919823037958,63",
                        "116.38787291436,39.919745872702,63"
                    ],
                    "statusList": ["畅通", "畅通", "畅通", "畅通", "缓行", "缓行", "缓行", "拥堵", "拥堵", "严重拥堵", "严重拥堵", "拥堵", "畅通", "缓行", "缓行", "畅通", "畅通", "畅通", "畅通", "畅通", "未知", "未知", "未知"],
                    "statusColorList": {
                        "未知": "0.5,1,0,1",
                        "畅通": "0,1,0,1",
                        "缓行": "1,1,0,1",
                        "拥堵": "1,0.5,0,1",
                        "严重拥堵": "1,0,0,1",
                        "封禁": "0,0,0,1"
                    },
                    "lineWidth": 2
                }
            },
            {
                "function": "Add",
                "description": "添加热力线",
                "jsondata": {
                    "id": "交通导航线",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.38928428515,39.913466469641,63",
                        "116.38893011229,39.913563374866,63",
                        "116.38838143156,39.913790779724,63",
                        "116.38771751626,39.914270755101,63",
                        "116.38785305607,39.914811718959,63",
                        "116.38830480495,39.915177608172,63",
                        "116.38915667642,39.915177524451,63",
                        "116.39002676914,39.915063173497,63",
                        "116.39091282868,39.915012097819,63",
                        "116.39166448664,39.913885992705,63",
                        "116.39232953391,39.913771082535,63",
                        "116.39304602213,39.914551749225,63",
                        "116.39329467099,39.915468670558,63",
                        "116.39273383159,39.916308013575,63",
                        "116.39194432061,39.91662427091,63",
                        "116.39094844348,39.916608247581,63",
                        "116.38969090475,39.916653099648,63",
                        "116.38866686169,39.916957842769,63",
                        "116.38768677747,39.917318202488,63",
                        "116.38708904594,39.918062499778,63",
                        "116.38718393267,39.919234825417,63",
                        "116.38758206142,39.919823037958,63",
                        "116.38787291436,39.919745872702,63"
                    ],
                    "statusList": ["畅通", "畅通", "畅通", "畅通", "缓行", "缓行", "缓行", "拥堵", "拥堵", "严重拥堵", "严重拥堵", "拥堵", "畅通", "缓行", "缓行", "畅通", "畅通", "畅通", "畅通", "畅通", "未知", "未知", "未知"],
                    "statusColorList": {
                        "未知": "0.5,1,0,1",
                        "畅通": "0,1,0,1",
                        "缓行": "1,1,0,1",
                        "拥堵": "1,0.5,0,1",
                        "严重拥堵": "1,0,0,1",
                        "封禁": "0,0,0,1"
                    },
                    "lineWidth": 2
                }
            },
            {
                "function": "Delete",
                "description": "删除热力线",
                "jsondata": {
                    "ids": ["交通导航线"]
                }
            },
            {
                "function": "Clear",
                "description": "清除热力线",
                "jsondata": {}
            },
            {
                "function": "Update",
                "description": "更新热力线",
                "jsondata": {
                    "id": "交通导航线",
                    "GISType": 0,
                    "coordinatesList": [
                        "116.39194432061,39.91662427091,63",
                        "116.39094844348,39.916608247581,63",
                        "116.38969090475,39.916653099648,63",
                        "116.38866686169,39.916957842769,63",
                        "116.38768677747,39.917318202488,63",
                        "116.38708904594,39.918062499778,63",
                        "116.38718393267,39.919234825417,63",
                        "116.38758206142,39.919823037958,63",
                        "116.38787291436,39.919745872702,63",
                        "116.38869873326,39.918788853838,63",
                        "116.38895548891,39.918424323854,63",
                        "116.3893797302,39.918774740389,63",
                        "116.38975151697,39.919512572867,63",
                        "116.38918419396,39.920195880857,63",
                        "116.38949301539,39.920578588422,63",
                        "116.39083908858,39.920007275953,63",
                        "116.39100591221,39.919567500159,63",
                        "116.39140443332,39.918472917569,63",
                        "116.3915149412,39.918391435675,63",
                        "116.39249544845,39.918333632023,63",
                        "116.39300111842,39.91889565907,63",
                        "116.39361372909,39.91943948938,63",
                        "116.39436930078,39.919705577807,63"
                    ],
                    "statusList": ["畅通", "畅通", "畅通", "畅通", "缓行", "缓行", "缓行", "拥堵", "拥堵", "严重拥堵", "严重拥堵", "拥堵", "畅通", "缓行", "缓行", "畅通", "畅通", "畅通", "畅通", "畅通", "未知", "未知", "未知"],
                    "statusColorList": {
                        "未知": "0.5,1,0,0",
                        "畅通": "0,1,0,0",
                        "缓行": "1,1,0,0",
                        "拥堵": "1,0.5,0,0",
                        "严重拥堵": "1,0,0,0",
                    },
                    "lineWidth": 3
                }
            },
            {
                "function": "Show",
                "description": "显示指定id的API",
                "jsondata": {
                    "ids": ["交通导航线"]
                }
            },
            {
                "function": "Hidden",
                "description": "隐藏指定id的API",
                "jsondata": {
                    "ids": ["交通导航线"]
                }
            },
            {
                "function": "AllShow",
                "description": "全部显示",
                "jsondata": {}
            },
            {
                "function": "AllHidden",
                "description": "全部隐藏",
                "jsondata": {}
            }
        ]
    },
    {
        "name": "Actor管理",
        "class": "ActorVisible",
        "description": "Actor管理",
        "category": "API|其他|Actor管理",
        "actions": [
            {
                "function": "SetActorVisibleWithTags",
                "description": "设置场景中Actor显影",
                "jsondata": {
                    "tags": ["Wall"],
                    "isVisible": false
                }
            },
            {
                "function": "SetNiagaraVisibleWithTags",
                "description": "设置场景中NiagaraActor显影",
                "jsondata": {
                    "tags": ["Wall"],
                    "isVisible": false
                }
            }
        ]
    }
]

