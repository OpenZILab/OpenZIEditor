///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/10 18:10
///
import * as UE from 'ue'

declare module "ue" {
    interface Object {
        CreateDefaultSubobjectGeneric<T extends UE.Object>(SubobjectFName: string, ReturnType: UE.Class) : T
    }
}

UE.Object.prototype.CreateDefaultSubobjectGeneric = function CreateDefaultSubobjectGeneric<T extends UE.Object>(SubobjectFName: string, ReturnType: UE.Class) : T {
    return this.CreateDefaultSubobject(SubobjectFName, ReturnType, ReturnType, /*bIsRequired =*/ true, /*bIsAbstract =*/ false, /*bTransient =*/ false) as T;
}


export class ObjectHandle {

    static SpawnOBJ(cls: UE.Class, Name: string) {
        let curActor = UE.OpenZIFrameworkLibrary.SpawnAPIActor(cls, Name)
        console.log(curActor.GetName())
        if (curActor !== null) {
            return curActor
        }
        return null
    }


    static DestoryOBJ(obj: UE.Actor) {
        if (obj !== null && obj instanceof UE.Actor) {
            obj.K2_DestroyActor()
        }
    }
}

export type Engine_World = UE.World

export type Engine_Class = UE.Class

export type Engine_GameInstance = UE.GameInstance

export type Engine_MessageType= UE.EMessagePopupType

export type Engine_Widget= UE.UserWidget






