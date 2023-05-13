///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:52
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class DrawPlaneModel extends BaseModel {
    constructor()
    {
        super()
        this.DefaultData = {
            id: "Draw_id",
            pointColor: { X: 1, Y: 0, Z: 0, W: 1 },
            lineColor: { X: 0, Y: 1, Z: 0, W: 1 },
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
            pointColor: {Range: {"min": {X: 0, Y: 0, Z: 0, W: 0}, "max":{X: 1, Y: 1, Z: 1, W: 1}}},
            lineColor: {Range: {"min": {X: 0, Y: 0, Z: 0, W: 0}, "max":{X: 1, Y: 1, Z: 1, W: 1}}}
        }
        this.typeName = "DrawPlane"
        this.funcName = "StartDraw"
        this.InitDataAndRange()
    }
}
