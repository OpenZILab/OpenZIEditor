///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import * as UE from "ue"
import { $ref, $unref } from "puerts";

export enum Enum_SourceType {
    CesiumIon = 0,
    Url = 1
}

export class Cesium3DTilesetView extends UE.Cesium3DTileset {

    PolygonWire: UE.CesiumPolygonWire

    Constructor() {

    }

    ReceiveBeginPlay(): void {
        this.PolygonWire = UE.NewObject(UE.CesiumPolygonWire.StaticClass(),this,"PolygonWire") as UE.CesiumPolygonWire

        UE.OpenZIFrameworkLibrary.AddOwnedComponent(this,this.PolygonWire)
        let CreditsWidgets = $ref(UE.NewArray(UE.UserWidget))
        UE.WidgetBlueprintLibrary.GetAllWidgetsOfClass(this, CreditsWidgets, UE.ScreenCreditsWidget.StaticClass(), false)
    }
    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason): void {

    }

    ReceiveTick(DeltaSeconds: number): void {

    }

    RefreshView(jsonData) {
        let _data = jsonData.data
        if (_data.sourceType !== "CesiumIon" && _data.sourceType !== "Url") {
            return "sourceType is error"
        }
        else if (_data.sourceType == "CesiumIon") {

            this.SetTilesetSource(UE.ETilesetSource.FromCesiumIon)
            this.SetIonAssetID(BigInt(_data.ion))
            this.SetIonAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODQ5ZmI5My02NTdiLTRmMDMtYjk4MS04MDMxZGFjMzJjZTQiLCJpZCI6OTA0MDcsImlhdCI6MTY1MDM1NjY1NH0.W42AFRrYBqk0WuAzNQ0dixh-A8LvOrHGhW0juGdo0Ks")
        }
        else {
            this.SetTilesetSource(UE.ETilesetSource.FromUrl)
            this.SetUrl(_data.url)
        }
        this.MaximumScreenSpaceError = _data.maximumScreenSpaceError
        this.PreloadAncestors = _data.preloadAncestors
        this.PreloadSiblings = _data.preloadSiblings
        this.ForbidHoles = _data.forbidHoles
        this.MaximumSimultaneousTileLoads = _data.maximumSimultaneousTileLoads
        this.MaximumCachedBytes = _data.maximumCachedBytes
        this.LoadingDescendantLimit = _data.loadingDescendantLimit
        this.EnableFrustumCulling = _data.enableFrustumCulling
        this.EnableFogCulling = _data.enableFogCulling
        return "success"
    }
}
