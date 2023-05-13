///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 0:40
///

import * as UE from 'ue'
import {GameInstance} from "ue";
import * as puerts from "puerts"
import {argv} from "puerts";

export function StartListener(): void{
    if (UE.PixelStreamingInput.StaticClass() != null){
        let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld() as UE.World
        let CloudRenderInstance =  UE.Class.Load("/OpenZIAPI/OpenZIFrameWork/BP/CloudRender/CloudRenderInstance.CloudRenderInstance_C")
        let CloudRenderObj = UE.WorldExtensionMethods.SpawnActor(world,CloudRenderInstance,undefined,UE.ESpawnActorCollisionHandlingMethod.Undefined,undefined, undefined) as UE.Actor
        CloudRenderObj.AddComponentByClass(UE.PixelStreamingInput.StaticClass(),true,new UE.Transform,true)
        let PixelStreamingInputComponent = CloudRenderObj.GetComponentByClass(UE.PixelStreamingInput.StaticClass()) as UE.PixelStreamingInput
        PixelStreamingInputComponent.OnInputEvent.Add(puerts.argv.getByName("GameInstance"),"OnInputEvent")
    }
}

export  function OnInputEvent(message): void{
    let commandLineMessage,bSucceed
    UE.PixelStreamingInput.prototype.GetJsonStringValue(message,"Console",commandLineMessage,bSucceed)
    if (bSucceed){
        UE.KismetSystemLibrary.ExecuteConsoleCommand(UE.OpenZIFrameworkLibrary.GetCurrentWorld(),commandLineMessage)
    }
}