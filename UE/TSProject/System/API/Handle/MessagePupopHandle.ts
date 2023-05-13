///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/07
///

import * as UE from "ue"

export enum EMessageType {
    Ok = "Ok",
    YesNo = "YesNo",
    OkCancel = "OkCancel",
    YesNoCancel = "YesNoCancel",
    CancelRetryContinue = "CancelRetryContinue",
    YesNoYesAllNoAll = "YesNoYesAllNoAll",
    YesNoYesAllNoAllCancel = "YesNoYesAllNoAllCancel",
    SaveContinueCancel = "SaveContinueCancel"
}


export class MessagePopupHandle {

    private FCallbackOK: Function
    private FCallbackCancel: Function
    private FCallbackContinue: Function
    private FCallbackNo: Function
    private FCallbackNoAll: Function
    private FCallbackRetry: Function
    private FCallbackYes: Function
    private FCallbackYesAll: Function
    private FCallbackContinueWithoutSaving: Function
    private FCallbackSave: Function



    constructor() {
        this.FCallbackOK = null
        this.FCallbackCancel = null
        this.FCallbackContinue = null
        this.FCallbackNo = null
        this.FCallbackNoAll = null
        this.FCallbackRetry = null
        this.FCallbackYes = null
        this.FCallbackYesAll = null

    }

    BindCallbackFuncions() {
        let buttonClick =UE.MessagePopupSubsystem.Get().OnMessageButtonClicked 
        buttonClick.Clear()
        buttonClick.Add(this.ONMessageButtonClicked.bind(this))
    }

    ONMessageButtonClicked(returnType: UE.EMessageReturnType){
        if (returnType == UE.EMessageReturnType.OUT_Ok) {
            console.warn("Ok")
            this.FCallbackOK?.call(this)

        } else if (returnType == UE.EMessageReturnType.OUT_Cancel) {
            console.warn("Cancel")
            this.FCallbackCancel?.call(this)

        } else if (returnType == UE.EMessageReturnType.OUT_Continue) {
            console.warn("Continue")
            this.FCallbackContinue?.call(this)

        } else if (returnType == UE.EMessageReturnType.OUT_No) {
            console.warn("No")
            this.FCallbackNo?.call(this)

        } else if (returnType == UE.EMessageReturnType.OUT_NoAll) {
            console.warn("NoAll")
            this.FCallbackNoAll?.call(this)

        } else if (returnType == UE.EMessageReturnType.OUT_Retry) {
            console.warn("Retry")
            this.FCallbackRetry?.call(this)

        } else if (returnType == UE.EMessageReturnType.OUT_Yes) {
            console.warn("Yes")
            this.FCallbackYes?.call(this)

        } else if (returnType == UE.EMessageReturnType.OUT_YesAll) {
            console.warn("YesAll")
            this.FCallbackYesAll?.call(this)

        }
        else if (returnType == UE.EMessageReturnType.OUT_ContinueWithoutSaving) {
            console.warn("ContinueWithoutSaving")
            this.FCallbackContinueWithoutSaving?.call(this)

        }
        else if (returnType == UE.EMessageReturnType.OUT_Save) {
            console.warn("Save")
            this.FCallbackSave?.call(this)

        }
    }



    SetCallBackOK(fOk: Function) {
        this.FCallbackOK = fOk

    }
    SetCallBackCancel(fCancel: Function) {
        this.FCallbackCancel = fCancel
    }
    SetCallBackContinue(fContinue: Function) {
        this.FCallbackContinue = fContinue
    }
    SetCallBackNo(fNo: Function) {
        this.FCallbackNo = fNo
    }
    SetCallBackNoAll(fNoAll: Function) {
        this.FCallbackNoAll = fNoAll
    }
    SetCallBackRetry(fRetry: Function) {
        this.FCallbackRetry = fRetry
    }
    SetCallBackYes(fYes: Function) {
        this.FCallbackYes = fYes
    }
    SetCallBackYesAll(fYesAll: Function) {
        this.FCallbackYesAll = fYesAll
    }
    SetCallBackContinueWithoutSaving(fYContinueWithoutSaving: Function) {
        this.FCallbackContinueWithoutSaving = fYContinueWithoutSaving
    }
    SetCallBackSave(fSave: Function) {
        this.FCallbackSave = fSave
    }



    /**
     * open message dialog
     * @param msgType message type
     * @param message message body
     * @param title message label
     * @param warp font split size
     * @param widget custom UI
     */
    OpenMessagePupop(msgType: EMessageType, message: string, title: string, warp: number, widget: any) {
        let UEMessagePupopType: UE.EMessagePopupType = UE.EMessagePopupType.IN_Ok
        if (msgType == EMessageType.Ok) {
            UEMessagePupopType = UE.EMessagePopupType.IN_Ok
        } else if (msgType == EMessageType.OkCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_OkCancel

        } else if (msgType == EMessageType.YesNo) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNo

        } else if (msgType == EMessageType.YesNoCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNoCancel

        } else if (msgType == EMessageType.YesNoYesAllNoAll) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNoYesAllNoAll

        } else if (msgType == EMessageType.YesNoYesAllNoAllCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_YesNoYesAllNoAllCancel

        } else if (msgType == EMessageType.CancelRetryContinue) {
            UEMessagePupopType = UE.EMessagePopupType.IN_CancelRetryContinue

        }
        else if (msgType == EMessageType.SaveContinueCancel) {
            UEMessagePupopType = UE.EMessagePopupType.IN_SaveContinueCancel
        }
       
        UE.MessagePopupSubsystem.Get().ShowTips(UEMessagePupopType, message, title ?? "Message", warp, widget)
    }
}


