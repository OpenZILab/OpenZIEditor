"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.CesiumRasterOverlayViewModel = void 0;
const BaseViewModel_1 = require("../../../../System/API/ViewModel/BaseViewModel");
const CesiumIONRasterOverlayModel_1 = require("../Model/CesiumIONRasterOverlayModel");
const CesiumTMSRasterOverlayModel_1 = require("../Model/CesiumTMSRasterOverlayModel");
const CesiumWMSRasterOverlayModel_1 = require("../Model/CesiumWMSRasterOverlayModel");
const CesiumRasterOverlayView_1 = require("../View/CesiumRasterOverlayView");
const CesiumTerrainViewModel_1 = require("./CesiumTerrainViewModel");
const IAPIMessageHandle_1 = require("../../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../../System/API/Handle/WebSocketServer");
const ApiViewModelSystem_1 = require("../../../../System/API/ApiViewModelSystem");
const MessageManager_1 = require("../../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../../System/Core/NotificationCore/NotificationLists");
class CesiumRasterOverlayViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.Type = "CesiumRasterOverlay";
        this.Birthplace = "Coverage";
        MessageManager_1.MessageCenter.Add(this, (ids) => {
            ids.forEach(item => {
                this.OBJMaps.forEach((value, key) => {
                    if (value.TerrianId === item) {
                        this.OBJMaps.delete(key);
                        this.BaseModel?.DeleteData(key);
                        this.DeleteAPINode(this.GetType(), key);
                    }
                });
            });
        }, NotificationLists_1.NotificationLists.API.CESIUMTERRAIN_DELETE_FINISHED);
        MessageManager_1.MessageCenter.Add(this, () => {
            this.OBJMaps?.clear();
            this.BaseModel?.ClearData();
        }, NotificationLists_1.NotificationLists.API.CESIUMTERRAIN_CLEAR_FINISHED);
    }
    ExecuteAdd(jsonData) {
        if (jsonData.data.type == "TMS") {
            this.BaseModel = new CesiumTMSRasterOverlayModel_1.CesiumTMSRasterOverlayModel();
        }
        else if (jsonData.data.type == "WMS") {
            this.BaseModel = new CesiumWMSRasterOverlayModel_1.CesiumWMSRasterOverlayModel();
        }
        else if (jsonData.data.type == "ION") {
            this.BaseModel = new CesiumIONRasterOverlayModel_1.CesiumIONRasterOverlayModel();
        }
        let _data = jsonData;
        let id = jsonData.data.id;
        if (this.BaseModel !== null) {
            this.BaseModel.AddData(id, _data.data);
        }
        let result;
        if (this.OBJMaps.has(id)) {
            return "id: " + id + " is existent !";
        }
        if ((0, ApiViewModelSystem_1.GetViewModel)(CesiumTerrainViewModel_1.CesiumTerrainViewModel).OBJMaps.has(jsonData.data.terrainId)) {
            let curActor = new CesiumRasterOverlayView_1.CesiumRasterOverlayView(jsonData.data.type, (0, ApiViewModelSystem_1.GetViewModel)(CesiumTerrainViewModel_1.CesiumTerrainViewModel).OBJMaps.get(jsonData.data.terrainId));
            if (curActor !== null) {
                this.OBJMaps.set(id, curActor);
                console.log("添加" + id + "到OBJMap数组");
                _data.data = this.BaseModel.GetData(id);
                result = this.OBJMaps.get(id).RefreshView(_data);
                if (result !== "success") {
                    this.OBJMaps.get(id).DeleteOverlay();
                    this.OBJMaps.delete(id);
                    this.BaseModel.DeleteData(id);
                }
                else {
                    if (jsonData.bNotify == undefined || jsonData.bNotify == true) {
                        this.AddAPINode(jsonData, null, "Add");
                    }
                }
                return result;
            }
        }
        return "create OBJ failed";
    }
    ExecuteDelete(jsonData) {
        let ids = jsonData.data.ids;
        if (ids == null && ids.length == 0) {
            return "faild ids is null";
        }
        let failedList;
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                this.BaseModel.DeleteData(entry);
                this.OBJMaps.get(entry).DeleteOverlay();
                let isComplete = this.OBJMaps.delete(entry);
                this.DeleteAPINode(this.GetType(), entry);
                if (!isComplete) {
                    failedList.push(entry);
                }
            }
        }
        if (failedList !== undefined && failedList.length > 0) {
            let beComplete;
            for (let entry of failedList) {
                beComplete += "," + entry;
            }
            let re = ",";
            if (beComplete.search(re)) {
                beComplete = beComplete.substring(1);
                return beComplete + ":These ids fail";
            }
        }
        return "success";
    }
    ExecuteClear(jsondata) {
        this.OBJMaps.forEach((value, key) => {
            if (value !== null) {
                value.DeleteOverlay();
                this.DeleteAPINode(this.GetType(), key);
            }
        });
        this.OBJMaps?.clear();
        this.BaseModel?.ClearData();
        return "execution is completed";
    }
    ExecuteShow(jsondata) {
        return this.OBJActive(jsondata, false);
    }
    ExecuteHidden(jsondata) {
        return this.OBJActive(jsondata, true);
    }
    ExecuteAllShow(jsondata) {
        for (let value of this.OBJMaps?.values()) {
            if (value !== null) {
                value.SetActive(false);
            }
        }
        return "execution is completed";
    }
    OBJActive(jsonData, isShow) {
        let ids = jsonData.data.ids;
        if (ids == null && ids.length == 0) {
            return "faild ids is null";
        }
        let beComplete = "";
        for (let entry of ids) {
            if (this.OBJMaps.has(entry)) {
                this.OBJMaps.get(entry).SetActive(!isShow);
            }
            else {
                beComplete += "," + entry;
            }
        }
        let re = ",";
        if (beComplete.search(re) !== -1) {
            beComplete = beComplete.substring(1);
            return beComplete + ", no exist";
        }
        return "success";
    }
    ExecuteGetAllCesiumOverlay(jsondata) {
        let CesiumOverlays = [];
        let allModels = this.BaseModel.GetAllData();
        if (allModels.size > 0) {
            allModels.forEach((value, key) => {
                CesiumOverlays.push(value);
            });
        }
        return CesiumOverlays;
    }
    ExecuteGetCesiumOverlayById(jsondata) {
        let id = jsondata.data.id;
        let Model = this.BaseModel.GetData(id);
        return Model;
    }
    GetAllCesiumOverlay(msg) {
        msg.data = this.ExecuteGetAllCesiumOverlay(msg);
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    GetCesiumOverlayById(msg) {
        msg.data = this.ExecuteGetCesiumOverlayById(msg);
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
}
exports.CesiumRasterOverlayViewModel = CesiumRasterOverlayViewModel;
//# sourceMappingURL=CesiumRasterOverlayViewModel.js.map