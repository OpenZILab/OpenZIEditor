///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 1:07
///

import {Sigleton} from "../Sigleton";
import {Timer} from "../Timer";
import {MessageDispatcher} from "./MessageDispatcher";

export function Ctor(): void{

}

class MessageQueue {
    private QueueFirst: number
    private QueueLast: number
    private QueueData:Map<string, string>

    constructor(){
        this.Clear()
    }

    public Clear(){
        this.QueueFirst = 0
        this.QueueLast = -1
        this.QueueData = new Map()
    }

    public PushBack(data){
        this.QueueLast = this.QueueLast + 1
        this.QueueData[this.QueueLast] = data
    }

    public PopFront(){
        let QueueFirst = this.QueueFirst
        if(QueueFirst > this.QueueLast){
            return
        }
        let data = this.QueueData[QueueFirst]
        this.QueueData[QueueFirst] = null
        this.QueueFirst = QueueFirst + 1
        return data
    }
}

export class MessageQueueList extends Sigleton {
    static GetInstance(): MessageQueueList {
        return super.TakeInstance(MessageQueueList);
    }
    static QueueList: Map<string, MessageQueue>
    private MessageQueueTickList : Map<string, number>

    OnInit(){

    }

    public Ctor(){
        MessageQueueList.QueueList = new Map()
        this.MessageQueueTickList = new Map()
    }

    public Clear(){
        MessageQueueList.QueueList.forEach((value , key) =>
        {
            this.RemoveMessageQueue(key)
        })

        MessageQueueList.QueueList = new Map()
    }

    public AddMessageQueue(type,time){
        let NewMessageQueue = new MessageQueue()
        MessageQueueList.QueueList[type] = NewMessageQueue
        function MessageQueueTick(){
            let message = MessageQueueList.QueueList[type].PopFront()
            if (message != null){
                MessageDispatcher.GetInstance().ReceiveMessage(type,message)
            }
        }
        if (time != null){
            this.MessageQueueTickList[type] = Timer.GetInstance().AddTimer(time,MessageQueueTick,false,"")
        }
        else {
            this.MessageQueueTickList[type] = Timer.GetInstance().AddTimer(0,MessageQueueTick,false,"")
        }
    }

    public RemoveMessageQueue(type){
        MessageQueueList.QueueList[type].Clear()
        MessageQueueList.QueueList[type] = null
        Timer.GetInstance().DelTimer(this.MessageQueueTickList[type])
    }

    public AddMessage(type,message,time){
        if( MessageQueueList.QueueList[type] == null){
            this.AddMessageQueue(type,time)
        }
        MessageQueueList.QueueList[type].PushBack(message)
    }
}