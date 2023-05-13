///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/13 16:01
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class ObserverPawnModel extends BaseModel {
    constructor()
    {
        super()
        this.DefaultData = {
            cameraMode : "rts",
            RedirectionOrigin : false,
            GISType : 0,
            coordinates : {X:104.091752, Y:30.626308, Z:0},
            pitch : -60,
            pitchRange : {X:-90, Y:-15},
            yaw : 0,
            distance : 2000,
            distanceRange : {X:4, Y:5000},
            autoRotate : true,
            autoRotateCountdown : 10,
            autoRotateDirection : -1,
            movementTime : 1.5,
            fov : 90,
            cameraCollision : false,
            shiftFactor : 1,
            zoomFactor : 0.2,
            twiddleFactor : 0.1,
            clickInfos : true,
            clickHighLight: false,
            enableDoubleclickFocus : false,
            buseDefaultDistance : false,
            doubleClickFocusDistance : 100
        }
        this.DefaultDataRange = {
            GISType: {Range: {"min": 0, "max":3}},
            coordinates: {Range: {"min": {X: -180, Y: -90, Z: -1000000}, "max":{X: 180, Y: 90, Z: 1000000}}},
            pitch: {Range: {"min": -180, "max":180}},
            pitchRange: {Range: {"min": {X: -180, Y: -180}, "max":{X: 180, Y: 180}}},
            yaw: {Range: {"min": -180, "max":180}},
            distance: {Range: {"min": 0, "max":100000000000000000000000}},
            distanceRange: {Range: {"min": {X: 0, Y: 0}, "max":{X: 100000000000000000000000000000000, Y: 10000000000000000000000000000}}},
            autoRotateCountdown: {Range: {"min": 0, "max":1000000}},
            autoRotateDirection: {Range: {"min": -180, "max":180}},
            movementTime: {Range: {"min": 0, "max":10000}},
            fov: {Range: {"min": -180, "max":180}},
            shiftFactor: {Range: {"min": 0, "max":10000}},
            zoomFactor: {Range: {"min": 0, "max":10000}},
            twiddleFactor: {Range: {"min": 0, "max":360}},
            doubleClickFocusDistance: {Range: {"min": 0, "max":1000000}}
        }
        this.typeName = "CesiumPawn"
        this.funcName = "SpawnObject"
        this.InitDataAndRange()
    }
}
