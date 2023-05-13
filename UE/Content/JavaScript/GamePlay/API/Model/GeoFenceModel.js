"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 10:16
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoFenceModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class GeoFenceModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "GeoFence_id",
            GISType: 0,
            coordinatesList: [
                { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                { X: 104.06168645118, Y: 30.643228368068, Z: 1.5 },
                { X: 104.06179075814, Y: 30.643229120905, Z: 1.5 },
                { X: 104.06179162878, Y: 30.643138931909, Z: 1.5 },
            ],
            height: 500,
            bottomVisible: true,
            FencewallColor: { X: 1, Y: 1, Z: 0, W: 1 },
            FencewallLineNumber: 5,
            FencebottomColor: { X: 0, Y: 1, Z: 1, W: 0.5 },
            FencewallUseCustomMaterial: false,
            FencewallMaterial: "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst",
            FencebottomUseCustomMaterial: false,
            FencebottomMaterial: "/OpenZIAPI/Asset/Material/ff_Material_tSimple_Inst"
        };
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            coordinatesList: { Range: { "min": { X: -180, Y: -90, Z: -1000000 }, "max": { X: 180, Y: 90, Z: 1000000 } } },
            height: { Range: { "min": 0, "max": 10000000 } },
            FencewallColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            FencebottomColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } }
        };
        this.typeName = "GeoFence";
        this.funcName = "Add";
        this.InitDataAndRange();
    }
}
exports.GeoFenceModel = GeoFenceModel;
//# sourceMappingURL=GeoFenceModel.js.map