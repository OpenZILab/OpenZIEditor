"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlattenModel = void 0;
const BaseModel_1 = require("../../../../System/API/Model/BaseModel");
class FlattenModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "Flatten_id",
            Vectors: []
        };
    }
}
exports.FlattenModel = FlattenModel;
//# sourceMappingURL=FlattenModel.js.map