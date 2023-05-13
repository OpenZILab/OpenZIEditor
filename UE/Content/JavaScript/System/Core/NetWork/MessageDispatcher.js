"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 2:47
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDispatcher = void 0;
const Sigleton_1 = require("../Sigleton");
const MessageProcesser_1 = require("./MessageProcesser");
const IAPIMessageHandle = require("../../API/IHandle/IAPIMessageHandle");
class MessageDispatcher extends Sigleton_1.Sigleton {
    static GetInstance() {
        return super.TakeInstance(MessageDispatcher);
    }
    MessageProcesserMap;
    OnInit() {
        this.MessageProcesserMap = new Map();
        this.MessageProcesserMap["API"] = MessageProcesser_1.MessageProcesser.GetInstance().Ctor(IAPIMessageHandle.HandleMessage, IAPIMessageHandle.CallBackMessage);
    }
    ReceiveMessage(type, message) {
        let processer = this.MessageProcesserMap[type];
        if (processer != null) {
            processer.OnProcess(message);
        }
        else {
            console.error("ReceiveMessage not achieve");
        }
    }
}
exports.MessageDispatcher = MessageDispatcher;
//# sourceMappingURL=MessageDispatcher.js.map