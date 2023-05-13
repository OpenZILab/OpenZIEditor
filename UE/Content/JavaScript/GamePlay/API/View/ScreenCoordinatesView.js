"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/11 18:43
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenCoordinatesView = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
class ScreenCoordinatesView extends BaseView_1.BaseView {
    //@C++
    CoordinateConverterMgr;
    //@ts
    data;
    SceneCoordinates;
    lastScreenLoction;
    tickID;
    CurjsonData;
    id;
    tickTime;
    isOnce;
    isSend;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.SceneCoordinates = new UE.Vector(0, 0, 0);
        this.lastScreenLoction = new UE.Vector2D(0, 0);
        this.tickID = 0;
        this.isSend = false;
    }
    ReceiveBeginPlay() {
        this.Init();
    }
    ReceiveTick(DeltaSeconds) {
        this.tickTime += DeltaSeconds;
        if (!UE.OpenZIFrameworkLibrary.GetActorHiddenInGame(this)) {
            if (this.isOnce === true) {
                if (this.isSend === false) {
                    if (this.tickTime >= this.data.tickTime) {
                        this.RefreshCoordinates();
                        this.isSend = true;
                        this.tickTime = 0;
                    }
                }
            }
            else {
                if (this.tickTime >= this.data.tickTime) {
                    this.RefreshCoordinates();
                    this.isSend = true;
                    this.tickTime = 0;
                }
            }
        }
    }
    ReceiveEndPlay(EndPlayReason) {
    }
    Init() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
    }
    RefreshView(jsonData) {
        this.ClearAllData();
        this.data = jsonData.data;
        this.CurjsonData = jsonData;
        this.tickTime = 0;
        this.isOnce = this.data.isOnce;
        let GeographicPos = new UE.GeographicCoordinates(this.data.coordinates.X, this.data.coordinates.Y, this.data.coordinates.Z);
        let CurEngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation);
        this.SceneCoordinates = (0, puerts_1.$unref)(CurEngineLocation);
        if ((0, puerts_1.$unref)(CurEngineLocation) === null)
            return "coordinates is error";
        if (this.SceneCoordinates.Z === 0) {
            const startp = new UE.Vector(this.SceneCoordinates.X, this.SceneCoordinates.Y, 1000000);
            const endp = new UE.Vector(this.SceneCoordinates.X, this.SceneCoordinates.Y, -1000000);
            let hit = (0, puerts_1.$ref)(new UE.HitResult);
            let bsucess = UE.KismetSystemLibrary.LineTraceSingle(this, startp, endp, UE.ETraceTypeQuery.Visibility, true, undefined, UE.EDrawDebugTrace.None, hit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5);
            if (bsucess) {
                this.SceneCoordinates = new UE.Vector((0, puerts_1.$unref)(hit).ImpactPoint.X, (0, puerts_1.$unref)(hit).ImpactPoint.Y, (0, puerts_1.$unref)(hit).ImpactPoint.Z);
            }
        }
        let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.K2_SetActorLocation(this.SceneCoordinates, false, FHitResult, false);
        this.id = this.data.id;
        return "success";
    }
    RefreshCoordinates() {
        let CurScreenPosition_Ref = (0, puerts_1.$ref)(new UE.Vector2D);
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0);
        let Curlocation = this.K2_GetActorLocation();
        let IsToScreenSucess = UE.GameplayStatics.ProjectWorldToScreen(Controller, Curlocation, CurScreenPosition_Ref, false);
        let CurScreenPosition = (0, puerts_1.$unref)(CurScreenPosition_Ref);
        if (CurScreenPosition !== this.lastScreenLoction && (CurScreenPosition.X - this.lastScreenLoction.X > 0.01 ||
            CurScreenPosition.X - this.lastScreenLoction.X < -0.01 ||
            CurScreenPosition.Y - this.lastScreenLoction.Y > 0.01 ||
            CurScreenPosition.Y - this.lastScreenLoction.Y < -0.01)) {
            this.lastScreenLoction = CurScreenPosition;
            let msg = {
                classDef: "ScreenCoordinates",
                funcDef: "ScreenCoordinates",
                callback: this.CurjsonData.callback,
                pageID: this.CurjsonData.pageID,
            };
            let message = (0, IAPIMessageHandle_1.PackBroadcastMessage)(msg, {
                id: this.id,
                ScreenPosition: { X: this.lastScreenLoction.X, Y: this.lastScreenLoction.Y }
            });
            WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        }
    }
    ClearAllData() {
        if (this.tickID !== 0) {
            this.tickID = 0;
        }
        this.SceneCoordinates = new UE.Vector(0, 0, 0);
        this.lastScreenLoction = new UE.Vector2D(0, 0);
    }
}
exports.ScreenCoordinatesView = ScreenCoordinatesView;
//# sourceMappingURL=ScreenCoordinatesView.js.map