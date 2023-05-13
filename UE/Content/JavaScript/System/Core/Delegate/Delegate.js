"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午5:18
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multicast = exports.Singlecast = void 0;
class Singlecast {
    _target;
    _methodName;
    Bind(target, methodName) {
        if (typeof target === "function") {
            this._target = target;
            this._methodName = null;
        }
        else {
            this._target = target;
            this._methodName = methodName;
        }
    }
    Unbind() {
        this._target = null;
        this._methodName = null;
    }
    IsBound() {
        return this._target != null;
    }
    Execute(...args) {
        if (this.IsBound()) {
            if (this._methodName != null)
                return this._target[this._methodName](...args);
            else
                return this._target(...args);
        }
        return null;
    }
}
exports.Singlecast = Singlecast;
class Multicast {
    _delegateList = new Array();
    Add(target, methodName) {
        if (typeof target === "function") {
            let delegate = new Singlecast();
            delegate.Bind(target, "");
            this._delegateList.push(delegate);
        }
        else {
            let delegate = new Singlecast();
            delegate.Bind(target, methodName);
            this._delegateList.push(delegate);
        }
    }
    Remove(func) {
        let index = this._delegateList.findIndex((delegate) => {
            return func === delegate["_target"];
        });
        this._delegateList.splice(index, 1);
    }
    Broadcast(...args) {
        this._delegateList.forEach((delegate) => {
            delegate.Execute(...args);
        });
    }
    Clear() {
        this._delegateList.splice(0, this._delegateList.length);
    }
}
exports.Multicast = Multicast;
//# sourceMappingURL=Delegate.js.map