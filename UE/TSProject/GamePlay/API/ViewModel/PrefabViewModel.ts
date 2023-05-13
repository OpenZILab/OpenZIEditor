///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///

import { $ref, $unref, makeUClass } from 'puerts'
import { BaseViewModel } from "../../../System/API/ViewModel/BaseViewModel"
import * as UE from "ue"
import { APIViewModelSystem, GetViewModelByType } from '../../../System/API/ApiViewModelSystem'
import { GetSystem } from '../../../System/Engine/QEngine'
import { NodeHelper } from '../../../System/Project/Scene/SceneNodeUtil'
import { PrefabModel } from '../Model/PrefabModel'
import { PrefabSystem } from '../../../System/Project/Prefab/PrefabSystem'
import { SceneNode } from '../../../System/Project/Scene/SceneNode'

export class PrefabViewModel extends BaseViewModel {
    constructor() {
        super()
        this.BaseModel = new PrefabModel()
        //this._OBJClass = makeUClass(PointView)
        this.Type = "Prefab"
        this.Birthplace = "Scene"
    }
    ExecuteAdd(jsonData): string {
        if (jsonData == null) return "false"
        let _data = jsonData
        if (jsonData.data == null) return "false"
        let id = jsonData.data.id
        if (this.BaseModel !== null) {
            this.BaseModel.AddData(id, _data.data)
        }

        let result: string
        if (this.OBJMaps.has(id)) {
            return "id: " + id + " is existent !"
        }
        let GeographicPos = new UE.GeographicCoordinates(_data.data.coordinates.X, _data.data.coordinates.Y, _data.data.coordinates.Z)
        let EngineLocation = $ref(new UE.Vector(0, 0, 0))
        UE.CoordinateConverterMgr.GetCoodinateConverterMgr().GeographicToEngine(_data.data.GISType, GeographicPos, EngineLocation)
        let Node = GetSystem(PrefabSystem).LoadPrefab(_data.data.prefabType, $unref(EngineLocation))

        if (Node !== null) {
            APIViewModelSystem.GetInstance().EndDrawing()
            Node.GetObject().nodeId = id
            this.OBJMaps.set(id, Node)
            console.log("添加" + id + "到OBJMap数组")
            _data.data = this.BaseModel.GetData(id)
            //result = this.OBJMaps.get(id).RefreshView(_data)
            result = "success"
            APIViewModelSystem.GetInstance().RegisterDrawFunc(this.Type, id)
            if (result !== "success") {
                this.OBJMaps.get(id).UnloadEntry()
                this.OBJMaps.delete(id)
                this.BaseModel.DeleteData(id)
            }
            if (this.BaseModel.IsOverRange) {
                result = result + "," + "but Some data is over the limit"
            }
            return result
        }
        return "create OBJ failed"
    }
    ExecuteUpdate(jsonData): string {
        let id = jsonData.data.id
        let _data = jsonData
        if (id == null)
            return "id key no have"
        if (this.OBJMaps.has(id) && this.OBJMaps.get(id) !== null) {
            let curvalue = this.BaseModel.RefreshData(id, _data.data)
            if (curvalue === undefined) {
                return "Update OBJ failed, Some data is over the limit"
            }
            _data.data = this.BaseModel.GetData(id)
            let GeographicPos = new UE.GeographicCoordinates(_data.data.coordinates.X, _data.data.coordinates.Y, _data.data.coordinates.Z)
            let EngineLocation = $ref(new UE.Vector(0, 0, 0))
            UE.CoordinateConverterMgr.GetCoodinateConverterMgr().GeographicToEngine(_data.data.GISType, GeographicPos, EngineLocation)
            let Node = this.OBJMaps.get(id)
            if(!Node) return "OBJ is not vaild"
            let Actor = NodeHelper.GetNodeActor(Node)
            let result = Actor?.K2_SetActorLocation($unref(EngineLocation))
            return result
        }
        return "OBJ is not vaild"

    }

    ExecuteDelete(jsonData): string {
        let ids: string[] = jsonData.data.ids
        if (ids == null && ids.length == 0) {
            return "faild ids is null"
        }
        let failedList: string[] = []
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                this.BaseModel.DeleteData(entry)
                //this.OBJMaps.get(entry).K2_DestroyActor()
                let Node = this.OBJMaps.get(entry)
                if(!Node) continue
                let ParentNode = Node.GetParent()
                let Actor = NodeHelper.GetNodeActor(Node)
                Actor?.K2_DestroyActor()
                let AllChildNodes = []
                NodeHelper.GetNodeAllChilds(Node,AllChildNodes)
                AllChildNodes.forEach(element => {
                    element.UnloadEntry()
                });
                ParentNode.RemoveChildItem(Node)
                let isComplete = this.OBJMaps.delete(entry)
                if (!isComplete) {
                    failedList.push(entry)
                }
            }
            else {
                failedList.push(entry)
            }
        }
        if (failedList !== undefined && failedList.length > 0) {
            let beComplete: string
            beComplete = ""
            for (let entry of failedList) {
                beComplete += "," + entry
            }
            let re = ","
            if (beComplete.search(re) != -1) {
                beComplete = beComplete.substring(1)
                return beComplete + ":These ids fail"
            }
        }
        return "success"
    }

    ExecuteClear(jsondata): string {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                let Actor = NodeHelper.GetNodeActor(value)
                Actor.K2_DestroyActor()
                let Node = value
                if(!Node) continue
                let ParentNode = Node.GetParent()
                let AllChildNodes = []
                NodeHelper.GetNodeAllChilds(Node,AllChildNodes)
                AllChildNodes.forEach(element => {
                    element.UnloadEntry()
                });
                ParentNode.RemoveChildItem(Node)
            }
        }
        this.OBJMaps.clear()
        this.BaseModel.ClearData()
        return "execution is completed"
    }

    ExecuteShow(jsondata): string {
        let ids: string[] = jsondata.data.ids
        if (ids == null && ids.length == 0) {
            return "faild ids is null"
        }
        let beComplete: string = ""
        for (let entry of ids) {
            let Node = this.OBJMaps.get(entry)
            if(!Node) continue
            Node.SetHiddenNode(false)

            let AllChildNodes = []
            NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
            AllChildNodes.forEach(item => {
                item.SetHiddenNode(false)
            })
            //this.HiddenAPINode(this.Type, entry, false)
        }
        let re = ","
        if (beComplete.search(re) != -1) {
            beComplete = beComplete.substring(1)
            return "These ids do not exist:" + beComplete
        }
        return "success"
    }

    ExecuteHidden(jsondata): string {
        let ids: string[] = jsondata.data.ids
        if (ids == null && ids.length == 0) {
            return "faild ids is null"
        }
        let beComplete: string = ""
        for (let entry of ids) {
            let Node =this.OBJMaps.get(entry)
            if(!Node) continue
            Node.SetHiddenNode(true)
            let AllChildNodes = []
            NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
            AllChildNodes.forEach(item => {
                item.SetHiddenNode(true)
            })
            //this.HiddenAPINode(this.Type, entry, true)
        }
        let re = ","
        if (beComplete.search(re) != -1) {
            beComplete = beComplete.substring(1)
            return "These ids do not exist:" + beComplete
        }
        return "success"
    }


    ExecuteAllShow(jsondata): string {
        for (let value of this.OBJMaps.keys()) {
            let Node = this.OBJMaps.get(value)
            Node.SetHiddenNode(false)
            let AllChildNodes = []
            NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
            AllChildNodes.forEach(item => {
                item.SetHiddenNode(false)
            })
            this.HiddenAPINode(this.Type, value, true)
        }
        return "execution is completed"
    }

    ExecuteAllHidden(jsondata): string {
        for (let value of this.OBJMaps.keys()) {
            let Node = this.OBJMaps.get(value)
            Node.SetHiddenNode(true)
            let AllChildNodes = []
            NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
            AllChildNodes.forEach(item => {
                item.SetHiddenNode(true)
            })
            this.HiddenAPINode(this.Type, value, true)
        }
        return "execution is completed"
    }
}



