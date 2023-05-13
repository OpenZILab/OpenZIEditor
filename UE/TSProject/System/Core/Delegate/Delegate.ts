/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午5:18
 */

export type SimpleDelegate = () => void;
type ParametersType<T extends ([...args]: any) => any> = T extends (...args: infer P) => any ? P : never;

export class Singlecast<T extends (...args: any[]) => any> {
    private _target: any
    private _methodName: string

    Bind(func: T): void
    Bind(target: Object, methodName: string): void
    Bind(target: Object | T, methodName?: string): void {
        if (typeof target === "function") {
            this._target = target
            this._methodName = null
        } else {
            this._target = target
            this._methodName = methodName
        }
    }

    Unbind(): void {
        this._target = null
        this._methodName = null
    }

    IsBound(): boolean {
        return this._target != null
    }

    Execute(...args: ParametersType<T>): ReturnType<T> {
        if (this.IsBound()) {
            if (this._methodName != null)
                return this._target[this._methodName](...args)
            else
                return this._target(...args)
        }
        return null
    }
}

export class Multicast<T extends (...args: any[]) => any> {
    private _delegateList: Array<Singlecast<T>> = new Array<Singlecast<T>>();

    Add(func: T): void
    Add(target: Object, methodName?: string): void
    Add(target: Object | T, methodName?: string): void {
        if (typeof target === "function") {
            let delegate = new Singlecast<T>()
            delegate.Bind(target, "")
            this._delegateList.push(delegate)
        } else {
            let delegate = new Singlecast<T>()
            delegate.Bind(target, methodName)
            this._delegateList.push(delegate)
        }
    }

    Remove(func: T): void {
        let index = this._delegateList.findIndex((delegate: Singlecast<T>) => {
            return func === delegate["_target"]
        })
        this._delegateList.splice(index, 1)
    }

    Broadcast(...args: Parameters<T>): void {
        this._delegateList.forEach((delegate: Singlecast<T>) => {
            delegate.Execute(...args)
        })
    }

    Clear(): void {
        this._delegateList.splice(0, this._delegateList.length)
    }
}