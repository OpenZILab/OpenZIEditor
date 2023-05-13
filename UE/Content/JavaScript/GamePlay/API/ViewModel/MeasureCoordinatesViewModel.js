"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 11:45
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureCoordinatesViewModel = void 0;
const puerts_1 = require("puerts");
const MeasureViewModel_1 = require("./MeasureViewModel");
const MeasureCoordinatesView_1 = require("../View/MeasureCoordinatesView");
const MeasureCoordinatesModel_1 = require("../Model/MeasureCoordinatesModel");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
class MeasureCoordinatesViewModel extends MeasureViewModel_1.MeasureViewModel {
    constructor() {
        super();
        this.BaseModel = new MeasureCoordinatesModel_1.MeasureCoordinatesModel();
        this._OBJClass = (0, puerts_1.makeUClass)(MeasureCoordinatesView_1.MeasureCoordinatesView);
        this.Type = "MeasureCoordinates";
        MeasureViewModel_1.MeasureViewModel.RegisterViewModel(this);
        this.Birthplace = "Scene";
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
exports.MeasureCoordinatesViewModel = MeasureCoordinatesViewModel;
//# sourceMappingURL=MeasureCoordinatesViewModel.js.map