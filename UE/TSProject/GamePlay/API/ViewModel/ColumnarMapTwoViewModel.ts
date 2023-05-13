///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/02/26 17:35
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {ColumnarMapTwoModel} from "../Model/ColumnarMapTwoModel";
import {ColumnarMapTwoView} from "../View/ColumnarMapTwoView";

export class ColumnarMapTwoViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new ColumnarMapTwoModel()
        this._OBJClass = makeUClass(ColumnarMapTwoView)
        this.Type = "ColumnarMapTwo"
        this.Birthplace = "Scene"
    }
}