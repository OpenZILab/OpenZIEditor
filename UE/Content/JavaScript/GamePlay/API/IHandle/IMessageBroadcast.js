"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/10 18:10
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastMessage = void 0;
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
function BroadcastMessage(cls, func, data, outlog) {
    let msg = {
        classDef: cls,
        funcDef: func,
        data: data
    };
    msg.data.result = outlog;
    let message = (0, IAPIMessageHandle_1.PackBroadcastMessage)(msg, msg.data);
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.BroadcastMessage = BroadcastMessage;
//# sourceMappingURL=IMessageBroadcast.js.map