"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/08
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStyle = exports.ECheckState = exports.ENotifiButtonState = void 0;
const UE = require("ue");
var ENotifiButtonState;
(function (ENotifiButtonState) {
    ENotifiButtonState[ENotifiButtonState["None"] = 0] = "None";
    ENotifiButtonState[ENotifiButtonState["Success"] = 1] = "Success";
    ENotifiButtonState[ENotifiButtonState["Fail"] = 2] = "Fail";
    ENotifiButtonState[ENotifiButtonState["Pending"] = 3] = "Pending";
})(ENotifiButtonState = exports.ENotifiButtonState || (exports.ENotifiButtonState = {}));
var ECheckState;
(function (ECheckState) {
    ECheckState[ECheckState["Checked"] = 0] = "Checked";
    ECheckState[ECheckState["Unchecked"] = 1] = "Unchecked";
})(ECheckState = exports.ECheckState || (exports.ECheckState = {}));
class NotificationStyle {
    NotifiButtons = UE.NewArray(UE.NotifiButtonInfo);
    CheckBox;
    HyperLink;
    CustomWidget;
    NotifiButtonState;
    NotifiFrameStyle;
    constructor() {
        this.NotifiButtons = UE.NewArray(UE.NotifiButtonInfo);
        this.NotifiFrameStyle = { SubText: "",
            DurTime: 2.0,
            FrameWidth: 350,
            bAutoRelease: true };
    }
    AddNotifiButton(inText, fCallback, inToolTip, buttonState) {
        let NotifiButton = UE.NewObject(UE.NotifiButtonInfo.StaticClass());
        NotifiButton.InText = inText;
        NotifiButton.InToolTip = inToolTip;
        NotifiButton.OnClickedDelegate.Bind(() => {
            fCallback?.call(this);
        });
        let ButtonDisplayState;
        if (buttonState == ENotifiButtonState.None) {
            ButtonDisplayState = UE.EDisplayState.CS_None;
        }
        else if (buttonState == ENotifiButtonState.Success) {
            ButtonDisplayState = UE.EDisplayState.CS_Success;
        }
        else if (buttonState == ENotifiButtonState.Fail) {
            ButtonDisplayState = UE.EDisplayState.CS_Fail;
        }
        else if (buttonState == ENotifiButtonState.Pending) {
            ButtonDisplayState = UE.EDisplayState.CS_Pending;
        }
        NotifiButton.DisplayState = ButtonDisplayState;
        NotifiButton.ConstructNotifiButton();
        this.NotifiButtons.Add(NotifiButton);
    }
    RegisterNotifiCheckBox(inText, fCallback, startCheckState) {
        this.CheckBox = UE.NewObject(UE.CheckBoxInfo.StaticClass());
        this.CheckBox.CheckBoxDelegate.Bind((state) => {
            let CheckStete;
            if (state == UE.ECheckBoxState.Checked)
                CheckStete = ECheckState.Checked;
            else if (state == UE.ECheckBoxState.Unchecked)
                CheckStete = ECheckState.Unchecked;
            fCallback?.call(this, CheckStete);
        });
        this.CheckBox.BindHyperDelegate();
        this.CheckBox.CheckBoxText = inText;
        if (startCheckState) {
            this.CheckBox.StartCheckBoxState = startCheckState === ECheckState.Unchecked ? UE.ECheckBoxState.Unchecked : UE.ECheckBoxState.Checked;
        }
        else {
            this.CheckBox.StartCheckBoxState = UE.ECheckBoxState.Unchecked;
        }
    }
    RegisterNotifiHyperLink(inText, fCallback) {
        this.HyperLink = UE.NewObject(UE.HyperInfo.StaticClass());
        this.HyperLink.HyperlinkDelegate.Bind(() => {
            fCallback?.call(this);
        });
        this.HyperLink.BindHyperDelegate();
        this.HyperLink.HyperlinkText = inText;
    }
    RegisterFrameStyle(subText, frameWidth, durTime, autoRelease) {
        this.NotifiFrameStyle.SubText = subText ?? "";
        this.NotifiFrameStyle.FrameWidth = frameWidth ?? 350;
        this.NotifiFrameStyle.DurTime = durTime ?? 2.0;
        this.NotifiFrameStyle.bAutoRelease = autoRelease ?? true;
    }
    RegisterWidget(widgetPath) {
        let widgetClass = UE.Class.Load(widgetPath);
        let Widget = UE.WidgetBlueprintLibrary.Create(UE.OpenZIFrameworkLibrary.GetCurrentWorld(), widgetClass, null);
        this.CustomWidget = Widget;
    }
}
exports.NotificationStyle = NotificationStyle;
//# sourceMappingURL=MessageNotificationHandle.js.map