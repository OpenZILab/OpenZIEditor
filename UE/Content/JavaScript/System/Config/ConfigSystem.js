"use strict";
//
// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
// Created by goderyu
// DateTime: 2023/03/27 18:12
// 
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSystem = void 0;
const path = require("path");
const System_1 = require("../Engine/System");
const UE = require("ue");
const QEngine_1 = require("../Engine/QEngine");
const ProjectSystem_1 = require("../Project/Project/ProjectSystem");
class ConfigSystem extends System_1.QSystem {
    PreInit() {
        // 初始化时注册编辑器配置和项目配置
        let ConfigRootPath = path.join(UE.BlueprintPathsLibrary.ProjectPluginsDir(), "OpenZIEditor", "Config", "ConfigTool");
        let APIConfigRootPath = path.join(UE.BlueprintPathsLibrary.ProjectPluginsDir(), "OpenZIAPI", "Config", "ConfigTool");
        let APIJsonFiles = UE.ConfigManager.GetConfigFiles(APIConfigRootPath);
        let JsonFiles = UE.ConfigManager.GetConfigFiles(ConfigRootPath);
        for (let i = 0; i < APIJsonFiles.Num(); ++i) {
            let JsonFilename = APIJsonFiles.GetRef(i);
            console.log(`注册编辑器配置文件${APIJsonFiles.GetRef(i)}`);
            let FileFullPath = path.join(APIConfigRootPath, JsonFilename);
            UE.ConfigManager.RegisterConfigFile(FileFullPath, true);
        }
        for (let i = 0; i < JsonFiles.Num(); ++i) {
            let JsonFilename = JsonFiles.GetRef(i);
            console.log(`注册编辑器配置文件${JsonFiles.GetRef(i)}`);
            let FileFullPath = path.join(ConfigRootPath, JsonFilename);
            UE.ConfigManager.RegisterConfigFile(FileFullPath, true);
        }
    }
    Init() {
    }
    PostInit() {
        let ConfigRootPath = path.join(UE.BlueprintPathsLibrary.ProjectPluginsDir(), "OpenZIEditor", "Config", "ConfigTool");
        let JsonFiles = UE.ConfigManager.GetConfigFiles(ConfigRootPath);
        ConfigRootPath = (0, QEngine_1.GetSystem)(ProjectSystem_1.ProjectSystem)?.GetUserSettingsDir();
        JsonFiles = UE.ConfigManager.GetConfigFiles(ConfigRootPath);
        for (let i = 0; i < JsonFiles.Num(); ++i) {
            console.log(`注册项目配置文件${JsonFiles.GetRef(i)}`);
            let FileFullPath = path.join(ConfigRootPath, JsonFiles.GetRef(i));
            UE.ConfigManager.RegisterConfigFile(FileFullPath, false);
        }
    }
    Shutdown() {
        UE.ConfigManager.UnregisterAllConfigFile();
    }
    BeginPlay() {
    }
    BeginPlayFinished() {
    }
    Tick(DeltaTime) {
    }
    ShouldInstantiate() {
        return true;
    }
}
exports.ConfigSystem = ConfigSystem;
//# sourceMappingURL=ConfigSystem.js.map