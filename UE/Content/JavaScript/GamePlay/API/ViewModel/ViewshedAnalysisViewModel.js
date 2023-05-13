"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/05 19:32
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewshedAnalysisViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const ViewshedAnalysisView_1 = require("../View/ViewshedAnalysisView");
const ViewshedAnalysisModel_1 = require("../Model/ViewshedAnalysisModel");
class ViewshedAnalysisViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new ViewshedAnalysisModel_1.ViewshedAnalysisModel();
        this._OBJClass = (0, puerts_1.makeUClass)(ViewshedAnalysisView_1.ViewshedAnalysisView);
        this.Type = "ViewshedAnalysis";
        this.Birthplace = "Scene";
    }
    EndDrawing(id) {
        let curObj = this.OBJMaps.get(id);
        if (curObj) {
            curObj.EndDrawing();
        }
    }
}
exports.ViewshedAnalysisViewModel = ViewshedAnalysisViewModel;
//# sourceMappingURL=ViewshedAnalysisViewModel.js.map