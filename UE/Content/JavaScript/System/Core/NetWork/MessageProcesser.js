"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 3:09
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProcesser = exports.MessageType = void 0;
const Sigleton_1 = require("../Sigleton");
var MessageType;
(function (MessageType) {
    MessageType["API"] = "API";
    MessageType["File_CSV"] = "File_CSV";
    MessageType["File_JSON"] = "File_JSON";
    MessageType["File_XML"] = "File_XML";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
class MessageProcesser extends Sigleton_1.Sigleton {
    static GetInstance() {
        return super.TakeInstance(MessageProcesser);
    }
    processerfunc;
    callback;
    Ctor(func, callback) {
        this.processerfunc = func;
        this.callback = callback;
        return this;
    }
    OnProcess(message) {
        let callbackmessage = this.processerfunc(message);
        this.callback(callbackmessage);
    }
}
exports.MessageProcesser = MessageProcesser;
//# sourceMappingURL=MessageProcesser.js.map