///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 3:22
///

import * as GameAPI from "../../../GamePlay/API/Game_APIList"
import * as SystemAPI from "../../../System/API/System_APIList"
import { GetViewModelByType } from "../ApiViewModelSystem"

export function HandleMessage(message): void {
    console.log(message)
    let jsondata = JSON.parse(message)
    let classdef = jsondata.classDef
    let funcdef = jsondata.funcDef
    
    if (GameAPI[classdef] != null) {

        console.warn("GameAPI [classdef][funcdef]！！")
        GameAPI[classdef][funcdef](jsondata)

    } else if (SystemAPI[classdef] != null) {

        console.warn("SystemAPI [classdef][funcdef]！！")
        SystemAPI[classdef][funcdef](jsondata)

    } else if (GetViewModelByType(classdef) != null) {

        console.warn(`APIViewModel class:${classdef}  funcdef:${funcdef}！！`)
        GetViewModelByType(classdef)[funcdef](jsondata)
    }
    else {
        console.warn("No [classdef][funcdef]！！")
    }
}

export function CallBackMessage(message): void {
    if (message != undefined){
        console.log("CallBackMessage " + message)
    }
}

export function PackCallBacKMessage(message,data): void {
   let result = {}
    result["classDef"] =  message.classDef
    result["funcDef"] = message.funcDef
    result["data"] = data
    result["callback"] = message.callback
    result["pageID"] = message.pageID
    message = JSON.stringify(result)
    console.warn(message)
    return message
}

export function PackBroadcastMessage(message,data): void {
    let result = {}
    result["classDef"] =  message.classDef
    result["funcDef"] = message.funcDef
    result["data"] = data
    result["callback"] = "ALLReceiveMessage"
    message = JSON.stringify(result)
    console.warn(message)
    return message
}



