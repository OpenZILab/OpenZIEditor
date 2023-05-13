"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime:  2023/01/05
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DigitalTwinHandle = void 0;
const QEngine_1 = require("../../../System/Engine/QEngine");
const SceneNode_1 = require("../../../System/Project/Scene/SceneNode");
const SceneSystem_1 = require("../../../System/Project/Scene/SceneSystem");
const ApiViewModelSystem_1 = require("../../../System/API/ApiViewModelSystem");
const UE = require("ue");
class DigitalTwinHandle {
    ApiViewModels;
    SceneTree;
    constructor() {
        this.ApiViewModels = ApiViewModelSystem_1.APIViewModelSystem.GetInstance().GetAllViewModel();
        if ((0, QEngine_1.GetSystem)(SceneSystem_1.SceneSystem).bLoad) {
            this.SceneTree = (0, QEngine_1.GetSystem)(SceneSystem_1.SceneSystem).GetCurrentScene().SceneTree;
        }
    }
    GetAllDigitalTwin() {
        let DigitalNodes = [];
        if (this.GetSceneTree() != null) {
            DigitalNodes = this.SceneTree.FindNodes(SceneNode_1.FindType.type, "Twin");
        }
        return DigitalNodes;
    }
    GetDigitalTwinByName(name) {
        let TargetDigitalNodes;
        let AllDigitalNodes = this.GetAllDigitalTwin();
        AllDigitalNodes.forEach(item => {
            TargetDigitalNodes.push(item.FindNodes(SceneNode_1.FindType.name, name));
        });
        return TargetDigitalNodes;
    }
    GetDigitalTwinById(id) {
        let AllDigitalNodes = this.GetAllDigitalTwin();
        for (let i = 0; i < AllDigitalNodes.length; i++) {
            if (AllDigitalNodes[i].FindNodes(SceneNode_1.FindType.id, id).length > 0) {
                return AllDigitalNodes[i].FindNodes(SceneNode_1.FindType.id, id).at(0);
            }
        }
    }
    GetDigitalTwinAllAPI(id) {
        let node = this.GetDigitalTwinById(id);
        let ApiNodes = node.FindNodes(SceneNode_1.FindType.type, "API");
        return ApiNodes;
    }
    SetDigitalTwinLocation(id, location) {
        let Node = this.GetDigitalTwinById(id);
        if (Node && Node.GetNodeEntry()?.Actor) {
            Node.GetNodeEntry()?.Actor.K2_SetActorLocation(location);
        }
    }
    GetDigitalTwinLocaion(id) {
        let Node = this.GetDigitalTwinById(id);
        if (Node && Node.GetNodeEntry()?.Actor) {
            return (Node.GetNodeEntry()?.Actor).K2_GetActorLocation();
        }
        return new UE.Vector(0, 0, 0);
    }
    SetDigitalTwinRotation(id, rotation) {
        let Node = this.GetDigitalTwinById(id);
        if (Node && Node.GetNodeEntry()?.Actor) {
            (Node.GetNodeEntry()?.Actor).K2_SetActorRotation(rotation, false);
        }
    }
    GetDigitalTwinRotation(id) {
        let Node = this.GetDigitalTwinById(id);
        if (Node && Node.GetNodeEntry()?.Actor) {
            return (Node.GetNodeEntry()?.Actor).K2_GetActorRotation();
        }
        return new UE.Vector(0, 0, 0);
    }
    GetDigitalTwinAPIById(twinId, apiId) {
        let CurDigitalTwin = this.GetDigitalTwinById(twinId);
        if (CurDigitalTwin.FindNodes(SceneNode_1.FindType.api, apiId).length > 0) {
            return CurDigitalTwin.FindNodes(SceneNode_1.FindType.api, apiId).at(0);
        }
        return null;
    }
    UpdateDigitalTwinAPI(twinId, apiId, Model) {
        if (this.GetDigitalTwinAPIById(twinId, apiId)) {
            let Class = this.GetDigitalTwinAPIById(twinId, apiId).GetNodeEntry()?.Class;
            let ViewModel = ApiViewModelSystem_1.APIViewModelSystem.GetInstance().GetViewModelByType(Class);
            if (ViewModel) {
                if (ViewModel.OBJMaps.has(apiId)) {
                    ViewModel.OBJMaps.get(apiId).ExecuteUpdate(Model);
                }
            }
        }
    }
    SetDigitalTwinAPILocationById(twinId, apiId, location) {
        if (this.GetDigitalTwinAPIById(twinId, apiId)) {
            let Class = this.GetDigitalTwinAPIById(twinId, apiId).GetNodeEntry()?.Class;
            let ViewModel = ApiViewModelSystem_1.APIViewModelSystem.GetInstance().GetViewModelByType(Class);
            if (ViewModel) {
                if (ViewModel.OBJMaps.has(apiId)) {
                    ViewModel.OBJMaps.get(apiId).K2_SetActorLocation(location);
                }
            }
        }
    }
    GetSceneTree() {
        if (this.SceneTree == null) {
            if ((0, QEngine_1.GetSystem)(SceneSystem_1.SceneSystem).bLoad) {
                this.SceneTree = (0, QEngine_1.GetSystem)(SceneSystem_1.SceneSystem).GetCurrentScene().SceneTree;
            }
        }
        return this.SceneTree;
    }
}
exports.DigitalTwinHandle = DigitalTwinHandle;
//# sourceMappingURL=DigitanTwinHandle.js.map