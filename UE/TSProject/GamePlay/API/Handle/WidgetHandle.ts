///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime:  2022/10/22 16:34
///
import * as UE from 'ue'

export function _LoadWidget(path: string) {
    let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld()
    let WidgetClass = UE.Class.Load(path)
    let Widget = UE.OpenZIFrameworkLibrary.CreateWidget(World, WidgetClass)
    return Widget
}

export function _AddtoView(widget,Zorder) {
    widget.AddToViewport(Zorder)
}

export function _RemovetoView(widget) {
    widget.RemoveFromParent()
} 



