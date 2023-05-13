///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 10:01
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class AlarmAnchorModel extends BaseModel {
    constructor() {
        super()
        this.DefaultData = {
            id: "AlarmAnchor_id",
            GISType: 0,
            coordinates: {X: 104.06168732191, Y: 30.643138179075, Z: 1.5},
            checkFloor: false,
            isAutoScale: true,
            scale:1,
            customStyle: false,
            meshStyle:"",
            focusDistance: 100,
            sendScreemCoordinates: false,
            tickTime: 0
        }
        this.DefaultDataRange = {
            GISType: {Range: {"min": 0, "max":3}},
            coordinates: {Range: {"min": {X: -180, Y: -90, Z: -1000000}, "max":{X: 180, Y: 90, Z: 1000000}}}
        }
        this.typeName = "AlarmAnchor"
        this.funcName = "Add"
        this.InitDataAndRange()
    }
}
