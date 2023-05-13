///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime:  2022/10/22 16:34
///

import { _AddtoView, _LoadWidget, _RemovetoView } from "../Handle/WidgetHandle"


export function LoadWidget(path: string) {
  return _LoadWidget(path)
}

export function AddtoView(widget,zorder) {
    _AddtoView(widget,zorder)
}

export function RemovetoView(widget) {
    _RemovetoView(widget)
} 
