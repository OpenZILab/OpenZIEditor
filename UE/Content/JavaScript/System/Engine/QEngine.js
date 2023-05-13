"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午5:19
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QEngine = exports.GetSystem = void 0;
const Sigleton_1 = require("../Core/Sigleton");
const MiscTools_1 = require("../Utils/MiscTools");
function GetSystem(TClass) {
    return QEngine.GetInstance().GetSystem(TClass);
}
exports.GetSystem = GetSystem;
class EngineData {
    engineType = "";
    hasInit = false;
    hasBeginPlay = false;
    hasBeginPlayFinished = false;
    hasShutdown = false;
    constructor(type) {
        this.engineType = type;
    }
}
class QEngine extends Sigleton_1.Sigleton {
    engineData;
    Systems = new Array();
    constructor(engineType) {
        super();
        this.engineData = new EngineData(engineType);
    }
    static GetInstance() {
        if (global.EngineType === "EditorEngine") {
            let Engine = require("../../Editor/System/Runtime/Core/Engine/QEditorEngine");
            return super.TakeInstance(Engine.QEditorEngine);
        }
        else if (global.EngineType === "APIEngine") {
            let Engine = require("./QAPIEngine");
            return super.TakeInstance(Engine.QAPIEngine);
        }
        else
            return super.TakeInstance(QEngine);
    }
    CreateSystem(System) {
        let foundSystem = this.Systems.find((inSystem) => inSystem.constructor.name === System.constructor.name);
        if (foundSystem) {
            (0, MiscTools_1.WARNING)(`${System.constructor.name} has register`);
            return;
        }
        if (System && System.ShouldInstantiate()) {
            this.Systems.push(System);
        }
        else {
            (0, MiscTools_1.WARNING)(`No instance was generated for this class ${System.constructor.name}`);
        }
    }
    CollectSystem() {
    }
    ForEachEverySystem(func) {
        this.Systems.forEach(func);
    }
    PreInit() {
        this.CollectSystem();
        this.ForEachEverySystem((System) => System.PreInit());
    }
    Init(engineType) {
        if (this.engineData.engineType !== engineType)
            return;
        if (this.engineData.hasInit)
            return;
        this.engineData.hasInit = true;
        this.PreInit();
        this.ForEachEverySystem((System) => System.Init());
        this.PostInit();
    }
    PostInit() {
        this.ForEachEverySystem((System) => System.PostInit());
    }
    BeginPlay(engineType) {
        if (this.engineData.engineType !== engineType)
            return;
        if (this.engineData.hasBeginPlay)
            return;
        this.engineData.hasBeginPlay = true;
        this.ForEachEverySystem((System) => System.BeginPlay());
    }
    BeginPlayFinished(engineType) {
        if (this.engineData.engineType !== engineType)
            return;
        if (this.engineData.hasBeginPlayFinished)
            return;
        this.engineData.hasBeginPlayFinished = true;
        this.ForEachEverySystem((System) => System.BeginPlayFinished());
    }
    Tick(DeltaTime, engineType) {
        if (this.engineData.engineType !== engineType)
            return;
        this.ForEachEverySystem((System) => {
            if (System.CanTick())
                System.Tick(DeltaTime);
        });
    }
    Shutdown(engineType) {
        if (this.engineData.engineType !== engineType)
            return;
        if (this.engineData.hasShutdown)
            return;
        this.engineData.hasShutdown = true;
        this.ForEachEverySystem((System) => System.Shutdown());
    }
    GetSystem(TClass) {
        let FoundSystem = this.Systems.find((System) => {
            return System.constructor.name === TClass.name;
        });
        return FoundSystem;
    }
}
exports.QEngine = QEngine;
//# sourceMappingURL=QEngine.js.map