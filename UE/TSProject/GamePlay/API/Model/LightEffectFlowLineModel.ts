///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/01/12 10:57
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class LightEffectFlowLineModel extends BaseModel {
    constructor() {
        super()
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
            lineColor: { X: 1, Y: 0, Z: 0, W: 1 }, //baseline color
            lineGlow: 2, //The luminous intensity of the baseline
            lineRadius: 0.5, //The radius ratio of the baseline
            flowNumber: 1, //the number of optical flow particles
            flowColor: { X: 0, Y: 0, Z: 1, W: 1 }, //optical flow color
            flowScale: 40, //optical flow particle scaling
            flowRate: 1, //Optical flow rate (control the flow speed time and the number of optical flow particles)
            lifeTime: 0.1 //Particle life cycle, image trailing length
        }
        this.DefaultDataRange = {

        }
    }
}
