///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/12 13:43
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {ScreenCoordinatesModel} from "../Model/ScreenCoordinatesModel";
import {ScreenCoordinatesView} from "../View/ScreenCoordinatesView";

export class ScreenCoordinatesViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new ScreenCoordinatesModel()
        this._OBJClass = makeUClass(ScreenCoordinatesView)
        this.Type = "ScreenCoordinates"
        this.Birthplace = "Scene"
    }
}