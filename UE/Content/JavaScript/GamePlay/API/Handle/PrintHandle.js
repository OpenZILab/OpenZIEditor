"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2023/04/28 17:17
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintOnScreenHandle = void 0;
const UE = require("ue");
/**
  * print information to screen
  * @param msg:string print message content, duration:number duration
  * @return
  */
function PrintOnScreenHandle(msg, duration) {
    let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld();
    UE.KismetSystemLibrary.PrintString(World, `PrintMessage:${msg}`, true, true, new UE.LinearColor(0.5, 0.3, 0.1, 1), duration);
    return "打印执行完成";
}
exports.PrintOnScreenHandle = PrintOnScreenHandle;
//# sourceMappingURL=PrintHandle.js.map