///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/05 19:32
///

import { makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {ViewshedAnalysisView} from "../View/ViewshedAnalysisView";
import {ViewshedAnalysisModel} from "../Model/ViewshedAnalysisModel";

export class ViewshedAnalysisViewModel extends BaseViewModel  {
    constructor() {
        super()
        this.BaseModel = new ViewshedAnalysisModel()
        this._OBJClass = makeUClass(ViewshedAnalysisView)
	    this.Type = "ViewshedAnalysis"
        this.Birthplace = "Scene"
    }

    EndDrawing(id){
        let curObj = this.OBJMaps.get(id)
        if(curObj){
            curObj.EndDrawing()
        }
    }
}