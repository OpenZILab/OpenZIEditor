"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/01/12 10:57
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightEffectFlowLineModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class LightEffectFlowLineModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "LightEffectFlowLine_id",
            GISType: 0,
            coordinatesList: [
                { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                { X: 104.06168645118, Y: 30.643228368068, Z: 1.5 },
                { X: 104.06179075814, Y: 30.643229120905, Z: 1.5 },
                { X: 104.06179162878, Y: 30.643138931909, Z: 1.5 }
            ],
            loop: false,
            splinePointType: 2,
            lineColor: { X: 1, Y: 0, Z: 0, W: 1 },
            lineGlow: 2,
            lineRadius: 0.5,
            flowNumber: 1,
            flowColor: { X: 0, Y: 0, Z: 1, W: 1 },
            flowScale: 40,
            flowRate: 1,
            lifeTime: 0.1 //Particle life cycle, image trailing length
        };
        this.DefaultDataRange = {};
    }
}
exports.LightEffectFlowLineModel = LightEffectFlowLineModel;
//# sourceMappingURL=LightEffectFlowLineModel.js.map