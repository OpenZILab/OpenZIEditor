"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/11/07 18:12
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnarMapModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class ColumnarMapModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "银行热力图",
            GISType: 0,
            pointsInfoList: [
                { X: 104.071323, Y: 30.675918, Z: 2345 }
            ],
            columnarColor: { X: 1, Y: 0, Z: 0, W: 1 },
            otherColor: { X: 0, Y: 1, Z: 0, W: 1 },
            borderColor: { X: 0, Y: 0.2, Z: 1, W: 1 },
            scaleXY: 1,
            spacingRatio: 0.5,
            maxHeight: 1,
            mapHeight: 6100,
            IsVisibleNumbew: false,
            NumberColor: { X: 0, Y: 1, Z: 0, W: 1 }
        };
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            pointsInfoList: { Range: { "min": { X: -180, Y: -90, Z: 0 }, "max": { X: 180, Y: 90, Z: 100000000 } } },
            columnarColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            otherColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            borderColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            scaleXY: { Range: { "min": 1, "max": 1000000 } },
            spacingRatio: { Range: { "min": 0, "max": 1 } },
            maxHeight: { Range: { "min": 1, "max": 1000000 } },
            mapHeight: { Range: { "min": -1000000, "max": 1000000 } },
            NumberColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
        };
        this.typeName = "ColumnarMap";
        this.funcName = "Add";
        this.InitDataAndRange();
    }
}
exports.ColumnarMapModel = ColumnarMapModel;
//# sourceMappingURL=ColumnarMapModel.js.map