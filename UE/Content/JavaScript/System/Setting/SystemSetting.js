"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSetting = exports.WriteSetting = exports.PreLoadMaps = exports.bCloudRenderingMode = exports.bShowMouse = exports.GameEngineType = exports.bWebsocketServerMode = exports.ApiWebServerPort = exports.WebSocketUrl = exports.GameEngineList = void 0;
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/18 23:55
///
const UE = require("ue");
const QEngine_1 = require("../Engine/QEngine");
const ProjectSystem_1 = require("../Project/Project/ProjectSystem");
const path = require("path");
var GameEngineList;
(function (GameEngineList) {
    GameEngineList["UE"] = "UE";
    GameEngineList["Unity"] = "Unity";
})(GameEngineList = exports.GameEngineList || (exports.GameEngineList = {}));
exports.WebSocketUrl = "ws://127.0.0.1:18892/";
exports.ApiWebServerPort = 18892;
exports.bWebsocketServerMode = true;
exports.GameEngineType = GameEngineList.UE;
exports.bShowMouse = true;
exports.bCloudRenderingMode = false;
exports.PreLoadMaps = Array();
function WriteSetting(Path) {
    let configPath = path.join((0, QEngine_1.GetSystem)(ProjectSystem_1.ProjectSystem).GetProjectDir(), Path);
    let Str = UE.OpenZIFrameworkLibrary.ReadFile(configPath);
    let configJson = null;
    if (Str != "") {
        configJson = JSON.parse(Str);
        exports.WebSocketUrl = configJson.WebConfig.ApiURL;
        exports.bShowMouse = configJson.bShowMouse;
        exports.bCloudRenderingMode = configJson.bEnableCloudRender;
        exports.ApiWebServerPort = configJson.ApiWebServerPort;
        exports.bWebsocketServerMode = configJson.bWebsocketServerMode;
        exports.PreLoadMaps = configJson.PreLoadMaps;
    }
}
exports.WriteSetting = WriteSetting;
var ProjectSetting;
(function (ProjectSetting) {
    ProjectSetting.ProjectPath = UE.BlueprintPathsLibrary.ProjectDir();
})(ProjectSetting = exports.ProjectSetting || (exports.ProjectSetting = {}));
//# sourceMappingURL=SystemSetting.js.map