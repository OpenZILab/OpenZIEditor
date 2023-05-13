"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 2:39
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseServer = exports.StartServer = void 0;
const WebSocketServer_1 = require("../Handle/WebSocketServer");
function StartServer(bServer, port, url) {
    WebSocketServer_1.WebSocketServer.GetInstance().StartServer(bServer, port, url);
}
exports.StartServer = StartServer;
function CloseServer(code, reason) {
    WebSocketServer_1.WebSocketServer.GetInstance().CloseServer(code, reason);
}
exports.CloseServer = CloseServer;
//# sourceMappingURL=IWebSocketHandle.js.map