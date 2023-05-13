"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/07
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagePopup = void 0;
const IMessagePupopHandle_1 = require("../../API/IHandle/IMessagePupopHandle");
const MessagePupopHandle_1 = require("../../API/Handle/MessagePupopHandle");
const MessageNotificationHandle_1 = require("../../API/Handle/MessageNotificationHandle");
const UE = require("ue");
class MessagePopup {
    static RegisterWidget(widgetPath) {
        let widgetClass = UE.Class.Load(widgetPath);
        let Widget = UE.WidgetBlueprintLibrary.Create(UE.OpenZIFrameworkLibrary.GetCurrentWorld(), widgetClass, null);
        return Widget;
    }
    static ShowMessage_Ok(Message, fCallbackOK, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackOK(fCallbackOK);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.Ok, Message, title, 500, widget);
    }
    static ShowMessage_YesNo(Message, fCallbackYes, fCallbackNo, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackYes(fCallbackYes);
        MessagePupop.SetCallBackNo(fCallbackNo);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.YesNo, Message, title, 500, widget);
    }
    static ShowMessage_OkCancel(Message, fCallbackOK, fCallbackCancel, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackOK(fCallbackOK);
        MessagePupop.SetCallBackCancel(fCallbackCancel);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.OkCancel, Message, title, 500, widget);
    }
    static ShowMessage_YesNoCancel(Message, fCallbackYes, fCallbackNo, fCallbackCancel, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackYes(fCallbackYes);
        MessagePupop.SetCallBackNo(fCallbackNo);
        MessagePupop.SetCallBackCancel(fCallbackCancel);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.YesNoCancel, Message, title, 500, widget);
    }
    static ShowMessage_CancelRetryContinue(Message, fCallbackContinue, fCallbackRetry, fCallbackCancel, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackContinue(fCallbackContinue);
        MessagePupop.SetCallBackRetry(fCallbackRetry);
        MessagePupop.SetCallBackCancel(fCallbackCancel);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.CancelRetryContinue, Message, title, 500, widget);
    }
    static ShowMessage_YesNoYesAllNoAll(Message, fCallbackYes, fCallbackNo, fCallbackYesAll, fCallbackNoAll, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackYes(fCallbackYes);
        MessagePupop.SetCallBackNo(fCallbackNo);
        MessagePupop.SetCallBackYesAll(fCallbackYesAll);
        MessagePupop.SetCallBackNoAll(fCallbackNoAll);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.YesNoYesAllNoAll, Message, title, 500, widget);
    }
    static ShowMessage_YesNoYesAllNoAllCancel(Message, fCallbackYes, fCallbackNo, fCallbackYesAll, fCallbackNoAll, fCallbackCancel, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackYes(fCallbackYes);
        MessagePupop.SetCallBackNo(fCallbackNo);
        MessagePupop.SetCallBackNo(fCallbackNo);
        MessagePupop.SetCallBackYesAll(fCallbackYesAll);
        MessagePupop.SetCallBackNoAll(fCallbackNoAll);
        MessagePupop.SetCallBackCancel(fCallbackCancel);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.YesNoYesAllNoAllCancel, Message, title, 500, widget);
    }
    static ShowMessage_SaveContinueCancel(Message, fCallbackSave, fCallbackContinueWithoutSaving, fCallbackCancel, title, widget) {
        let MessagePupop = (0, IMessagePupopHandle_1.StartMessagePupop)();
        MessagePupop.SetCallBackSave(fCallbackSave);
        MessagePupop.SetCallBackContinueWithoutSaving(fCallbackContinueWithoutSaving);
        MessagePupop.SetCallBackCancel(fCallbackCancel);
        MessagePupop.BindCallbackFuncions();
        MessagePupop.OpenMessagePupop(MessagePupopHandle_1.EMessageType.SaveContinueCancel, Message, title, 500, widget);
    }
    static ShowNotification(Message, Style) {
        let CurStyle = Style ?? new MessageNotificationHandle_1.NotificationStyle();
        if (UE.MessagePopupSubsystem.Get()) {
            let NotifiItem = UE.MessagePopupSubsystem.Get().ShowNotifiTips(Message, CurStyle.NotifiFrameStyle.SubText, CurStyle.NotifiFrameStyle.DurTime, CurStyle.NotifiFrameStyle.FrameWidth, CurStyle.NotifiFrameStyle.bAutoRelease, CurStyle.NotifiButtons, CurStyle.CheckBox, CurStyle.CustomWidget);
            NotifiItem.SetHyperlink(CurStyle.HyperLink);
            return NotifiItem;
        }
        else {
            return null;
        }
    }
    static ShowProgressTips(InAmountOfWork, Message, bCircle, bShowCancelButton) {
        let ProgressTips = UE.MessagePopupSubsystem.Get().ShowProgressTips(InAmountOfWork, Message, false, bShowCancelButton);
        return ProgressTips;
    }
    static ShowCircleTips(InAmountOfWork, Message) {
        let ProgressTips = UE.MessagePopupSubsystem.Get().ShowProgressTips(InAmountOfWork, Message, true, false);
        return ProgressTips;
    }
}
exports.MessagePopup = MessagePopup;
//# sourceMappingURL=MessagePupop.js.map