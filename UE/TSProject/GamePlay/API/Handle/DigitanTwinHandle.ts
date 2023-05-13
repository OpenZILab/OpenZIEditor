

/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime:  2023/01/05
 */

import { GetSystem } from "../../../System/Engine/QEngine";
import { FindType, SceneNode } from "../../../System/Project/Scene/SceneNode";
import { SceneSystem } from "../../../System/Project/Scene/SceneSystem";
import { DigitalTwinNode } from "../../../System/Project/Scene/SceneType/DigitalTwinNode";
import { APIViewModelSystem } from "../../../System/API/ApiViewModelSystem";
import { BaseViewModel } from "../../../System/API/ViewModel/BaseViewModel";
import * as UE from "ue"


export class DigitalTwinHandle {
    ApiViewModels: Array<BaseViewModel>
    SceneTree: SceneNode

    constructor() {
        this.ApiViewModels = APIViewModelSystem.GetInstance().GetAllViewModel()
        if (GetSystem(SceneSystem).bLoad) {
            this.SceneTree = GetSystem(SceneSystem).GetCurrentScene().SceneTree
        }
    }

    public GetAllDigitalTwin() {
        let DigitalNodes: Array<SceneNode> = []
        if (this.GetSceneTree() != null) {
            DigitalNodes = this.SceneTree.FindNodes(FindType.type, "Twin")
        }
        return DigitalNodes
    }

    public GetDigitalTwinByName(name) {
        let TargetDigitalNodes
        let AllDigitalNodes = this.GetAllDigitalTwin()
        AllDigitalNodes.forEach(item => {
            TargetDigitalNodes.push(item.FindNodes(FindType.name, name))
        })
        return TargetDigitalNodes
    }

    public GetDigitalTwinById(id) {
        let AllDigitalNodes = this.GetAllDigitalTwin()
        for (let i = 0; i < AllDigitalNodes.length; i++) {
            if (AllDigitalNodes[i].FindNodes(FindType.id, id).length > 0) {
                return AllDigitalNodes[i].FindNodes(FindType.id, id).at(0)
            }
        }
    }

    public GetDigitalTwinAllAPI(id) {
        let node = this.GetDigitalTwinById(id)
        let ApiNodes = node.FindNodes(FindType.type, "API")
        return ApiNodes
    }

    public SetDigitalTwinLocation(id, location) {
        let Node = this.GetDigitalTwinById(id)
        if (Node && Node.GetNodeEntry()?.Actor) {
            Node.GetNodeEntry()?.Actor.K2_SetActorLocation(location)
        }
    }
    public GetDigitalTwinLocaion(id) {
        let Node = this.GetDigitalTwinById(id)
        if (Node && Node.GetNodeEntry()?.Actor) {
            return (<UE.Actor>Node.GetNodeEntry()?.Actor).K2_GetActorLocation()
        }
        return new UE.Vector(0, 0, 0)
    }

    public SetDigitalTwinRotation(id, rotation) {
        let Node = this.GetDigitalTwinById(id)
        if (Node && Node.GetNodeEntry()?.Actor) {
            (<UE.Actor>Node.GetNodeEntry()?.Actor).K2_SetActorRotation(rotation, false)
        }
    }
    public GetDigitalTwinRotation(id) {
        let Node = this.GetDigitalTwinById(id)
        if (Node && Node.GetNodeEntry()?.Actor) {
            return (<UE.Actor>Node.GetNodeEntry()?.Actor).K2_GetActorRotation()
        }
        return new UE.Vector(0, 0, 0)
    }

    public GetDigitalTwinAPIById(twinId, apiId) {
        let CurDigitalTwin = this.GetDigitalTwinById(twinId)
        if (CurDigitalTwin.FindNodes(FindType.api, apiId).length > 0) {
            return CurDigitalTwin.FindNodes(FindType.api, apiId).at(0)
        }
        return null
    }

    public UpdateDigitalTwinAPI(twinId, apiId, Model) {
        if (this.GetDigitalTwinAPIById(twinId, apiId)) {
            let Class = this.GetDigitalTwinAPIById(twinId, apiId).GetNodeEntry()?.Class
            let ViewModel = APIViewModelSystem.GetInstance().GetViewModelByType(Class)
            if (ViewModel) {
                if (ViewModel.OBJMaps.has(apiId)) {
                    ViewModel.OBJMaps.get(apiId).ExecuteUpdate(Model)
                }
            }

        }
    }

    public SetDigitalTwinAPILocationById(twinId, apiId, location) {
        if (this.GetDigitalTwinAPIById(twinId, apiId)) {
            let Class = this.GetDigitalTwinAPIById(twinId, apiId).GetNodeEntry()?.Class
            let ViewModel = APIViewModelSystem.GetInstance().GetViewModelByType(Class)
            if (ViewModel) {
                if (ViewModel.OBJMaps.has(apiId)) {
                    ViewModel.OBJMaps.get(apiId).K2_SetActorLocation(location)
                }
            }
        }
    }
    GetSceneTree() {
        if (this.SceneTree == null) {
            if (GetSystem(SceneSystem).bLoad) {
                this.SceneTree = GetSystem(SceneSystem).GetCurrentScene().SceneTree
            }
        }
        return this.SceneTree
    }

}