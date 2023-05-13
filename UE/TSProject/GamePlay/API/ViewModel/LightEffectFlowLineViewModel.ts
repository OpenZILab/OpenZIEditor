///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/01/12 10:55
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {LightEffectFlowLineModel} from "../Model/LightEffectFlowLineModel";
import {LightEffectFlowLineView} from "../View/LightEffectFlowLineView";

export class LightEffectFlowLineViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new LightEffectFlowLineModel()
        this._OBJClass = makeUClass(LightEffectFlowLineView)
        this.Type = "LightEffectFlowLine"
        this.Birthplace = "Scene"
    }
}