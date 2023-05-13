"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/23 16:40
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoodinateConventerModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class CoodinateConventerModel extends BaseModel_1.BaseModel {
    //DataType
    constructor() {
        super();
        this.DefaultData = {
            coordinateOrigin: { X: 116.38980519225, Y: 39.916786010213, Z: 0.0 },
            projectionCoordinateSystem: "EPSG:4544",
            planetShape: 0,
            GISType: 0,
            originOffset: { X: 0, Y: 0, Z: 0 },
            scale: 100
        };
        //this.DataType = new CoodinateConventerData(this)
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            coordinateOrigin: { Range: { "min": { X: -180, Y: -90, Z: -1000000 }, "max": { X: 180, Y: 90, Z: 1000000 } } },
            planetShape: { Range: { "min": 0, "max": 1 } },
            originOffset: { Range: { "min": { X: -10000, Y: -10000, Z: -10000 }, "max": { X: 10000, Y: 10000, Z: 10000 } } },
            scale: { Range: { "min": 0, "max": 100000 } }
        };
        this.typeName = "CoodinateConventer";
        this.funcName = "Refresh";
        this.InitDataAndRange();
    }
}
exports.CoodinateConventerModel = CoodinateConventerModel;
//# sourceMappingURL=CoodinateConventerModel.js.map