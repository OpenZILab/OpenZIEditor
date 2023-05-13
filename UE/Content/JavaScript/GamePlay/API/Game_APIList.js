"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/23 15:15
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActorVisible = exports.SceneAPI = exports.WebPage = exports.APIManager = exports.AxesTool = exports.GetDefaultPawn = exports.Skyline = exports.ChangePawn = exports.Console = void 0;
const ApiViewModelSystem_1 = require("../../System/API/ApiViewModelSystem");
const MessageManager_1 = require("../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../System/Core/NotificationCore/NotificationLists");
const IConsoleHandle = require("../API/IHandle/IConsoleHandle");
const IMainControllerHandle = require("../API/IHandle/IMainControllerHandle");
const IWebPageHandle_1 = require("./IHandle/IWebPageHandle");
//import { IDigitalTwinHandle } from "./IHandle/IDigitalTwinHandle"
//@Console
class Console {
    static Console(message) {
        IConsoleHandle.ConsoleCommand(message);
    }
}
exports.Console = Console;
//@ChangePawn
class ChangePawn {
    static ChangePawn(message) {
        IMainControllerHandle.ChangePawn(message);
        let Entry = { Class: "CesiumPawn" };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.DELETE_API, Entry);
    }
    static ChangeDefaultPawn(message) {
        IMainControllerHandle.ChangeDefaultPawn(message);
        let Entry = { Class: "CesiumPawn" };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.DELETE_API, Entry);
    }
}
exports.ChangePawn = ChangePawn;
//@Skyline
class Skyline {
    static OpenSkyline(message) {
        IMainControllerHandle.OpenSkyline(message);
    }
    static CloseSkyline(message) {
        IMainControllerHandle.CloseSkyline(message);
    }
}
exports.Skyline = Skyline;
function GetDefaultPawn() {
    IMainControllerHandle.GetDefaultPawn();
}
exports.GetDefaultPawn = GetDefaultPawn;
//@Axes
class AxesTool {
    static OpenAxesTool(message) {
        IMainControllerHandle.OpenAxesTool(message);
    }
    static CloseAxesTool(message) {
        IMainControllerHandle.CloseAxesTool(message);
    }
    static SetAxesToolSelectMoth(message) {
        IMainControllerHandle.SetAxesToolSelectMoth(message);
    }
    static SetAxesSelectionOutline(message) {
        IMainControllerHandle.SetAxesSelectionOutline(message);
    }
}
exports.AxesTool = AxesTool;
class APIManager {
    static ClearAllAPI(message) {
        ApiViewModelSystem_1.APIViewModelSystem.GetInstance().ClearAllView(message);
    }
    static ClearAPIByType(message) {
        ApiViewModelSystem_1.APIViewModelSystem.GetInstance().ClearViewByType(message);
    }
}
exports.APIManager = APIManager;
class WebPage {
    static LoadWebPage(msg) {
        (0, IWebPageHandle_1.InLoadWebPage)(msg);
    }
    static UnloadWebPage(msg) {
        (0, IWebPageHandle_1.InUnloadWebPage)(msg);
    }
}
exports.WebPage = WebPage;
class SceneAPI {
    constructor() { }
    static ChangeScene(msg) {
        let EngineSystem = require("../../System/Engine/QEngine");
        let SceneSystemInclude = require("../../System/Project/Scene/SceneSystem");
        // MessageCenter.Add(this, (result: string) => {
        //     msg.data.result = result
        //     let message = PackCallBacKMessage(msg, msg.data)
        //     WebSocketServer.GetInstance().OnSendWebMessage(message)
        //     MessageCenter.Remove(this,NotificationLists.API.ON_SCENE_LOADED)
        // }, NotificationLists.API.ON_SCENE_LOADED)
        // EngineSystem.GetSystem(SceneSystemInclude.SceneSystem)._LoadScene(msg.data.SceneName)
        EngineSystem.GetSystem(SceneSystemInclude.SceneSystem).PushMessage(msg);
    }
}
exports.SceneAPI = SceneAPI;
//@ActorVisible
class ActorVisible {
    static SetActorVisibleWithTags(message) {
        IMainControllerHandle.SetActorVisibleWithTags(message);
    }
    static SetNiagaraVisibleWithTags(message) {
        IMainControllerHandle.SetNiagaraVisibleWithTags(message);
    }
}
exports.ActorVisible = ActorVisible;
// export class DigitalTwinAPI {
//     static GetAllDigitalTwin() {
//         return IDigitalTwinHandle.GetInstance().GetAllDigitalTwin()
//     }
//     static GetDigitalTwinByName(twinName) {
//         return IDigitalTwinHandle.GetInstance().GetDigitalTwinByName(twinName)
//     }
//     static GetDigitalTwinById(twinId) {
//         return IDigitalTwinHandle.GetInstance().GetDigitalTwinById(twinId)
//     }
//     static GetDigitalTwinAllAPI(twinId) {
//         return IDigitalTwinHandle.GetInstance().GetDigitalTwinAllAPI(twinId)
//     }
//     static GetDigitalTwinAPIById(twinId, apiId) {
//         return IDigitalTwinHandle.GetInstance().GetDigitalTwinAPIById(twinId, apiId)
//     }
//     static SetDigitalTwinLocation(twinId, location) {
//         IDigitalTwinHandle.GetInstance().SetDigitalTwinLocation(twinId, location)
//     }
//     static GetDigitalTwinLocaion(twinId) {
//         return IDigitalTwinHandle.GetInstance().GetDigitalTwinLocaion(twinId)
//     }
//     static SetDigitalTwinRotation(twinId, rotation) {
//         IDigitalTwinHandle.GetInstance().SetDigitalTwinRotation(twinId, rotation)
//     }
//     static GetDigitalTwinRotation(twinId) {
//         return IDigitalTwinHandle.GetInstance().GetDigitalTwinRotation(twinId)
//     }
//     static UpdateDigitalTwinAPI(twinId, apiId, Model) {
//         IDigitalTwinHandle.GetInstance().UpdateDigitalTwinAPI(twinId, apiId, Model)
//     }
//     static SetDigitalTwinAPILocationById(twinId, apiId, location) {
//         IDigitalTwinHandle.GetInstance().SetDigitalTwinAPILocationById(twinId, apiId, location)
//     }
// }
//# sourceMappingURL=Game_APIList.js.map