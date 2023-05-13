"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/20 23:52
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmAnchorViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const AlarmAnchorModel_1 = require("../Model/AlarmAnchorModel");
const AlarmAnchorView_1 = require("../View/AlarmAnchorView");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const PropertyCopy_1 = require("../../../System/Core/PropertyCopy");
class AlarmAnchorViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new AlarmAnchorModel_1.AlarmAnchorModel();
        this._OBJClass = (0, puerts_1.makeUClass)(AlarmAnchorView_1.AlarmAnchorView);
        this.Type = "AlarmAnchor";
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
        return "STOP All ALARMANCHOR SEND SCREEN COORDINATES";
    }
    CloseAllScreenCoordinates(msg) {
        let result = this.ExecuteCloseAllScreenCoordinates(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
}
exports.AlarmAnchorViewModel = AlarmAnchorViewModel;
//# sourceMappingURL=AlarmAnchorViewModel.js.map