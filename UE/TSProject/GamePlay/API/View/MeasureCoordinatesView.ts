///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 12:08
///

import * as UE from "ue";
import {MeasureView} from "./MeasureView";
import {$ref, $unref} from "puerts";
import {NewArray, Vector2D} from "ue";
import {CoodinateConverterViewModel} from "../ViewModel/CoodinateConverterViewModel";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";
import { GetViewModel } from "../../../System/API/ApiViewModelSystem";
import {MessagePopup} from "../../../System/Core/MessagePupop/MessagePupop";
import {MessageTips} from "../../../System/Core/MessagePupop/MessageList";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";
import {NotificationStyle} from "../../../System/API/Handle/MessageNotificationHandle";

export class MeasureCoordinatesView extends MeasureView {

    //@ts
    UMGArray_Coord: UE.TArray<UE.WidgetComponent>
    CoodinateConventer: CoodinateConverterViewModel

    Constructor(){
        super.Constructor()
        this.UMGArray_Coord = NewArray(UE.WidgetComponent)
        this.CoodinateConventer = GetViewModel(CoodinateConverterViewModel)
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
                NotifiStyle.RegisterFrameStyle(MessageTips.API.MeasureCoordinates, 600, 3, false)
                // NotifiStyle.AddNotifiButton("确定", () => { NotifiItem.SetCompletionState(UE.EDisplayState.CS_Pending) }, "cc", ENotifiButtonState.None)
                NotifiItem = MessagePopup.ShowNotification(MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle)
                NotifiItem.SetCompletionState(UE.EDisplayState.CS_None)
                NotifiItem.ExpireAndFadeout()
                MessageCenter.Add(this, (CurrentCoordinate: any) => {
                    console.error(CurrentCoordinate.X + "...." + CurrentCoordinate.Y + "...." + CurrentCoordinate.Z)
                },NotificationLists.API.CURRENT_COORDINATE)
            }
        }
        let result = super.RefreshView(jsonData)
        return result
    }

    Measure(): string{
        return this.MeasurePoints()
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
        this.AddCoord(this.secondLocation)
    }

    DrawCable(StartParam,StartNameId,EndParam,EndName): void{
        super.DrawCable(StartParam,StartNameId,EndParam,EndName)
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
        this.DrawPoint(CurLocation)
        // this.AddCoord(CurLocation)
    }

    EndDrawEvent(): void{
        super.EndDrawEvent()
        let msg ={
            classDef : "MeasureCoordinates",
            funcDef : "Stop",
            data : undefined,
            callback : this.JsonData.callback,
            pageID : this.JsonData.pageID,
        }
        msg.data = {"result":"stop"}
        let message = PackCallBacKMessage(msg,  msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    RemoveUI(): void{
        if (this.UMGArray_Coord.Num() > 0){
            for (let index = 0; index < this.UMGArray_Coord.Num(); index++){
                this.UMGArray_Coord.Get(index).K2_DestroyComponent(this.UMGArray_Coord.Get(index))
            }
            this.UMGArray_Coord.Empty()
        }
    }

    RefreshScale(Distance,Scale): void{
        if (this.UMGArray_Coord.Num() > 0){
            for (let index = 0; index < this.UMGArray_Coord.Num(); index++){
                if (Distance < this.MaxDistance){
                    this.UMGArray_Coord.Get(index).SetVisibility(true,false)
                    this.UMGArray_Coord.Get(index).GetWidget().SetColorAndOpacity(new UE.LinearColor(1,1,1,Scale))
                }
                else {
                    this.UMGArray_Coord.Get(index).SetVisibility(false,false)
                }
            }
        }
    }

    AddCoord(CurLocation): void{
        let UW = UE.Class.Load("/OpenZIAPI/API/Analysis/Measure/Measure/UMG_Coord.UMG_Coord_C")
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0)
        type UMG_Coord_C  = UE.OpenZIAPI.API.Analysis.Measure.Measure.UMG_Coord.UMG_Coord_C
        let name = "UMG_" + this.UMGArray_Coord.Num()
        let curUMG = new UE.WidgetComponent(this, name)
        curUMG.WidgetClass = UW
        curUMG.SetDrawAtDesiredSize(true)
        curUMG.SetPivot(new Vector2D(0, 0))
        curUMG.SetWidgetSpace(UE.EWidgetSpace.Screen)
        curUMG.K2_AttachToComponent(this.SenceRoot, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
        curUMG.RegisterComponent()
        let hit = $ref(new UE.HitResult)
        curUMG.K2_SetWorldLocation(CurLocation, false, hit, false)
        this.UMGArray_Coord.Add(curUMG)
        let CurCoord = $ref(new UE.GeographicCoordinates)
        this.CoordinateConverterMgr.EngineToGeographic(this.CoodinateConventer.GetGISType(),CurLocation,CurCoord)
        let  Coord = $unref(CurCoord)
        let Longitude = Coord.Longitude
        let Latitude = Coord.Latitude
        let Altitude = Coord.Altitude
        let CurrenWidget = curUMG.GetWidget() as UMG_Coord_C
        CurrenWidget.Longitude.SetText("Longitude：" + Longitude)
        CurrenWidget.Latitude.SetText("Latitude：" + Latitude)
        CurrenWidget.Height.SetText("Altitude：" + Altitude)
        let CurString2 = "Longitude_Latitude：" + "[" + Longitude + "," + Latitude + "]"
        UE.KismetSystemLibrary.PrintString(this,CurString2,false)
        let CurString = "Longitude_Latitude_Altitude：" + "[" + Longitude + "," + Latitude + "," + Altitude + "]"
        UE.KismetSystemLibrary.PrintString(this,CurString,false)
        let CurrentCoordinate = {X: Longitude, Y:Latitude, Z:Altitude}
        MessageCenter.Execute(NotificationLists.API.CURRENT_COORDINATE,CurrentCoordinate)
    }
}
