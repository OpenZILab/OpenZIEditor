///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/07
///

import { StartMessagePupop } from "../../API/IHandle/IMessagePupopHandle";
import { EMessageType } from "../../API/Handle/MessagePupopHandle";
import { NotificationStyle } from "../../API/Handle/MessageNotificationHandle";
import * as UE from "ue"

export class MessagePopup {

   private static RegisterWidget(widgetPath:string){
        let widgetClass = UE.Class.Load(widgetPath);
        let Widget = UE.WidgetBlueprintLibrary.Create(UE.OpenZIFrameworkLibrary.GetCurrentWorld(), widgetClass, null);
        return  Widget
    }

    static ShowMessage_Ok(Message: string, fCallbackOK?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackOK(fCallbackOK)
        MessagePupop.BindCallbackFuncions()

        MessagePupop.OpenMessagePupop(EMessageType.Ok, Message, title, 500, widget)
    }
    static ShowMessage_YesNo(Message: string, fCallbackYes?: Function, fCallbackNo?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackYes(fCallbackYes)
        MessagePupop.SetCallBackNo(fCallbackNo)
        MessagePupop.BindCallbackFuncions()
        MessagePupop.OpenMessagePupop(EMessageType.YesNo, Message, title, 500, widget)
    }
    static ShowMessage_OkCancel(Message: string, fCallbackOK?: Function, fCallbackCancel?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackOK(fCallbackOK)
        MessagePupop.SetCallBackCancel(fCallbackCancel)
        MessagePupop.BindCallbackFuncions()
        MessagePupop.OpenMessagePupop(EMessageType.OkCancel, Message, title, 500, widget)
    }
    static ShowMessage_YesNoCancel(Message: string, fCallbackYes?: Function, fCallbackNo?: Function, fCallbackCancel?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackYes(fCallbackYes)
        MessagePupop.SetCallBackNo(fCallbackNo)
        MessagePupop.SetCallBackCancel(fCallbackCancel)
        MessagePupop.BindCallbackFuncions()
        MessagePupop.OpenMessagePupop(EMessageType.YesNoCancel, Message, title, 500, widget)
    }
    static ShowMessage_CancelRetryContinue(Message: string, fCallbackContinue?: Function, fCallbackRetry?: Function, fCallbackCancel?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackContinue(fCallbackContinue)
        MessagePupop.SetCallBackRetry(fCallbackRetry)
        MessagePupop.SetCallBackCancel(fCallbackCancel)
        MessagePupop.BindCallbackFuncions()
        MessagePupop.OpenMessagePupop(EMessageType.CancelRetryContinue, Message, title, 500, widget)
    }
    static ShowMessage_YesNoYesAllNoAll(Message: string, fCallbackYes?: Function, fCallbackNo?: Function, fCallbackYesAll?: Function, fCallbackNoAll?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackYes(fCallbackYes)
        MessagePupop.SetCallBackNo(fCallbackNo)
        MessagePupop.SetCallBackYesAll(fCallbackYesAll)
        MessagePupop.SetCallBackNoAll(fCallbackNoAll)
        MessagePupop.BindCallbackFuncions()
        MessagePupop.OpenMessagePupop(EMessageType.YesNoYesAllNoAll, Message, title, 500, widget)
    }
    static ShowMessage_YesNoYesAllNoAllCancel(Message: string, fCallbackYes?: Function, fCallbackNo?: Function, fCallbackYesAll?: Function, fCallbackNoAll?: Function, fCallbackCancel?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackYes(fCallbackYes)
        MessagePupop.SetCallBackNo(fCallbackNo)
        MessagePupop.SetCallBackNo(fCallbackNo)
        MessagePupop.SetCallBackYesAll(fCallbackYesAll)
        MessagePupop.SetCallBackNoAll(fCallbackNoAll)
        MessagePupop.SetCallBackCancel(fCallbackCancel)
        MessagePupop.BindCallbackFuncions()
        MessagePupop.OpenMessagePupop(EMessageType.YesNoYesAllNoAllCancel, Message, title, 500, widget)
    }
    static ShowMessage_SaveContinueCancel(Message: string, fCallbackSave?: Function, fCallbackContinueWithoutSaving?: Function, fCallbackCancel?: Function, title?: string, widget?: any) {
        let MessagePupop = StartMessagePupop()
        MessagePupop.SetCallBackSave(fCallbackSave)
        MessagePupop.SetCallBackContinueWithoutSaving(fCallbackContinueWithoutSaving)
        MessagePupop.SetCallBackCancel(fCallbackCancel)
        MessagePupop.BindCallbackFuncions()
        MessagePupop.OpenMessagePupop(EMessageType.SaveContinueCancel, Message, title, 500, widget)
    }

    static ShowNotification(Message: string, Style?: NotificationStyle) {
        let CurStyle = Style ?? new NotificationStyle()
        if(UE.MessagePopupSubsystem.Get()){
            let NotifiItem = UE.MessagePopupSubsystem.Get().ShowNotifiTips(Message,
                CurStyle.NotifiFrameStyle.SubText,
                CurStyle.NotifiFrameStyle.DurTime,
                CurStyle.NotifiFrameStyle.FrameWidth,
                CurStyle.NotifiFrameStyle.bAutoRelease,
                CurStyle.NotifiButtons,
                CurStyle.CheckBox,
                CurStyle.CustomWidget)
            NotifiItem.SetHyperlink(CurStyle.HyperLink)
            return NotifiItem
        }else{
            return null
        }
    }

    static ShowProgressTips(InAmountOfWork: number, Message: string, bCircle: boolean, bShowCancelButton: boolean) {
        let ProgressTips = UE.MessagePopupSubsystem.Get().ShowProgressTips(InAmountOfWork, Message, false, bShowCancelButton) as UE.ProgressTips
        return ProgressTips
    }

    static ShowCircleTips(InAmountOfWork: number, Message: string) {
        let ProgressTips = UE.MessagePopupSubsystem.Get().ShowProgressTips(InAmountOfWork, Message, true, false) as UE.ProgressTips
        return ProgressTips
    }
}