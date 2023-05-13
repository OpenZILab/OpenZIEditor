"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/24 10:00
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OriginDestinationLineViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const OriginDestinationLineModel_1 = require("../Model/OriginDestinationLineModel");
const OriginDestinationLineView_1 = require("../View/OriginDestinationLineView");
class OriginDestinationLineViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new OriginDestinationLineModel_1.OriginDestinationLineModel();
        this._OBJClass = (0, puerts_1.makeUClass)(OriginDestinationLineView_1.OriginDestinationLineView);
        this.Type = "OriginDestinationLine";
        this.Birthplace = "Scene";
    }
}
exports.OriginDestinationLineViewModel = OriginDestinationLineViewModel;
//# sourceMappingURL=OriginDestinationLineViewModel.js.map