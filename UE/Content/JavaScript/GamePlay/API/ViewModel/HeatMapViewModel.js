"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 18:25
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatMapViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const HeatMapView_1 = require("../View/HeatMapView");
const HeatMapModel_1 = require("../Model/HeatMapModel");
class HeatMapViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new HeatMapModel_1.HeatMapModel();
        this._OBJClass = (0, puerts_1.makeUClass)(HeatMapView_1.HeatMapView);
        this.Type = "HeatMap";
        this.Birthplace = "Scene";
    }
}
exports.HeatMapViewModel = HeatMapViewModel;
//# sourceMappingURL=HeatMapViewModel.js.map