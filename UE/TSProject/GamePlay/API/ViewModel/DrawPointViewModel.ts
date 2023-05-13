///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:46
///

import { makeUClass} from 'puerts'
import {DrawViewModel} from "./DrawViewModel";
import {DrawPointView} from "../View/DrawPointView";
import {DrawPointModel} from "../Model/DrawPointModel";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";

export class DrawPointViewModel extends DrawViewModel  {
    constructor() {
        super()
        this.BaseModel = new DrawPointModel()
        this._OBJClass = makeUClass(DrawPointView)
        this.Type = "DrawPoint"
        this.Birthplace = "Scene"
        DrawViewModel.RegisterViewModel(this)
        MessageCenter.Add(this, this.RefreshData, NotificationLists.API.Drawn_Measure_Coodinate)
    }

    RefreshData(data) {
        if (data.id == null || data.id == "")
            return "id key no have"
        let baseData = this.BaseModel.GetData(data.id)
        if (baseData !== null) {
            this.BaseModel.RefreshData(data.id, data)
            this.UpdateAPINode(this.GetType(),data.id,data)
        }
        return "success"
    }
}