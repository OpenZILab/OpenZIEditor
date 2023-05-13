"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/12 13:43
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenCoordinatesModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class ScreenCoordinatesModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "WebPoi_id",
            GISType: 0,
            coordinates: { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
            tickTime: 0,
            isOnce: false,
        };
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            coordinates: { Range: { "min": { X: -180, Y: -90, Z: -1000000 }, "max": { X: 180, Y: 90, Z: 1000000 } } },
            tickTime: { Range: { "min": 0, "max": 1000 } },
        };
        this.typeName = "ScreenCoordinates";
        this.funcName = "Add";
        this.InitDataAndRange();
    }
}
exports.ScreenCoordinatesModel = ScreenCoordinatesModel;
//# sourceMappingURL=ScreenCoordinatesModel.js.map