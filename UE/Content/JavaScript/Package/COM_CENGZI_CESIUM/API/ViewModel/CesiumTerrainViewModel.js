"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CesiumTerrainViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../../System/API/ViewModel/BaseViewModel");
const Cesium3DTilesetModel_1 = require("../Model/Cesium3DTilesetModel");
const Cesium3DTilesetView_1 = require("../View/Cesium3DTilesetView");
const IAPIMessageHandle_1 = require("../../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../../System/API/Handle/WebSocketServer");
const MessageManager_1 = require("../../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../../System/Core/NotificationCore/NotificationLists");
class CesiumTerrainViewModel extends BaseViewModel_1.BaseViewModel {
    type;
    constructor() {
        super();
        this.BaseModel = new Cesium3DTilesetModel_1.Cesium3DTilesetModel();
        this._OBJClass = (0, puerts_1.makeUClass)(Cesium3DTilesetView_1.Cesium3DTilesetView);
        this.type = "CesiumTerrain";
        this.Type = "CesiumTerrain";
        this.Birthplace = "Coverage";
    }
    ExecuteAdd(jsonData) {
        let out = super.ExecuteAdd(jsonData);
        if (out == "success") {
            this.OBJMaps.get(jsonData.data.id).Tags.Add(this.Type);
        }
        return out;
    }
    ExecuteDelete(jsonData) {
        let OutValue = super.ExecuteDelete(jsonData);
        if (OutValue === "success") {
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.CESIUMTERRAIN_DELETE_FINISHED, jsonData.data.ids);
        }
        return OutValue;
    }
    ExecuteClear(jsondata) {
        let OutValue = super.ExecuteClear(jsondata);
        if (OutValue === "execution is completed") {
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.CESIUMTERRAIN_CLEAR_FINISHED);
        }
        return OutValue;
    }
    ExecuteGetAllCesiumTerrain(jsondata) {
        let CesiumTerrainModels = [];
        let allModels = this.BaseModel.GetAllData();
        if (allModels.size > 0) {
            allModels.forEach((value, key) => {
                CesiumTerrainModels.push(value);
            });
        }
        return CesiumTerrainModels;
    }
    ExecuteGetCesiumTerrainById(jsondata) {
        let id = jsondata.data.id;
        let Model = this.BaseModel.GetData(id);
        return Model;
    }
    GetAllCesiumTerrain(msg) {
        msg.data = this.ExecuteGetAllCesiumTerrain(msg);
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    GetCesiumTerrainById(msg) {
        msg.data = this.ExecuteGetCesiumTerrainById(msg);
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
}
exports.CesiumTerrainViewModel = CesiumTerrainViewModel;
//# sourceMappingURL=CesiumTerrainViewModel.js.map