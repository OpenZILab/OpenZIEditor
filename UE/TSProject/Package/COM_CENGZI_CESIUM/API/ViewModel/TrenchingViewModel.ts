///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
import { makeUClass } from "puerts";
import { BaseViewModel } from "../../../../System/API/ViewModel/BaseViewModel";
import { TrenchingModel } from "../Model/TrenchingModel";
import { TrenchingView } from "../View/TrenchingView";
import { MessageCenter } from "../../../../System/Core/NotificationCore/MessageManager";
import { NotificationLists } from "../../../../System/Core/NotificationCore/NotificationLists";
import * as UE from "ue"
//import { TransformHelper } from "../../../../System/Project/Scene/SceneNodeUtil";

export class TrenchingViewModel extends BaseViewModel {

    constructor() {
        super()
        this.BaseModel = new TrenchingModel()
        this._OBJClass = makeUClass(TrenchingView)
        this.Type = "Trenching"
        this.Birthplace = "Coverage"
        MessageCenter.Add(this,this.UpdateModelData,NotificationLists.API.UPDATE_TRENCH_DATA)
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
        MessageCenter.Execute(NotificationLists.API.UPDATE_TRENCH_COM,id)
    }

}
