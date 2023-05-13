"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/23 16:40
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefabModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class PrefabModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "PrefabModel_id",
            GISType: 0,
            coordinates: { X: 104.06173904, Y: 30.64318365, Z: 0 },
            prefabType: ""
        };
        this.DefaultDataRange = {
            GISType: { Range: { min: 0, max: 3 } },
            coordinates: { Range: { "min": { X: -180, Y: -90, Z: -1000000 }, "max": { X: 180, Y: 90, Z: 1000000 } } },
        };
        // this.typeName = "DigitalTwin"
        // this.funcName = "Add"
        // this.InitDataAndRange()
    }
}
exports.PrefabModel = PrefabModel;
//# sourceMappingURL=PrefabModel.js.map