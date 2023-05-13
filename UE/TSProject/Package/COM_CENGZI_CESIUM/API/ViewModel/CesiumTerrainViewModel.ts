///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import { makeUClass } from "puerts";
import { BaseViewModel } from "../../../../System/API/ViewModel/BaseViewModel";
import { Cesium3DTilesetModel } from "../Model/Cesium3DTilesetModel";
import { Cesium3DTilesetView } from "../View/Cesium3DTilesetView";
import { PackCallBacKMessage } from "../../../../System/API/IHandle/IAPIMessageHandle";
import { WebSocketServer } from "../../../../System/API/Handle/WebSocketServer";
import {MessageCenter} from "../../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../../System/Core/NotificationCore/NotificationLists";

export class CesiumTerrainViewModel extends BaseViewModel{

    type:string

    constructor() {
        super()
        this.BaseModel = new Cesium3DTilesetModel()
        this._OBJClass = makeUClass(Cesium3DTilesetView)
        this.type = "CesiumTerrain"
        this.Type = "CesiumTerrain"
        this.Birthplace = "Coverage"

    }

    ExecuteAdd(jsonData: any): string {
        let out = super.ExecuteAdd(jsonData)
        if(out == "success"){
            this.OBJMaps.get(jsonData.data.id).Tags.Add(this.Type)
        }
        return out
    }

       ExecuteDelete(jsonData: any): string {
        let OutValue = super.ExecuteDelete(jsonData)
        if(OutValue=== "success"){
            MessageCenter.Execute(NotificationLists.API.CESIUMTERRAIN_DELETE_FINISHED,jsonData.data.ids)
        }
        return OutValue
    }
    ExecuteClear(jsondata: any): string {
        let OutValue = super.ExecuteClear(jsondata)
        if(OutValue=== "execution is completed"){
            MessageCenter.Execute(NotificationLists.API.CESIUMTERRAIN_CLEAR_FINISHED)
        }
        return OutValue
    }

    ExecuteGetAllCesiumTerrain(jsondata){
      let CesiumTerrainModels = []
      let allModels = this.BaseModel.GetAllData()
      if(allModels.size>0){
        allModels.forEach((value,key)=>{
          CesiumTerrainModels.push(value)
        })
      }
      return CesiumTerrainModels
    }

    ExecuteGetCesiumTerrainById(jsondata){
      let id = jsondata.data.id
      let Model = this.BaseModel.GetData(id)
      return Model
    }

    GetAllCesiumTerrain(msg){
      msg.data = this.ExecuteGetAllCesiumTerrain(msg)
      let message = PackCallBacKMessage(msg, msg.data)
      WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    GetCesiumTerrainById(msg){
      msg.data = this.ExecuteGetCesiumTerrainById(msg)
      let message = PackCallBacKMessage(msg, msg.data)
      WebSocketServer.GetInstance().OnSendWebMessage(message)
    }
}