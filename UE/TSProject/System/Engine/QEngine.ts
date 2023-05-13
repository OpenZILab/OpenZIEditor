/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午5:19
 */

import {Sigleton} from "../Core/Sigleton";
import {QSystem} from "./System";
import {WARNING} from "../Utils/MiscTools";

export interface TType<T> extends Function {
    new(...args: any[]): T;
}

export function GetSystem<T extends QSystem>(TClass: TType<T>): T {
    return QEngine.GetInstance().GetSystem(TClass);
}

class EngineData {
    engineType: string = ""

    hasInit: boolean = false
    hasBeginPlay: boolean = false
    hasBeginPlayFinished: boolean = false
    hasShutdown: boolean = false

    constructor(type: string) {
        this.engineType = type
    }
}

export class QEngine extends Sigleton {
    protected engineData: EngineData
    private Systems: Array<QSystem> = new Array<QSystem>()

    constructor(engineType: string) {
        super();
        this.engineData = new EngineData(engineType)
    }

    static GetInstance(): QEngine {
        if (global.EngineType === "EditorEngine") {
            let Engine = require("../../Editor/System/Runtime/Core/Engine/QEditorEngine")
            return super.TakeInstance(Engine.QEditorEngine)
        } else if (global.EngineType === "APIEngine") {
            let Engine = require("./QAPIEngine")
            return super.TakeInstance(Engine.QAPIEngine)
        } else
            return super.TakeInstance(QEngine)
    }


    public CreateSystem(System: QSystem) {
        let foundSystem = this.Systems.find((inSystem: QSystem) => inSystem.constructor.name === System.constructor.name)
        if (foundSystem) {
            WARNING(`${System.constructor.name} has register`)
            return
        }

        if (System && System.ShouldInstantiate()) {
            this.Systems.push(System);
        } else {
            WARNING(`No instance was generated for this class ${System.constructor.name}`)
        }
    }

    protected CollectSystem() {
    }

    private ForEachEverySystem(func: (System: QSystem) => void) {
        this.Systems.forEach(func);
    }

    public PreInit() {
        this.CollectSystem()
        this.ForEachEverySystem((System) => System.PreInit())
    }

    public Init(engineType: string) {
        if (this.engineData.engineType !== engineType) return

        if (this.engineData.hasInit) return
        this.engineData.hasInit = true

        this.PreInit()
        this.ForEachEverySystem((System) => System.Init())
        this.PostInit()
    }

    public PostInit() {
        this.ForEachEverySystem((System) => System.PostInit())
    }

    public BeginPlay(engineType: string) {
        if (this.engineData.engineType !== engineType) return

        if (this.engineData.hasBeginPlay) return
        this.engineData.hasBeginPlay = true

        this.ForEachEverySystem((System) => System.BeginPlay())
    }

    public BeginPlayFinished(engineType: string) {
        if (this.engineData.engineType !== engineType) return

        if (this.engineData.hasBeginPlayFinished) return
        this.engineData.hasBeginPlayFinished = true

        this.ForEachEverySystem((System) => System.BeginPlayFinished())
    }

    public Tick(DeltaTime: number, engineType: string) {
        if (this.engineData.engineType !== engineType) return

        this.ForEachEverySystem((System) => {
            if (System.CanTick()) System.Tick(DeltaTime)
        })
    }

    public Shutdown(engineType: string) {
        if (this.engineData.engineType !== engineType) return

        if (this.engineData.hasShutdown) return
        this.engineData.hasShutdown = true

        this.ForEachEverySystem((System) => System.Shutdown())
    }

    public GetSystem<T extends QSystem>(TClass: TType<T>): T {
        let FoundSystem: QSystem = this.Systems.find((System: QSystem) => {
            return System.constructor.name === TClass.name
        })

        return FoundSystem as T
    }
}