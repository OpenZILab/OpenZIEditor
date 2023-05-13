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

export class Cesium3DTilesetViewModel extends BaseViewModel{
    type:string
    constructor() {
        super()
        this.BaseModel = new Cesium3DTilesetModel()
        this._OBJClass =makeUClass(Cesium3DTilesetView)
        this.type = "Cesium3DTileset"
        this.Type = "Cesium3DTileset"
        this.Birthplace = "Coverage"
    }
    ExecuteGetAllCesium3DTileset(jsondata){
        let CesiumModels = []
        let allModels = this.BaseModel.GetAllData()
        if(allModels.size>0){
          allModels.forEach((value,key)=>{
            CesiumModels.push(value)
          })
        }
        return CesiumModels
      }
  
      ExecuteGetCesium3DTilesetById(jsondata){
        let id = jsondata.data.id
        let Model = this.BaseModel.GetData(id)
        return Model
      }
  
      GetAllCesium3DTileset(msg){
        msg.data = this.ExecuteGetAllCesium3DTileset(msg)
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
      }
  
      GetCesium3DTilesetById(msg){
        msg.data = this.ExecuteGetCesium3DTilesetById(msg)
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
      }
  
}