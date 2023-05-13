///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 11:20
///

import { makeUClass } from 'puerts'
import { BaseViewModel } from "../../../System/API/ViewModel/BaseViewModel"
import { MeasureModel } from "../Model/MeasureModel";
import { MeasureView } from "../View/MeasureView";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";

export class MeasureViewModel extends BaseViewModel {
    constructor() {
        super()
        this.BaseModel = new MeasureModel()
        this._OBJClass = makeUClass(MeasureView)
        this.Type = "Measure"
        this.Birthplace = "Scene"
    }

    EndDraw_Cell(): void{
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.EndDraw()
            }
        }
    }

    EndDraw(jsonData): string {
        if(this.OBJMaps.size > 0){
            this.EndDraw_Cell()
        }else{
            let msg ={
                classDef :this.Type,
                funcDef : "Stop",
                data : undefined,
                callback :jsonData.callback,
                pageID : jsonData.pageID,
            }
            msg.data = {"result":"There are currently no measurements to be concluded"}
            let message = PackCallBacKMessage(msg,  msg.data)
            WebSocketServer.GetInstance().OnSendWebMessage(message)
        }
        return "End Draw"
    }
    StartMeasure(jsonData) {
        MeasureViewModel._EndAllMeasure(jsonData)
        jsonData.bNotify = false
        let Result = this.Add(jsonData)
        if (Result == "success") {
            jsonData.bNotify = true
            if (this.OBJMaps.has(jsonData.data.id)) {
                let Actor = this.OBJMaps.get(jsonData.data.id)
                this.AddAPINode(jsonData, Actor, "StartMeasure")
            }
        }
        return Result
    }
    EndMeasure(jsonData) {
        MeasureViewModel._EndAllMeasure(jsonData)
    }
    ClearMeasure(jsonData) {
        MeasureViewModel._ClearAllMeasure(jsonData)

    }
    DeleteMeasure(jsonData) {
        MeasureViewModel._DeleteMeasure(jsonData)

    }
    EndDrawing(id){
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                let curObj = this.OBJMaps.get(id)
                if(curObj){
                    curObj.EndDraw()
                }
            })
        }
    }

    private static MeasureViewModels = new Array<MeasureViewModel>()

    static RegisterViewModel<T extends MeasureViewModel>(ViewModel: T) {
        MeasureViewModel.MeasureViewModels.push(ViewModel)
    }
    static _EndAllMeasure(jsonData) {
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                value.EndDraw(jsonData)
            })
        }
    }
    static _ClearAllMeasure(jsonData) {
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                value.EndDraw_Cell()
                value.Clear(jsonData)
            })
        }
    }
    static _DeleteMeasure(jsonData) {
        if (MeasureViewModel.MeasureViewModels.length > 0) {
            MeasureViewModel.MeasureViewModels.forEach((value) => {
                if (value.GetType() === jsonData.data.measureType) {
                    value.EndDraw_Cell()
                    value.Delete(jsonData)
                }
            })
        }
    }
}