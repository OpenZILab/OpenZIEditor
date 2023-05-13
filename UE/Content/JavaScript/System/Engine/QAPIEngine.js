"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/10 下午3:18
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QAPIEngine = void 0;
const QEngine_1 = require("./QEngine");
const ComponentSystem_1 = require("../Core/Component/ComponentSystem");
const ProjectSystem_1 = require("../Project/Project/ProjectSystem");
const SceneSystem_1 = require("../Project/Scene/SceneSystem");
const SettingSystem_1 = require("../Project/Settting/SettingSystem");
const DataSmithManager_1 = require("../Project/ResourceReference/DataSmithManager");
const DigitalTwinSystem_1 = require("../Project/DigitalTwin/DigitalTwinSystem");
const PrefabSystem_1 = require("../Project/Prefab/PrefabSystem");
const ApiSystem_1 = require("../API/ApiSystem");
const ConfigSystem_1 = require("../Config/ConfigSystem");
class QAPIEngine extends QEngine_1.QEngine {
    constructor() {
        super(global.EngineType);
    }
    CollectSystem() {
        new ConfigSystem_1.ConfigSystem(this);
        new ApiSystem_1.ApiSystem(this);
        new ComponentSystem_1.ComponentSystem(this);
        new ProjectSystem_1.ProjectSystem(this);
        new SceneSystem_1.SceneSystem(this);
        new DigitalTwinSystem_1.DigitalTwinSystem(this);
        new PrefabSystem_1.PrefabSystem(this);
        new SettingSystem_1.SettingSystem(this);
        new DataSmithManager_1.DataSmithManager(this);
    }
}
exports.QAPIEngine = QAPIEngine;
//# sourceMappingURL=QAPIEngine.js.map