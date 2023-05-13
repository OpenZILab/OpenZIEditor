///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 14:39
///

import {makeUClass} from 'puerts'
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {DrawModel} from "../Model/DrawModel";
import {DrawView} from "../View/DrawView";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";
import {APIViewModelSystem} from "../../../System/API/ApiViewModelSystem";

export class DrawViewModel extends BaseViewModel {
    constructor() {
        super()
        this.BaseModel = new DrawModel()
        this._OBJClass = makeUClass(DrawView)
        this.Type = "Draw"
        this.Birthplace = "Scene"

    }

    EndDraw_Cell(): void {
        for (let value of this.OBJMaps.values()) {
            if (value !== null) {
                value.EndDraw()
            }
        }
    }

    EndDraw(jsonData): string {
        if (this.OBJMaps.size > 0) {
            this.EndDraw_Cell()
        } else {
            let msg = {
                classDef: this.Type,
                funcDef: "Stop",
                data: undefined,
                callback: jsonData.callback,
                pageID: jsonData.pageID,
            }
            msg.data = {"result": "There is currently no drawing to end"}
            let message = PackCallBacKMessage(msg, msg.data)
            WebSocketServer.GetInstance().OnSendWebMessage(message)
        }
        return "End Draw"
    }

    StartDraw(jsonData) {
        DrawViewModel._EndAllDraw(jsonData)
        jsonData.bNotify = false
        let Result = this.Add(jsonData)
        if (Result == "success") {
            jsonData.bNotify = true
            if (this.OBJMaps.has(jsonData.data.id)) {
                let Actor = this.OBJMaps.get(jsonData.data.id)
                this.AddAPINode(jsonData, Actor, "StartDraw")
            }
        }
        return Result
    }

    EndAllDraw(jsonData) {
        DrawViewModel._EndAllDraw(jsonData)
    }

    ClearAllDraw(jsonData) {
        DrawViewModel._ClearAllDraw(jsonData)

    }

    DeleteDraw(jsonData) {
        DrawViewModel._DeleteDraw(jsonData)

    }

    EndDrawing(id) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                let curObj = this.OBJMaps.get(id)
                if (curObj) {
                    curObj.EndDraw()
                }
            })
        }
    }


    private static DrawViewModels = new Array<DrawViewModel>()

    static RegisterViewModel<T extends DrawViewModel>(ViewModel: T) {
        DrawViewModel.DrawViewModels.push(ViewModel)
    }

    static _EndAllDraw(jsonData) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                value.EndDraw(jsonData)
            })
        }
    }

    static _ClearAllDraw(jsonData) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                value.EndDraw_Cell()
                value.Clear(jsonData)
            })
        }
    }

    static _DeleteDraw(jsonData) {
        if (DrawViewModel.DrawViewModels.length > 0) {
            DrawViewModel.DrawViewModels.forEach((value) => {
                if (value.GetType() === jsonData.data.drawType) {
                    value.EndDraw_Cell()
                    value.Delete(jsonData)
                }
            })
        }
    }

}


