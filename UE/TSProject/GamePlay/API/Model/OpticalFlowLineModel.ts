///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 10:01
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class OpticalFlowLineModel extends BaseModel {
    constructor() {
        super()
        this.DefaultData = {
            id: "OpticalFlowLine_id",
            GISType: 0,
            coordinatesList: [
                { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                { X: 104.06168645118, Y: 30.643228368068, Z: 1.5 },
                { X: 104.06179075814, Y: 30.643229120905, Z: 1.5 },
                { X: 104.06179162878, Y: 30.643138931909, Z: 1.5 }
            ],
            loop: false,
            splinePointType: 2,
            meshDirection: 0, //Center: 0 Side: 1 Standing: 2
            width: 10,
            style: 0, //
            brightness: 1, //brightness
            baseColor: { X: 1, Y: 0, Z: 0, W: 1 }, //color
            speed: 1,
            isOpenStroke: false, //whether to open stroke
            baseOpacity: 1, //Transparency
            strokeWidth: 0.5, //Border ratio 0~1
            tilling: 5000, //texture tiling
            moveChildActor: false,
            timeRate: 1
        }
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            coordinatesList: { Range: { "min": { X: -180, Y: -90, Z: -1000000 }, "max": { X: 180, Y: 90, Z: 1000000 } } },
        }
        // this.typeName = "OpticalFlowLine"
        // this.funcName = "Add"
        // this.InitDataAndRange()

    }
}
