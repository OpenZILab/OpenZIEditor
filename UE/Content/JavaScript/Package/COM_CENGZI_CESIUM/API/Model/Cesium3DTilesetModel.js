"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:01
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cesium3DTilesetModel = void 0;
const BaseModel_1 = require("../../../../System/API/Model/BaseModel");
class Cesium3DTilesetModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "cesium3DTileset_id",
            sourceType: "Url",
            url: "",
            ion: 0,
            maximumScreenSpaceError: 16.0,
            preloadAncestors: true,
            preloadSiblings: true,
            forbidHoles: false,
            maximumSimultaneousTileLoads: 20,
            maximumCachedBytes: 256 * 1024 * 1024,
            loadingDescendantLimit: 20,
            enableFrustumCulling: true,
            enableFogCulling: true,
        };
    }
}
exports.Cesium3DTilesetModel = Cesium3DTilesetModel;
//# sourceMappingURL=Cesium3DTilesetModel.js.map