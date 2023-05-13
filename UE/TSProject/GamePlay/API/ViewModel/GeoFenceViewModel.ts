///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 10:14
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {GeoFenceView} from "../View/GeoFenceView";
import {GeoFenceModel} from "../Model/GeoFenceModel";

export class GeoFenceViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new GeoFenceModel()
        this._OBJClass = makeUClass(GeoFenceView)
        this.Type = "GeoFence"
        this.Birthplace = "Scene"
    }
}