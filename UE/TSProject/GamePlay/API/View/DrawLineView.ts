///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/28 16:43
///

import {DrawView} from "./DrawView";
import * as UE from "ue";
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";
import {MessagePopup} from "../../../System/Core/MessagePupop/MessagePupop";
import {MessageTips} from "../../../System/Core/MessagePupop/MessageList";
import {NotificationStyle} from "../../../System/API/Handle/MessageNotificationHandle";

export class DrawLineView extends DrawView {
    Constructor(){
        super.Constructor()
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
                NotifiStyle.RegisterFrameStyle(MessageTips.API.DrawLine, 600, 3, false)
                // NotifiStyle.AddNotifiButton("确定", () => { NotifiItem.SetCompletionState(UE.EDisplayState.CS_Pending) }, "cc", ENotifiButtonState.None)
                NotifiItem = MessagePopup.ShowNotification(MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle)
                NotifiItem.SetCompletionState(UE.EDisplayState.CS_None)
                NotifiItem.ExpireAndFadeout()
            }
        }
        let result = super.RefreshView(jsonData)
        return result
    }

    Draw(): string{
        return this.DrawPointsAndCable()
    }

    DrawPoints(){
        return super.DrawPoints()
    }

    DrawPointsAndCable(){
        return super.DrawPointsAndCable()
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

    DrawDownLine(CurLocation): void{
        this.DrawPoint(CurLocation)
        if (this.PointLocation.Num() > 1){
            let temp1 = this.GetPoi(2)
            let StartParam = temp1[0]
            let StartName = temp1[1]
            let temp2 = this.GetPoi(1)
            let EndParam = temp2[0]
            let EndName = temp2[1]
            this.DrawCable(StartParam,1,EndParam,EndName)
        }
    }

    EndDrawEvent(): void{
        super.EndDrawEvent()
        let msg ={
            classDef : "DrawLine",
            funcDef : "Stop",
            data : undefined,
            callback : this.JsonData.callback,
            pageID : this.JsonData.pageID,
        }
        msg.data = {"result":"stop"}
        let message = PackCallBacKMessage(msg,  msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }
}
