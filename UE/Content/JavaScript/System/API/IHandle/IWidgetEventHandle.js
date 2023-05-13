"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 1:51
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveWidget = exports.OpenWidget = void 0;
const WidgetEventHandle = require("../Handle/WidgetEventHandle");
function OpenWidget(id) {
    let widget = WidgetEventHandle.OpenWidget(id);
    if (widget == null) {
        return false;
    }
    WidgetEventHandle.AddWidget(widget);
    return widget;
}
exports.OpenWidget = OpenWidget;
function RemoveWidget(widget) {
    WidgetEventHandle.RemoveWidget(widget);
}
exports.RemoveWidget = RemoveWidget;
//# sourceMappingURL=IWidgetEventHandle.js.map