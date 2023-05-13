//
// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
// Created by goderyu
// DateTime: 2023/03/27 18:12
// 

import path = require('path')
import { QSystem } from '../Engine/System'
import * as UE from "ue"
import { GetSystem } from '../Engine/QEngine'
import { ProjectSystem } from '../Project/Project/ProjectSystem'

export class ConfigSystem extends QSystem {

    public PreInit() {
        // 初始化时注册编辑器配置和项目配置
        let ConfigRootPath = path.join(UE.BlueprintPathsLibrary.ProjectPluginsDir(), "OpenZIEditor", "Config", "ConfigTool")
        let APIConfigRootPath = path.join(UE.BlueprintPathsLibrary.ProjectPluginsDir(), "OpenZIAPI", "Config", "ConfigTool")
        let APIJsonFiles = UE.ConfigManager.GetConfigFiles(APIConfigRootPath)
        let JsonFiles = UE.ConfigManager.GetConfigFiles(ConfigRootPath)
        for(let i = 0; i < APIJsonFiles.Num(); ++i){
            let JsonFilename = APIJsonFiles.GetRef(i)
            console.log(`注册编辑器配置文件${APIJsonFiles.GetRef(i)}`)
            let FileFullPath = path.join(APIConfigRootPath, JsonFilename)
            UE.ConfigManager.RegisterConfigFile(FileFullPath, true)
        }
        for (let i = 0; i < JsonFiles.Num(); ++i) {
            let JsonFilename = JsonFiles.GetRef(i)
            console.log(`注册编辑器配置文件${JsonFiles.GetRef(i)}`)
            let FileFullPath = path.join(ConfigRootPath, JsonFilename)
            UE.ConfigManager.RegisterConfigFile(FileFullPath, true)
        }
    }

    public Init() {
    }

    public PostInit() {
        let ConfigRootPath = path.join(UE.BlueprintPathsLibrary.ProjectPluginsDir(), "OpenZIEditor", "Config", "ConfigTool")
        let JsonFiles = UE.ConfigManager.GetConfigFiles(ConfigRootPath)
        ConfigRootPath = GetSystem(ProjectSystem)?.GetUserSettingsDir()
        JsonFiles = UE.ConfigManager.GetConfigFiles(ConfigRootPath)
        for (let i = 0; i < JsonFiles.Num(); ++i) {
            console.log(`注册项目配置文件${JsonFiles.GetRef(i)}`)
            let FileFullPath = path.join(ConfigRootPath, JsonFiles.GetRef(i))
            UE.ConfigManager.RegisterConfigFile(FileFullPath, false)
        }
    }

    public Shutdown() {
        UE.ConfigManager.UnregisterAllConfigFile()
    }

    public BeginPlay() {
    }
    public BeginPlayFinished(): void {
       
    }

    public Tick(DeltaTime: number) {

    }

    public ShouldInstantiate(): boolean {
        return true
    }
}