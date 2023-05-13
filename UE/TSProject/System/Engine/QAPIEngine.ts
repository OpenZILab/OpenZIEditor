/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/10 下午3:18
 */

import {QEngine} from "./QEngine";
import {ComponentSystem} from "../Core/Component/ComponentSystem";
import {ProjectSystem} from "../Project/Project/ProjectSystem";
import {SceneSystem} from "../Project/Scene/SceneSystem";
import {SettingSystem} from "../Project/Settting/SettingSystem";
import {DataSmithManager} from "../Project/ResourceReference/DataSmithManager";
import { DigitalTwinSystem } from "../Project/DigitalTwin/DigitalTwinSystem";
import { PrefabSystem } from "../Project/Prefab/PrefabSystem";
import { ApiSystem } from "../API/ApiSystem";
import { ConfigSystem } from "../Config/ConfigSystem";

export class QAPIEngine extends QEngine {
    constructor() {
        super(global.EngineType);
    }

    protected CollectSystem() {
        new ConfigSystem(this)
        new ApiSystem(this);
        new ComponentSystem(this);
        new ProjectSystem(this)
        new SceneSystem(this);
        new DigitalTwinSystem(this);
        new PrefabSystem(this);
        new SettingSystem(this);
        new DataSmithManager(this);
    }
}
