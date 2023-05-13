///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///

import { makeUClass } from 'puerts'
import { PointView } from "../View/PointView"
import { BaseViewModel } from "../../../System/API/ViewModel/BaseViewModel"
import { PointModel } from "../Model/PointModel"
import { PackCallBacKMessage } from "../../../System/API/IHandle/IAPIMessageHandle"
import { WebSocketServer } from "../../../System/API/Handle/WebSocketServer"
import {PropertyCopy} from "../../../System/Core/PropertyCopy";

export class PointViewModel extends BaseViewModel {
    constructor() {
        super()
        this.BaseModel = new PointModel()
        this._OBJClass = makeUClass(PointView)
        this.Type = "POI"
        this.Birthplace = "Scene"
    }

    ExecuteFocus(jsonData) {
        let id = jsonData.data.id
        let _data = PropertyCopy.SimpleCopy(jsonData)
        // let _data = jsonData
        if (id == null)
            return "id key no have"
        if (this.OBJMaps.has(id) && this.OBJMaps.get(id) !== null) {
            let curvalue = this.BaseModel.RefreshData(id, _data.data)
            if (curvalue === undefined) {
                return "Update OBJ failed, Some data is over the limit"
            }
            _data.data = this.BaseModel.GetData(id)
            let result = this.OBJMaps.get(id).Focus(_data)
            return result
        }
        return "OBJ is not vaild"
    }

    Focus(msg) {
        let result = this.ExecuteFocus(msg)
        msg.data.result = result
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    ExecuteScreenCoordinates(jsonData){
        let id = jsonData.data.id
        let _data = PropertyCopy.SimpleCopy(jsonData)
        // let _data = jsonData
        if (id == null)
            return "id key no have"
        if (this.OBJMaps.has(id) && this.OBJMaps.get(id) !== null) {
            let curvalue = this.BaseModel.RefreshData(id, _data.data)
            if (curvalue === undefined) {
                return "Update OBJ failed, Some data is over the limit"
            }
            _data.data = this.BaseModel.GetData(id)
            let result = this.OBJMaps.get(id).ScreenCoordinates(_data)
            return result
        }
        return "OBJ is not vaild"
    }

    ScreenCoordinates(msg){
        let result = this.ExecuteScreenCoordinates(msg)
        msg.data.result = result
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    ExecuteCloseAllScreenCoordinates(jsonData){
        jsonData.data.sendScreemCoordinates = false
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.ScreenCoordinates(jsonData)
            }
        }
        return "STOP All POI SEND SCREEN COORDINATES"
    }

    CloseAllScreenCoordinates(msg){
        let result = this.ExecuteCloseAllScreenCoordinates(msg)
        msg.data.result = result
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    ExecuteShow(jsondata): string {
        let result = super.ExecuteShow(jsondata)
        let ids: string[] = jsondata.data.ids
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                (<PointView>(this.OBJMaps.get(entry))).bDestory = false
            } 
        }
        return result
    }

    ExecuteHidden(jsondata): string {
        let result = super.ExecuteHidden(jsondata)
        let ids: string[] = jsondata.data.ids
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                (<PointView>(this.OBJMaps.get(entry))).bDestory = true
            } 
        }
        return result
    }
    ExecuteAllShow(jsondata): string {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.SetActorHiddenInGame(false)
                value.bDestory = false
            }
        }
        return "execution is completed"

    }

    ExecuteAllHidden(jsondata): string {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.SetActorHiddenInGame(true)
                value.bDestory = true
            }
        }
        return "execution is completed"

    }


}



