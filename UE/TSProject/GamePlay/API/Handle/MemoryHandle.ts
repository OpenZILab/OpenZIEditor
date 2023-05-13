///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/11/17 23:47
///


import * as UE from "ue"

export class MemoryHandleClass {


    /**
      *Get system memory
      *@return memory bit
      */
    static GetSystemMemoryTotal(): number {
        let MemoryTotal = Number(UE.OpenZIFrameworkLibrary.GetSystemMemoryTotal())
        return MemoryTotal
    }

    /**
     *Get the memory used by the user
     *@return memory bit
     */
    static GetUserSystemMemory(): number {
        let UserMemory = Number(UE.OpenZIFrameworkLibrary.GetSystemMemoryUsed())
        return UserMemory
    }

}