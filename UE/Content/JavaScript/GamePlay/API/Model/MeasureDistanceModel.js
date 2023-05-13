"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 16:21
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureDistanceModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class MeasureDistanceModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "Measure_id",
            measureType: 1,
            pointColor: { X: 1, Y: 0, Z: 0, W: 1 },
            lineColor: { X: 0, Y: 1, Z: 0, W: 1 },
            MinDistance: 100000,
            MaxDistance: 1000000,
            isAuto: false,
            GISType: 0,
            coordinatesList: [
                { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                { X: 104.06168645118, Y: 30.643228368068, Z: 1.5 },
                { X: 104.06179075814, Y: 30.643229120905, Z: 1.5 },
                { X: 104.06179162878, Y: 30.643138931909, Z: 1.5 },
            ],
        };
        this.DefaultDataRange = {
            measureType: { Range: { "min": 1, "max": 3 } },
            pointColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            lineColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            MinDistance: { Range: { "min": 0, "max": 10000000 } },
            MaxDistance: { Range: { "min": 0, "max": 10000000 } },
        };
        this.typeName = "MeasureDistance";
        this.funcName = "StartMeasure";
        this.InitDataAndRange();
    }
}
exports.MeasureDistanceModel = MeasureDistanceModel;
//# sourceMappingURL=MeasureDistanceModel.js.map