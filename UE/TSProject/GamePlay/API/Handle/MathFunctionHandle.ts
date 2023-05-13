///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 16:25
///

import * as UE from "ue";
import {NewArray} from "ue";

export function ReverseArray(Vec): any{
    let InVecs = NewArray(UE.Vector)
    let n = Vec.Num()
    for (let i = 0; i < n; i++){
        InVecs.Add(Vec.Get(n - i - 1))
    }
    return InVecs
}

