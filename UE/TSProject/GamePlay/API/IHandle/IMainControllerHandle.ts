///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/17 10:50
///

import * as MainControllerHandle from "../Handle/MainControllerHandle";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";
import {ObserverPawnView} from "../View/ObserverPawnView";

export function GetDefaultPawn(): void{
    MainControllerHandle.GetDefaultPawn()
}
export function ChangePawn(jsondata): void{
    let result = MainControllerHandle.ChangePawn(jsondata)
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}
export function ChangeDefaultPawn(jsondata): void{
    let result = MainControllerHandle.ChangeDefaultPawn()
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}

export function ChangeCesiumPawn(jsondata){
   return  MainControllerHandle.ChangeCesiumPawn(jsondata)
}

export function GetCesiumPawn(jsondata): ObserverPawnView{
    return MainControllerHandle.GetCesiumPawn()
}

export function DeleteCesiumPawn(jsondata): void{
    MainControllerHandle.DeleteCesiumPawn()
}

export function OpenSkyline(jsondata): void{
    let result = MainControllerHandle.OpenSkyline()
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}
export function CloseSkyline(jsondata): void{
    let result = MainControllerHandle.CloseSkyline()
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}
export function OpenAxesTool(jsondata): void{
    let result = MainControllerHandle.OpenAxesTool()
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}
export function CloseAxesTool(jsondata): void{
    let result = MainControllerHandle.CloseAxesTool()
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}

export function GetAxesTool(): any{
    return MainControllerHandle.GetAxesTool()
}

export function SetAxesToolSelectMoth(jsondata): void{
    let result = MainControllerHandle.SetAxesToolSelectMoth(jsondata)
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}

export function GetAxesToolSelectMoth(): any{
    return MainControllerHandle.GetAxesToolSelectMoth()
}

export function SetAxesSelectionOutline(jsondata): void{
    let result = MainControllerHandle.SetAxesSelectionOutline(jsondata)
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}

export function SetActorVisibleWithTags(jsondata): void{
    let result = MainControllerHandle.SetActorVisibleWithTags(jsondata)
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}

export function SetNiagaraVisibleWithTags(jsondata): void{
    let result = MainControllerHandle.SetNiagaraVisibleWithTags(jsondata)
    let msg ={
        classDef : jsondata.classDef,
        funcDef : jsondata.funcDef,
        callback : jsondata.callback,
        pageID : jsondata.pageID,
    }
    let message = PackCallBacKMessage(msg, {result: result})
    WebSocketServer.GetInstance().OnSendWebMessage(message)
}
