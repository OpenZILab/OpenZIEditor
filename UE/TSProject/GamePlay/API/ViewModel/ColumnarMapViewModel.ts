///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/11/07 18:10
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {ColumnarMapModel} from "../Model/ColumnarMapModel";
import {ColumnarMapView} from "../View/ColumnarMapView";

export class ColumnarMapViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new ColumnarMapModel()
        this._OBJClass = makeUClass(ColumnarMapView)
        this.Type = "ColumnarMap"
        this.Birthplace = "Scene"
    }
}