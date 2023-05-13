///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/08 18:36
///

import {makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {SceneViewingModel} from "../Model/SceneViewingModel";
import {SceneViewingView} from "../View/SceneViewingView";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";

export class SceneViewingViewModel extends BaseViewModel {
    constructor() {
        super()
        this.BaseModel = new SceneViewingModel()
        this._OBJClass = makeUClass(SceneViewingView)
        this.Type = "SceneViewing"
        this.Birthplace = "Scene"
    }

    EndDrawing(id) {
        let curObj = this.OBJMaps.get(id)
        if (curObj) {
            curObj.EndAddScenePoint()
        }
    }

    StartAddScenePoint(msg: any) {
        let _data = msg.data
        let id = _data.id
        let result
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).StartAddScenePoint()
            result = "Start Add ScenePoint"
        } else {
            result = "The current id does not exist"
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        }
        let message = PackCallBacKMessage(msg_temp, {result: result})
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    EndAddScenePoint(msg: any) {
        let _data = msg.data
        let id = _data.id
        let result
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).EndAddScenePoint()
            result = "End Add ScenePoint"
        } else {
            result = "The current id does not exist"
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        }
        let message = PackCallBacKMessage(msg_temp, {result: result})
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    StartPlay(msg: any) {
        let _data = msg.data
        let id = _data.id
        let result
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).StartPlay(msg)
            result = "Start Play"
        } else {
            result = "The current id does not exist"
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        }
        let message = PackCallBacKMessage(msg_temp, {result: result})
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    StopPlay(msg: any) {
        let _data = msg.data
        let id = _data.id
        let result
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            this.OBJMaps.get(id).StopPlay()
            result = "Stop Play"
        } else {
            result = "The current id does not exist"
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        }
        let message = PackCallBacKMessage(msg_temp, {result: result})
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    HiddenCameraMesh(msg: any) {
        let _data = msg.data
        let id = _data.id
        let result
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            if (_data.IsHidden !== undefined && typeof _data.IsHidden === "boolean") {
                this.OBJMaps.get(id).HiddenCameraMeshActor(_data.IsHidden)
                result = "Successful"
            }
        } else {
            result = "The current id does not exist"
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        }
        let message = PackCallBacKMessage(msg_temp, {result: result})
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    HiddenSplineMesh(msg: any) {
        let _data = msg.data
        let id = _data.id
        let result
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            if (_data.IsHidden !== undefined && typeof _data.IsHidden === "boolean") {
                this.OBJMaps.get(id).HiddenSplineMesh(_data.IsHidden)
                result = "Successful"
            }
        } else {
            result = "The current id does not exist"
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        }
        let message = PackCallBacKMessage(msg_temp, {result: result})
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    GetSceneViewingInfos(msg) {
        let _data = msg.data
        let id = _data.id
        if (this.BaseModel !== null && this.OBJMaps.get(id)) {
            msg.data.result = this.OBJMaps.get(id).GetSceneViewingInfos(_data.IsHidden)
            let message = PackCallBacKMessage(msg, msg.data)
            WebSocketServer.GetInstance().OnSendWebMessage(message)
            return "Successful"
        }
        msg.data.result = "The current id does not exist"
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    HiddenAllSceneViewing(msg) {
        let _data = msg.data
        let result
        if (this.BaseModel !== null) {
            if (_data.HiddenAll !== undefined && typeof _data.HiddenAll === "boolean") {
                this.OBJMaps.forEach((value, key) => {
                    value.HiddenSplineMesh(_data.HiddenAll)
                    value.HiddenCameraMeshActor(_data.HiddenAll)
                })
                result = "Successful"
            } else {
                result = "Please inform 'true' or 'false'"
            }
        } else {
            result = "No Exist"
        }
        let msg_temp = {
            classDef: msg.classDef,
            funcDef: msg.funcDef,
            callback: msg.callback,
            pageID: msg.pageID,
        }
        let message = PackCallBacKMessage(msg_temp, {result: result})
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }
}