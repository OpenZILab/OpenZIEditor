///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/20 14:21
///

import * as UE from "ue"
import { ObserverPawnView } from "../View/ObserverPawnView"

export function GetObserverPawn_UE(){
    let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld()
    let ObserverPawn = UE.GameplayStatics.GetPlayerPawn(World,0) as ObserverPawnView
    if(ObserverPawn !== null)
    {
        return ObserverPawn
    }
    return null
}
