"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime:  2022/10/22 16:34
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovetoView = exports.AddtoView = exports.LoadWidget = void 0;
const WidgetHandle_1 = require("../Handle/WidgetHandle");
function LoadWidget(path) {
    return (0, WidgetHandle_1._LoadWidget)(path);
}
exports.LoadWidget = LoadWidget;
function AddtoView(widget, zorder) {
    (0, WidgetHandle_1._AddtoView)(widget, zorder);
}
exports.AddtoView = AddtoView;
function RemovetoView(widget) {
    (0, WidgetHandle_1._RemovetoView)(widget);
}
exports.RemovetoView = RemovetoView;
//# sourceMappingURL=IWidgetHandle.js.map