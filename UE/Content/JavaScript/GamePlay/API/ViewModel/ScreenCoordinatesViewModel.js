"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/12 13:43
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenCoordinatesViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const ScreenCoordinatesModel_1 = require("../Model/ScreenCoordinatesModel");
const ScreenCoordinatesView_1 = require("../View/ScreenCoordinatesView");
class ScreenCoordinatesViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new ScreenCoordinatesModel_1.ScreenCoordinatesModel();
        this._OBJClass = (0, puerts_1.makeUClass)(ScreenCoordinatesView_1.ScreenCoordinatesView);
        this.Type = "ScreenCoordinates";
        this.Birthplace = "Scene";
    }
}
exports.ScreenCoordinatesViewModel = ScreenCoordinatesViewModel;
//# sourceMappingURL=ScreenCoordinatesViewModel.js.map