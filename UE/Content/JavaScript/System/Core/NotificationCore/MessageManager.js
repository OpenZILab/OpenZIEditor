"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/1 16:21
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForeachObject = exports.MessageCenter = void 0;
const EventDispatcher_1 = require("../EventDispatcher");
const NotificationLists_1 = require("./NotificationLists");
class MessageCenter {
    static Add(obj, func, Message) {
        EventDispatcher_1.EventDispatcher.GetInstance().Add(obj, func, String(Message.MessageUUID));
    }
    static Remove(obj, Message) {
        EventDispatcher_1.EventDispatcher.GetInstance().Remove(obj, String(Message.MessageUUID));
    }
    static Execute(Message, ...data) {
        EventDispatcher_1.EventDispatcher.GetInstance().Excute(String(Message.MessageUUID), data);
    }
}
exports.MessageCenter = MessageCenter;
function ForeachObject(obj, MessageUUID) {
    if (Object.keys(obj).length == 0) {
        Object.defineProperty(obj, "MessageUUID", { value: MessageUUID });
    }
    else {
        Object.keys(obj).forEach(key => {
            let CurMessageUUid = String(MessageUUID);
            CurMessageUUid += key;
            // console.log(CurMessageUUid)
            if (Object.keys(obj[key]).length == 0) {
                Object.defineProperty(obj[key], "MessageUUID", { value: CurMessageUUid });
            }
            else if (obj[key] instanceof Object) {
                ForeachObject(obj[key], CurMessageUUid);
            }
            else {
                Object.defineProperty(obj, "MessageUUID", { value: CurMessageUUid });
            }
        });
    }
}
exports.ForeachObject = ForeachObject;
ForeachObject(NotificationLists_1.NotificationLists, "");
//# sourceMappingURL=MessageManager.js.map