"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/20 14:21
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetObserverPawn_UE = void 0;
const UE = require("ue");
function GetObserverPawn_UE() {
    let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld();
    let ObserverPawn = UE.GameplayStatics.GetPlayerPawn(World, 0);
    if (ObserverPawn !== null) {
        return ObserverPawn;
    }
    return null;
}
exports.GetObserverPawn_UE = GetObserverPawn_UE;
//# sourceMappingURL=PawnHandle.js.map