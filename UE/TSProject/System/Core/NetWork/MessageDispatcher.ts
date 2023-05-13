///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 2:47
///

import {Sigleton} from "../Sigleton";
import {MessageProcesser} from "./MessageProcesser";
import * as IAPIMessageHandle from "../../API/IHandle/IAPIMessageHandle";

export class MessageDispatcher extends Sigleton {
    static GetInstance(): MessageDispatcher {
        return super.TakeInstance(MessageDispatcher);
    }

    private MessageProcesserMap: Map<string, Function>;

    OnInit(){
        this.MessageProcesserMap = new Map()
        this.MessageProcesserMap["API"] = MessageProcesser.GetInstance().Ctor(IAPIMessageHandle.HandleMessage,IAPIMessageHandle.CallBackMessage)
    }

    public ReceiveMessage(type,message){
        let processer = this.MessageProcesserMap[type]
        if (processer != null){
            processer.OnProcess(message)
        }else {
            console.error("ReceiveMessage not achieve")
        }
    }
}