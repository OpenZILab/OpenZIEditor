"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointViewModel = void 0;
const puerts_1 = require("puerts");
const PointView_1 = require("../View/PointView");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const PointModel_1 = require("../Model/PointModel");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const PropertyCopy_1 = require("../../../System/Core/PropertyCopy");
class PointViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new PointModel_1.PointModel();
        this._OBJClass = (0, puerts_1.makeUClass)(PointView_1.PointView);
        this.Type = "POI";
        this.Birthplace = "Scene";
    }
    ExecuteFocus(jsonData) {
        let id = jsonData.data.id;
        let _data = PropertyCopy_1.PropertyCopy.SimpleCopy(jsonData);
        // let _data = jsonData
        if (id == null)
            return "id key no have";
        if (this.OBJMaps.has(id) && this.OBJMaps.get(id) !== null) {
            let curvalue = this.BaseModel.RefreshData(id, _data.data);
            if (curvalue === undefined) {
                return "Update OBJ failed, Some data is over the limit";
            }
            _data.data = this.BaseModel.GetData(id);
            let result = this.OBJMaps.get(id).Focus(_data);
            return result;
        }
        return "OBJ is not vaild";
    }
    Focus(msg) {
        let result = this.ExecuteFocus(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    ExecuteScreenCoordinates(jsonData) {
        let id = jsonData.data.id;
        let _data = PropertyCopy_1.PropertyCopy.SimpleCopy(jsonData);
        // let _data = jsonData
        if (id == null)
            return "id key no have";
        if (this.OBJMaps.has(id) && this.OBJMaps.get(id) !== null) {
            let curvalue = this.BaseModel.RefreshData(id, _data.data);
            if (curvalue === undefined) {
                return "Update OBJ failed, Some data is over the limit";
            }
            _data.data = this.BaseModel.GetData(id);
            let result = this.OBJMaps.get(id).ScreenCoordinates(_data);
            return result;
        }
        return "OBJ is not vaild";
    }
    ScreenCoordinates(msg) {
        let result = this.ExecuteScreenCoordinates(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    ExecuteCloseAllScreenCoordinates(jsonData) {
        jsonData.data.sendScreemCoordinates = false;
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.ScreenCoordinates(jsonData);
            }
        }
        return "STOP All POI SEND SCREEN COORDINATES";
    }
    CloseAllScreenCoordinates(msg) {
        let result = this.ExecuteCloseAllScreenCoordinates(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    ExecuteShow(jsondata) {
        let result = super.ExecuteShow(jsondata);
        let ids = jsondata.data.ids;
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                (this.OBJMaps.get(entry)).bDestory = false;
            }
        }
        return result;
    }
    ExecuteHidden(jsondata) {
        let result = super.ExecuteHidden(jsondata);
        let ids = jsondata.data.ids;
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                (this.OBJMaps.get(entry)).bDestory = true;
            }
        }
        return result;
    }
    ExecuteAllShow(jsondata) {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.SetActorHiddenInGame(false);
                value.bDestory = false;
            }
        }
        return "execution is completed";
    }
    ExecuteAllHidden(jsondata) {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.SetActorHiddenInGame(true);
                value.bDestory = true;
            }
        }
        return "execution is completed";
    }
}
exports.PointViewModel = PointViewModel;
//# sourceMappingURL=PointViewModel.js.map