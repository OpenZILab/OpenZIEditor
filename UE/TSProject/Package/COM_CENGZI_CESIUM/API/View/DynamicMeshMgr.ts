
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2022/10/18 17.29
 */

import * as  UE from "ue"

export class DynamicMeshMgr extends UE.DynamicMeshMgrActor{

    TrenchingActors:UE.TArray<string>


    ReceiveBeginPlay(): void {
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason): void {
        if(this.StaticMeshComponent !== null){
            this.StaticMeshComponent.SetVisibility(true)
        }
    }



}