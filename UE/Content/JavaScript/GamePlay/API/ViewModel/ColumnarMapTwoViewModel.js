"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/02/26 17:35
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnarMapTwoViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const ColumnarMapTwoModel_1 = require("../Model/ColumnarMapTwoModel");
const ColumnarMapTwoView_1 = require("../View/ColumnarMapTwoView");
class ColumnarMapTwoViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new ColumnarMapTwoModel_1.ColumnarMapTwoModel();
        this._OBJClass = (0, puerts_1.makeUClass)(ColumnarMapTwoView_1.ColumnarMapTwoView);
        this.Type = "ColumnarMapTwo";
        this.Birthplace = "Scene";
    }
}
exports.ColumnarMapTwoViewModel = ColumnarMapTwoViewModel;
//# sourceMappingURL=ColumnarMapTwoViewModel.js.map