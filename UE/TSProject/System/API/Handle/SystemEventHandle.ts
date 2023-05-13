///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 4:02
///

import * as UE from 'ue'
import * as puerts from "puerts";

export function GetProjectPath(): any {
    let projectDir = UE.BlueprintPathsLibrary.ProjectDir()
    return UE.BlueprintPathsLibrary.ConvertRelativePathToFull(projectDir)
}

export function ShowMouseCursor(bShowMouse): any {
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    let PlayerController = UE.GameplayStatics.GetPlayerController(CurrentWorld,0)
    PlayerController.bShowMouseCursor = bShowMouse
}