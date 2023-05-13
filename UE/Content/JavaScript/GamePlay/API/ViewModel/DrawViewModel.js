"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:39
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawViewModel = void 0;
const puerts_1 = require("puerts");
const BaseViewModel_1 = require("../../../System/API/ViewModel/BaseViewModel");
const DrawModel_1 = require("../Model/DrawModel");
const DrawView_1 = require("../View/DrawView");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
class DrawViewModel extends BaseViewModel_1.BaseViewModel {
    constructor() {
        super();
        this.BaseModel = new DrawModel_1.DrawModel();
        this._OBJClass = (0, puerts_1.makeUClass)(DrawView_1.DrawView);
        this.Type = "Draw";
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
            msg.data = { "result": "There is currently no drawing to end" };
            let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
            WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        }
        return "End Draw";
    }
    StartDraw(jsonData) {
        DrawViewModel._EndAllDraw(jsonData);
        jsonData.bNotify = false;
        let Result = this.Add(jsonData);
        if (Result == "success") {
            jsonData.bNotify = true;
            if (this.OBJMaps.has(jsonData.data.id)) {
                let Actor = this.OBJMaps.get(jsonData.data.id);
                this.AddAPINode(jsonData, Actor, "StartDraw");
            }
        }
        return Result;
    }
    EndAllDraw(jsonData) {
        DrawViewModel._EndAllDraw(jsonData);
    }
    ClearAllDraw(jsonData) {
        DrawViewModel._ClearAllDraw(jsonData);
    }
    DeleteDraw(jsonData) {
        DrawViewModel._DeleteDraw(jsonData);
    }
    EndDrawing(id) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                let curObj = this.OBJMaps.get(id);
                if (curObj) {
                    curObj.EndDraw();
                }
            });
        }
    }
    static DrawViewModels = new Array();
    static RegisterViewModel(ViewModel) {
        DrawViewModel.DrawViewModels.push(ViewModel);
    }
    static _EndAllDraw(jsonData) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                value.EndDraw(jsonData);
            });
        }
    }
    static _ClearAllDraw(jsonData) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                value.EndDraw_Cell();
                value.Clear(jsonData);
            });
        }
    }
    static _DeleteDraw(jsonData) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                if (value.GetType() === jsonData.data.drawType) {
                    value.EndDraw_Cell();
                    value.Delete(jsonData);
                }
            });
        }
    }
}
exports.DrawViewModel = DrawViewModel;
//# sourceMappingURL=DrawViewModel.js.map