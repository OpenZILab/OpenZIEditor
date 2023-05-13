"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:31
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoOverlayViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const GeoOverlayModel_1 = require("../Model/GeoOverlayModel");
const GeoOverlayView_1 = require("../View/GeoOverlayView");
class GeoOverlayViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new GeoOverlayModel_1.GeoOverlayModel();
        this._OBJClass = (0, puerts_1.makeUClass)(GeoOverlayView_1.GeoOverlayView);
        this.Type = "GeoOverlay";
        this.Birthplace = "Scene";
    }
}
exports.GeoOverlayViewModel = GeoOverlayViewModel;
//# sourceMappingURL=GeoOverlayViewModel.js.map