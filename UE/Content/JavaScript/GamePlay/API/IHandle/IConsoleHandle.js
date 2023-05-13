"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/20 20:20
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleCommand = void 0;
const ConsoleHandle = require("../Handle/ConsoleHandle");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
function ConsoleCommand(message) {
    let result = ConsoleHandle.ConsoleCommand(message.data.Command);
    let msg = {
        classDef: message.classDef,
        funcDef: message.funcDef,
        callback: message.callback,
        pageID: message.pageID,
    };
    let message_temp = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message_temp);
}
exports.ConsoleCommand = ConsoleCommand;
//# sourceMappingURL=IConsoleHandle.js.map