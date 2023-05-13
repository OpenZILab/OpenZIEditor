///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///


import * as ObjectHanldes from "../Handle/ObjectHandle"

export function SpawnOBJ(cls,name){
    return ObjectHanldes.ObjectHandle.SpawnOBJ(cls,name)
}



export function DestoryOBJ(obj){
    ObjectHanldes.ObjectHandle.DestoryOBJ(obj)
}



export type Engine_World = ObjectHanldes.Engine_World

export type Engine_Class = ObjectHanldes.Engine_Class

export type Engine_GameInstance = ObjectHanldes.Engine_GameInstance

export type Engine_MessageType = ObjectHanldes.Engine_MessageType

export type Engine_Widget = ObjectHanldes.Engine_Widget






