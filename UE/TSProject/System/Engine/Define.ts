/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/21 下午2:32
 */

import * as UE from "ue";

export enum RunType {
    Preview,
    Edit,
}

export function GetRunType(): RunType {
    // @ts-ignore
    return UE.CoreFunctionLibrary.GetRunType()
}