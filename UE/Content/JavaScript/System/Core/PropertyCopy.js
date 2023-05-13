"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/11/08 16:09
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyCopy = void 0;
class PropertyCopy {
    /**
     * Determine whether the object is an array
     * @param obj
     * @returns
     */
    static IsArray(obj) {
        return obj && typeof obj == "object" && obj instanceof Array;
    }
    /**
     * object deep copy
     * @param tSource
     * @returns
     */
    static DeepCopy(tSource, tTarget) {
        if (!tTarget) {
            tTarget = Array.isArray(tSource) ? [] : {};
        }
        for (const prop in tSource) {
            if (Object.prototype.hasOwnProperty.call(tSource, prop)) {
                const sourceProp = tSource[prop];
                if (sourceProp && typeof sourceProp === 'object') {
                    // @ts-ignore
                    tTarget[prop] = Array.isArray(sourceProp) ? [] : {};
                    this.DeepCopy(sourceProp, tTarget[prop]);
                }
                else {
                    tTarget[prop] = sourceProp;
                }
            }
        }
        return tTarget;
    }
    /**
     * object shallow copy
     * @param tSource
     * @returns
     */
    static SimpleCopy(tSource, tTarget) {
        if (!tTarget) {
            tTarget = Array.isArray(tSource) ? [] : {};
        }
        for (const prop in tSource) {
            if (Object.prototype.hasOwnProperty.call(tSource, prop)) {
                const sourceProp = tSource[prop];
                tTarget[prop] = sourceProp;
            }
        }
        return tTarget;
    }
}
exports.PropertyCopy = PropertyCopy;
//# sourceMappingURL=PropertyCopy.js.map