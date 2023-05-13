"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/13 14:21
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserverPawnViewModel = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const ObserverPawnView_1 = require("../View/ObserverPawnView");
const ObserverPawnModel_1 = require("../Model/ObserverPawnModel");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const SingleViewModel_1 = require("../../../System/API/ViewModel/SingleViewModel");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
class ObserverPawnViewModel extends SingleViewModel_1.SingleViewModel {
    constructor() {
        super();
        this.BaseModel = new ObserverPawnModel_1.ObserverPawnModel();
        this._OBJClass = (0, puerts_1.makeUClass)(ObserverPawnView_1.ObserverPawnView);
        this.Type = "CesiumPawn";
        this.Birthplace = "Control";
        this.SingleObject = null;
    }
    SpawnObject(msg) {
        if (this.SingleObject == null) {
            this.SingleObject = this._World.SpawnActor(this._OBJClass, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
            UE.GameplayStatics.GetPlayerController(this._World, 0).UnPossess();
            UE.GameplayStatics.GetPlayerController(this._World, 0).SetViewTargetWithBlend(this.SingleObject, 1, UE.EViewTargetBlendFunction.VTBlend_Linear, 0, false);
            UE.GameplayStatics.GetPlayerController(this._World, 0).Possess(this.SingleObject);
            this.SetCameraInfo(msg);
            if (msg.bNotify == undefined || msg.bNotify == true) {
                this.AddAPINode(msg, this.SingleObject, "SpawnObject");
            }
            return "SpawnObjectSuccess";
        }
        else {
            UE.GameplayStatics.GetPlayerController(this._World, 0).UnPossess();
            UE.GameplayStatics.GetPlayerController(this._World, 0).SetViewTargetWithBlend(this.SingleObject, 1, UE.EViewTargetBlendFunction.VTBlend_Linear, 0, false);
            UE.GameplayStatics.GetPlayerController(this._World, 0).Possess(this.SingleObject);
            this.SetCameraInfo(msg);
            if (msg.bNotify == undefined || msg.bNotify == true) {
                this.AddAPINode(msg, this.SingleObject, "SpawnObject");
            }
        }
    }
    UpdateObject(msg) {
        return this.SetCameraInfo(msg);
    }
    GetObject() {
        return this.SingleObject;
    }
    SetCameraInfo(msg) {
        if (this.SingleObject == null)
            return;
        this.BaseModel.SetSingleData(msg.data);
        msg.data = this.BaseModel.GetSingleData();
        //let ObserverPawn = GetObserverPawn()
        let result = this.SingleObject?.SetCameraInfo(msg);
        msg.data.result = result;
        if (result === "success") {
            if (this.BaseModel.IsOverRange) {
                msg.data.result = "result, but Some data is over the limit";
            }
            let Entry = { Class: "CesiumPawn", data: msg.data };
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.UPDATE_API, Entry);
        }
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    GetCameraInfo(msg) {
        if (this.SingleObject == null)
            return;
        //let ObserverPawn = GetObserverPawn()
        let result = this.SingleObject?.GetCameraInfo();
        msg.data.result = result;
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        return result;
    }
    GetCoord(msg) {
        if (this.SingleObject == null)
            return;
        //let ObserverPawn = GetObserverPawn()
        return this.SingleObject.GetCoord();
    }
    SetOpenMetaData(msg) {
        //let ObserverPawn = GetObserverPawn()
        if (this.SingleObject !== null) {
            this.SingleObject.SetOpenMetaData(msg);
            msg.data.result = "success";
        }
        else {
            msg.data.result = "Current Pawn is not CesiumPawn";
        }
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
}
exports.ObserverPawnViewModel = ObserverPawnViewModel;
//# sourceMappingURL=ObseverPawnViewModel.js.map