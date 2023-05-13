"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/1 16:21
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetViewModel = exports.GetViewModelByType = exports.APIViewModelSystem = exports.ApiType = void 0;
const CoodinateConverterViewModel_1 = require("../../GamePlay/API/ViewModel/CoodinateConverterViewModel");
const AlarmAnchorViewModel_1 = require("../../GamePlay/API/ViewModel/AlarmAnchorViewModel");
const GeoFenceViewModel_1 = require("../../GamePlay/API/ViewModel/GeoFenceViewModel");
const TrafficCongestionMapViewModel_1 = require("../../GamePlay/API/ViewModel/TrafficCongestionMapViewModel");
const GeoOverlayViewModel_1 = require("../../GamePlay/API/ViewModel/GeoOverlayViewModel");
const HeatMapViewModel_1 = require("../../GamePlay/API/ViewModel/HeatMapViewModel");
const WindowViewModel_1 = require("../../GamePlay/API/ViewModel/WindowViewModel");
const ScreenCoordinatesViewModel_1 = require("../../GamePlay/API/ViewModel/ScreenCoordinatesViewModel");
const ObseverPawnViewModel_1 = require("../../GamePlay/API/ViewModel/ObseverPawnViewModel");
const DrawPointViewModel_1 = require("../../GamePlay/API/ViewModel/DrawPointViewModel");
const DrawLineViewModel_1 = require("../../GamePlay/API/ViewModel/DrawLineViewModel");
const DrawPlaneViewModel_1 = require("../../GamePlay/API/ViewModel/DrawPlaneViewModel");
const MeasureAreaViewModel_1 = require("../../GamePlay/API/ViewModel/MeasureAreaViewModel");
const MeasureDistanceViewModel_1 = require("../../GamePlay/API/ViewModel/MeasureDistanceViewModel");
const MeasureCoordinatesViewModel_1 = require("../../GamePlay/API/ViewModel/MeasureCoordinatesViewModel");
const CesiumTerrainViewModel_1 = require("../../Package/COM_CENGZI_CESIUM/API/ViewModel/CesiumTerrainViewModel");
const FlattenViewModel_1 = require("../../Package/COM_CENGZI_CESIUM/API/ViewModel/FlattenViewModel");
const TrenchingViewModel_1 = require("../../Package/COM_CENGZI_CESIUM/API/ViewModel/TrenchingViewModel");
const CesiumRasterOverlayViewModel_1 = require("../../Package/COM_CENGZI_CESIUM/API/ViewModel/CesiumRasterOverlayViewModel");
const Cesium3DTilesetViewModel_1 = require("../../Package/COM_CENGZI_CESIUM/API/ViewModel/Cesium3DTilesetViewModel");
const Sigleton_1 = require("../Core/Sigleton");
const PointViewModel_1 = require("../../GamePlay/API/ViewModel/PointViewModel");
const LevelViewModel_1 = require("../../GamePlay/API/ViewModel/LevelViewModel");
const DrawViewModel_1 = require("../../GamePlay/API/ViewModel/DrawViewModel");
const MeasureViewModel_1 = require("../../GamePlay/API/ViewModel/MeasureViewModel");
const ColumnarMapViewModel_1 = require("../../GamePlay/API/ViewModel/ColumnarMapViewModel");
const ViewshedAnalysisViewModel_1 = require("../../GamePlay/API/ViewModel/ViewshedAnalysisViewModel");
const SceneViewingViewModel_1 = require("../../GamePlay/API/ViewModel/SceneViewingViewModel");
const DynamicWeatherViewModel_1 = require("../../GamePlay/API/ViewModel/DynamicWeatherViewModel");
const OriginDestinationLineViewModel_1 = require("../../GamePlay/API/ViewModel/OriginDestinationLineViewModel");
const OpticalFlowLineViewModel_1 = require("../../GamePlay/API/ViewModel/OpticalFlowLineViewModel");
const LightEffectFlowLineViewModel_1 = require("../../GamePlay/API/ViewModel/LightEffectFlowLineViewModel");
const IAPIMessageHandle_1 = require("./IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("./Handle/WebSocketServer");
const ColumnarMapTwoViewModel_1 = require("../../GamePlay/API/ViewModel/ColumnarMapTwoViewModel");
const MessageManager_1 = require("../Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../Core/NotificationCore/NotificationLists");
const UE = require("ue");
const DrawClass = ["DrawLine", "DrawPoint", "DrawPlane", "MeasureArea", "MeasureDistance", "MeasureCoordinates"];
var ApiType;
(function (ApiType) {
    ApiType[ApiType["Scene"] = 0] = "Scene";
    ApiType[ApiType["Coverage"] = 1] = "Coverage";
    ApiType[ApiType["Setting"] = 2] = "Setting";
    ApiType[ApiType["Control"] = 3] = "Control";
})(ApiType = exports.ApiType || (exports.ApiType = {}));
class APIViewModelSystem extends Sigleton_1.Sigleton {
    ViewModels = new Array();
    //draw mutex
    bDrawingType = "";
    bDrawingId = "";
    static GetInstance() {
        return super.TakeInstance(APIViewModelSystem);
    }
    OnInit() {
        this.RegisterLink(Cesium3DTilesetViewModel_1.Cesium3DTilesetViewModel);
        this.RegisterLink(FlattenViewModel_1.FlattenViewModel);
        this.RegisterLink(TrenchingViewModel_1.TrenchingViewModel);
        this.RegisterLink(CesiumRasterOverlayViewModel_1.CesiumRasterOverlayViewModel);
        this.RegisterLink(CesiumTerrainViewModel_1.CesiumTerrainViewModel);
        // this.RegisterLink(CesiumSunViewModel)
        //Game
        this.RegisterLink(CoodinateConverterViewModel_1.CoodinateConverterViewModel);
        this.RegisterLink(AlarmAnchorViewModel_1.AlarmAnchorViewModel);
        this.RegisterLink(GeoFenceViewModel_1.GeoFenceViewModel);
        this.RegisterLink(TrafficCongestionMapViewModel_1.TrafficCongestionMapViewModel);
        this.RegisterLink(ColumnarMapViewModel_1.ColumnarMapViewModel);
        this.RegisterLink(GeoOverlayViewModel_1.GeoOverlayViewModel);
        this.RegisterLink(HeatMapViewModel_1.HeatMapViewModel);
        this.RegisterLink(WindowViewModel_1.WindowViewModel);
        this.RegisterLink(ScreenCoordinatesViewModel_1.ScreenCoordinatesViewModel);
        this.RegisterLink(ObseverPawnViewModel_1.ObserverPawnViewModel);
        this.RegisterLink(DrawPointViewModel_1.DrawPointViewModel);
        this.RegisterLink(DrawLineViewModel_1.DrawLineViewModel);
        this.RegisterLink(DrawPlaneViewModel_1.DrawPlaneViewModel);
        this.RegisterLink(DrawViewModel_1.DrawViewModel);
        this.RegisterLink(MeasureAreaViewModel_1.MeasureAreaViewModel);
        this.RegisterLink(MeasureDistanceViewModel_1.MeasureDistanceViewModel);
        this.RegisterLink(MeasureCoordinatesViewModel_1.MeasureCoordinatesViewModel);
        this.RegisterLink(MeasureViewModel_1.MeasureViewModel);
        this.RegisterLink(PointViewModel_1.PointViewModel);
        this.RegisterLink(LevelViewModel_1.LevelViewModel);
        this.RegisterLink(ViewshedAnalysisViewModel_1.ViewshedAnalysisViewModel);
        this.RegisterLink(SceneViewingViewModel_1.SceneViewingViewModel);
        this.RegisterLink(DynamicWeatherViewModel_1.DynamicWeatherViewModel);
        this.RegisterLink(OriginDestinationLineViewModel_1.OriginDestinationLineViewModel);
        this.RegisterLink(OpticalFlowLineViewModel_1.OpticalFlowLineViewModel);
        this.RegisterLink(LightEffectFlowLineViewModel_1.LightEffectFlowLineViewModel);
        this.RegisterLink(ColumnarMapTwoViewModel_1.ColumnarMapTwoViewModel);
        let DigitalRequire = require("../../GamePlay/API/ViewModel/DigitalTwinViewModel");
        this.RegisterLink(DigitalRequire.DigitalTwinViewModel);
        let PrefabRequire = require("../../GamePlay/API/ViewModel/PrefabViewModel");
        this.RegisterLink(PrefabRequire.PrefabViewModel);
        this.RegisterLink(ObseverPawnViewModel_1.ObserverPawnViewModel);
    }
    RegisterLink(Class) {
        this.ViewModels.push(new Class());
    }
    GetViewModel(Class) {
        let FindViewModel = this.ViewModels.find((ViewModel) => {
            return ViewModel.constructor.name === Class.name;
        });
        return FindViewModel;
    }
    GetViewModelByType(_type) {
        let FindViewModel = this.ViewModels.find((ViewModel) => {
            return ViewModel.GetType() === _type;
        });
        return FindViewModel;
    }
    GetAllViewModel() {
        return this.ViewModels;
    }
    ClearAllView(msg) {
        let result = "";
        if (this.ViewModels.length > 0) {
            this.ViewModels.forEach(item => {
                if (item.GetType() != "DynamicWeather") {
                    if (item.OBJMaps.size > 0) {
                        let ids = [];
                        item.OBJMaps.forEach((value, key) => {
                            if (value && value instanceof UE.Actor) {
                                let SceneNodeRequire = require("../Project/Scene/SceneNodeUtil");
                                let Node = SceneNodeRequire.NodeHelper.FindNodeByActor(value);
                                if (!Node)
                                    return;
                                if (Node && Node.GetTags().includes("ChildPrefab") || Node.GetParent().GetNodeType() == "Twin" || Node.GetTags().includes("ParentPrefab")) {
                                }
                                else {
                                    ids.push(key);
                                }
                            }
                        });
                        item.ExecuteDelete({ data: { ids } });
                    }
                }
            });
            let require_Engine = require("../Engine/QEngine");
            let require_Scene = require("../Project/Scene/SceneSystem");
            require_Engine.GetSystem(require_Scene.SceneSystem).GetCurrentScene().GetNodeByName("APIAsset")?.SetChildNodes([]);
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.SCENE.ON_SCENETREE_CHANGED);
            result = "success";
        }
        else {
            result = "No content clearing";
        }
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    ClearViewByType(msg) {
        let result = "";
        if (this.ViewModels.length > 0) {
            this.ViewModels.forEach(item => {
                let type = null;
                if (typeof (msg.data.apiType) == "string") {
                    type = msg.data.apiType;
                }
                else if (typeof (msg.data.apiType) == "number") {
                    type = ApiType[msg.data.apiType];
                }
                if (item.Birthplace == type && item.OBJMaps.size > 0) {
                    // msg.classDef = item.GetType()
                    // msg.funcDef = "ClearAll"
                    result = item.ExecuteClear(msg);
                }
            });
            result = "success";
        }
        else {
            result = "No content clearing";
        }
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    RegisterDrawFunc(viewModelType, endDrawId) {
        this.bDrawingId = endDrawId;
        this.bDrawingType = viewModelType;
    }
    UnregisterDrawFunc() {
        this.bDrawingId = "";
        this.bDrawingType = "";
    }
    EndDrawing() {
        if (DrawClass.includes(this.bDrawingType)) {
            if (this.bDrawingId != "") {
                let CurViewModel = this.GetViewModelByType(this.bDrawingType);
                if (CurViewModel && this.bDrawingId != "") {
                    CurViewModel.EndDrawing(this.bDrawingId);
                    this.UnregisterDrawFunc();
                }
            }
        }
    }
}
exports.APIViewModelSystem = APIViewModelSystem;
function GetViewModelByType(type) {
    return APIViewModelSystem.GetInstance().GetViewModelByType(type);
}
exports.GetViewModelByType = GetViewModelByType;
function GetViewModel(TClass) {
    return APIViewModelSystem.GetInstance().GetViewModel(TClass);
}
exports.GetViewModel = GetViewModel;
//# sourceMappingURL=ApiViewModelSystem.js.map