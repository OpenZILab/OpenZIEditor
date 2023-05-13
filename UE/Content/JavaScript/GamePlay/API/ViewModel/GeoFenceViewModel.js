"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 10:14
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoFenceViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const GeoFenceView_1 = require("../View/GeoFenceView");
const GeoFenceModel_1 = require("../Model/GeoFenceModel");
class GeoFenceViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new GeoFenceModel_1.GeoFenceModel();
        this._OBJClass = (0, puerts_1.makeUClass)(GeoFenceView_1.GeoFenceView);
        this.Type = "GeoFence";
        this.Birthplace = "Scene";
    }
}
exports.GeoFenceViewModel = GeoFenceViewModel;
//# sourceMappingURL=GeoFenceViewModel.js.map