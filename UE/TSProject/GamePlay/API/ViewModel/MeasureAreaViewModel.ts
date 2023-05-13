///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 18:18
///

import { makeUClass} from 'puerts'
import {MeasureViewModel} from "./MeasureViewModel";
import {MeasureAreaModel} from "../Model/MeasureAreaModel";
import {MeasureAreaView} from "../View/MeasureAreaView";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";

export class MeasureAreaViewModel extends MeasureViewModel  {
    constructor() {
        super()
        this.BaseModel = new MeasureAreaModel()
        this._OBJClass = makeUClass(MeasureAreaView)
        this.Type = "MeasureArea"
        MeasureViewModel.RegisterViewModel(this)
        this.Birthplace = "Scene"
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