"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 15:06
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficCongestionMapViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const TrafficCongestionMapView_1 = require("../View/TrafficCongestionMapView");
const TrafficCongestionMapModel_1 = require("../Model/TrafficCongestionMapModel");
class TrafficCongestionMapViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new TrafficCongestionMapModel_1.TrafficCongestionMapModel();
        this._OBJClass = (0, puerts_1.makeUClass)(TrafficCongestionMapView_1.TrafficCongestionMapView);
        this.Type = "TrafficCongestionMap";
        this.Birthplace = "Scene";
    }
}
exports.TrafficCongestionMapViewModel = TrafficCongestionMapViewModel;
//# sourceMappingURL=TrafficCongestionMapViewModel.js.map