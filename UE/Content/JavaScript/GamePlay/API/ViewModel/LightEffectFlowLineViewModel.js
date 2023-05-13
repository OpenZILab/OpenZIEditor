"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/01/12 10:55
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightEffectFlowLineViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const LightEffectFlowLineModel_1 = require("../Model/LightEffectFlowLineModel");
const LightEffectFlowLineView_1 = require("../View/LightEffectFlowLineView");
class LightEffectFlowLineViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new LightEffectFlowLineModel_1.LightEffectFlowLineModel();
        this._OBJClass = (0, puerts_1.makeUClass)(LightEffectFlowLineView_1.LightEffectFlowLineView);
        this.Type = "LightEffectFlowLine";
        this.Birthplace = "Scene";
    }
}
exports.LightEffectFlowLineViewModel = LightEffectFlowLineViewModel;
//# sourceMappingURL=LightEffectFlowLineViewModel.js.map