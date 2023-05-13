///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/20 23:52
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {AlarmAnchorModel} from "../Model/AlarmAnchorModel";
import {AlarmAnchorView} from "../View/AlarmAnchorView";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";
import {PropertyCopy} from "../../../System/Core/PropertyCopy";

export class AlarmAnchorViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new AlarmAnchorModel()
        this._OBJClass = makeUClass(AlarmAnchorView)
        this.Type = "AlarmAnchor"
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
        return "STOP All ALARMANCHOR SEND SCREEN COORDINATES"
    }

    CloseAllScreenCoordinates(msg){
        let result = this.ExecuteCloseAllScreenCoordinates(msg)
        msg.data.result = result
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

}