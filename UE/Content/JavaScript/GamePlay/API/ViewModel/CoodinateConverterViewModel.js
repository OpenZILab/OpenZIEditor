"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/229 09:29
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoodinateConverterViewModel = void 0;
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const CoodinateConverterView_1 = require("../View/CoodinateConverterView");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const CoodinateConventerModel_1 = require("../Model/CoodinateConventerModel");
class CoodinateConverterViewModel extends BaseViewModel_1.BaseViewModel {
    OBJ;
    constructor() {
        super();
        this.BaseModel = new CoodinateConventerModel_1.CoodinateConventerModel();
        this.OBJ = new CoodinateConverterView_1.CoodinateConverterView();
        this.Type = "CoodinateConventer";
        this.Birthplace = "Scene";
    }
    SpawnCesiumGeo() {
    }
    RefreshCoordinate(jsonData) {
        let _data = jsonData;
        this.BaseModel.SetSingleData(_data.data);
        _data.data = this.BaseModel.GetSingleData();
        let IsSuccess = this.OBJ.RefreshCoordinate(_data);
        return IsSuccess;
    }
    InitGeo() {
        let temp;
        temp.data = {};
        this.RefreshCoordinate(temp);
    }
    Refresh(msg) {
        let IsSuccess = this.RefreshCoordinate(msg);
        if (IsSuccess !== true) {
            msg.data.result = "Coordinate system switch failed";
        }
        else {
            msg.data.result = "Coordinate system switch successful";
            if (this.BaseModel.IsOverRange) {
                msg.data.result = "Coordinate system switch successful, but Some data is over the limit";
            }
        }
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    GetGISType() {
        return this.OBJ.GetGIS_Type();
    }
    GetScale() {
        return this.OBJ.GetScale();
    }
    SetCesiumGeo(location) {
        this.OBJ.SetCesiumGeoLngLatHeight(location);
    }
    UpdateGeoLngLatHeight(location) {
        this.OBJ.UpdateGeoLngLatHeight(location);
    }
    GetCesiumGeo() {
        return this.OBJ.GeoReferencingSystem;
    }
    GetOriginLocation() {
        return this.OBJ.GetOriginLocation();
    }
    ReturnToplaneOrigin() {
        let SingleData = this.BaseModel.GetSingleData();
        if (SingleData) {
            this.OBJ.RefreshCoordinate({ data: SingleData });
        }
    }
}
exports.CoodinateConverterViewModel = CoodinateConverterViewModel;
//# sourceMappingURL=CoodinateConverterViewModel.js.map