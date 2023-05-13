///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/02/08 14:28
///

import { WebSocketServer } from "../../../System/API/Handle/WebSocketServer"
import { PackCallBacKMessage } from "../../../System/API/IHandle/IAPIMessageHandle"
import { LoadWebPageFile } from "../../../System/API/System_APIList"
import { LoadWebPage, UnloadWebPage } from "../Handle/WebPageHandle"


export function InLoadWebPage(msg){
    LoadWebPage(msg)
}

export function InUnloadWebPage(msg){
    UnloadWebPage(msg)
}