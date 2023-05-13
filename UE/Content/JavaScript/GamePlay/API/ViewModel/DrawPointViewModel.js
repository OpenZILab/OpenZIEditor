"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:46
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawPointViewModel = void 0;
const puerts_1 = require("puerts");
const DrawViewModel_1 = require("./DrawViewModel");
const DrawPointView_1 = require("../View/DrawPointView");
const DrawPointModel_1 = require("../Model/DrawPointModel");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
class DrawPointViewModel extends DrawViewModel_1.DrawViewModel {
    constructor() {
        super();
        this.BaseModel = new DrawPointModel_1.DrawPointModel();
        this._OBJClass = (0, puerts_1.makeUClass)(DrawPointView_1.DrawPointView);
        this.Type = "DrawPoint";
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
exports.DrawPointViewModel = DrawPointViewModel;
//# sourceMappingURL=DrawPointViewModel.js.map