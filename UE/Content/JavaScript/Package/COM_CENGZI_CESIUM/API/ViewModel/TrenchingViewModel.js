"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrenchingViewModel = void 0;
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../../System/API/ViewModel/BaseViewModel");
const TrenchingModel_1 = require("../Model/TrenchingModel");
const TrenchingView_1 = require("../View/TrenchingView");
const MessageManager_1 = require("../../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../../System/Core/NotificationCore/NotificationLists");
//import { TransformHelper } from "../../../../System/Project/Scene/SceneNodeUtil";
class TrenchingViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new TrenchingModel_1.TrenchingModel();
        this._OBJClass = (0, puerts_1.makeUClass)(TrenchingView_1.TrenchingView);
        this.Type = "Trenching";
        this.Birthplace = "Coverage";
        MessageManager_1.MessageCenter.Add(this, this.UpdateModelData, NotificationLists_1.NotificationLists.API.UPDATE_TRENCH_DATA);
    }
    EndDrawing(id) {
        let curObj = this.OBJMaps.get(id);
        if (curObj) {
            curObj.EndDrawing();
        }
    }
    UpdateModelData(id, Vectors) {
        let data = this.BaseModel.GetData(id);
        let tsVectors = [];
        for (let i = 0; i < Vectors.Num(); i++) {
            let requireSceneNodeUtil = require("../../../../System/Project/Scene/SceneNodeUtil");
            tsVectors.push(requireSceneNodeUtil.TransformHelper.QVectorToJson(Vectors.Get(i)));
        }
        data["Vectors"] = tsVectors;
        this.BaseModel.RefreshData(id, data);
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.UPDATE_TRENCH_COM, id);
    }
}
exports.TrenchingViewModel = TrenchingViewModel;
//# sourceMappingURL=TrenchingViewModel.js.map