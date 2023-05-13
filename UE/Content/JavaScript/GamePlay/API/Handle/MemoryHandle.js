"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/11/17 23:47
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryHandleClass = void 0;
const UE = require("ue");
class MemoryHandleClass {
    /**
      *Get system memory
      *@return memory bit
      */
    static GetSystemMemoryTotal() {
        let MemoryTotal = Number(UE.OpenZIFrameworkLibrary.GetSystemMemoryTotal());
        return MemoryTotal;
    }
    /**
     *Get the memory used by the user
     *@return memory bit
     */
    static GetUserSystemMemory() {
        let UserMemory = Number(UE.OpenZIFrameworkLibrary.GetSystemMemoryUsed());
        return UserMemory;
    }
}
exports.MemoryHandleClass = MemoryHandleClass;
//# sourceMappingURL=MemoryHandle.js.map