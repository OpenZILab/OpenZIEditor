"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/07
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePopupHandle = exports.EMessageType = void 0;
const UE = require("ue");
var EMessageType;
(function (EMessageType) {
    EMessageType["Ok"] = "Ok";
    EMessageType["YesNo"] = "YesNo";
    EMessageType["OkCancel"] = "OkCancel";
    EMessageType["YesNoCancel"] = "YesNoCancel";
    EMessageType["CancelRetryContinue"] = "CancelRetryContinue";
    EMessageType["YesNoYesAllNoAll"] = "YesNoYesAllNoAll";
    EMessageType["YesNoYesAllNoAllCancel"] = "YesNoYesAllNoAllCancel";
    EMessageType["SaveContinueCancel"] = "SaveContinueCancel";
})(EMessageType = exports.EMessageType || (exports.EMessageType = {}));
class MessagePopupHandle {
    FCallbackOK;
    FCallbackCancel;
    FCallbackContinue;
    FCallbackNo;
    FCallbackNoAll;
    FCallbackRetry;
    FCallbackYes;
    FCallbackYesAll;
    FCallbackContinueWithoutSaving;
    FCallbackSave;
    constructor() {
        this.FCallbackOK = null;
        this.FCallbackCancel = null;
        this.FCallbackContinue = null;
        this.FCallbackNo = null;
        this.FCallbackNoAll = null;
        this.FCallbackRetry = null;
        this.FCallbackYes = null;
        this.FCallbackYesAll = null;
    }
    BindCallbackFuncions() {
        let buttonClick = UE.MessagePopupSubsystem.Get().OnMessageButtonClicked;
        buttonClick.Clear();
        buttonClick.Add(this.ONMessageButtonClicked.bind(this));
    }
    ONMessageButtonClicked(returnType) {
        if (returnType == UE.EMessageReturnType.OUT_Ok) {
            console.warn("Ok");
            this.FCallbackOK?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_Cancel) {
            console.warn("Cancel");
            this.FCallbackCancel?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_Continue) {
            console.warn("Continue");
            this.FCallbackContinue?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_No) {
            console.warn("No");
            this.FCallbackNo?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_NoAll) {
            console.warn("NoAll");
            this.FCallbackNoAll?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_Retry) {
            console.warn("Retry");
            this.FCallbackRetry?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_Yes) {
            console.warn("Yes");
            this.FCallbackYes?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_YesAll) {
            console.warn("YesAll");
            this.FCallbackYesAll?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_ContinueWithoutSaving) {
            console.warn("ContinueWithoutSaving");
            this.FCallbackContinueWithoutSaving?.call(this);
        }
        else if (returnType == UE.EMessageReturnType.OUT_Save) {
            console.warn("Save");
            this.FCallbackSave?.call(this);
        }
    }
    SetCallBackOK(fOk) {
        this.FCallbackOK = fOk;
    }
    SetCallBackCancel(fCancel) {
        this.FCallbackCancel = fCancel;
    }
    SetCallBackContinue(fContinue) {
        this.FCallbackContinue = fContinue;
    }
    SetCallBackNo(fNo) {
        this.FCallbackNo = fNo;
    }
    SetCallBackNoAll(fNoAll) {
        this.FCallbackNoAll = fNoAll;
    }
    SetCallBackRetry(fRetry) {
        this.FCallbackRetry = fRetry;
    }
    SetCallBackYes(fYes) {
        this.FCallbackYes = fYes;
    }
    SetCallBackYesAll(fYesAll) {
        this.FCallbackYesAll = fYesAll;
    }
    SetCallBackContinueWithoutSaving(fYContinueWithoutSaving) {
        this.FCallbackContinueWithoutSaving = fYContinueWithoutSaving;
    }
    SetCallBackSave(fSave) {
        this.FCallbackSave = fSave;
    }
    /**
     * open message dialog
     * @param msgType message type
     * @param message message body
     * @param title message label
     * @param warp font split size
     * @param widget custom UI
     */
    OpenMessagePupop(msgType, message, title, warp, widget) {
        let UEMessagePupopType = UE.EMessagePopupType.IN_Ok;
        if (msgType == EMessageType.Ok) {
            UEMessagePupopType = UE.EMessagePopupType.IN_Ok;
        }
        else if (msgType == EMessageType.OkCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_OkCancel;
        }
        else if (msgType == EMessageType.YesNo) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNo;
        }
        else if (msgType == EMessageType.YesNoCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNoCancel;
        }
        else if (msgType == EMessageType.YesNoYesAllNoAll) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNoYesAllNoAll;
        }
        else if (msgType == EMessageType.YesNoYesAllNoAllCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNoYesAllNoAllCancel;
        }
        else if (msgType == EMessageType.CancelRetryContinue) {
            UEMessagePupopType = UE.EMessagePopupType.IN_CancelRetryContinue;
        }
        else if (msgType == EMessageType.SaveContinueCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_SaveContinueCancel;
        }
        UE.MessagePopupSubsystem.Get().ShowTips(UEMessagePupopType, message, title ?? "Message", warp, widget);
    }
}
exports.MessagePopupHandle = MessagePopupHandle;
//# sourceMappingURL=MessagePupopHandle.js.map