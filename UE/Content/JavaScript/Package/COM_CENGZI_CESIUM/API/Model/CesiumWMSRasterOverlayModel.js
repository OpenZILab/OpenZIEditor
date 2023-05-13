"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CesiumWMSRasterOverlayModel = void 0;
const CesiumRasterOverlayModel_1 = require("./CesiumRasterOverlayModel");
class CesiumWMSRasterOverlayModel extends CesiumRasterOverlayModel_1.CesiumRasterOverlayModel {
    constructor() {
        super();
        this.DefaultData.url = "";
        this.DefaultData.layers = "";
        this.DefaultData.minimumLevel = 0;
        this.DefaultData.maximumLevel = 14;
        this.DefaultData.tileWidth = 256;
        this.DefaultData.tileHeight = 256;
    }
}
exports.CesiumWMSRasterOverlayModel = CesiumWMSRasterOverlayModel;
//# sourceMappingURL=CesiumWMSRasterOverlayModel.js.map