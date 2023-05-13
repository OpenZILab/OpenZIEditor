///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/11 18:43
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class WindowModel extends BaseModel {
    constructor()
    {
        super()
        this.DefaultData = {
            id: "Window_id",
            GISType: 0,
            coordinates: { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
            url: "https://www.baidu.com/",
            isVisible: true,
            size: {X: 400, Y:300},
            pivot: {X: 0, Y:0},
            offset: {X: 0, Y:0},
            showCloseButton:true,
            closeOffset:{X: 0, Y:0},
            autoMove: false,
            followerFromType:"",
            followerFromId:""
        }
        this.DefaultDataRange = {
            GISType: {Range: {"min": 0, "max":3}},
            coordinates: {Range: {"min": {X: -180, Y: -90, Z: -1000000}, "max":{X: 180, Y: 90, Z: 1000000}}},
            size: {Range: {"min": {X: 0, Y: 0}, "max":{X: 7680, Y: 4320}}},
            pivot: {Range: {"min": {X: -100, Y: -100}, "max":{X: 100, Y: 100}}},
            offset: {Range: {"min": {X: -100, Y: -100}, "max":{X: 100, Y: 100}}},
        }
        this.typeName = "Window"
        this.funcName = "Add"
        this.InitDataAndRange()
    }
}
