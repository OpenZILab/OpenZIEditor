///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/18 23:55
///
import * as UE from "ue"
import { GetSystem } from "../Engine/QEngine"
import { ProjectSystem } from "../Project/Project/ProjectSystem"
import path = require("path")
export enum GameEngineList {
    UE = "UE",
    Unity = "Unity",
}

export var WebSocketUrl: string = "ws://127.0.0.1:18892/"

export var ApiWebServerPort = 18892
export var bWebsocketServerMode = true
export const GameEngineType = GameEngineList.UE
export var bShowMouse = true
export var bCloudRenderingMode = false
export var PreLoadMaps = Array<string>()



export function WriteSetting(Path): void {
    let configPath = path.join(GetSystem(ProjectSystem).GetProjectDir(), Path)
    let Str = UE.OpenZIFrameworkLibrary.ReadFile(configPath)
    let  configJson =null
    if(Str != ""){
        configJson = JSON.parse(Str)
        WebSocketUrl = configJson.WebConfig.ApiURL
        bShowMouse = configJson.bShowMouse
        bCloudRenderingMode = configJson.bEnableCloudRender
        ApiWebServerPort = configJson.ApiWebServerPort
        bWebsocketServerMode = configJson.bWebsocketServerMode
        PreLoadMaps = configJson.PreLoadMaps
    }
}

export namespace ProjectSetting {
    export var ProjectPath = UE.BlueprintPathsLibrary.ProjectDir()
}