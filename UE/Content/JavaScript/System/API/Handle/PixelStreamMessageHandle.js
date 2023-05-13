"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 0:40
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnInputEvent = exports.StartListener = void 0;
const UE = require("ue");
const puerts = require("puerts");
const puerts_1 = require("puerts");
function StartListener() {
    if (UE.PixelStreamingInput.StaticClass() != null) {
        let world = puerts_1.argv.getByName("GameInstance").GetWorld();
        let CloudRenderInstance = UE.Class.Load("/OpenZIAPI/OpenZIFrameWork/BP/CloudRender/CloudRenderInstance.CloudRenderInstance_C");
        let CloudRenderObj = UE.WorldExtensionMethods.SpawnActor(world, CloudRenderInstance, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        CloudRenderObj.AddComponentByClass(UE.PixelStreamingInput.StaticClass(), true, new UE.Transform, true);
        let PixelStreamingInputComponent = CloudRenderObj.GetComponentByClass(UE.PixelStreamingInput.StaticClass());
        PixelStreamingInputComponent.OnInputEvent.Add(puerts.argv.getByName("GameInstance"), "OnInputEvent");
    }
}
exports.StartListener = StartListener;
function OnInputEvent(message) {
    let commandLineMessage, bSucceed;
    UE.PixelStreamingInput.prototype.GetJsonStringValue(message, "Console", commandLineMessage, bSucceed);
    if (bSucceed) {
        UE.KismetSystemLibrary.ExecuteConsoleCommand(UE.OpenZIFrameworkLibrary.GetCurrentWorld(), commandLineMessage);
    }
}
exports.OnInputEvent = OnInputEvent;
//# sourceMappingURL=PixelStreamMessageHandle.js.map