"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 3:22
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackBroadcastMessage = exports.PackCallBacKMessage = exports.CallBackMessage = exports.HandleMessage = void 0;
const GameAPI = require("../../../GamePlay/API/Game_APIList");
const SystemAPI = require("../../../System/API/System_APIList");
const ApiViewModelSystem_1 = require("../ApiViewModelSystem");
function HandleMessage(message) {
    console.log(message);
    let jsondata = JSON.parse(message);
    let classdef = jsondata.classDef;
    let funcdef = jsondata.funcDef;
    if (GameAPI[classdef] != null) {
        console.warn("GameAPI [classdef][funcdef]！！");
        GameAPI[classdef][funcdef](jsondata);
    }
    else if (SystemAPI[classdef] != null) {
        console.warn("SystemAPI [classdef][funcdef]！！");
        SystemAPI[classdef][funcdef](jsondata);
    }
    else if ((0, ApiViewModelSystem_1.GetViewModelByType)(classdef) != null) {
        console.warn(`APIViewModel class:${classdef}  funcdef:${funcdef}！！`);
        (0, ApiViewModelSystem_1.GetViewModelByType)(classdef)[funcdef](jsondata);
    }
    else {
        console.warn("No [classdef][funcdef]！！");
    }
}
exports.HandleMessage = HandleMessage;
function CallBackMessage(message) {
    if (message != undefined) {
        console.log("CallBackMessage " + message);
    }
}
exports.CallBackMessage = CallBackMessage;
function PackCallBacKMessage(message, data) {
    let result = {};
    result["classDef"] = message.classDef;
    result["funcDef"] = message.funcDef;
    result["data"] = data;
    result["callback"] = message.callback;
    result["pageID"] = message.pageID;
    message = JSON.stringify(result);
    console.warn(message);
    return message;
}
exports.PackCallBacKMessage = PackCallBacKMessage;
function PackBroadcastMessage(message, data) {
    let result = {};
    result["classDef"] = message.classDef;
    result["funcDef"] = message.funcDef;
    result["data"] = data;
    result["callback"] = "ALLReceiveMessage";
    message = JSON.stringify(result);
    console.warn(message);
    return message;
}
exports.PackBroadcastMessage = PackBroadcastMessage;
//# sourceMappingURL=IAPIMessageHandle.js.map