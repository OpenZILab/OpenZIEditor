"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cesium3DTilesetView = exports.Enum_SourceType = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
var Enum_SourceType;
(function (Enum_SourceType) {
    Enum_SourceType[Enum_SourceType["CesiumIon"] = 0] = "CesiumIon";
    Enum_SourceType[Enum_SourceType["Url"] = 1] = "Url";
})(Enum_SourceType = exports.Enum_SourceType || (exports.Enum_SourceType = {}));
class Cesium3DTilesetView extends UE.Cesium3DTileset {
    PolygonWire;
    Constructor() {
    }
    ReceiveBeginPlay() {
        this.PolygonWire = UE.NewObject(UE.CesiumPolygonWire.StaticClass(), this, "PolygonWire");
        UE.OpenZIFrameworkLibrary.AddOwnedComponent(this, this.PolygonWire);
        let CreditsWidgets = (0, puerts_1.$ref)(UE.NewArray(UE.UserWidget));
        UE.WidgetBlueprintLibrary.GetAllWidgetsOfClass(this, CreditsWidgets, UE.ScreenCreditsWidget.StaticClass(), false);
    }
    ReceiveEndPlay(EndPlayReason) {
    }
    ReceiveTick(DeltaSeconds) {
    }
    RefreshView(jsonData) {
        let _data = jsonData.data;
        if (_data.sourceType !== "CesiumIon" && _data.sourceType !== "Url") {
            return "sourceType is error";
        }
        else if (_data.sourceType == "CesiumIon") {
            this.SetTilesetSource(UE.ETilesetSource.FromCesiumIon);
            this.SetIonAssetID(BigInt(_data.ion));
            this.SetIonAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ODQ5ZmI5My02NTdiLTRmMDMtYjk4MS04MDMxZGFjMzJjZTQiLCJpZCI6OTA0MDcsImlhdCI6MTY1MDM1NjY1NH0.W42AFRrYBqk0WuAzNQ0dixh-A8LvOrHGhW0juGdo0Ks");
        }
        else {
            this.SetTilesetSource(UE.ETilesetSource.FromUrl);
            this.SetUrl(_data.url);
        }
        this.MaximumScreenSpaceError = _data.maximumScreenSpaceError;
        this.PreloadAncestors = _data.preloadAncestors;
        this.PreloadSiblings = _data.preloadSiblings;
        this.ForbidHoles = _data.forbidHoles;
        this.MaximumSimultaneousTileLoads = _data.maximumSimultaneousTileLoads;
        this.MaximumCachedBytes = _data.maximumCachedBytes;
        this.LoadingDescendantLimit = _data.loadingDescendantLimit;
        this.EnableFrustumCulling = _data.enableFrustumCulling;
        this.EnableFogCulling = _data.enableFogCulling;
        return "success";
    }
}
exports.Cesium3DTilesetView = Cesium3DTilesetView;
//# sourceMappingURL=Cesium3DTilesetView.js.map