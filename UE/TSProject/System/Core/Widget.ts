///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 1:13
///

import {Sigleton} from "./Sigleton";
import {WidgetPath} from "../API/Resource/WidgetPath"
import * as IWidgetEventHandle from "../API/IHandle/IWidgetEventHandle"

export class Widget extends Sigleton {
    static GetInstance(): Widget {
        return super.TakeInstance(Widget)
    }

    private WidgetList: Map<string, any>
    private CurrentWidget: string = "empty"

    public OnInit() {
        this.WidgetList = new Map()
        this.WidgetList.set("empty","")
    }

    public SwitchCurrWidget(id){
        this.DestroyWidget(this.CurrentWidget)
        this.CurrentWidget = id
        return this.CreateWidget(id)
    }

    public AddWidget(id,widget){
        this.WidgetList[id] = widget
    }

    public GetWidget(id){
        return this.WidgetList[id]
    }

    public DestroyWidget(id){
        if (this.WidgetList[id] != null && id != "empty"){
            if (typeof id === "string"){
                if (this.CheckWidget(id,"") == false){
                    return
                }
                IWidgetEventHandle.RemoveWidget(this.WidgetList[id])
                this.WidgetList[id] = null
            }
        }
    }

    public CreateWidget(id){
        if (this.CheckWidget(id,"") == false){
            return null
        }
        return this.GetWidget(id)
    }

    public CheckWidget(id,Zorder){
        if(this.GetWidget(id) == null){
            if (WidgetPath[id] != null){
                let widget = IWidgetEventHandle.OpenWidget(id)
                this.AddWidget(id,widget)
            }else {
                return false
            }
        }
        return true
    }
}