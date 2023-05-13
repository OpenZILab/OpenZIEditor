"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseViewModel = void 0;
const puerts_1 = require("puerts");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const ApiViewModelSystem_1 = require("../ApiViewModelSystem");
const IObjectHandle = require("../../../GamePlay/API/IHandle/IObjectHandle");
const NotificationLists_1 = require("../../Core/NotificationCore/NotificationLists");
const MessageManager_1 = require("../../Core/NotificationCore/MessageManager");
class BaseViewModel {
    _World;
    _OBJClass;
    OBJMaps = new Map();
    BaseModel;
    Ins;
    Type;
    Birthplace;
    _OBJNameIndex = 0;
    constructor() {
        this._World = puerts_1.argv.getByName("GameInstance").GetWorld();
    }
    GetType() {
        return this.Type;
    }
    ExecuteAdd(jsonData) {
        if (jsonData == null)
            return "false";
        let _data = jsonData;
        if (jsonData.data == null)
            return "false";
        let id = jsonData.data.id;
        if (this.BaseModel !== null) {
            this.BaseModel.AddData(id, _data.data);
        }
        let result;
        if (this.OBJMaps.has(id)) {
            return "id: " + id + " is existent !";
        }
        let ActorName = id + "*" + this.Type + "*" + this._OBJClass.GetName() + "_" + "_" + this._OBJNameIndex;
        this._OBJNameIndex++;
        let curActor = this.SpawnOBJ(ActorName);
        if (curActor !== null) {
            ApiViewModelSystem_1.APIViewModelSystem.GetInstance().EndDrawing();
            this.OBJMaps.set(id, curActor);
            console.log("添加" + id + "到OBJMap数组");
            _data.data = this.BaseModel.GetData(id);
            result = this.OBJMaps.get(id).RefreshView(_data);
            ApiViewModelSystem_1.APIViewModelSystem.GetInstance().RegisterDrawFunc(this.Type, id);
            if (result !== "success") {
                this.OBJMaps.get(id).K2_DestroyActor();
                this.OBJMaps.delete(id);
                this.BaseModel.DeleteData(id);
            }
            else {
                if (jsonData.bNotify == undefined || jsonData.bNotify == true) {
                    this.AddAPINode(jsonData, curActor, "Add");
                }
            }
            if (this.BaseModel.IsOverRange) {
                result = result + "," + "but Some data is over the limit";
            }
            return result;
        }
        return "create OBJ failed";
    }
    ExecuteUpdate(jsonData) {
        let id = jsonData.data.id;
        let _data = jsonData;
        if (id == null)
            return "id key no have";
        if (this.OBJMaps.has(id) && this.OBJMaps.get(id) !== null) {
            let curvalue = this.BaseModel.RefreshData(id, _data.data);
            if (curvalue === undefined) {
                return "Update OBJ failed, Some data is over the limit";
            }
            _data.data = this.BaseModel.GetData(id);
            let result = this.OBJMaps.get(id).RefreshView(_data);
            this.UpdateAPINode(this.GetType(), id, jsonData.data);
            return result;
        }
        return "OBJ is not vaild";
    }
    ExecuteDelete(jsonData) {
        let ids = jsonData.data.ids;
        if (ids == null && ids.length == 0) {
            return "faild ids is null";
        }
        let failedList = [];
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                this.BaseModel.DeleteData(entry);
                this.OBJMaps.get(entry).K2_DestroyActor();
                let isComplete = this.OBJMaps.delete(entry);
                this.DeleteAPINode(this.GetType(), entry);
                if (!isComplete) {
                    failedList.push(entry);
                }
            }
            else {
                failedList.push(entry);
            }
        }
        if (failedList !== undefined && failedList.length > 0) {
            let beComplete;
            beComplete = "";
            for (let entry of failedList) {
                beComplete += "," + entry;
            }
            let re = ",";
            if (beComplete.search(re) != -1) {
                beComplete = beComplete.substring(1);
                return beComplete + ":These ids fail";
            }
        }
        return "success";
    }
    ExecuteClear(jsondata) {
        this.OBJMaps.forEach((value, key) => {
            if (value !== null) {
                value.K2_DestroyActor();
                this.DeleteAPINode(this.GetType(), key);
            }
        });
        this.OBJMaps.clear();
        this.BaseModel.ClearData();
        return "execution is completed";
    }
    ExecuteShow(jsondata) {
        return this.OBJsIsShow(jsondata, true);
    }
    ExecuteHidden(jsondata) {
        return this.OBJsIsShow(jsondata, false);
    }
    ExecuteAllShow(jsondata) {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.SetActorHiddenInGame(false);
            }
        }
        return "execution is completed";
    }
    ExecuteAllHidden(jsondata) {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.SetActorHiddenInGame(true);
            }
        }
        return "execution is completed";
    }
    OBJsIsShow(jsonData, isShow) {
        let ids = jsonData.data.ids;
        if (ids == null && ids.length == 0) {
            return "faild ids is null";
        }
        let beComplete = "";
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                this.OBJMaps.get(entry).SetActorHiddenInGame(!isShow);
                this.OBJMaps.get(entry).SetActorEnableCollision(isShow);
                this.HiddenAPINode(this.Type, entry, !isShow);
            }
            else {
                beComplete += "," + entry;
            }
        }
        let re = ",";
        if (beComplete.search(re) != -1) {
            beComplete = beComplete.substring(1);
            return "These ids do not exist:" + beComplete;
        }
        return "success";
    }
    SpawnOBJ(Name) {
        let curActor = IObjectHandle.SpawnOBJ(this._OBJClass, Name);
        if (curActor !== null) {
            return curActor;
        }
        return null;
    }
    EndDrawing(id) { }
    GetActorByApiID(APIID) {
        if (this.OBJMaps.has(APIID)) {
            return this.OBJMaps.get(APIID);
        }
        return null;
    }
    //-----------------------Editor--------------------
    AddAPINode(jsonValue, actor, func) {
        let Entry = { Class: this.GetType(), id: jsonValue.data.id, Actor: actor, func: func, data: jsonValue.data, Action: null };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.SPAWN_API, Entry);
    }
    DeleteAPINode(Inclass, InId) {
        let Entry = { Class: Inclass, id: InId };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.DELETE_API, Entry);
    }
    UpdateAPINode(InClass, InId, InData) {
        let Entry = { Class: InClass, id: InId, data: InData };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.UPDATE_API, Entry);
    }
    HiddenAPINode(InClass, InId, bHidden) {
        let Entry = { Class: InClass, id: InId, bHidden: bHidden };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.HIDDEN_API, Entry);
    }
    //-------------------------Message---------------------
    AddORUpdate(msg) {
        if (msg.data == null)
            return;
        let id = msg.data.id;
        let result = "fail";
        if (this.OBJMaps.has(id)) {
            let Data = { data: { ids: [id] } };
            this.ExecuteShow(Data);
            //this.OBJMaps.get(id).SetActorHiddenInGame(false)
            result = this.ExecuteUpdate(msg);
        }
        else {
            result = this.ExecuteAdd(msg);
        }
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    Add(msg) {
        if (msg.data == null)
            return;
        let result = this.ExecuteAdd(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    Delete(msg) {
        let result = this.ExecuteDelete(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    Clear(msg) {
        let result = this.ExecuteClear(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    Update(msg) {
        let result = this.ExecuteUpdate(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    Show(msg) {
        let result = this.ExecuteShow(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    Hidden(msg) {
        let result = this.ExecuteHidden(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    AllShow(msg) {
        let result = this.ExecuteAllShow(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    AllHidden(msg) {
        let result = this.ExecuteAllHidden(msg);
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    RefreshData(data) {
        if (data.id == null || data.id == "")
            return "id key no have";
        let baseData = this.BaseModel.GetData(data.id);
        if (baseData !== null) {
            let CurData = baseData;
            //@ts-ignore
            CurData.id = data.id;
            //@ts-ignore
            CurData.GISType = data.GISType;
            //@ts-ignore
            CurData.coordinatesList = data.coordinatesList;
            //@ts-ignore
            CurData.isAuto = data.isAuto;
            let curvalue = this.BaseModel.RefreshData(data.id, CurData);
            // APIHelper.AddAPIComponentList()
        }
        return "success";
    }
}
exports.BaseViewModel = BaseViewModel;
//# sourceMappingURL=BaseViewModel.js.map