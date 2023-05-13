///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 2:39
///

import {WebSocketServer} from "../Handle/WebSocketServer"

export function StartServer(bServer,port,url){
    WebSocketServer.GetInstance().StartServer(bServer,port,url)
}

export function CloseServer(code,reason){
    WebSocketServer.GetInstance().CloseServer(code, reason)
}