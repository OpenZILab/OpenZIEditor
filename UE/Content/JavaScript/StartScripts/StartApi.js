"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/12 上午10:46
 */
Object.defineProperty(exports, "__esModule", { value: true });
global.debug = true;
if (global.EngineType == null)
    global.EngineType = "APIEngine";
require("./System/Utils/Lib_Array");
require("./System/Utils/Lib_Map");
require("./System/Utils/Lib_Set");
require("./System/Utils/Lib_JSON");
require("./System/Utils/Lib_Boolean");
require("./System/Utils/Lib_Number");
require("./System/Utils/Lib_String");
require("./System/Core/Property/PropertyValidation");
const SystemAPI = require("../System/API/System_APIList");
const Timer_1 = require("../System/Core/Timer");
const UE = require("ue");
const puerts_1 = require("puerts");
const MiscTools_1 = require("../System/Utils/MiscTools");
const ApiViewModelSystem_1 = require("../System/API/ApiViewModelSystem");
const LevelViewModel_1 = require("../GamePlay/API/ViewModel/LevelViewModel");
const FileSetting_1 = require("../System/Setting/FileSetting");
const QEngine_1 = require("../System/Engine/QEngine");
(0, MiscTools_1.WARNING)("------------------------ Start Api ----------------------------");
QEngine_1.QEngine.GetInstance().Init(global.EngineType);
let PuertsVmSystem = puerts_1.argv.getByName("PuertsVmSystem");
function GameBeginPlay() {
    (0, MiscTools_1.WARNING)("GameBeginPlay");
    (0, ApiViewModelSystem_1.GetViewModel)(LevelViewModel_1.LevelViewModel).AddCsvAsset(FileSetting_1.CSVConfigFilePath);
    QEngine_1.QEngine.GetInstance().BeginPlay(global.EngineType);
    QEngine_1.QEngine.GetInstance().BeginPlayFinished(global.EngineType);
    (0, ApiViewModelSystem_1.GetViewModel)(LevelViewModel_1.LevelViewModel).OpenStartLevel();
    UE.AxesToolSubsystem.Get().OnSelectionInteraction.Add(SetNotAxes);
    if (UE.AxesToolSubsystem.Get().OnSelectionInteraction) {
        if (UE.AxesToolSubsystem.Get().TransformInteraction) {
            UE.AxesToolSubsystem.Get().TransformInteraction.SetTransformMoth(UE.ETransformGizmoSubElements.None);
        }
    }
}
function SetNotAxes() {
    if (UE.AxesToolSubsystem.Get().TransformInteraction) {
        UE.AxesToolSubsystem.Get().TransformInteraction.SetTransformMoth(UE.ETransformGizmoSubElements.None);
    }
}
PuertsVmSystem.OnGameBeginPlay.Add(GameBeginPlay);
function GameEndPlay() {
    (0, MiscTools_1.WARNING)("GameEndPlay");
    SystemAPI.CloseWebSocketServer(1000, 0);
    QEngine_1.QEngine.GetInstance().Shutdown(global.EngineType);
}
PuertsVmSystem.OnGameEndPlay.Add(GameEndPlay);
function GameTick(DeltaTime) {
    Timer_1.Timer.GetInstance().Fire(DeltaTime);
    QEngine_1.QEngine.GetInstance().Tick(DeltaTime, global.EngineType);
}
PuertsVmSystem.OnGameTick.Add(GameTick);
//# sourceMappingURL=StartApi.js.map