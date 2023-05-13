///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/24 10:00
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {OriginDestinationLineModel} from "../Model/OriginDestinationLineModel";
import {OriginDestinationLineView} from "../View/OriginDestinationLineView";

export class OriginDestinationLineViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new OriginDestinationLineModel()
        this._OBJClass = makeUClass(OriginDestinationLineView)
        this.Type = "OriginDestinationLine"
        this.Birthplace = "Scene"
    }
}