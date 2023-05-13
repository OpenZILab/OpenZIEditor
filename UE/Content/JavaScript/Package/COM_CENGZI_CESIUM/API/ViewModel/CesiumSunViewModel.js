"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CesiumSunViewModel = void 0;
const BaseViewModel_1 = require("../../../../System/API/ViewModel/BaseViewModel");
const CesiumSunModel_1 = require("../Model/CesiumSunModel");
const CesiumSunView_1 = require("../View/CesiumSunView");
const WebSocketServer_1 = require("../../../../System/API/Handle/WebSocketServer");
const IAPIMessageHandle_1 = require("../../../../System/API/IHandle/IAPIMessageHandle");
class CesiumSunViewModel extends BaseViewModel_1.BaseViewModel {
    OBJ;
    constructor() {
        super();
        this.BaseModel = new CesiumSunModel_1.CesiumSunModel();
        //this._OBJClass = .StaticClass()
        this.OBJ = new CesiumSunView_1.CesiumSunView();
        this.Type = "CesiumSun";
        this.Birthplace = "Coverage";
    }
    UpdateDataTime(jsonData) {
        let _data = jsonData;
        this.BaseModel.SetSingleData(_data.data);
        _data.data = this.BaseModel.GetSingleData();
        if (this.OBJ == null) {
            this.OBJ = new CesiumSunView_1.CesiumSunView();
        }
        let bAutoUpdateTimeZone = _data.data.bAutoUpdateTimeZone;
        let IsTimeZoneSuc = this.OBJ.SetTimeZone(_data.data.TimeZone);
        let IsTimeSuc = this.OBJ.SetTime(_data.data.Time);
        let IsDataSuc = this.OBJ.SetData(_data.data.Data);
        this.OBJ.UpdateSun();
        if (jsonData.data == null) {
            return;
        }
        jsonData.data.result = "success";
        if (IsTimeZoneSuc !== true) {
            jsonData.data.result = IsTimeZoneSuc;
        }
        if (IsTimeSuc !== true) {
            jsonData.data.result = IsTimeSuc;
        }
        if (IsDataSuc != true) {
            jsonData.data.result = IsDataSuc;
        }
        if (jsonData.data.result === "success") {
            if (this.BaseModel.IsOverRange) {
                jsonData.data.result = "success,  but Some data is over the limit";
            }
        }
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(jsonData, jsonData.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
}
exports.CesiumSunViewModel = CesiumSunViewModel;
//# sourceMappingURL=CesiumSunViewModel.js.map