///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/11 18:43
///

import * as UE from 'ue'
import {$ref, $unref} from "puerts";
import {BaseView} from "../../../System/API/View/BaseView";
import {PackBroadcastMessage} from "../../../System/API/IHandle/IAPIMessageHandle";
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer";

export class ScreenCoordinatesView extends BaseView {

    //@C++
    CoordinateConverterMgr: UE.CoordinateConverterMgr

    //@ts
    data: any
    SceneCoordinates: UE.Vector
    lastScreenLoction: UE.Vector2D
    tickID: number
    CurjsonData: any
    id: string
    tickTime: number
    isOnce: boolean
    isSend: boolean

    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.SceneCoordinates = new UE.Vector(0, 0, 0)
        this.lastScreenLoction = new UE.Vector2D(0, 0)
        this.tickID = 0
        this.isSend = false
    }

    ReceiveBeginPlay(): void {
        this.Init()
    }

    ReceiveTick(DeltaSeconds: number): void {
        this.tickTime += DeltaSeconds
        if (!UE.OpenZIFrameworkLibrary.GetActorHiddenInGame(this)) {
            if (this.isOnce === true) {
                if (this.isSend === false) {
                    if (this.tickTime >= this.data.tickTime) {
                        this.RefreshCoordinates()
                        this.isSend = true
                        this.tickTime = 0
                    }
                }
            } else {
                if (this.tickTime >= this.data.tickTime) {
                    this.RefreshCoordinates()
                    this.isSend = true
                    this.tickTime = 0
                }
            }
        }
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason) {

    }

    Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
    }

    RefreshView(jsonData): string {
        this.ClearAllData()
        this.data = jsonData.data
        this.CurjsonData = jsonData
        this.tickTime = 0
        this.isOnce = this.data.isOnce

        let GeographicPos = new UE.GeographicCoordinates(this.data.coordinates.X, this.data.coordinates.Y, this.data.coordinates.Z)
        let CurEngineLocation = $ref(new UE.Vector(0, 0, 0))
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
        this.SceneCoordinates = $unref(CurEngineLocation)
        if ($unref(CurEngineLocation) === null)
            return "coordinates is error"

        if (this.SceneCoordinates.Z === 0) {
            const startp = new UE.Vector(this.SceneCoordinates.X, this.SceneCoordinates.Y, 1000000)
            const endp = new UE.Vector(this.SceneCoordinates.X, this.SceneCoordinates.Y, -1000000)
            let hit = $ref(new UE.HitResult)
            let bsucess = UE.KismetSystemLibrary.LineTraceSingle(this, startp, endp, UE.ETraceTypeQuery.Visibility, true, undefined, UE.EDrawDebugTrace.None, hit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5)
            if (bsucess) {
                this.SceneCoordinates = new UE.Vector($unref(hit).ImpactPoint.X, $unref(hit).ImpactPoint.Y, $unref(hit).ImpactPoint.Z)
            }
        }
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(this.SceneCoordinates, false, FHitResult, false)

        this.id = this.data.id
        return "success"
    }

    RefreshCoordinates() {
        let CurScreenPosition_Ref = $ref(new UE.Vector2D)
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0)
        let Curlocation = this.K2_GetActorLocation()
        let IsToScreenSucess = UE.GameplayStatics.ProjectWorldToScreen(
            Controller,
            Curlocation,
            CurScreenPosition_Ref,
            false
        )
        let CurScreenPosition = $unref(CurScreenPosition_Ref)
        if (CurScreenPosition !== this.lastScreenLoction && (CurScreenPosition.X - this.lastScreenLoction.X > 0.01 ||
            CurScreenPosition.X - this.lastScreenLoction.X < -0.01 ||
            CurScreenPosition.Y - this.lastScreenLoction.Y > 0.01 ||
            CurScreenPosition.Y - this.lastScreenLoction.Y < -0.01)) {
            this.lastScreenLoction = CurScreenPosition
            let msg = {
                classDef: "ScreenCoordinates",
                funcDef: "ScreenCoordinates",
                callback: this.CurjsonData.callback,
                pageID: this.CurjsonData.pageID,
            }
            let message = PackBroadcastMessage(msg, {
                id: this.id,
                ScreenPosition: {X: this.lastScreenLoction.X, Y: this.lastScreenLoction.Y}
            })
            WebSocketServer.GetInstance().OnSendWebMessage(message)
        }
    }

    ClearAllData(): void {
        if (this.tickID !== 0) {
            this.tickID = 0
        }
        this.SceneCoordinates = new UE.Vector(0, 0, 0)
        this.lastScreenLoction = new UE.Vector2D(0, 0)
    }
}
