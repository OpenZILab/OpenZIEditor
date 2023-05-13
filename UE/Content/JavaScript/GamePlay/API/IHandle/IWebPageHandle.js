"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/02/08 14:28
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.InUnloadWebPage = exports.InLoadWebPage = void 0;
const WebPageHandle_1 = require("../Handle/WebPageHandle");
function InLoadWebPage(msg) {
    (0, WebPageHandle_1.LoadWebPage)(msg);
}
exports.InLoadWebPage = InLoadWebPage;
function InUnloadWebPage(msg) {
    (0, WebPageHandle_1.UnloadWebPage)(msg);
}
exports.InUnloadWebPage = InUnloadWebPage;
//# sourceMappingURL=IWebPageHandle.js.map