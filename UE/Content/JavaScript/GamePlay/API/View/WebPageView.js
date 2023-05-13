"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 1:08
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnWebPageChange = void 0;
const Widget_1 = require("../../../System/Core/Widget");
const UE = require("ue");
function OnWebPageChange(url) {
    let widget = Widget_1.Widget.GetInstance().SwitchCurrWidget("WebBrowserView");
    if (url.includes("Script/Web")) {
        console.error("本地加载网页: " + "file:///" + UE.FileSystemOperation.ResolvePath(UE.BlueprintPathsLibrary.ProjectDir()) + url);
        widget.OpenZIBrowser.LoadURL("file:///" + UE.FileSystemOperation.ResolvePath(UE.BlueprintPathsLibrary.ProjectDir()) + url);
    }
    else
        widget.OpenZIBrowser.LoadURL(url);
}
exports.OnWebPageChange = OnWebPageChange;
//# sourceMappingURL=WebPageView.js.map