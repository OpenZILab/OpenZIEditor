"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/3/7 上午1:04
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lib_Array = void 0;
class Lib_Array {
}
exports.Lib_Array = Lib_Array;
/**
 *Get the effective subscript of the array
 *@param index
 */
Array.prototype.getValidIndex = function (index) {
    return index >= 0 && index < this.length ? index : 0;
};
Array.prototype.indexValid = function (index) {
    return index >= 0 && index < this.length;
};
Array.prototype.isEmpty = function () {
    return this.length > 0;
};
Array.prototype.contains = function (item) {
    return this.indexOf(item) !== -1;
};
Array.prototype.insert = function (index, item) {
    if (!this.indexValid(index))
        return;
    if (index < this.length) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (i >= index) {
                this[i + 1] = this[i];
            }
            if (index === i) {
                this[index] = item;
            }
        }
    }
};
Array.prototype.get = function (index) {
    if (!this.indexValid(index))
        return null;
    if (index < this.length)
        return this[index];
    return null;
};
Array.prototype.set = function (index, item) {
    if (!this.indexValid(index))
        return;
    if (index < this.length)
        this[index] = item;
};
Array.prototype.remove = function (item) {
    let index = this.indexOf(item);
    if (!this.indexValid(index))
        return;
    this.splice(index, 1);
};
Array.prototype.removeIf = function (predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i], i, this)) {
            this.splice(i, 1);
        }
    }
};
Array.prototype.removeAt = function (index) {
    if (!this.indexValid(index))
        return;
    if (index < this.length) {
        this[index] = null;
        this.splice(index, 1);
    }
};
Array.prototype.clear = function () {
    this.splice(0, this.length);
};
Array.prototype.find = function (func) {
    let index = this.findIndex((item) => {
        return func(item);
    });
    return this.indexValid(index) ? this.at(index) : null;
};
Array.prototype.deepCopy = function () {
    let arr = [];
    for (const item of this) {
        let ii = typeof item.deepCopy === "function" ? item.deepCopy() : item;
        arr.push(ii);
    }
    return arr;
};
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
    let vs = [];
    for (let i = 0; i < this.length; i++) {
        let t = this.at(i);
        // @ts-ignore
        let tv = typeof t.toJSON === "function" ? t.toJSON() : this.at(i);
        vs.push(tv);
    }
    return vs;
};
//# sourceMappingURL=Lib_Array.js.map