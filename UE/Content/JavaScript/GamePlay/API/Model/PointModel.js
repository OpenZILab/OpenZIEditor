"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/23 16:40
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class PointModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "poi_id",
            defaultStyle: "default",
            GISType: 0,
            coordinates: { X: 104.06173904, Y: 30.64318365, Z: 0 },
            bAutoHeight: false,
            poiAlwaysVisible: true,
            poiVisibleRange: { X: 0, Y: 2000 },
            imageType: 0,
            imageAddress: "",
            imageForceRefresh: false,
            imageSize: { X: 44, Y: 45 },
            imagePivot: { X: 0.5, Y: 1 },
            imageOffset: { X: 0, Y: 0 },
            labelImageType: 0,
            labelImageAddress: "",
            labelImageSize: { X: 50, Y: 50 },
            label: "POI title",
            labelFontName: "muyao",
            labelFontSize: 12,
            labelFontColor: { X: 1, Y: 1, Z: 0, W: 1 },
            labelFontJustification: 0,
            labelBackgroundColor: { X: 1, Y: 1, Z: 0, W: 0.2 },
            labelPivot: { X: 0.5, Y: 2.5 },
            labelOffset: { X: 0, Y: 0 },
            labelAlwaysVisible: true,
            labelVisibleRange: { X: 0, Y: 2000 },
            focusDistance: 100,
            sendScreemCoordinates: false,
            tickTime: 0,
            autoMove: false,
            followerFromType: "",
            followerFromId: ""
        };
        this.DefaultDataRange = {
            GISType: { Range: { min: 0, max: 3 } },
            coordinates: { Range: { "min": { X: -180, Y: -90, Z: -1000000 }, "max": { X: 180, Y: 90, Z: 1000000 } } },
            poiVisibleRange: { Range: { "min": { X: 0, Y: 0 }, "max": { X: 1000000, Y: 1000000 } } },
            imageType: { Range: { min: 0, max: 2 } },
            imageSize: { Range: { "min": { X: 0, Y: 0 }, "max": { X: 512, Y: 512 } } },
            imagePivot: { Range: { "min": { X: -100, Y: -100 }, "max": { X: 100, Y: 100 } } },
            imageOffset: { Range: { "min": { X: -100, Y: -100 }, "max": { X: 100, Y: 100 } } },
            labelImageType: { Range: { min: 0, max: 2 } },
            labelImageSize: { Range: { "min": { X: 0, Y: 0 }, "max": { X: 512, Y: 512 } } },
            labelFontSize: { Range: { "min": 0, "max": 100 } },
            labelFontColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            labelFontJustification: { Range: { "min": 0, "max": 2 } },
            labelBackgroundColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            labelPivot: { Range: { "min": { X: -1000, Y: -1000 }, "max": { X: 1000, Y: 1000 } } },
            labelOffset: { Range: { "min": { X: -1000, Y: -1000 }, "max": { X: 1000, Y: 1000 } } },
            labelVisibleRange: { Range: { "min": { X: 0, Y: 0 }, "max": { X: 1000000, Y: 1000000 } } },
            focusDistance: { Range: { "min": 0, "max": 10000000000 } }
        };
        this.typeName = "POI";
        this.funcName = "Add";
        this.InitDataAndRange();
    }
}
exports.PointModel = PointModel;
//# sourceMappingURL=PointModel.js.map