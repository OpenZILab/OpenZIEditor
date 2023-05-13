"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/17 10:50
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetNiagaraVisibleWithTags = exports.SetActorVisibleWithTags = exports.SetAxesSelectionOutline = exports.GetAxesToolSelectMoth = exports.SetAxesToolSelectMoth = exports.GetAxesTool = exports.CloseAxesTool = exports.OpenAxesTool = exports.CloseSkyline = exports.OpenSkyline = exports.DeleteCesiumPawn = exports.GetCesiumPawn = exports.ChangeCesiumPawn = exports.ChangeDefaultPawn = exports.ChangePawn = exports.GetDefaultPawn = void 0;
const MainControllerHandle = require("../Handle/MainControllerHandle");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
function GetDefaultPawn() {
    MainControllerHandle.GetDefaultPawn();
}
exports.GetDefaultPawn = GetDefaultPawn;
function ChangePawn(jsondata) {
    let result = MainControllerHandle.ChangePawn(jsondata);
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.ChangePawn = ChangePawn;
function ChangeDefaultPawn(jsondata) {
    let result = MainControllerHandle.ChangeDefaultPawn();
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.ChangeDefaultPawn = ChangeDefaultPawn;
function ChangeCesiumPawn(jsondata) {
    return MainControllerHandle.ChangeCesiumPawn(jsondata);
}
exports.ChangeCesiumPawn = ChangeCesiumPawn;
function GetCesiumPawn(jsondata) {
    return MainControllerHandle.GetCesiumPawn();
}
exports.GetCesiumPawn = GetCesiumPawn;
function DeleteCesiumPawn(jsondata) {
    MainControllerHandle.DeleteCesiumPawn();
}
exports.DeleteCesiumPawn = DeleteCesiumPawn;
function OpenSkyline(jsondata) {
    let result = MainControllerHandle.OpenSkyline();
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.OpenSkyline = OpenSkyline;
function CloseSkyline(jsondata) {
    let result = MainControllerHandle.CloseSkyline();
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.CloseSkyline = CloseSkyline;
function OpenAxesTool(jsondata) {
    let result = MainControllerHandle.OpenAxesTool();
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.OpenAxesTool = OpenAxesTool;
function CloseAxesTool(jsondata) {
    let result = MainControllerHandle.CloseAxesTool();
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.CloseAxesTool = CloseAxesTool;
function GetAxesTool() {
    return MainControllerHandle.GetAxesTool();
}
exports.GetAxesTool = GetAxesTool;
function SetAxesToolSelectMoth(jsondata) {
    let result = MainControllerHandle.SetAxesToolSelectMoth(jsondata);
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.SetAxesToolSelectMoth = SetAxesToolSelectMoth;
function GetAxesToolSelectMoth() {
    return MainControllerHandle.GetAxesToolSelectMoth();
}
exports.GetAxesToolSelectMoth = GetAxesToolSelectMoth;
function SetAxesSelectionOutline(jsondata) {
    let result = MainControllerHandle.SetAxesSelectionOutline(jsondata);
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.SetAxesSelectionOutline = SetAxesSelectionOutline;
function SetActorVisibleWithTags(jsondata) {
    let result = MainControllerHandle.SetActorVisibleWithTags(jsondata);
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.SetActorVisibleWithTags = SetActorVisibleWithTags;
function SetNiagaraVisibleWithTags(jsondata) {
    let result = MainControllerHandle.SetNiagaraVisibleWithTags(jsondata);
    let msg = {
        classDef: jsondata.classDef,
        funcDef: jsondata.funcDef,
        callback: jsondata.callback,
        pageID: jsondata.pageID,
    };
    let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, { result: result });
    WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
}
exports.SetNiagaraVisibleWithTags = SetNiagaraVisibleWithTags;
//# sourceMappingURL=IMainControllerHandle.js.map