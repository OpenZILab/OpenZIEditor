"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 18:30
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatMapModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class HeatMapModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "银行热力图",
            GISType: 0,
            coordinatesList: [
                { X: 104.071323, Y: 30.675918, Z: 0 },
                { X: 104.077622, Y: 30.556917, Z: 0 },
                { X: 104.066871, Y: 30.66763, Z: 0 },
                { X: 104.077699, Y: 30.669349, Z: 0 },
                { X: 104.071451, Y: 30.577177, Z: 0 },
                { X: 104.062801, Y: 30.512584, Z: 0 },
                { X: 104.079086, Y: 30.557013, Z: 0 },
                { X: 104.161652, Y: 30.63338, Z: 0 }
            ],
            sizeList: [],
            pointMaxRadius: 500,
            heightScale: 1,
            contrast: 1,
            mapHeight: 1,
        };
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            coordinatesList: { Range: { "min": { X: -180, Y: -90, Z: -100000000 }, "max": { X: 180, Y: 90, Z: 1000000000 } } },
            pointMaxRadius: { Range: { "min": 0, "max": 10000000 } },
            heightScale: { Range: { "min": 0, "max": 10000000 } },
            contrast: { Range: { "min": 0, "max": 10000000 } },
            mapHeight: { Range: { "min": -10000000, "max": 10000000 } },
            fillColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } }
        };
        this.typeName = "HeatMap";
        this.funcName = "Add";
        this.InitDataAndRange();
    }
}
exports.HeatMapModel = HeatMapModel;
//# sourceMappingURL=HeatMapModel.js.map