/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/1 下午6:14
 */

export class Lib_Boolean {
}

declare global {
    interface Boolean {
        equals(v): boolean
    }
}

Boolean.prototype.equals = function (value: boolean): boolean {
    return Boolean(this) === Boolean(value);
};