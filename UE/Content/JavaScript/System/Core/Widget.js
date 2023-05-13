"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 1:13
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.Widget = void 0;
const Sigleton_1 = require("./Sigleton");
const WidgetPath_1 = require("../API/Resource/WidgetPath");
const IWidgetEventHandle = require("../API/IHandle/IWidgetEventHandle");
class Widget extends Sigleton_1.Sigleton {
    static GetInstance() {
        return super.TakeInstance(Widget);
    }
    WidgetList;
    CurrentWidget = "empty";
    OnInit() {
        this.WidgetList = new Map();
        this.WidgetList.set("empty", "");
    }
    SwitchCurrWidget(id) {
        this.DestroyWidget(this.CurrentWidget);
        this.CurrentWidget = id;
        return this.CreateWidget(id);
    }
    AddWidget(id, widget) {
        this.WidgetList[id] = widget;
    }
    GetWidget(id) {
        return this.WidgetList[id];
    }
    DestroyWidget(id) {
        if (this.WidgetList[id] != null && id != "empty") {
            if (typeof id === "string") {
                if (this.CheckWidget(id, "") == false) {
                    return;
                }
                IWidgetEventHandle.RemoveWidget(this.WidgetList[id]);
                this.WidgetList[id] = null;
            }
        }
    }
    CreateWidget(id) {
        if (this.CheckWidget(id, "") == false) {
            return null;
        }
        return this.GetWidget(id);
    }
    CheckWidget(id, Zorder) {
        if (this.GetWidget(id) == null) {
            if (WidgetPath_1.WidgetPath[id] != null) {
                let widget = IWidgetEventHandle.OpenWidget(id);
                this.AddWidget(id, widget);
            }
            else {
                return false;
            }
        }
        return true;
    }
}
exports.Widget = Widget;
//# sourceMappingURL=Widget.js.map