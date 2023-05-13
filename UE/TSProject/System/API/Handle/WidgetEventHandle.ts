///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 1:53
///

import * as UE from 'ue'
import {WidgetPath} from "../Resource/WidgetPath"
import {argv} from "puerts";

export function OpenWidget(id){
    console.warn(id)
    let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld() as UE.World
    let widgetClass =  UE.Class.Load(WidgetPath[id])
   // let widget =  UE.OpenZIFrameworkLibrary.CreateWidget(world, widgetClass)
    let widget =  UE.OpenZIFrameworkLibrary.CreateWidget(world, widgetClass) as UE.OpenZIAPI.OpenZIFrameWork.BP.WebBrowser.WebBrowserView.WebBrowserView_C
    return widget
}

export function AddWidget(widget){
    widget.AddToViewport(0)
}

export function RemoveWidget(widget){
    widget.RemoveFromParent()
}``