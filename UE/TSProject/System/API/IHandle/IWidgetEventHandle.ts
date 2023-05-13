///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 1:51
///

import * as WidgetEventHandle from "../Handle/WidgetEventHandle"

export function OpenWidget(id){
    let widget = WidgetEventHandle.OpenWidget(id)
    if (widget == null){
        return false
    }
    WidgetEventHandle.AddWidget(widget)
    return widget
}

export function RemoveWidget(widget){
    WidgetEventHandle.RemoveWidget(widget)
}