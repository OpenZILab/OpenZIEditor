///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import * as UE from "ue"

export class CesiumRasterOverlayView  {
    Type: string
    Obj: UE.Cesium3DTileset
    Override: UE.CesiumRasterOverlay
    TerrianId:string
    
    constructor(_type: string, _obj: any) {
        this.Obj = _obj
        this.Type = _type
        this.TerrianId = ""
        if ( this.Type == "TMS") {
            this.Override = new UE.CesiumTileMapServiceRasterOverlay(_obj, "TMS")
        }
        else if ( this.Type == "WMS") {
            this.Override = new UE.CesiumWebMapServiceRasterOverlay(_obj, "WMS")
        }
        else if ( this.Type == "ION") {
            this.Override = new UE.CesiumIonRasterOverlay(_obj, "ION")
        }
        if (this.Override !== null) {
            UE.OpenZIFrameworkLibrary.AddOwnedComponent(_obj, this.Override)
        }

    }

    RefreshView(jsonData) {
        let _data = jsonData.data
        this.TerrianId = _data.terrainId
        if (this.Type == "TMS") {
            let CurOverlay = this.Override as UE.CesiumTileMapServiceRasterOverlay
            CurOverlay.Url = _data.url
            CurOverlay.bSpecifyZoomLevels = _data.bSpecifyZoomLevels
            if (CurOverlay.bSpecifyZoomLevels) {
                CurOverlay.MaximumLevel = _data.maximumLevel
                CurOverlay.MinimumLevel = _data.minimumLevel
            }
        }
        else if (this.Type == "WMS") {
            let CurOverlay = this.Override as UE.CesiumWebMapServiceRasterOverlay
            CurOverlay.BaseUrl = _data.url
            CurOverlay.Layers = _data.layers
            CurOverlay.TileHeight = _data.tileHeight
            CurOverlay.TileWidth = _data.tileWidth
            CurOverlay.MinimumLevel = _data.minimumLevel
            CurOverlay.MaximumLevel = _data.maximumLevel
        }
        else if (this.Type == "ION") {
            let CurOverlay = this.Override as UE.CesiumIonRasterOverlay
            CurOverlay.IonAssetID = BigInt(_data.ionAssetID)
            if(_data.ionAccessToken == "")
            {
                CurOverlay.IonAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODQ5ZmI5My02NTdiLTRmMDMtYjk4MS04MDMxZGFjMzJjZTQiLCJpZCI6OTA0MDcsImlhdCI6MTY1MDM1NjY1NH0.W42AFRrYBqk0WuAzNQ0dixh-A8LvOrHGhW0juGdo0Ks"    
            }else{

                CurOverlay.IonAccessToken = _data.ionAccessToken
            }

        }
        else {
            return "数据type类型错误"
        }
        this.Override.MaterialLayerKey = _data.materialLayerkey
        this.Override.SetMaximumScreenSpaceError(_data.maximumScreenSpaceError)
        this.Override.SetMaximumSimultaneousTileLoads(_data.maximumSimultaneousTileLoads)
        this.Override.SetSubTileCacheBytes(BigInt(_data.subTileCacheBytes))
        return "success"
    }

    DeleteOverlay() {
        UE.OpenZIFrameworkLibrary.RemoveOwnedComponent(this.Obj, this.Override)
        this.Override = null
        this.Obj.RefreshTileset()
    }

    SetActive(bActive) {
        if (this.Override) {
            this.Override.SetActive(bActive)
        }
    }
}


