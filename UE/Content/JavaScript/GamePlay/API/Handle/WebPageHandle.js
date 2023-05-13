"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/02/08 14:28
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnloadWebPage = exports.LoadWebPage = void 0;
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const UE = require("ue");
const Widget_1 = require("../../../System/Core/Widget");
function LoadWebPage(msg) {
    let url = msg.data.url;
    let widget = Widget_1.Widget.GetInstance().SwitchCurrWidget("WebBrowserView");
    if (url.includes("Script/Web")) {
        console.error("本地加载网页: " + "file:///" + UE.FileSystemOperation.ResolvePath(UE.BlueprintPathsLibrary.ProjectDir()) + url);
        widget.OpenZIBrowser.LoadURL("file:///" + UE.FileSystemOperation.ResolvePath(UE.BlueprintPathsLibrary.ProjectDir()) + url);
    }
    else {
        widget.OpenZIBrowser.LoadURL(url);
    }
    msg.data.result = "success";
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.LoadWebPage = LoadWebPage;
function UnloadWebPage(msg) {
    Widget_1.Widget.GetInstance().DestroyWidget("WebBrowserView");
    msg.data.result = "success";
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.UnloadWebPage = UnloadWebPage;
//# sourceMappingURL=WebPageHandle.js.map