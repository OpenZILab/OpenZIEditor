"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/24 10:01
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OriginDestinationLineModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class OriginDestinationLineModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "OriginDestinationLine_id",
            GISType: 0,
            start: { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
            end: { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
            middleHeight: 5000,
            lineColor: { X: 1, Y: 0, Z: 0, W: 1 },
            lineGlow: 2,
            lineRadius: 0.5,
            flowColor: { X: 0, Y: 0, Z: 1, W: 1 },
            flowScale: 40,
            flowRate: 1 //Optical flow rate (control the flow speed time and the number of optical flow particles)
        };
        this.DefaultDataRange = {};
    }
}
exports.OriginDestinationLineModel = OriginDestinationLineModel;
//# sourceMappingURL=OriginDestinationLineModel.js.map