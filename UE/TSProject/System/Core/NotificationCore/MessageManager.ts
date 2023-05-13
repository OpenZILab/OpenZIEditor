///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/1 16:21
///

import { EventDispatcher } from "../EventDispatcher"
import { PropertyCopy } from "../PropertyCopy";
import { NotificationLists } from "./NotificationLists";

export class MessageCenter {
    static Add(obj: any, func: Function, Message: any) {

        EventDispatcher.GetInstance().Add(obj, func, String(Message.MessageUUID))
    }
    static Remove(obj: any, Message: any) {
        EventDispatcher.GetInstance().Remove(obj, String(Message.MessageUUID))
    }
    static Execute(Message: any, ...data: any[]) {
        EventDispatcher.GetInstance().Excute(String(Message.MessageUUID), data)
    }
}

export function ForeachObject(obj:object,MessageUUID:string){
    if( Object.keys(obj).length == 0){
        Object.defineProperty(obj,"MessageUUID",{value:MessageUUID})
    }else{
        Object.keys(obj).forEach(key=>{
                let CurMessageUUid = String(MessageUUID)
                CurMessageUUid+=key
                // console.log(CurMessageUUid)
                if( Object.keys(obj[key]).length == 0){
                    Object.defineProperty(obj[key],"MessageUUID",{value:CurMessageUUid});
                }
                else if( obj[key] instanceof Object){
                    ForeachObject(obj[key],CurMessageUUid)
                }
                else{
                    Object.defineProperty(obj,"MessageUUID",{value:CurMessageUUid})
                }
        })
    }
}

ForeachObject(NotificationLists,"")