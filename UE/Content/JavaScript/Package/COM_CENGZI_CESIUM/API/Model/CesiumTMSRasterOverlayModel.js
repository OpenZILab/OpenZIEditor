"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CesiumTMSRasterOverlayModel = void 0;
const CesiumRasterOverlayModel_1 = require("./CesiumRasterOverlayModel");
class CesiumTMSRasterOverlayModel extends CesiumRasterOverlayModel_1.CesiumRasterOverlayModel {
    constructor() {
        super();
        this.DefaultData.url = "";
        this.DefaultData.bSpecifyZoomLevels = "";
        this.DefaultData.minimumLevel = 256;
        this.DefaultData.maximumLevel = 256;
    }
}
exports.CesiumTMSRasterOverlayModel = CesiumTMSRasterOverlayModel;
//# sourceMappingURL=CesiumTMSRasterOverlayModel.js.map