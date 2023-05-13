/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午5:19
 */

import { QEngine, TType } from "./QEngine";
/**
 *The derived class needs to be instantiated and added in QEngine.CollectSystem()
 */
export abstract class QSystem {
    protected engine: QEngine
    protected canTick: boolean = false

    constructor(engine: QEngine) {
        //super();
        this.engine = engine
        this.engine.CreateSystem(this)
    }

    /**
     *pre-initialization
     *! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    public PreInit() {
    }


    /**
     *initialization
*! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    public Init() {
    }

    /**
     *The final process of the whole system initialization
     *! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    public PostInit() {
    }

    /**
     *Called by the first level BeginPlay
     *The Unreal side can get the World, and can normally access anything related to the Unreal engine
     *@constructor
     */
    public BeginPlay() {
    }

    public BeginPlayFinished() {

    }

    /**
     *Called when the entire editor exits
*@constructor
     */
    public Shutdown() {
    }


    public Tick(DeltaTime: number) {
    }


    /**
     *Does the System need to be instantiated
     */
    public ShouldInstantiate(): boolean {
        return true
    }

    public CanTick() {
        return this.canTick
    }

    /**
     *Get other systems
     *@constructor
     *@protected
     */
    protected GetSystem<T extends QSystem>(TClass: TType<T>): T {
        return this.engine.GetSystem<T>(TClass)
    }
}