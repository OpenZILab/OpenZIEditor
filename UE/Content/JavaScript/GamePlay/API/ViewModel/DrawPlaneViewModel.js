"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:52
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawPlaneViewModel = void 0;
const puerts_1 = require("puerts");
const DrawViewModel_1 = require("./DrawViewModel");
const DrawPlaneView_1 = require("../View/DrawPlaneView");
const DrawPlaneModel_1 = require("../Model/DrawPlaneModel");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
class DrawPlaneViewModel extends DrawViewModel_1.DrawViewModel {
    constructor() {
        super();
        this.BaseModel = new DrawPlaneModel_1.DrawPlaneModel();
        this._OBJClass = (0, puerts_1.makeUClass)(DrawPlaneView_1.DrawPlaneView);
        this.Type = "DrawPlane";
        this.Birthplace = "Scene";
        DrawViewModel_1.DrawViewModel.RegisterViewModel(this);
        MessageManager_1.MessageCenter.Add(this, this.RefreshData, NotificationLists_1.NotificationLists.API.Drawn_Measure_Coodinate);
    }
    RefreshData(data) {
        if (data.id == null || data.id == "")
            return "id key no have";
        let baseData = this.BaseModel.GetData(data.id);
        if (baseData !== null) {
            this.BaseModel.RefreshData(data.id, data);
            this.UpdateAPINode(this.GetType(), data.id, data);
        }
        return "success";
    }
}
exports.DrawPlaneViewModel = DrawPlaneViewModel;
//# sourceMappingURL=DrawPlaneViewModel.js.map