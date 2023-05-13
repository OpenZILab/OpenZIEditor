/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/12 上午10:46
 */

global.debug = true
if (global.EngineType == null) global.EngineType = "APIEngine"

require("./System/Utils/Lib_Array");
require("./System/Utils/Lib_Map");
require("./System/Utils/Lib_Set");
require("./System/Utils/Lib_JSON");
require("./System/Utils/Lib_Boolean");
require("./System/Utils/Lib_Number");
require("./System/Utils/Lib_String");

require("./System/Core/Property/PropertyValidation");

import * as SystemAPI from "../System/API/System_APIList"
import {Timer} from "../System/Core/Timer"
import * as UE from "ue"
import {argv} from "puerts";
import {WARNING} from "../System/Utils/MiscTools";
import {GetViewModel} from "../System/API/ApiViewModelSystem";
import {LevelViewModel} from "../GamePlay/API/ViewModel/LevelViewModel";
import {ObserverPawnViewModel} from "../GamePlay/API/ViewModel/ObseverPawnViewModel";
import {CSVConfigFilePath} from "../System/Setting/FileSetting";
import {QEngine} from "../System/Engine/QEngine";


WARNING("------------------------ Start Api ----------------------------");

QEngine.GetInstance().Init(global.EngineType)

let PuertsVmSystem = argv.getByName("PuertsVmSystem") as UE.PuertsVmSystem

function GameBeginPlay(): void {
    WARNING("GameBeginPlay")

    GetViewModel(LevelViewModel).AddCsvAsset(CSVConfigFilePath)
    QEngine.GetInstance().BeginPlay(global.EngineType)

    QEngine.GetInstance().BeginPlayFinished(global.EngineType)
    GetViewModel(LevelViewModel).OpenStartLevel()
    UE.AxesToolSubsystem.Get().OnSelectionInteraction.Add(SetNotAxes)
    if (UE.AxesToolSubsystem.Get().OnSelectionInteraction) {
        if (UE.AxesToolSubsystem.Get().TransformInteraction) {
            UE.AxesToolSubsystem.Get().TransformInteraction.SetTransformMoth(UE.ETransformGizmoSubElements.None)
        }
    }

}

function SetNotAxes() {
    if (UE.AxesToolSubsystem.Get().TransformInteraction) {
        UE.AxesToolSubsystem.Get().TransformInteraction.SetTransformMoth(UE.ETransformGizmoSubElements.None)
    }

}


PuertsVmSystem.OnGameBeginPlay.Add(GameBeginPlay);

function GameEndPlay(): void {
    WARNING("GameEndPlay")

    SystemAPI.CloseWebSocketServer(1000, 0)

    QEngine.GetInstance().Shutdown(global.EngineType)
}

PuertsVmSystem.OnGameEndPlay.Add(GameEndPlay);

function GameTick(DeltaTime: number): void {
    Timer.GetInstance().Fire(DeltaTime)
    QEngine.GetInstance().Tick(DeltaTime, global.EngineType)
}

PuertsVmSystem.OnGameTick.Add(GameTick);

