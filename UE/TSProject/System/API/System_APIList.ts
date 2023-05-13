///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/18 23:02
///

import * as IPixelStreamMessageHandle from "./IHandle/IPixelStreamMessageHandle"
import * as ISystemEventHandle from "./IHandle/ISystemEventHandle"
import {Widget} from "../Core/Widget";
import * as WebPageViewModel from "../../GamePlay/API/ViewModel/WebPageViewModel"
import * as IWebSocketHandle from "../API/IHandle/IWebSocketHandle"

export function StartWebSocketServer(bServer,port,url): void {
    IWebSocketHandle.StartServer(bServer,port,url)
}

export function CloseWebSocketServer(code,reason): void {
    IWebSocketHandle.CloseServer(code, reason)
}

export function CreateWidget(url): void {
    Widget.GetInstance().CreateWidget(url)
}

export function LoadWebPageFile(url): void {
    WebPageViewModel.OnWebPageChange(url)
}

export function CreatePixelStreamListener(): void {
    IPixelStreamMessageHandle.StartListener()
}

export function ShowMouseCursor(): void {
    ISystemEventHandle.ShowMouseCursor()
}


