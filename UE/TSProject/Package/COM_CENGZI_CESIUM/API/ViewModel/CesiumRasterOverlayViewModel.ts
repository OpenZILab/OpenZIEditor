///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import { BaseViewModel } from "../../../../System/API/ViewModel/BaseViewModel";
import { CesiumIONRasterOverlayModel } from "../Model/CesiumIONRasterOverlayModel";
import { CesiumTMSRasterOverlayModel } from "../Model/CesiumTMSRasterOverlayModel";
import { CesiumWMSRasterOverlayModel } from "../Model/CesiumWMSRasterOverlayModel";
import { CesiumRasterOverlayView } from "../View/CesiumRasterOverlayView";
import { CesiumTerrainViewModel } from "./CesiumTerrainViewModel";
import { PackCallBacKMessage } from "../../../../System/API/IHandle/IAPIMessageHandle";
import { WebSocketServer } from "../../../../System/API/Handle/WebSocketServer";
import { GetViewModel } from "../../../../System/API/ApiViewModelSystem";
import { MessageCenter } from "../../../../System/Core/NotificationCore/MessageManager";
import { NotificationLists } from "../../../../System/Core/NotificationCore/NotificationLists";

export class CesiumRasterOverlayViewModel extends BaseViewModel {

    constructor() {
        super()
        this.Type = "CesiumRasterOverlay"
        this.Birthplace = "Coverage"
        MessageCenter.Add(this, (ids) => {
            ids.forEach(item => {
                this.OBJMaps.forEach((value, key) => {
                    if (<any>value.TerrianId === item) {
                        this.OBJMaps.delete(key)
                        this.BaseModel?.DeleteData(key)
                        this.DeleteAPINode(this.GetType(), key)

                    }
                })
            })

        }, NotificationLists.API.CESIUMTERRAIN_DELETE_FINISHED)

        MessageCenter.Add(this, () => {
            this.OBJMaps?.clear()
            this.BaseModel?.ClearData()
        }, NotificationLists.API.CESIUMTERRAIN_CLEAR_FINISHED)


    }
    ExecuteAdd(jsonData: any): string {
        if (jsonData.data.type == "TMS") {
            this.BaseModel = new CesiumTMSRasterOverlayModel()
        }
        else if (jsonData.data.type == "WMS") {
            this.BaseModel = new CesiumWMSRasterOverlayModel()
        }
        else if (jsonData.data.type == "ION") {
            this.BaseModel = new CesiumIONRasterOverlayModel()
        }

        let _data = jsonData
        let id = jsonData.data.id
        if (this.BaseModel !== null) {
            this.BaseModel.AddData(id, _data.data)
        }

        let result: string
        if (this.OBJMaps.has(id)) {
            return "id: " + id + " is existent !"
        }
        if (GetViewModel(CesiumTerrainViewModel).OBJMaps.has(jsonData.data.terrainId)) {

            let curActor = new CesiumRasterOverlayView(jsonData.data.type, GetViewModel(CesiumTerrainViewModel).OBJMaps.get(jsonData.data.terrainId))
            if (curActor !== null) {
                this.OBJMaps.set(id, curActor)
                console.log("添加" + id + "到OBJMap数组")
                _data.data = this.BaseModel.GetData(id)
                result = this.OBJMaps.get(id).RefreshView(_data)
                if (result !== "success") {
                    this.OBJMaps.get(id).DeleteOverlay()
                    this.OBJMaps.delete(id)
                    this.BaseModel.DeleteData(id)
                }
                else {
                    if (jsonData.bNotify == undefined || jsonData.bNotify == true) {
                        this.AddAPINode(jsonData, null, "Add")
                    }
                }
                return result
            }
        }
        return "create OBJ failed"
    }

    ExecuteDelete(jsonData: any): string {
        let ids: string[] = jsonData.data.ids
        if (ids == null && ids.length == 0) {
            return "faild ids is null"
        }
        let failedList: string[]
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                this.BaseModel.DeleteData(entry)
                this.OBJMaps.get(entry).DeleteOverlay()
                let isComplete = this.OBJMaps.delete(entry)
                this.DeleteAPINode(this.GetType(), entry)
                if (!isComplete) {
                    failedList.push(entry)
                }
            }
        }
        if (failedList !== undefined && failedList.length > 0) {
            let beComplete: string
            for (let entry of failedList) {
                beComplete += "," + entry
            }
            let re = ","
            if (beComplete.search(re)) {
                beComplete = beComplete.substring(1)
                return beComplete + ":These ids fail"
            }
        }
        return "success"
    }
    ExecuteClear(jsondata: any): string {
        this.OBJMaps.forEach((value, key) => {
            if (value !== null) {
                value.DeleteOverlay()
                this.DeleteAPINode(this.GetType(), key)

            }
        })
        this.OBJMaps?.clear()
        this.BaseModel?.ClearData()
        return "execution is completed"
    }
    ExecuteShow(jsondata): string {
        return this.OBJActive(jsondata, false)
    }

    ExecuteHidden(jsondata): string {
        return this.OBJActive(jsondata, true)
    }

    ExecuteAllShow(jsondata): string {
        for (let value of this.OBJMaps?.values()) {
            if (value !== null) {
                value.SetActive(false)
            }
        }
        return "execution is completed"
    }
    private OBJActive(jsonData, isShow): string {
        let ids: string[] = jsonData.data.ids
        if (ids == null && ids.length == 0) {
            return "faild ids is null"
        }
        let beComplete: string = ""
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                this.OBJMaps.get(entry).SetActive(!isShow)
            } else {
                beComplete += "," + entry
            }
        }
        let re = ","
        if (beComplete.search(re) !== -1) {
            beComplete = beComplete.substring(1)
            return beComplete + ", no exist"
        }
        return "success"
    }

    ExecuteGetAllCesiumOverlay(jsondata) {
        let CesiumOverlays = []
        let allModels = this.BaseModel.GetAllData()
        if (allModels.size > 0) {
            allModels.forEach((value, key) => {
                CesiumOverlays.push(value)
            })
        }
        return CesiumOverlays
    }

    ExecuteGetCesiumOverlayById(jsondata) {
        let id = jsondata.data.id
        let Model = this.BaseModel.GetData(id)
        return Model
    }

    GetAllCesiumOverlay(msg) {
        msg.data = this.ExecuteGetAllCesiumOverlay(msg)
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    GetCesiumOverlayById(msg) {
        msg.data = this.ExecuteGetCesiumOverlayById(msg)
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }
}