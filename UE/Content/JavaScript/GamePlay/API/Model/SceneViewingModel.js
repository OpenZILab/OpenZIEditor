"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/08 18:37
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneViewingModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class SceneViewingModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "SceneViewing_id",
            GISType: 0,
            pointsInfoList: [
                {
                    "coordinates": { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                    "lensRotation": { X: 0, Y: 0, Z: 0 },
                    "point_type": 0,
                    "arriveTangent": { X: 0, Y: 0, Z: 0 },
                    "leaveTangent": { X: 0, Y: 0, Z: 0 }
                },
                {
                    "coordinates": { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                    "lensRotation": { X: 0, Y: 0, Z: 0 },
                    "point_type": 0,
                    "arriveTangent": { X: 0, Y: 0, Z: 0 },
                    "leaveTangent": { X: 0, Y: 0, Z: 0 }
                },
                {
                    "coordinates": { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                    "lensRotation": { X: 0, Y: 0, Z: 0 },
                    "point_type": 0,
                    "arriveTangent": { X: 0, Y: 0, Z: 0 },
                    "leaveTangent": { X: 0, Y: 0, Z: 0 }
                },
                {
                    "coordinates": { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
                    "lensRotation": { X: 0, Y: 0, Z: 0 },
                    "point_type": 0,
                    "arriveTangent": { X: 0, Y: 0, Z: 0 },
                    "leaveTangent": { X: 0, Y: 0, Z: 0 }
                }
            ],
            speed: 2000,
            isUsedPointsInfo: false,
            isUsedLensRotation: false,
            defaultPointsType: 0,
            isLoopPlay: false,
            isEndToEnd: false,
            isShowPointCamera: false,
            isShowSplineMesh: false,
            isPlaying: false //Whether to generate and start playing immediately
        };
        this.DefaultDataRange = {};
    }
}
exports.SceneViewingModel = SceneViewingModel;
//# sourceMappingURL=SceneViewingModel.js.map