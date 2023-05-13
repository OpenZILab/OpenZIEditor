"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 12:08
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureCoordinatesView = void 0;
const UE = require("ue");
const MeasureView_1 = require("./MeasureView");
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const CoodinateConverterViewModel_1 = require("../ViewModel/CoodinateConverterViewModel");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const ApiViewModelSystem_1 = require("../../../System/API/ApiViewModelSystem");
const MessagePupop_1 = require("../../../System/Core/MessagePupop/MessagePupop");
const MessageList_1 = require("../../../System/Core/MessagePupop/MessageList");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
const MessageNotificationHandle_1 = require("../../../System/API/Handle/MessageNotificationHandle");
class MeasureCoordinatesView extends MeasureView_1.MeasureView {
    //@ts
    UMGArray_Coord;
    CoodinateConventer;
    Constructor() {
        super.Constructor();
        this.UMGArray_Coord = (0, ue_1.NewArray)(UE.WidgetComponent);
        this.CoodinateConventer = (0, ApiViewModelSystem_1.GetViewModel)(CoodinateConverterViewModel_1.CoodinateConverterViewModel);
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
                NotifiStyle.RegisterFrameStyle(MessageList_1.MessageTips.API.MeasureCoordinates, 600, 3, false);
                // NotifiStyle.AddNotifiButton("确定", () => { NotifiItem.SetCompletionState(UE.EDisplayState.CS_Pending) }, "cc", ENotifiButtonState.None)
                NotifiItem = MessagePupop_1.MessagePopup.ShowNotification(MessageList_1.MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle);
                NotifiItem.SetCompletionState(UE.EDisplayState.CS_None);
                NotifiItem.ExpireAndFadeout();
                MessageManager_1.MessageCenter.Add(this, (CurrentCoordinate) => {
                    console.error(CurrentCoordinate.X + "...." + CurrentCoordinate.Y + "...." + CurrentCoordinate.Z);
                }, NotificationLists_1.NotificationLists.API.CURRENT_COORDINATE);
            }
        }
        let result = super.RefreshView(jsonData);
        return result;
    }
    Measure() {
        return this.MeasurePoints();
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
        this.AddCoord(this.secondLocation);
    }
    DrawCable(StartParam, StartNameId, EndParam, EndName) {
        super.DrawCable(StartParam, StartNameId, EndParam, EndName);
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
        this.DrawPoint(CurLocation);
        // this.AddCoord(CurLocation)
    }
    EndDrawEvent() {
        super.EndDrawEvent();
        let msg = {
            classDef: "MeasureCoordinates",
            funcDef: "Stop",
            data: undefined,
            callback: this.JsonData.callback,
            pageID: this.JsonData.pageID,
        };
        msg.data = { "result": "stop" };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    RemoveUI() {
        if (this.UMGArray_Coord.Num() > 0) {
            for (let index = 0; index < this.UMGArray_Coord.Num(); index++) {
                this.UMGArray_Coord.Get(index).K2_DestroyComponent(this.UMGArray_Coord.Get(index));
            }
            this.UMGArray_Coord.Empty();
        }
    }
    RefreshScale(Distance, Scale) {
        if (this.UMGArray_Coord.Num() > 0) {
            for (let index = 0; index < this.UMGArray_Coord.Num(); index++) {
                if (Distance < this.MaxDistance) {
                    this.UMGArray_Coord.Get(index).SetVisibility(true, false);
                    this.UMGArray_Coord.Get(index).GetWidget().SetColorAndOpacity(new UE.LinearColor(1, 1, 1, Scale));
                }
                else {
                    this.UMGArray_Coord.Get(index).SetVisibility(false, false);
                }
            }
        }
    }
    AddCoord(CurLocation) {
        let UW = UE.Class.Load("/OpenZIAPI/API/Analysis/Measure/Measure/UMG_Coord.UMG_Coord_C");
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0);
        let name = "UMG_" + this.UMGArray_Coord.Num();
        let curUMG = new UE.WidgetComponent(this, name);
        curUMG.WidgetClass = UW;
        curUMG.SetDrawAtDesiredSize(true);
        curUMG.SetPivot(new ue_1.Vector2D(0, 0));
        curUMG.SetWidgetSpace(UE.EWidgetSpace.Screen);
        curUMG.K2_AttachToComponent(this.SenceRoot, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
        curUMG.RegisterComponent();
        let hit = (0, puerts_1.$ref)(new UE.HitResult);
        curUMG.K2_SetWorldLocation(CurLocation, false, hit, false);
        this.UMGArray_Coord.Add(curUMG);
        let CurCoord = (0, puerts_1.$ref)(new UE.GeographicCoordinates);
        this.CoordinateConverterMgr.EngineToGeographic(this.CoodinateConventer.GetGISType(), CurLocation, CurCoord);
        let Coord = (0, puerts_1.$unref)(CurCoord);
        let Longitude = Coord.Longitude;
        let Latitude = Coord.Latitude;
        let Altitude = Coord.Altitude;
        let CurrenWidget = curUMG.GetWidget();
        CurrenWidget.Longitude.SetText("Longitude：" + Longitude);
        CurrenWidget.Latitude.SetText("Latitude：" + Latitude);
        CurrenWidget.Height.SetText("Altitude：" + Altitude);
        let CurString2 = "Longitude_Latitude：" + "[" + Longitude + "," + Latitude + "]";
        UE.KismetSystemLibrary.PrintString(this, CurString2, false);
        let CurString = "Longitude_Latitude_Altitude：" + "[" + Longitude + "," + Latitude + "," + Altitude + "]";
        UE.KismetSystemLibrary.PrintString(this, CurString, false);
        let CurrentCoordinate = { X: Longitude, Y: Latitude, Z: Altitude };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.CURRENT_COORDINATE, CurrentCoordinate);
    }
}
exports.MeasureCoordinatesView = MeasureCoordinatesView;
//# sourceMappingURL=MeasureCoordinatesView.js.map