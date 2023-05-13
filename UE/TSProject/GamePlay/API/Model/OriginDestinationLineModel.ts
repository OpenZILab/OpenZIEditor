///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/24 10:01
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class OriginDestinationLineModel extends BaseModel {
    constructor() {
        super()
        this.DefaultData = {
            id: "OriginDestinationLine_id",
            GISType: 0,
            start: { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
            end: { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
            middleHeight: 5000,
            lineColor: { X: 1, Y: 0, Z: 0, W: 1 }, //baseline color
            lineGlow: 2, //The luminous intensity of the baseline
            lineRadius: 0.5, //The radius ratio of the baseline
            flowColor: { X: 0, Y: 0, Z: 1, W: 1 }, //optical flow color
            flowScale: 40, //optical flow particle scaling
            flowRate: 1 //Optical flow rate (control the flow speed time and the number of optical flow particles)
        }
        this.DefaultDataRange = {
        }
    }
}
