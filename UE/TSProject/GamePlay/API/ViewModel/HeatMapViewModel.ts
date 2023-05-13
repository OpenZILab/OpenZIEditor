///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 18:25
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {HeatMapView} from "../View/HeatMapView"
import {HeatMapModel} from "../Model/HeatMapModel"

export class HeatMapViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new HeatMapModel()
        this._OBJClass = makeUClass(HeatMapView)
        this.Type = "HeatMap"
        this.Birthplace = "Scene"
    }
}