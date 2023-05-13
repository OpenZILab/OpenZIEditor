///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/23 15:15
///

import { SceneSystem } from "../../System/Project/Scene/SceneSystem"
import { APIViewModelSystem } from "../../System/API/ApiViewModelSystem"
import { WebSocketServer } from "../../System/API/Handle/WebSocketServer"
import { PackCallBacKMessage } from "../../System/API/IHandle/IAPIMessageHandle"
import { MessageCenter } from "../../System/Core/NotificationCore/MessageManager"
import { NotificationLists } from "../../System/Core/NotificationCore/NotificationLists"
import * as IConsoleHandle from "../API/IHandle/IConsoleHandle"
import * as IMainControllerHandle from "../API/IHandle/IMainControllerHandle"
import { InLoadWebPage, InUnloadWebPage } from "./IHandle/IWebPageHandle"
//import { IDigitalTwinHandle } from "./IHandle/IDigitalTwinHandle"
//@Console
export class Console {
    static Console(message) {
        IConsoleHandle.ConsoleCommand(message)
    }
}

//@ChangePawn
export class ChangePawn {
    static ChangePawn(message) {
        IMainControllerHandle.ChangePawn(message)
        let Entry = { Class: "CesiumPawn" }
        MessageCenter.Execute(NotificationLists.API.DELETE_API, Entry)
    }

    static ChangeDefaultPawn(message) {
        IMainControllerHandle.ChangeDefaultPawn(message)
        let Entry = { Class: "CesiumPawn" }
        MessageCenter.Execute(NotificationLists.API.DELETE_API, Entry)
    }
    // static ChangeCesiumPawn(message) {
    //     IMainControllerHandle.ChangeCesiumPawn(message)
    // }
}

//@Skyline
export class Skyline {
    static OpenSkyline(message) {
        IMainControllerHandle.OpenSkyline(message)
    }
    static CloseSkyline(message) {
        IMainControllerHandle.CloseSkyline(message)
    }
}

export function GetDefaultPawn(): void {
    IMainControllerHandle.GetDefaultPawn()
}

//@Axes
export class AxesTool {
    static OpenAxesTool(message) {
        IMainControllerHandle.OpenAxesTool(message)
    }

    static CloseAxesTool(message) {
        IMainControllerHandle.CloseAxesTool(message)
    }

    static SetAxesToolSelectMoth(message) {
        IMainControllerHandle.SetAxesToolSelectMoth(message)
    }

    static SetAxesSelectionOutline(message) {
        IMainControllerHandle.SetAxesSelectionOutline(message)
    }
}

export class APIManager {
    static ClearAllAPI(message) {
        APIViewModelSystem.GetInstance().ClearAllView(message)
    }
    static ClearAPIByType(message) {
        APIViewModelSystem.GetInstance().ClearViewByType(message)
    }
}


export class WebPage {
    static LoadWebPage(msg) {
        InLoadWebPage(msg)
    }
    static UnloadWebPage(msg) {
        InUnloadWebPage(msg)
    }
}

export class SceneAPI {
    constructor() { }
    static ChangeScene(msg) {
        let EngineSystem = require("../../System/Engine/QEngine")
        let SceneSystemInclude = require("../../System/Project/Scene/SceneSystem")
        // MessageCenter.Add(this, (result: string) => {
        //     msg.data.result = result
        //     let message = PackCallBacKMessage(msg, msg.data)
        //     WebSocketServer.GetInstance().OnSendWebMessage(message)
        //     MessageCenter.Remove(this,NotificationLists.API.ON_SCENE_LOADED)
        // }, NotificationLists.API.ON_SCENE_LOADED)
        // EngineSystem.GetSystem(SceneSystemInclude.SceneSystem)._LoadScene(msg.data.SceneName)
        EngineSystem.GetSystem(SceneSystemInclude.SceneSystem).PushMessage(msg)

    }
}



//@ActorVisible
export class ActorVisible {
    static SetActorVisibleWithTags(message) {
        IMainControllerHandle.SetActorVisibleWithTags(message)
    }
    static SetNiagaraVisibleWithTags(message) {
        IMainControllerHandle.SetNiagaraVisibleWithTags(message)
    }
}

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


