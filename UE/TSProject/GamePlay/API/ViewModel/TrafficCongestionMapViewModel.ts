///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 15:06
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {TrafficCongestionMapView} from "../View/TrafficCongestionMapView";
import {TrafficCongestionMapModel} from "../Model/TrafficCongestionMapModel";

export class TrafficCongestionMapViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new TrafficCongestionMapModel()
        this._OBJClass = makeUClass(TrafficCongestionMapView)
        this.Type = "TrafficCongestionMap"
        this.Birthplace = "Scene"
    }
}