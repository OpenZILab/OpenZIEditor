"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cesium3DTilesetViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../../System/API/ViewModel/BaseViewModel");
const Cesium3DTilesetModel_1 = require("../Model/Cesium3DTilesetModel");
const Cesium3DTilesetView_1 = require("../View/Cesium3DTilesetView");
const IAPIMessageHandle_1 = require("../../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../../System/API/Handle/WebSocketServer");
class Cesium3DTilesetViewModel extends BaseViewModel_1.BaseViewModel {
    type;
    constructor() {
        super();
        this.BaseModel = new Cesium3DTilesetModel_1.Cesium3DTilesetModel();
        this._OBJClass = (0, puerts_1.makeUClass)(Cesium3DTilesetView_1.Cesium3DTilesetView);
        this.type = "Cesium3DTileset";
        this.Type = "Cesium3DTileset";
        this.Birthplace = "Coverage";
    }
    ExecuteGetAllCesium3DTileset(jsondata) {
        let CesiumModels = [];
        let allModels = this.BaseModel.GetAllData();
        if (allModels.size > 0) {
            allModels.forEach((value, key) => {
                CesiumModels.push(value);
            });
        }
        return CesiumModels;
    }
    ExecuteGetCesium3DTilesetById(jsondata) {
        let id = jsondata.data.id;
        let Model = this.BaseModel.GetData(id);
        return Model;
    }
    GetAllCesium3DTileset(msg) {
        msg.data = this.ExecuteGetAllCesium3DTileset(msg);
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    GetCesium3DTilesetById(msg) {
        msg.data = this.ExecuteGetCesium3DTilesetById(msg);
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
}
exports.Cesium3DTilesetViewModel = Cesium3DTilesetViewModel;
//# sourceMappingURL=Cesium3DTilesetViewModel.js.map