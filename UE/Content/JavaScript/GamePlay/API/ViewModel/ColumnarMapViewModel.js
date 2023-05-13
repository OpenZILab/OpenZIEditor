"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/11/07 18:10
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnarMapViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const ColumnarMapModel_1 = require("../Model/ColumnarMapModel");
const ColumnarMapView_1 = require("../View/ColumnarMapView");
class ColumnarMapViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new ColumnarMapModel_1.ColumnarMapModel();
        this._OBJClass = (0, puerts_1.makeUClass)(ColumnarMapView_1.ColumnarMapView);
        this.Type = "ColumnarMap";
        this.Birthplace = "Scene";
    }
}
exports.ColumnarMapViewModel = ColumnarMapViewModel;
//# sourceMappingURL=ColumnarMapViewModel.js.map