"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/29 18:34
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpticalFlowLineViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const OpticalFlowLineView_1 = require("../View/OpticalFlowLineView");
const OpticalFlowLineModel_1 = require("../Model/OpticalFlowLineModel");
class OpticalFlowLineViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new OpticalFlowLineModel_1.OpticalFlowLineModel();
        this._OBJClass = (0, puerts_1.makeUClass)(OpticalFlowLineView_1.OpticalFlowLineView);
        this.Type = "OpticalFlowLine";
        this.Birthplace = "Scene";
    }
}
exports.OpticalFlowLineViewModel = OpticalFlowLineViewModel;
//# sourceMappingURL=OpticalFlowLineViewModel.js.map