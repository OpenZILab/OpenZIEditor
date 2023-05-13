"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/18 23:02
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowMouseCursor = exports.CreatePixelStreamListener = exports.LoadWebPageFile = exports.CreateWidget = exports.CloseWebSocketServer = exports.StartWebSocketServer = void 0;
const IPixelStreamMessageHandle = require("./IHandle/IPixelStreamMessageHandle");
const ISystemEventHandle = require("./IHandle/ISystemEventHandle");
const Widget_1 = require("../Core/Widget");
const WebPageViewModel = require("../../GamePlay/API/ViewModel/WebPageViewModel");
const IWebSocketHandle = require("../API/IHandle/IWebSocketHandle");
function StartWebSocketServer(bServer, port, url) {
    IWebSocketHandle.StartServer(bServer, port, url);
}
exports.StartWebSocketServer = StartWebSocketServer;
function CloseWebSocketServer(code, reason) {
    IWebSocketHandle.CloseServer(code, reason);
}
exports.CloseWebSocketServer = CloseWebSocketServer;
function CreateWidget(url) {
    Widget_1.Widget.GetInstance().CreateWidget(url);
}
exports.CreateWidget = CreateWidget;
function LoadWebPageFile(url) {
    WebPageViewModel.OnWebPageChange(url);
}
exports.LoadWebPageFile = LoadWebPageFile;
function CreatePixelStreamListener() {
    IPixelStreamMessageHandle.StartListener();
}
exports.CreatePixelStreamListener = CreatePixelStreamListener;
function ShowMouseCursor() {
    ISystemEventHandle.ShowMouseCursor();
}
exports.ShowMouseCursor = ShowMouseCursor;
//# sourceMappingURL=System_APIList.js.map