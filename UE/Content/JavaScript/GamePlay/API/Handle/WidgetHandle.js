"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._RemovetoView = exports._AddtoView = exports._LoadWidget = void 0;
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime:  2022/10/22 16:34
///
const UE = require("ue");
function _LoadWidget(path) {
    let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld();
    let WidgetClass = UE.Class.Load(path);
    let Widget = UE.OpenZIFrameworkLibrary.CreateWidget(World, WidgetClass);
    return Widget;
}
exports._LoadWidget = _LoadWidget;
function _AddtoView(widget, Zorder) {
    widget.AddToViewport(Zorder);
}
exports._AddtoView = _AddtoView;
function _RemovetoView(widget) {
    widget.RemoveFromParent();
}
exports._RemovetoView = _RemovetoView;
//# sourceMappingURL=WidgetHandle.js.map