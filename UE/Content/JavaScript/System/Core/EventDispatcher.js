"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/15 14:30
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
const Sigleton_1 = require("./Sigleton");
class TakeProcess {
    processFunc = null;
    constructor(func) {
        this.processFunc = func;
    }
    OnProcess(obj, data) {
        if (this.processFunc != null) {
            this.processFunc.apply(obj, data);
        }
    }
}
class EventDispatcher extends Sigleton_1.Sigleton {
    static GetInstance() {
        return super.TakeInstance(EventDispatcher);
    }
    OnInit() {
        console.log("EventDispatcher OnInit");
    }
    callMap = new Map();
    Add(obj, func, name) {
        let listMaps = this.callMap.get(name);
        if (listMaps) {
            for (let i = 0; i < listMaps.length; i++) {
                if (listMaps[i][0] == obj && listMaps[i][1].processFunc == func) {
                    return;
                }
            }
        }
        else {
            this.callMap.set(name, []);
            listMaps = this.callMap.get(name);
            // console.log(this.callMap.size)
        }
        let process = new TakeProcess(func);
        listMaps.push([obj, process]);
    }
    Remove(obj, name) {
        console.log("Remove          " + name);
        let listMaps = this.callMap.get(name);
        if (listMaps) {
            for (let i = listMaps.length - 1; i >= 0; i--) {
                if (listMaps[i][0] == obj) {
                    listMaps.splice(i, 1);
                }
            }
        }
        if (listMaps && listMaps.length == 0) {
            this.callMap.delete(name);
        }
    }
    Fire(name, ...data) {
        // console.log("wwwwwwwwwwwwwww  "+data)
        //     console.log(name + this.callMap.size)
        let listMaps = this.callMap.get(name);
        if (listMaps) {
            for (let i = listMaps.length - 1; i >= 0; i--) {
                listMaps[i][1].OnProcess(listMaps[i][0], data);
            }
        }
    }
    Excute(name, data) {
        // console.log("wwwwwwwwwwwwwww  "+data)
        //     console.log(name + this.callMap.size)
        let listMaps = this.callMap.get(name);
        if (listMaps) {
            for (let i = listMaps.length - 1; i >= 0; i--) {
                listMaps[i][1].OnProcess(listMaps[i][0], data);
            }
        }
    }
}
exports.EventDispatcher = EventDispatcher;
//# sourceMappingURL=EventDispatcher.js.map