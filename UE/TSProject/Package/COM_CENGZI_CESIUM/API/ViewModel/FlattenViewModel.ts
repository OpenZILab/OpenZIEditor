///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import { makeUClass } from "puerts";
import { BaseViewModel } from "../../../../System/API/ViewModel/BaseViewModel";
import { FlattenModel } from "../Model/FlattenModel";
import { FlattenView } from "../View/FlattenView";
import { MessageCenter } from "../../../../System/Core/NotificationCore/MessageManager";
import { NotificationLists } from "../../../../System/Core/NotificationCore/NotificationLists";
import * as UE from "ue"

export class FlattenViewModel extends BaseViewModel {

    constructor() {
        super()
        this.BaseModel = new FlattenModel()
        this._OBJClass = makeUClass(FlattenView)
        this.Type= "Flatten"
        this.Birthplace = "Coverage"
        MessageCenter.Add(this,this.UpdateModelData,NotificationLists.API.UPDATE_FLATTEN_DATA)

    }

    EndDrawing(id){
        let curObj = this.OBJMaps.get(id)
        if(curObj){
            curObj.EndDrawing()
        }
    }
    UpdateModelData(id:string,Vectors:UE.TArray<UE.Vector>){
        let data = this.BaseModel.GetData(id)
        let tsVectors = []
        for(let i = 0;i<Vectors.Num();i++){
            let requireSceneNodeUtil = require("../../../../System/Project/Scene/SceneNodeUtil")
            tsVectors.push(requireSceneNodeUtil.TransformHelper.QVectorToJson(Vectors.Get(i)))
        }
        data["Vectors"] =tsVectors
        this.BaseModel.RefreshData(id, data)
        MessageCenter.Execute(NotificationLists.API.UPDATE_FLATTEN_COM,id)
    }

}


