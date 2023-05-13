"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 3:45
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowMouseCursor = exports.GetProjectPath = void 0;
const SystemSetting = require("../../Setting/SystemSetting");
const SystemEventHandle = require("../Handle/SystemEventHandle");
function GetProjectPath() {
    return SystemEventHandle.GetProjectPath();
}
exports.GetProjectPath = GetProjectPath;
function ShowMouseCursor() {
    SystemEventHandle.ShowMouseCursor(SystemSetting.bShowMouse);
}
exports.ShowMouseCursor = ShowMouseCursor;
//# sourceMappingURL=ISystemEventHandle.js.map