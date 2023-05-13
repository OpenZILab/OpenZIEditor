///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/02/08 14:28
///


import { WebSocketServer } from "../../../System/API/Handle/WebSocketServer"
import { PackCallBacKMessage } from "../../../System/API/IHandle/IAPIMessageHandle"
import * as UE from "ue"
import { Widget } from "../../../System/Core/Widget"

export function LoadWebPage(msg){
    let url = msg.data.url
    let widget = Widget.GetInstance().SwitchCurrWidget("WebBrowserView") as UE.OpenZIAPI.OpenZIFrameWork.BP.WebBrowser.WebBrowserView.WebBrowserView_C
    if(url.includes("Script/Web")){
        console.error("本地加载网页: " + "file:///" + UE.FileSystemOperation.ResolvePath(UE.BlueprintPathsLibrary.ProjectDir()) + url)
        widget.OpenZIBrowser.LoadURL("file:///" + UE.FileSystemOperation.ResolvePath(UE.BlueprintPathsLibrary.ProjectDir()) + url)
    }else{
        widget.OpenZIBrowser.LoadURL(url)
    }
    msg.data.result = "success"
    let message = PackCallBacKMessage(msg, msg.data)
    WebSocketServer.GetInstance().OnSendWebMessage(message)

}

export function UnloadWebPage(msg){
    Widget.GetInstance().DestroyWidget("WebBrowserView") 
    msg.data.result = "success"
    let message = PackCallBacKMessage(msg, msg.data)
    WebSocketServer.GetInstance().OnSendWebMessage(message)

}