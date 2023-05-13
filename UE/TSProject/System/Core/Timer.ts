///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/05 14:30
///

import { Sigleton } from "./Sigleton"

class TakeProcess {
    private TickElapsedTime: number = 0
    private TickID: number = 0
    private TickWaitTime: number =  0
    private TickCallBack: Function
    private  TickOnce: boolean = false
    private  TickMark: string = ""
    private  TickEnd: boolean = false

    constructor(id,time,callback,once,mark){
        this.TickID = id
        this.TickWaitTime = time
        this.TickCallBack = callback
        this.TickOnce = once
        this.TickMark = mark
    }

    public Fire(fixedTime){
        this.TickElapsedTime = this.TickElapsedTime + fixedTime
        if (this.TickElapsedTime >= this.TickWaitTime){
            this.TickCallBack()
            if (this.TickOnce === true){
                this.TickEnd = true
            }
            else {
                this.TickElapsedTime = 0
            }
        }
    }

    public GetTickEnd(){
        return this.TickEnd
    }

    public SetTickEnd(finish: boolean){
        this.TickEnd = finish
    }
}

export class Timer extends Sigleton {
    static GetInstance(): Timer {
        return super.TakeInstance(Timer)
    }

    static DeleteInstance(): Timer {
        return super.DeleteInstance(Timer)
    }

    TickerList:Map<number, any> = new Map<number, any>()
    TickIndexId: number = 0

    public OnInit(){
        console.log("Timer OnInit")
    }

    public OnDestory(){
        console.log("Timer OnDestory")
    }

    public Fire(fixedTime){
        this.TickerList.forEach((value , key) =>
        {
            this.TickerList.get(key).Fire(fixedTime)
            if (this.TickerList.get(key).GetTickEnd() === true){
               this.TickerList.delete(key)
            }
        })
    }

    public AddTimer(time,callback,once,mark){
        this.TickIndexId = this.TickIndexId +1
        let TickFunc = new TakeProcess(this.TickIndexId,time,callback,once,mark)
        this.TickerList.set(this.TickIndexId,TickFunc)
        return this.TickIndexId
    }

    public DelTimer(id){
        this.TickerList.get(id).SetTickEnd(true)
    }
}