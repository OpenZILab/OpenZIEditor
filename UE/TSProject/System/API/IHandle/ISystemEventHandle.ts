///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 3:45
///

import * as SystemSetting from "../../Setting/SystemSetting"
import * as SystemEventHandle from "../Handle/SystemEventHandle"

export function GetProjectPath(): void {
    return SystemEventHandle.GetProjectPath()
}

export function ShowMouseCursor(): void {
    SystemEventHandle.ShowMouseCursor(SystemSetting.bShowMouse)
}
