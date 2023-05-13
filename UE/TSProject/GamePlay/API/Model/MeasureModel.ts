///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 11:22
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class MeasureModel extends BaseModel {
    constructor() {
        super()
        this.DefaultData = {
            id: "Measure_id",
            measureType: 1,
            pointColor: { X: 1, Y: 0, Z: 0, W: 1 },
            lineColor: { X: 0, Y: 1, Z: 0, W: 1 },
            //If the maximum value is less than the minimum value, it will be automatically exchanged
            MinDistance: 100000, //The minimum distance determines the transparency of the UI. According to the minimum distance/distance from the camera to the Actor, the transparency ratio is obtained. If the value is small, you need to compete with the Actor to see the UI
            MaxDistance: 1000000, //If the distance from the camera to the Actor is greater than the maximum distance, the UI will be hidden
            isAuto: false,
            GISType: 0,
            coordinatesList: [
                { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                { X: 104.06168645118, Y: 30.643228368068, Z: 1.5 },
                { X: 104.06179075814, Y: 30.643229120905, Z: 1.5 },
                { X: 104.06179162878, Y: 30.643138931909, Z: 1.5 },
            ],
        }
        this.DefaultDataRange = {
            pointColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            lineColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            MinDistance: { Range: { "min": 0, "max": 10000000 } },
            MaxDistance: { Range: { "min": 0, "max": 10000000 } },
        }
    }

}
