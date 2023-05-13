/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/3/7 上午1:04
 */

declare global {
    interface Array<T> {
        getValidIndex(index: number): number

        indexValid(index: number): boolean

        isEmpty(): boolean

        contains(item: any): boolean

        insert(index: number, item: T)

        get(index: number): T

        set(index: number, item: T)

        remove(item: T)

        removeIf(predicate: (value: T, index: number, array: T[]) => boolean): void;

        removeAt(index: number)

        clear()

        find(func: (item) => boolean): T

        deepCopy(): T[]

        toString(): string

        // fromString(str: string, metadata: IPropertyMetadata<any>)

        toJSON(): any

        // fromJSON(json: any, metadata: IPropertyMetadata<any>)
    }
}

export class Lib_Array {
}
/**
 *Get the effective subscript of the array
 *@param index
 */
Array.prototype.getValidIndex = function (index: number): number {
    return index >= 0 && index < this.length ? index : 0;
}

Array.prototype.indexValid = function (index) {
    return index >= 0 && index < this.length
}

Array.prototype.isEmpty = function (): boolean {
    return this.length > 0;
}

Array.prototype.contains = function (item: any): boolean {
    return this.indexOf(item) !== -1
}

Array.prototype.insert = function (index, item) {
    if (!this.indexValid(index)) return

    if (index < this.length) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (i >= index) {
                this[i + 1] = this[i]
            }
            if (index === i) {
                this[index] = item
            }
        }
    }
}

Array.prototype.get = function (index) {
    if (!this.indexValid(index)) return null

    if (index < this.length)
        return this[index]

    return null
}

Array.prototype.set = function (index, item) {
    if (!this.indexValid(index)) return

    if (index < this.length)
        this[index] = item
}

Array.prototype.remove = function (item) {
    let index = this.indexOf(item)
    if (!this.indexValid(index)) return

    this.splice(index, 1)
}

Array.prototype.removeIf = function <T>(
    this: T[],
    predicate: (value: T, index: number, array: T[]) => boolean
) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i], i, this)) {
            this.splice(i, 1);
        }
    }
};

Array.prototype.removeAt = function (index) {
    if (!this.indexValid(index)) return

    if (index < this.length) {
        this[index] = null
        this.splice(index, 1);
    }
}

Array.prototype.clear = function () {
    this.splice(0, this.length)
}

Array.prototype.find = function (func) {
    let index = this.findIndex((item) => {
        return func(item)
    })
    return this.indexValid(index) ? this.at(index) : null
}

Array.prototype.deepCopy = function () {
    let arr = []
    for (const item of this) {
        let ii = typeof item.deepCopy === "function" ? item.deepCopy() : item
        arr.push(ii)
    }
    return arr
}

// Array.prototype.toString = function () {
//     let result: string = ""
//     for (let item of this) {
//         if (item) {
//             let itemStr = item.toString()
//             result += itemStr + ","
//         } else {
//             result += "null" + ","
//         }
//     }
//
//     if (this.length > 0)
//         result = result.substring(0, result.length - 1)
//
//     result = `{${result}}`
//     return result;
// }
//
// Array.prototype.fromString = function (str, metadata) {
//     this.fromJSON(str, metadata)
// }

Array.prototype.toJSON = function () {
    let vs = []

    for (let i = 0; i < this.length; i++) {
        let t = this.at(i)
        // @ts-ignore
        let tv = typeof t.toJSON === "function" ? t.toJSON() : this.at(i)
        vs.push(tv)
    }

    return vs
}