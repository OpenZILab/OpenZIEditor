"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/11/17 23:56
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSystemMemory = exports.GetSystemMemoryTotal = void 0;
const MemoryHandle_1 = require("../Handle/MemoryHandle");
/**
 * get system memory
 * @return memory bit
 */
function GetSystemMemoryTotal() {
    return MemoryHandle_1.MemoryHandleClass.GetSystemMemoryTotal();
}
exports.GetSystemMemoryTotal = GetSystemMemoryTotal;
/**
 * Get the memory used by the user
 * @return memory bit
 */
function GetUserSystemMemory() {
    return MemoryHandle_1.MemoryHandleClass.GetUserSystemMemory();
}
exports.GetUserSystemMemory = GetUserSystemMemory;
//# sourceMappingURL=IMemoryHandle.js.map