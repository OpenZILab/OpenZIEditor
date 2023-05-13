///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import { BaseModel } from "../../../../System/API/Model/BaseModel"

export class CesiumRasterOverlayModel extends BaseModel {

    constructor()
    {
        super()
        
        this.DefaultData = {
            id: "overlay_id",
            terrainId: "terrainId",
            type: "",
            materialLayerkey: "Overlay0",
            maximumScreenSpaceError: 2.0,
            maximumTextureSize: 2048,
            maximumSimultaneousTileLoads: 20,
            subTileCacheBytes: 16 * 1024 * 1024,
        }
    }
}
