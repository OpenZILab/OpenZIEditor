///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/20 20:20
///

import * as UE from "ue";
import * as puerts from "puerts";

export function ConsoleCommand(command): string{
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    UE.KismetSystemLibrary.ExecuteConsoleCommand(CurrentWorld,command,null)
    return "success"
}
