"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 1:07
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageQueueList = exports.Ctor = void 0;
const Sigleton_1 = require("../Sigleton");
const Timer_1 = require("../Timer");
const MessageDispatcher_1 = require("./MessageDispatcher");
function Ctor() {
}
exports.Ctor = Ctor;
class MessageQueue {
    QueueFirst;
    QueueLast;
    QueueData;
    constructor() {
        this.Clear();
    }
    Clear() {
        this.QueueFirst = 0;
        this.QueueLast = -1;
        this.QueueData = new Map();
    }
    PushBack(data) {
        this.QueueLast = this.QueueLast + 1;
        this.QueueData[this.QueueLast] = data;
    }
    PopFront() {
        let QueueFirst = this.QueueFirst;
        if (QueueFirst > this.QueueLast) {
            return;
        }
        let data = this.QueueData[QueueFirst];
        this.QueueData[QueueFirst] = null;
        this.QueueFirst = QueueFirst + 1;
        return data;
    }
}
class MessageQueueList extends Sigleton_1.Sigleton {
    static GetInstance() {
        return super.TakeInstance(MessageQueueList);
    }
    static QueueList;
    MessageQueueTickList;
    OnInit() {
    }
    Ctor() {
        MessageQueueList.QueueList = new Map();
        this.MessageQueueTickList = new Map();
    }
    Clear() {
        MessageQueueList.QueueList.forEach((value, key) => {
            this.RemoveMessageQueue(key);
        });
        MessageQueueList.QueueList = new Map();
    }
    AddMessageQueue(type, time) {
        let NewMessageQueue = new MessageQueue();
        MessageQueueList.QueueList[type] = NewMessageQueue;
        function MessageQueueTick() {
            let message = MessageQueueList.QueueList[type].PopFront();
            if (message != null) {
                MessageDispatcher_1.MessageDispatcher.GetInstance().ReceiveMessage(type, message);
            }
        }
        if (time != null) {
            this.MessageQueueTickList[type] = Timer_1.Timer.GetInstance().AddTimer(time, MessageQueueTick, false, "");
        }
        else {
            this.MessageQueueTickList[type] = Timer_1.Timer.GetInstance().AddTimer(0, MessageQueueTick, false, "");
        }
    }
    RemoveMessageQueue(type) {
        MessageQueueList.QueueList[type].Clear();
        MessageQueueList.QueueList[type] = null;
        Timer_1.Timer.GetInstance().DelTimer(this.MessageQueueTickList[type]);
    }
    AddMessage(type, message, time) {
        if (MessageQueueList.QueueList[type] == null) {
            this.AddMessageQueue(type, time);
        }
        MessageQueueList.QueueList[type].PushBack(message);
    }
}
exports.MessageQueueList = MessageQueueList;
//# sourceMappingURL=MessageQueue.js.map