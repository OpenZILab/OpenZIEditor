///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/1 16:21
///

import { CoodinateConverterViewModel } from "../../GamePlay/API/ViewModel/CoodinateConverterViewModel"
import { AlarmAnchorViewModel } from "../../GamePlay/API/ViewModel/AlarmAnchorViewModel"
import { GeoFenceViewModel } from "../../GamePlay/API/ViewModel/GeoFenceViewModel"
import { TrafficCongestionMapViewModel } from "../../GamePlay/API/ViewModel/TrafficCongestionMapViewModel"
import { GeoOverlayViewModel } from "../../GamePlay/API/ViewModel/GeoOverlayViewModel"
import { HeatMapViewModel } from "../../GamePlay/API/ViewModel/HeatMapViewModel"
import { WindowViewModel } from "../../GamePlay/API/ViewModel/WindowViewModel"
import { ScreenCoordinatesViewModel } from "../../GamePlay/API/ViewModel/ScreenCoordinatesViewModel"
import { ObserverPawnViewModel } from "../../GamePlay/API/ViewModel/ObseverPawnViewModel"
import { DrawPointViewModel } from "../../GamePlay/API/ViewModel/DrawPointViewModel"
import { DrawLineViewModel } from "../../GamePlay/API/ViewModel/DrawLineViewModel"
import { DrawPlaneViewModel } from "../../GamePlay/API/ViewModel/DrawPlaneViewModel"
import { MeasureAreaViewModel } from "../../GamePlay/API/ViewModel/MeasureAreaViewModel"
import { MeasureDistanceViewModel } from "../../GamePlay/API/ViewModel/MeasureDistanceViewModel"
import { MeasureCoordinatesViewModel } from "../../GamePlay/API/ViewModel/MeasureCoordinatesViewModel"
import { CesiumTerrainViewModel } from "../../Package/COM_CENGZI_CESIUM/API/ViewModel/CesiumTerrainViewModel"
import { FlattenViewModel } from "../../Package/COM_CENGZI_CESIUM/API/ViewModel/FlattenViewModel"
import { CesiumSunViewModel } from "../../Package/COM_CENGZI_CESIUM/API/ViewModel/CesiumSunViewModel"
import { TrenchingViewModel } from "../../Package/COM_CENGZI_CESIUM/API/ViewModel/TrenchingViewModel"
import {
    CesiumRasterOverlayViewModel
} from "../../Package/COM_CENGZI_CESIUM/API/ViewModel/CesiumRasterOverlayViewModel"
import { Cesium3DTilesetViewModel } from "../../Package/COM_CENGZI_CESIUM/API/ViewModel/Cesium3DTilesetViewModel"
import { BaseViewModel } from "./ViewModel/BaseViewModel"
import { Sigleton } from "../Core/Sigleton"
import { PointViewModel } from "../../GamePlay/API/ViewModel/PointViewModel"
import { LevelViewModel } from "../../GamePlay/API/ViewModel/LevelViewModel"
import { DrawViewModel } from "../../GamePlay/API/ViewModel/DrawViewModel"
import { MeasureViewModel } from "../../GamePlay/API/ViewModel/MeasureViewModel"
import { ColumnarMapViewModel } from "../../GamePlay/API/ViewModel/ColumnarMapViewModel";
import { ViewshedAnalysisViewModel } from "../../GamePlay/API/ViewModel/ViewshedAnalysisViewModel";
import { SceneViewingViewModel } from "../../GamePlay/API/ViewModel/SceneViewingViewModel";
import { DynamicWeatherViewModel } from "../../GamePlay/API/ViewModel/DynamicWeatherViewModel";
import { OriginDestinationLineViewModel } from "../../GamePlay/API/ViewModel/OriginDestinationLineViewModel";
import { OpticalFlowLineViewModel } from "../../GamePlay/API/ViewModel/OpticalFlowLineViewModel";
import { LightEffectFlowLineViewModel } from "../../GamePlay/API/ViewModel/LightEffectFlowLineViewModel"
import { PackCallBacKMessage } from "./IHandle/IAPIMessageHandle"
import { WebSocketServer } from "./Handle/WebSocketServer"
import { ColumnarMapTwoViewModel } from "../../GamePlay/API/ViewModel/ColumnarMapTwoViewModel";
import { MessageCenter } from "../Core/NotificationCore/MessageManager"
import { NotificationLists } from "../Core/NotificationCore/NotificationLists"

import * as UE from "ue"

interface TType<T> extends Function {
    new(...args: any[]): T
}
const DrawClass = ["DrawLine", "DrawPoint", "DrawPlane", "MeasureArea", "MeasureDistance", "MeasureCoordinates"]

export enum ApiType {
    Scene,
    Coverage,
    Setting,
    Control
}

export class APIViewModelSystem extends Sigleton {
    ViewModels: Array<BaseViewModel> = new Array<BaseViewModel>()

    //draw mutex
    bDrawingType: string = ""
    bDrawingId: string = ""

    static GetInstance(): APIViewModelSystem {
        return super.TakeInstance(APIViewModelSystem)
    }

    public OnInit() {
        this.RegisterLink(Cesium3DTilesetViewModel)
        this.RegisterLink(FlattenViewModel)
        this.RegisterLink(TrenchingViewModel)
        this.RegisterLink(CesiumRasterOverlayViewModel)
        this.RegisterLink(CesiumTerrainViewModel)
        // this.RegisterLink(CesiumSunViewModel)

        //Game
        this.RegisterLink(CoodinateConverterViewModel)
        this.RegisterLink(AlarmAnchorViewModel)
        this.RegisterLink(GeoFenceViewModel)
        this.RegisterLink(TrafficCongestionMapViewModel)
        this.RegisterLink(ColumnarMapViewModel)
        this.RegisterLink(GeoOverlayViewModel)
        this.RegisterLink(HeatMapViewModel)
        this.RegisterLink(WindowViewModel)
        this.RegisterLink(ScreenCoordinatesViewModel)
        this.RegisterLink(ObserverPawnViewModel)
        this.RegisterLink(DrawPointViewModel)
        this.RegisterLink(DrawLineViewModel)
        this.RegisterLink(DrawPlaneViewModel)
        this.RegisterLink(DrawViewModel)
        this.RegisterLink(MeasureAreaViewModel)
        this.RegisterLink(MeasureDistanceViewModel)
        this.RegisterLink(MeasureCoordinatesViewModel)
        this.RegisterLink(MeasureViewModel)
        this.RegisterLink(PointViewModel)
        this.RegisterLink(LevelViewModel)
        this.RegisterLink(ViewshedAnalysisViewModel)
        this.RegisterLink(SceneViewingViewModel)
        this.RegisterLink(DynamicWeatherViewModel)
        this.RegisterLink(OriginDestinationLineViewModel)
        this.RegisterLink(OpticalFlowLineViewModel)
        this.RegisterLink(LightEffectFlowLineViewModel)
        this.RegisterLink(ColumnarMapTwoViewModel)
        let DigitalRequire = require("../../GamePlay/API/ViewModel/DigitalTwinViewModel")
        this.RegisterLink(DigitalRequire.DigitalTwinViewModel)
        let PrefabRequire = require("../../GamePlay/API/ViewModel/PrefabViewModel")
        this.RegisterLink(PrefabRequire.PrefabViewModel)
        this.RegisterLink(ObserverPawnViewModel)

    }

    RegisterLink<T extends BaseViewModel>(Class: TType<T>) {
        this.ViewModels.push(new Class())
    }

    GetViewModel<T extends BaseViewModel>(Class: TType<T>): T {
        let FindViewModel: BaseViewModel = this.ViewModels.find((ViewModel: BaseViewModel) => {
            return ViewModel.constructor.name === Class.name
        })
        return FindViewModel as T
    }

    GetViewModelByType(_type) {
        let FindViewModel: BaseViewModel = this.ViewModels.find((ViewModel: BaseViewModel) => {
            return ViewModel.GetType() === _type
        })
        return FindViewModel
    }

    GetAllViewModel() {
        return this.ViewModels
    }

    ClearAllView(msg) {
        let result = ""

        if (this.ViewModels.length > 0) {
            this.ViewModels.forEach(item => {
                if (item.GetType() != "DynamicWeather") {
                    if (item.OBJMaps.size > 0) {
                        let ids: string[] = []
                        item.OBJMaps.forEach((value, key) => {
                            if (value && value instanceof UE.Actor) {
                                let SceneNodeRequire = require("../Project/Scene/SceneNodeUtil")
                                let Node = SceneNodeRequire.NodeHelper.FindNodeByActor(value)
                                if(!Node) return
                                if (Node && Node.GetTags().includes("ChildPrefab") || Node.GetParent().GetNodeType() == "Twin" || Node.GetTags().includes("ParentPrefab")) {
                                }
                                else {
                                    ids.push(key)
                                }
                            }
                        })
                        item.ExecuteDelete({ data: { ids } })

                    }
                }
            })
            let require_Engine = require("../Engine/QEngine")
            let require_Scene = require("../Project/Scene/SceneSystem")

            require_Engine.GetSystem(require_Scene.SceneSystem).GetCurrentScene().GetNodeByName("APIAsset")?.SetChildNodes([])

            MessageCenter.Execute(NotificationLists.SCENE.ON_SCENETREE_CHANGED)
            result = "success"
        } else {
            result = "No content clearing"
        }
        msg.data.result = result
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)

    }
    ClearViewByType(msg) {
        let result = ""
        if (this.ViewModels.length > 0) {
            this.ViewModels.forEach(item => {
                let type = null
                if (typeof (msg.data.apiType) == "string") {
                    type = msg.data.apiType
                } else if (typeof (msg.data.apiType) == "number") {
                    type = ApiType[msg.data.apiType]
                }
                if (item.Birthplace == type && item.OBJMaps.size > 0) {
                    // msg.classDef = item.GetType()
                    // msg.funcDef = "ClearAll"
                    result = item.ExecuteClear(msg)
                }
            })
            result = "success"
        } else {
            result = "No content clearing"
        }
        msg.data.result = result
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)

    }



    RegisterDrawFunc(viewModelType, endDrawId) {
        this.bDrawingId = endDrawId
        this.bDrawingType = viewModelType
    }
    UnregisterDrawFunc() {
        this.bDrawingId = ""
        this.bDrawingType = ""
    }
    EndDrawing() {
        if (DrawClass.includes(this.bDrawingType)) {
            if (this.bDrawingId != "") {
                let CurViewModel = this.GetViewModelByType(this.bDrawingType)
                if (CurViewModel && this.bDrawingId != "") {
                    CurViewModel.EndDrawing(this.bDrawingId)
                    this.UnregisterDrawFunc()
                }
            }
        }
    }
}

export function GetViewModelByType(type: string) {
    return APIViewModelSystem.GetInstance().GetViewModelByType(type)
}

export function GetViewModel<T extends BaseViewModel>(TClass: TType<T>): T {
    return APIViewModelSystem.GetInstance().GetViewModel(TClass) as T;
}