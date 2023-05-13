///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/11 18:43
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {WindowView} from "../View/WindowView";
import {WindowModel} from "../Model/WindowModel";

export class WindowViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new WindowModel()
        this._OBJClass = makeUClass(WindowView)
        this.Type = "Window"
        this.Birthplace = "Scene"
    }
} 