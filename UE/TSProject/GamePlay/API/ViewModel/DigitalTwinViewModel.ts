///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///

import { $ref, $unref, makeUClass } from 'puerts'
import { BaseViewModel } from "../../../System/API/ViewModel/BaseViewModel"
import * as UE from "ue"
import { APIViewModelSystem, GetViewModel, GetViewModelByType } from '../../../System/API/ApiViewModelSystem'
import { GetSystem } from '../../../System/Engine/QEngine'
import { DigitalTwinSystem } from '../../../System/Project/DigitalTwin/DigitalTwinSystem'
import { NodeHelper } from '../../../System/Project/Scene/SceneNodeUtil'
import { DigitalTwinModel } from '../Model/DigitalTwinModel'
import { DigitalTwinNode } from '../../../System/Project/Scene/SceneType/DigitalTwinNode'
import { PackCallBacKMessage } from '../../../System/API/IHandle/IAPIMessageHandle'
import { WebSocketServer } from '../../../System/API/Handle/WebSocketServer'
import { MessageCenter } from '../../../System/Core/NotificationCore/MessageManager'
import { NotificationLists } from '../../../System/Core/NotificationCore/NotificationLists'
import { QApiActionComponent } from '../../../System/Core/Object/API/ApiActionObject'
import { ERROR } from '../../../System/Utils/MiscTools'

export class DigitalTwinViewModel extends BaseViewModel {
    bLoadDataSmithing: boolean
    constructor() {
        super()
        this.BaseModel = new DigitalTwinModel()
        //this._OBJClass = makeUClass(PointView)
        this.Type = "DigitalTwin"
        this.Birthplace = "Scene"
        this.bLoadDataSmithing = false
        MessageCenter.Add(this, this.OnDataSmithStartLoad, NotificationLists.DATASMITH.ON_DATASMITH_START_LOAD)
        MessageCenter.Add(this, this.OnDataSmithLoadEnd, NotificationLists.DATASMITH.ON_DATASMITH_LOAD_END)
    }
    OnDataSmithStartLoad() {
        this.bLoadDataSmithing = true
    }
    OnDataSmithLoadEnd() {
        this.bLoadDataSmithing = false
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
        //let curActor = GetSystem(DigitalTwinSystem).LoadDigitalTwin(_data.data.digitalTwinType, $unref(EngineLocation), null, null, id)
        let curActor = GetSystem(DigitalTwinSystem).LoadDigitalTwinFormStr(_data.data.digitalTwinContent, $unref(EngineLocation), null, null, id)
        if (curActor !== null) {
            APIViewModelSystem.GetInstance().EndDrawing()
            this.OBJMaps.set(id, curActor)
            console.log("添加" + id + "到OBJMap数组")
            _data.data = this.BaseModel.GetData(id)
            //result = this.OBJMaps.get(id).RefreshView(_data)
            result = "success"
            APIViewModelSystem.GetInstance().RegisterDrawFunc(this.Type, id)
            if (result !== "success") {
                this.OBJMaps.get(id).K2_DestroyActor()
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

    ToggleTimeline(jsonData) {
        let outResult = "Toggle TimeLine Fail"
        if (this.bLoadDataSmithing == true) {
            outResult = `${outResult}:DataSmith has not been loaded`
        } else {
            if (this.OBJMaps.has(jsonData.data.id)) {
                let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(jsonData.data.id))
                if (Node instanceof DigitalTwinNode) {
                    Node.DigitalTwin.UnloadTwinBody(true)
                    Node.DigitalTwin.LoadTwinBody(jsonData.data.timeLine)
                    outResult = "success"
                }
            }
        }

        let result = outResult
        jsonData.data.result = result
        let message = PackCallBacKMessage(jsonData, jsonData.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    ExecuteUpdate(jsonData): string {
        let id = jsonData.data.id
        let _data = jsonData
        if (id == null)
            return "id key no have"
        if (this.OBJMaps.has(id) && this.OBJMaps.get(id) !== null) {
            this.ExecuteDelete({data:{ids:[id]}})
            let result = this.ExecuteAdd(jsonData)
            // let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(id))
            // let twinApiList =jsonData.data.twinApiList
            // if(Node&&twinApiList){
            //     Node.UpdateAllApiList(twinApiList)
            // }
            // let curvalue = this.BaseModel.RefreshData(id, _data.data)
            // if (curvalue === undefined) {
            //     return "Update OBJ failed, Some data is over the limit"
            // }
            // _data.data = this.BaseModel.GetData(id)
            // let GeographicPos = new UE.GeographicCoordinates(_data.data.coordinates.X, _data.data.coordinates.Y, _data.data.coordinates.Z)
            // let EngineLocation = $ref(new UE.Vector(0, 0, 0))
            // UE.CoordinateConverterMgr.GetCoodinateConverterMgr().GeographicToEngine(_data.data.GISType, GeographicPos, EngineLocation)
            // let result = this.OBJMaps.get(id)?.K2_SetActorLocation($unref(EngineLocation))
            return result
        }
        return "OBJ is not vaild"
    }


    ExecuteShow(jsondata): string {
        let ids: string[] = jsondata.data.ids
        if (ids == null && ids.length == 0) {
            return "faild ids is null"
        }
        let beComplete: string = ""
        for (let entry of ids) {
            let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(entry))
            if (!Node) continue
            let AllChildNodes = []
            NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
            AllChildNodes.forEach(item => {
                item.SetHiddenNode(false)
            })
            this.HiddenAPINode(this.Type, entry, false)
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
            let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(entry))
            if (!Node) continue
            let AllChildNodes = []
            NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
            AllChildNodes.forEach(item => {
                item.SetHiddenNode(true)
            })
            this.HiddenAPINode(this.Type, entry, true)
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
            let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(value))
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
            let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(value))
            if (!Node) continue
            let AllChildNodes = []
            NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
            AllChildNodes.forEach(item => {
                item.SetHiddenNode(true)
            })
            this.HiddenAPINode(this.Type, value, true)
        }
        return "execution is completed"
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
                let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(entry))
                if (!Node) continue
                let ParentNode = Node.GetParent()
                this.OBJMaps.get(entry).K2_DestroyActor()
                let AllChildNodes = []
                NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
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
                value.K2_DestroyActor()
                let Node = NodeHelper.FindNodeByActor(value)
                if (!Node) continue
                let ParentNode = Node.GetParent()
                let AllChildNodes = []
                NodeHelper.GetNodeAllChilds(Node, AllChildNodes)
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
    GetTwinAPIList(jsonData) {
        //let result = ""
        // let OutObject:{ [key: string]: any } = {}
        // OutObject.twinId = jsonData.data.id
        // OutObject.ModelData = []
        // if (this.OBJMaps.has(jsonData.data.id)) {
        //     let Node = NodeHelper.FindNodeByActor(this.OBJMaps.get(jsonData.data.id))
        //     if (Node && Node instanceof DigitalTwinNode) {
        //         OutObject.ModelData = Node.GetAllAPIList()
        //     } else {
        //         result = "No corresponding ID was found"
        //     }
        // } else {
        //     result = "No corresponding ID was found"
        // }
        // if(OutObject?.ModelData&&OutObject?.ModelData.length>0){
        //     jsonData.data.result =OutObject
        // }else{
        //     jsonData.data.result = result
        // }

        let Str = GetSystem(DigitalTwinSystem).GetDigitalTwinStr(jsonData.data.type)


        jsonData.data.result = Str
        let message = PackCallBacKMessage(jsonData, jsonData.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }
}



