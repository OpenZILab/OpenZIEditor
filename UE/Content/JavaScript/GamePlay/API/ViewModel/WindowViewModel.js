"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/11 18:43
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const WindowView_1 = require("../View/WindowView");
const WindowModel_1 = require("../Model/WindowModel");
class WindowViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new WindowModel_1.WindowModel();
        this._OBJClass = (0, puerts_1.makeUClass)(WindowView_1.WindowView);
        this.Type = "Window";
        this.Birthplace = "Scene";
    }
}
exports.WindowViewModel = WindowViewModel;
//# sourceMappingURL=WindowViewModel.js.map