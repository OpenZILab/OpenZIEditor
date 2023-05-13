"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 1:53
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveWidget = exports.AddWidget = exports.OpenWidget = void 0;
const UE = require("ue");
const WidgetPath_1 = require("../Resource/WidgetPath");
const puerts_1 = require("puerts");
function OpenWidget(id) {
    console.warn(id);
    let world = puerts_1.argv.getByName("GameInstance").GetWorld();
    let widgetClass = UE.Class.Load(WidgetPath_1.WidgetPath[id]);
    // let widget =  UE.OpenZIFrameworkLibrary.CreateWidget(world, widgetClass)
    let widget = UE.OpenZIFrameworkLibrary.CreateWidget(world, widgetClass);
    return widget;
}
exports.OpenWidget = OpenWidget;
function AddWidget(widget) {
    widget.AddToViewport(0);
}
exports.AddWidget = AddWidget;
function RemoveWidget(widget) {
    widget.RemoveFromParent();
}
exports.RemoveWidget = RemoveWidget;
``;
//# sourceMappingURL=WidgetEventHandle.js.map