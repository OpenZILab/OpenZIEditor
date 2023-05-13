"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午5:19
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QSystem = void 0;
/**
 *The derived class needs to be instantiated and added in QEngine.CollectSystem()
 */
class QSystem {
    engine;
    canTick = false;
    constructor(engine) {
        //super();
        this.engine = engine;
        this.engine.CreateSystem(this);
    }
    /**
     *pre-initialization
     *! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    PreInit() {
    }
    /**
     *initialization
*! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    Init() {
    }
    /**
     *The final process of the whole system initialization
     *! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    PostInit() {
    }
    /**
     *Called by the first level BeginPlay
     *The Unreal side can get the World, and can normally access anything related to the Unreal engine
     *@constructor
     */
    BeginPlay() {
    }
    BeginPlayFinished() {
    }
    /**
     *Called when the entire editor exits
*@constructor
     */
    Shutdown() {
    }
    Tick(DeltaTime) {
    }
    /**
     *Does the System need to be instantiated
     */
    ShouldInstantiate() {
        return true;
    }
    CanTick() {
        return this.canTick;
    }
    /**
     *Get other systems
     *@constructor
     *@protected
     */
    GetSystem(TClass) {
        return this.engine.GetSystem(TClass);
    }
}
exports.QSystem = QSystem;
//# sourceMappingURL=System.js.map