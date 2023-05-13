///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/11/17 23:56
///

import { MemoryHandleClass } from "../Handle/MemoryHandle";

/**
 * get system memory
 * @return memory bit
 */
export function GetSystemMemoryTotal(): number {
    return MemoryHandleClass.GetSystemMemoryTotal()
}

/**
 * Get the memory used by the user
 * @return memory bit
 */
export function GetUserSystemMemory(): number {
    return MemoryHandleClass.GetUserSystemMemory()
}