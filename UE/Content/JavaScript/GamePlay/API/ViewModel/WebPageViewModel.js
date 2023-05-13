"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 0:52
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnWebPageChange = exports.Ctor = void 0;
const SystemSetting = require("../../../System/Setting/SystemSetting");
const WebPageView = require("../View/WebPageView");
function Ctor() {
}
exports.Ctor = Ctor;
function OnWebPageChange(url) {
    if (SystemSetting.bCloudRenderingMode != true) {
        WebPageView.OnWebPageChange(url);
    }
}
exports.OnWebPageChange = OnWebPageChange;
//# sourceMappingURL=WebPageViewModel.js.map