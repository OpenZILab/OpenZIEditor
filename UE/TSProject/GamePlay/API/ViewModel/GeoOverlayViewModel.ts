///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:31
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {GeoOverlayModel} from "../Model/GeoOverlayModel";
import {GeoOverlayView} from "../View/GeoOverlayView";

export class GeoOverlayViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new GeoOverlayModel()
        this._OBJClass = makeUClass(GeoOverlayView)
        this.Type = "GeoOverlay"
        this.Birthplace = "Scene"
    }
}