"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/16 11:37
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicWeatherViewModel = void 0;
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const DynamicWeatherModel_1 = require("../Model/DynamicWeatherModel");
const UE = require("ue");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const PropertyCopy_1 = require("../../../System/Core/PropertyCopy");
class DynamicWeatherViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new DynamicWeatherModel_1.DynamicWeatherModel();
        this._OBJClass = UE.Class.Load("/DynamicWeather/DynamicWeather/Blueprints/BP_DynamicSKY.BP_DynamicSKY_C");
        this.Type = "DynamicWeather";
        this.Birthplace = "Setting";
    }
    Add(msg) {
        let CurMsg = PropertyCopy_1.PropertyCopy.SimpleCopy(msg);
        if (msg.data == null)
            return;
        let result = this.ExecuteAdd(msg);
        CurMsg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(CurMsg, CurMsg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    ChangeHour(msg) {
        let _data = msg.data;
        let id = _data.id;
        let result;
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            result = this.OBJMaps.get(id).ChangeHour(_data.time);
        }
        else {
            result = "The current id does not exist";
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg_temp, { result: result });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    Auto24HourChange(msg) {
        let _data = msg.data;
        let id = _data.id;
        let result;
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).Auto24HourChange(_data.DayVariation, _data.IsStartFormCurrentTime, _data.IsLoop, msg.callback);
            result = "24 Hour Change";
        }
        else {
            result = "The current id does not exist";
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg_temp, { result: result });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    Stop24HourChange(msg) {
        let _data = msg.data;
        let id = _data.id;
        let result;
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).Stop24HourChange();
            result = "Stop 24 Hour Change";
        }
        else {
            result = "The current id does not exist";
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg_temp, { result: result });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    ChangeFourSeasons(msg) {
        let _data = msg.data;
        let id = _data.id;
        let result;
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).ChangeFourSeasons(_data.Seasons);
            result = "Change Four Seasons";
        }
        else {
            result = "The current id does not exist";
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg_temp, { result: result });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    ChangeClimate(msg) {
        let _data = msg.data;
        let id = _data.id;
        let result;
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).ChangeClimate(_data);
            result = "Change Climate";
        }
        else {
            result = "The current id does not exist";
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg_temp, { result: result });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    SaveSkyConfiguration(msg) {
        let _data = msg.data;
        let id = _data.id;
        let result;
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).SaveSkyConfiguration(_data);
            result = "Save Success";
        }
        else {
            result = "The current id does not exist";
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg_temp, { result: result });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    LoadSkyConfiguration(msg) {
        let _data = msg.data;
        let id = _data.id;
        let result;
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            let result_temp = this.OBJMaps.get(id).LoadSkyConfiguration(_data);
            result = result_temp;
        }
        else {
            result = "The current id does not exist";
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg_temp, { result: result });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
}
exports.DynamicWeatherViewModel = DynamicWeatherViewModel;
//# sourceMappingURL=DynamicWeatherViewModel.js.map