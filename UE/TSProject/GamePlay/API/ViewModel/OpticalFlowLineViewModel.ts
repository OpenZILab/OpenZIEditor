///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/29 18:34
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {OpticalFlowLineView} from "../View/OpticalFlowLineView";
import {OpticalFlowLineModel} from "../Model/OpticalFlowLineModel";

export class OpticalFlowLineViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new OpticalFlowLineModel()
        this._OBJClass = makeUClass(OpticalFlowLineView)
        this.Type = "OpticalFlowLine"
        this.Birthplace = "Scene"
    }
}