///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/10 18:10
///

import { WebSocketServer } from "../../../System/API/Handle/WebSocketServer";
import { PackBroadcastMessage } from "../../../System/API/IHandle/IAPIMessageHandle";

export function BroadcastMessage(cls:string,func:string,data:any,outlog:string){
    let msg = {
        classDef: cls,
        funcDef: func,
        data: data
    }
    msg.data.result = outlog
    let message = PackBroadcastMessage(msg,   msg.data)
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}