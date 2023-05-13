///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 3:09
///

import {Sigleton} from "../Sigleton";

export enum MessageType{
    API = "API",
    File_CSV = "File_CSV",
    File_JSON = "File_JSON",
    File_XML = "File_XML"
}

export class MessageProcesser extends Sigleton {
    static GetInstance(): MessageProcesser {
        return super.TakeInstance(MessageProcesser);
    }

    private processerfunc: Function
    private callback: Function

    public Ctor(func,callback){
        this.processerfunc = func
        this.callback = callback
        return this
    }

    public OnProcess(message){
        let callbackmessage = this.processerfunc(message)
        this.callback(callbackmessage)
    }
}