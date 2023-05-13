///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/08 18:37
///

import { BaseModel } from "../../../System/API/Model/BaseModel"

export class SceneViewingModel extends BaseModel {
    constructor() {
        super()
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
            isUsedPointsInfo: false, //Whether to use the given point information, if not, custom add points in the scene
            isUsedLensRotation: false, //Whether to use lens rotation to set roaming angle of view
            defaultPointsType: 0, //When manually adding points, the type used to generate splines
            isLoopPlay: false, //Whether to play in a loop
            isEndToEnd: false, //whether end to end
            isShowPointCamera: false, //whether to show the point camera object
            isShowSplineMesh: false, //Whether to display the Mesh of the spline
            isPlaying: false //Whether to generate and start playing immediately
        }
        this.DefaultDataRange = {}
    }
}