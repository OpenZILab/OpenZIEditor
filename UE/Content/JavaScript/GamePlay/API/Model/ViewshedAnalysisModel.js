"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/05 19:34
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewshedAnalysisModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class ViewshedAnalysisModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "ViewshedAnalysis_id",
            GISType: 0,
            coordinates: { X: 104.06168732191, Y: 30.643138179075, Z: 1.5 },
            Fov: 120,
            CaptureWidth: 10000,
            IsAuto: true,
            CameraScale: 10
        };
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            coordinates: { Range: { "min": { X: -180, Y: -90, Z: -1000000 }, "max": { X: 180, Y: 90, Z: 1000000 } } },
            Fov: { Range: { "min": 110, "max": 170 } },
            CaptureWidth: { Range: { "min": 100, "max": 10000000 } },
            CameraScale: { Range: { "min": 1, "max": 200 } },
        };
        this.typeName = "ViewshedAnalysis";
        this.funcName = "Add";
        this.InitDataAndRange();
    }
}
exports.ViewshedAnalysisModel = ViewshedAnalysisModel;
//# sourceMappingURL=ViewshedAnalysisModel.js.map