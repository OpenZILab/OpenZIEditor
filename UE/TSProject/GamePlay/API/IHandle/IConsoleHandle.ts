///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/20 20:20
///

import * as ConsoleHandle from "../Handle/ConsoleHandle"
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";

export function ConsoleCommand(message): void{
    let result = ConsoleHandle.ConsoleCommand(message.data.Command)
    let msg ={
        classDef : message.classDef,
        funcDef : message.funcDef,
        callback : message.callback,
        pageID : message.pageID,
    }
    let message_temp = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message_temp)
}