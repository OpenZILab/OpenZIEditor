"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/05 14:30
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const Sigleton_1 = require("./Sigleton");
class TakeProcess {
    TickElapsedTime = 0;
    TickID = 0;
    TickWaitTime = 0;
    TickCallBack;
    TickOnce = false;
    TickMark = "";
    TickEnd = false;
    constructor(id, time, callback, once, mark) {
        this.TickID = id;
        this.TickWaitTime = time;
        this.TickCallBack = callback;
        this.TickOnce = once;
        this.TickMark = mark;
    }
    Fire(fixedTime) {
        this.TickElapsedTime = this.TickElapsedTime + fixedTime;
        if (this.TickElapsedTime >= this.TickWaitTime) {
            this.TickCallBack();
            if (this.TickOnce === true) {
                this.TickEnd = true;
            }
            else {
                this.TickElapsedTime = 0;
            }
        }
    }
    GetTickEnd() {
        return this.TickEnd;
    }
    SetTickEnd(finish) {
        this.TickEnd = finish;
    }
}
class Timer extends Sigleton_1.Sigleton {
    static GetInstance() {
        return super.TakeInstance(Timer);
    }
    static DeleteInstance() {
        return super.DeleteInstance(Timer);
    }
    TickerList = new Map();
    TickIndexId = 0;
    OnInit() {
        console.log("Timer OnInit");
    }
    OnDestory() {
        console.log("Timer OnDestory");
    }
    Fire(fixedTime) {
        this.TickerList.forEach((value, key) => {
            this.TickerList.get(key).Fire(fixedTime);
            if (this.TickerList.get(key).GetTickEnd() === true) {
                this.TickerList.delete(key);
            }
        });
    }
    AddTimer(time, callback, once, mark) {
        this.TickIndexId = this.TickIndexId + 1;
        let TickFunc = new TakeProcess(this.TickIndexId, time, callback, once, mark);
        this.TickerList.set(this.TickIndexId, TickFunc);
        return this.TickIndexId;
    }
    DelTimer(id) {
        this.TickerList.get(id).SetTickEnd(true);
    }
}
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map