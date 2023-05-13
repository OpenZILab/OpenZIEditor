"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 11:20
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const MeasureModel_1 = require("../Model/MeasureModel");
const MeasureView_1 = require("../View/MeasureView");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
class MeasureViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new MeasureModel_1.MeasureModel();
        this._OBJClass = (0, puerts_1.makeUClass)(MeasureView_1.MeasureView);
        this.Type = "Measure";
        this.Birthplace = "Scene";
    }
    EndDraw_Cell() {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.EndDraw();
            }
        }
    }
    EndDraw(jsonData) {
        if (this.OBJMaps.size > 0) {
            this.EndDraw_Cell();
        }
        else {
            let msg = {
                classDef: this.Type,
                funcDef: "Stop",
                data: undefined,
                callback: jsonData.callback,
                pageID: jsonData.pageID,
            };
            msg.data = { "result": "There are currently no measurements to be concluded" };
            let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
            WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        }
        return "End Draw";
    }
    StartMeasure(jsonData) {
        MeasureViewModel._EndAllMeasure(jsonData);
        jsonData.bNotify = false;
        let Result = this.Add(jsonData);
        if (Result == "success") {
            jsonData.bNotify = true;
            if (this.OBJMaps.has(jsonData.data.id)) {
                let Actor = this.OBJMaps.get(jsonData.data.id);
                this.AddAPINode(jsonData, Actor, "StartMeasure");
            }
        }
        return Result;
    }
    EndMeasure(jsonData) {
        MeasureViewModel._EndAllMeasure(jsonData);
    }
    ClearMeasure(jsonData) {
        MeasureViewModel._ClearAllMeasure(jsonData);
    }
    DeleteMeasure(jsonData) {
        MeasureViewModel._DeleteMeasure(jsonData);
    }
    EndDrawing(id) {
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                let curObj = this.OBJMaps.get(id);
                if (curObj) {
                    curObj.EndDraw();
                }
            });
        }
    }
    static MeasureViewModels = new Array();
    static RegisterViewModel(ViewModel) {
        MeasureViewModel.MeasureViewModels.push(ViewModel);
    }
    static _EndAllMeasure(jsonData) {
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                value.EndDraw(jsonData);
            });
        }
    }
    static _ClearAllMeasure(jsonData) {
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                value.EndDraw_Cell();
                value.Clear(jsonData);
            });
        }
    }
    static _DeleteMeasure(jsonData) {
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                if (value.GetType() === jsonData.data.measureType) {
                    value.EndDraw_Cell();
                    value.Delete(jsonData);
                }
            });
        }
    }
}
exports.MeasureViewModel = MeasureViewModel;
//# sourceMappingURL=MeasureViewModel.js.map