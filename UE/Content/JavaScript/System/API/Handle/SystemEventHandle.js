"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 4:02
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowMouseCursor = exports.GetProjectPath = void 0;
const UE = require("ue");
const puerts = require("puerts");
function GetProjectPath() {
    let projectDir = UE.BlueprintPathsLibrary.ProjectDir();
    return UE.BlueprintPathsLibrary.ConvertRelativePathToFull(projectDir);
}
exports.GetProjectPath = GetProjectPath;
function ShowMouseCursor(bShowMouse) {
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    let PlayerController = UE.GameplayStatics.GetPlayerController(CurrentWorld, 0);
    PlayerController.bShowMouseCursor = bShowMouse;
}
exports.ShowMouseCursor = ShowMouseCursor;
//# sourceMappingURL=SystemEventHandle.js.map