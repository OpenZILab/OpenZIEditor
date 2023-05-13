"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CesiumRasterOverlayModel = void 0;
const BaseModel_1 = require("../../../../System/API/Model/BaseModel");
class CesiumRasterOverlayModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "overlay_id",
            terrainId: "terrainId",
            type: "",
            materialLayerkey: "Overlay0",
            maximumScreenSpaceError: 2.0,
            maximumTextureSize: 2048,
            maximumSimultaneousTileLoads: 20,
            subTileCacheBytes: 16 * 1024 * 1024,
        };
    }
}
exports.CesiumRasterOverlayModel = CesiumRasterOverlayModel;
//# sourceMappingURL=CesiumRasterOverlayModel.js.map