///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 16:20
///

import * as UE from "ue";
import {MeasureView} from "./MeasureView";
import {$ref, $unref} from "puerts";
import {NewArray, Vector2D} from "ue";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";
import {MessagePopup} from "../../../System/Core/MessagePupop/MessagePupop";
import {MessageTips} from "../../../System/Core/MessagePupop/MessageList";
import {NotificationStyle} from "../../../System/API/Handle/MessageNotificationHandle";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";

export class MeasureDistanceView extends MeasureView {

    //@ts
    UMG_Array_Distance: UE.TArray<UE.WidgetComponent>

    Constructor(){
        super.Constructor()
        this.UMG_Array_Distance = NewArray(UE.WidgetComponent)
    }

    ReceiveBeginPlay(): void {
        super.ReceiveBeginPlay()
    }

    ReceiveTick(DeltaSeconds: number): void {
        super.ReceiveTick(DeltaSeconds)
    }

    ReceiveEndPlay(EndPlayReason): void{
        super.ReceiveEndPlay(EndPlayReason)
    }

    Init(): void {
        super.Init()
    }

    ClearAllData(): void{
        super.ClearAllData()
    }

    RefreshView(jsonData): string {
        if (!jsonData.data.isAuto){
            if (this.IsAuto){
                let NotifiItem
                let NotifiStyle = new NotificationStyle()
                NotifiStyle.RegisterFrameStyle(MessageTips.API.MeasureDistance, 600, 3, false)
                // NotifiStyle.AddNotifiButton("确定", () => { NotifiItem.SetCompletionState(UE.EDisplayState.CS_Pending) }, "cc", ENotifiButtonState.None)
                NotifiItem = MessagePopup.ShowNotification(MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle)
                NotifiItem.SetCompletionState(UE.EDisplayState.CS_None)
                NotifiItem.ExpireAndFadeout()
            }
        }
        let result = super.RefreshView(jsonData)
        return result
    }

    Measure(): string{
        return this.MeasurePointsAndCable()
    }

    MeasurePoints(){
        return super.MeasurePoints()
    }

    MeasurePointsAndCable(){
        return super.MeasurePointsAndCable()
    }

    GetUnderHit(): UE.HitResult{
        return super.GetUnderHit()
    }

    ListenKeyAction(): void{
        super.ListenKeyAction()
    }

    MakeKey(KeyName): UE.Key{
        return super.MakeKey(KeyName)
    }

    DrawDown(): void{
        super.DrawDown()
    }

    DrawUp(): void{
        super.DrawUp()
    }

    Uping(): void{
        super.Uping()
    }

    DrawPoint(CurLocation): void{
        super.DrawPoint(CurLocation)
    }

    DrawCable(StartParam,StartNameId,EndParam,EndName): void{
        super.DrawCable(StartParam,StartNameId,EndParam,EndName)
        this.AddDistance(this.firstLocation,this.secondLocation)
    }

    GetPoi(index): any{
        return super.GetPoi(index)
    }

    EndDraw(): void{
        super.EndDraw()
    }

    SetScaleTargetArmLength(TargetArmLength): void{
        super.SetScaleTargetArmLength(TargetArmLength)
    }

    DrawDownEvent(CurLocation): void{
        this.DrawDownLine(CurLocation)
    }

    EndDrawEvent(): void{
        super.EndDrawEvent()
        let msg ={
            classDef : "MeasureDistance",
            funcDef : "Stop",
            data : undefined,
            callback : this.JsonData.callback,
            pageID : this.JsonData.pageID,
        }
        msg.data = {"result":"stop"}
        let message = PackCallBacKMessage(msg,  msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    DrawDownLine(CurLocation): void{
        this.DrawPoint(CurLocation)
        if (this.PointLocation.Num() > 1){
            this.DrawCable(this.curPoint,1,this.lastPoint,this.lastPointName)
        }
    }

    AddDistance(Onepoint,Twopoint){
        let UW = UE.Class.Load("/OpenZIAPI/API/Analysis/Measure/Measure/UMG_Distance.UMG_Distance_C")
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0)
        type UMG_Distance_C  = UE.OpenZIAPI.API.Analysis.Measure.Measure.UMG_Distance.UMG_Distance_C
        let name = "UMG_" + this.UMG_Array_Distance.Num()
        let curUMG = new UE.WidgetComponent(this, name)
        curUMG.WidgetClass = UW
        curUMG.SetDrawAtDesiredSize(true)
        curUMG.SetPivot(new Vector2D(0, 0))
        curUMG.SetWidgetSpace(UE.EWidgetSpace.Screen)
        curUMG.K2_AttachToComponent(this.SenceRoot, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
        curUMG.RegisterComponent()
        let VerTemp = new UE.Vector((Onepoint.X + Twopoint.X)/2,(Onepoint.Y + Twopoint.Y)/2,(Onepoint.Z + Twopoint.Z)/2)
        let hit = $ref(new UE.HitResult)
        curUMG.K2_SetWorldLocation(VerTemp, false, hit, false)
        this.UMG_Array_Distance.Add(curUMG)
        let CurrenWidget = curUMG.GetWidget() as UMG_Distance_C
        let distance = 0
        if (this.MeasureType === UE.EMeasureType.Horizontal){
            distance = UE.KismetMathLibrary.Vector_Distance(new UE.Vector(Onepoint.X,Onepoint.Y,0),new UE.Vector(Twopoint.X,Twopoint.Y,0))
            let temp = UE.KismetTextLibrary.Conv_FloatToText(distance / 100,UE.ERoundingMode.HalfFromZero,false,true,1,423,0,2)
            let st = "水平距离：" + temp + "米"
            CurrenWidget.DisText.SetText(st)
        }
        else if (this.MeasureType === UE.EMeasureType.Height){
            distance = Math.abs(Onepoint.Z - Twopoint.Z)
            let temp = UE.KismetTextLibrary.Conv_FloatToText(distance / 100,UE.ERoundingMode.HalfFromZero,false,true,1,423,0,2)
            let st = "高度：" + temp + "米"
            CurrenWidget.DisText.SetText(st)
        }
        else if (this.MeasureType === UE.EMeasureType.SraightLine){
            distance = UE.KismetMathLibrary.Vector_Distance(Onepoint,Twopoint)
            let temp = UE.KismetTextLibrary.Conv_FloatToText(distance / 100,UE.ERoundingMode.HalfFromZero,false,true,1,423,0,2)
            let st = "直线距离：" + temp + "米"
            CurrenWidget.DisText.SetText(st)
        }
    }

    RemoveUI(): void{
        if (this.UMG_Array_Distance.Num() > 0){
            for (let index = 0; index < this.UMG_Array_Distance.Num(); index++){
                this.UMG_Array_Distance.Get(index).K2_DestroyComponent(this.UMG_Array_Distance.Get(index))
            }
            this.UMG_Array_Distance.Empty()
        }
    }

    RefreshScale(Distance,Scale): void{
        if (this.UMG_Array_Distance.Num() > 0){
            for (let index = 0; index < this.UMG_Array_Distance.Num(); index++){
                if (Distance < this.MaxDistance){
                    this.UMG_Array_Distance.Get(index).SetVisibility(true,false)
                    this.UMG_Array_Distance.Get(index).GetWidget().SetColorAndOpacity(new UE.LinearColor(1,1,1,Scale))
                }
                else {
                    this.UMG_Array_Distance.Get(index).SetVisibility(false,false)
                }
            }
        }
    }

}
