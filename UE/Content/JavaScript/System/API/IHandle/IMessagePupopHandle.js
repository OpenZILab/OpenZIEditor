"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/07
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartMessagePupop = void 0;
const MessagePupopHandle_1 = require("../Handle/MessagePupopHandle");
function StartMessagePupop() {
    let MessagePupop = new MessagePupopHandle_1.MessagePopupHandle();
    return MessagePupop;
}
exports.StartMessagePupop = StartMessagePupop;
//# sourceMappingURL=IMessagePupopHandle.js.map