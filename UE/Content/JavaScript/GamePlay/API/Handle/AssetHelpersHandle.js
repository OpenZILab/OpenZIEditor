"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/3/22 20:20
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetValidityJudgment = void 0;
const UE = require("ue");
function AssetValidityJudgment(path) {
    let AssetRegistry = UE.AssetRegistryHelpers.GetAssetRegistry();
    let CurObject = AssetRegistry.GetAssetByObjectPath(path, false);
    if (!CurObject)
        return false;
    return UE.AssetRegistryHelpers.IsValid(CurObject);
}
exports.AssetValidityJudgment = AssetValidityJudgment;
//# sourceMappingURL=AssetHelpersHandle.js.map