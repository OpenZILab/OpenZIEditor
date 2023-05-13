/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/1 下午6:14
 */

export class Lib_String {
}

declare global {
    interface String {
        equals(v): boolean
    }
}

String.prototype.equals = function (value: string): boolean {
    return String(this) === String(value);
};