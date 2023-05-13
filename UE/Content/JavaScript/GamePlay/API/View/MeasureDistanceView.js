"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 16:20
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureDistanceView = void 0;
const UE = require("ue");
const MeasureView_1 = require("./MeasureView");
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const MessagePupop_1 = require("../../../System/Core/MessagePupop/MessagePupop");
const MessageList_1 = require("../../../System/Core/MessagePupop/MessageList");
const MessageNotificationHandle_1 = require("../../../System/API/Handle/MessageNotificationHandle");
class MeasureDistanceView extends MeasureView_1.MeasureView {
    //@ts
    UMG_Array_Distance;
    Constructor() {
        super.Constructor();
        this.UMG_Array_Distance = (0, ue_1.NewArray)(UE.WidgetComponent);
    }
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay();
    }
    ReceiveTick(DeltaSeconds) {
        super.ReceiveTick(DeltaSeconds);
    }
    ReceiveEndPlay(EndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
    }
    Init() {
        super.Init();
    }
    ClearAllData() {
        super.ClearAllData();
    }
    RefreshView(jsonData) {
        if (!jsonData.data.isAuto) {
            if (this.IsAuto) {
                let NotifiItem;
                let NotifiStyle = new MessageNotificationHandle_1.NotificationStyle();
                NotifiStyle.RegisterFrameStyle(MessageList_1.MessageTips.API.MeasureDistance, 600, 3, false);
                // NotifiStyle.AddNotifiButton("确定", () => { NotifiItem.SetCompletionState(UE.EDisplayState.CS_Pending) }, "cc", ENotifiButtonState.None)
                NotifiItem = MessagePupop_1.MessagePopup.ShowNotification(MessageList_1.MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle);
                NotifiItem.SetCompletionState(UE.EDisplayState.CS_None);
                NotifiItem.ExpireAndFadeout();
            }
        }
        let result = super.RefreshView(jsonData);
        return result;
    }
    Measure() {
        return this.MeasurePointsAndCable();
    }
    MeasurePoints() {
        return super.MeasurePoints();
    }
    MeasurePointsAndCable() {
        return super.MeasurePointsAndCable();
    }
    GetUnderHit() {
        return super.GetUnderHit();
    }
    ListenKeyAction() {
        super.ListenKeyAction();
    }
    MakeKey(KeyName) {
        return super.MakeKey(KeyName);
    }
    DrawDown() {
        super.DrawDown();
    }
    DrawUp() {
        super.DrawUp();
    }
    Uping() {
        super.Uping();
    }
    DrawPoint(CurLocation) {
        super.DrawPoint(CurLocation);
    }
    DrawCable(StartParam, StartNameId, EndParam, EndName) {
        super.DrawCable(StartParam, StartNameId, EndParam, EndName);
        this.AddDistance(this.firstLocation, this.secondLocation);
    }
    GetPoi(index) {
        return super.GetPoi(index);
    }
    EndDraw() {
        super.EndDraw();
    }
    SetScaleTargetArmLength(TargetArmLength) {
        super.SetScaleTargetArmLength(TargetArmLength);
    }
    DrawDownEvent(CurLocation) {
        this.DrawDownLine(CurLocation);
    }
    EndDrawEvent() {
        super.EndDrawEvent();
        let msg = {
            classDef: "MeasureDistance",
            funcDef: "Stop",
            data: undefined,
            callback: this.JsonData.callback,
            pageID: this.JsonData.pageID,
        };
        msg.data = { "result": "stop" };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    DrawDownLine(CurLocation) {
        this.DrawPoint(CurLocation);
        if (this.PointLocation.Num() > 1) {
            this.DrawCable(this.curPoint, 1, this.lastPoint, this.lastPointName);
        }
    }
    AddDistance(Onepoint, Twopoint) {
        let UW = UE.Class.Load("/OpenZIAPI/API/Analysis/Measure/Measure/UMG_Distance.UMG_Distance_C");
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0);
        let name = "UMG_" + this.UMG_Array_Distance.Num();
        let curUMG = new UE.WidgetComponent(this, name);
        curUMG.WidgetClass = UW;
        curUMG.SetDrawAtDesiredSize(true);
        curUMG.SetPivot(new ue_1.Vector2D(0, 0));
        curUMG.SetWidgetSpace(UE.EWidgetSpace.Screen);
        curUMG.K2_AttachToComponent(this.SenceRoot, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
        curUMG.RegisterComponent();
        let VerTemp = new UE.Vector((Onepoint.X + Twopoint.X) / 2, (Onepoint.Y + Twopoint.Y) / 2, (Onepoint.Z + Twopoint.Z) / 2);
        let hit = (0, puerts_1.$ref)(new UE.HitResult);
        curUMG.K2_SetWorldLocation(VerTemp, false, hit, false);
        this.UMG_Array_Distance.Add(curUMG);
        let CurrenWidget = curUMG.GetWidget();
        let distance = 0;
        if (this.MeasureType === UE.EMeasureType.Horizontal) {
            distance = UE.KismetMathLibrary.Vector_Distance(new UE.Vector(Onepoint.X, Onepoint.Y, 0), new UE.Vector(Twopoint.X, Twopoint.Y, 0));
            let temp = UE.KismetTextLibrary.Conv_FloatToText(distance / 100, UE.ERoundingMode.HalfFromZero, false, true, 1, 423, 0, 2);
            let st = "水平距离：" + temp + "米";
            CurrenWidget.DisText.SetText(st);
        }
        else if (this.MeasureType === UE.EMeasureType.Height) {
            distance = Math.abs(Onepoint.Z - Twopoint.Z);
            let temp = UE.KismetTextLibrary.Conv_FloatToText(distance / 100, UE.ERoundingMode.HalfFromZero, false, true, 1, 423, 0, 2);
            let st = "高度：" + temp + "米";
            CurrenWidget.DisText.SetText(st);
        }
        else if (this.MeasureType === UE.EMeasureType.SraightLine) {
            distance = UE.KismetMathLibrary.Vector_Distance(Onepoint, Twopoint);
            let temp = UE.KismetTextLibrary.Conv_FloatToText(distance / 100, UE.ERoundingMode.HalfFromZero, false, true, 1, 423, 0, 2);
            let st = "直线距离：" + temp + "米";
            CurrenWidget.DisText.SetText(st);
        }
    }
    RemoveUI() {
        if (this.UMG_Array_Distance.Num() > 0) {
            for (let index = 0; index < this.UMG_Array_Distance.Num(); index++) {
                this.UMG_Array_Distance.Get(index).K2_DestroyComponent(this.UMG_Array_Distance.Get(index));
            }
            this.UMG_Array_Distance.Empty();
        }
    }
    RefreshScale(Distance, Scale) {
        if (this.UMG_Array_Distance.Num() > 0) {
            for (let index = 0; index < this.UMG_Array_Distance.Num(); index++) {
                if (Distance < this.MaxDistance) {
                    this.UMG_Array_Distance.Get(index).SetVisibility(true, false);
                    this.UMG_Array_Distance.Get(index).GetWidget().SetColorAndOpacity(new UE.LinearColor(1, 1, 1, Scale));
                }
                else {
                    this.UMG_Array_Distance.Get(index).SetVisibility(false, false);
                }
            }
        }
    }
}
exports.MeasureDistanceView = MeasureDistanceView;
//# sourceMappingURL=MeasureDistanceView.js.map