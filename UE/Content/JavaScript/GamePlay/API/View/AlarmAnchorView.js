"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 14:43
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmAnchorView = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
class AlarmAnchorView extends BaseView_1.BaseView {
    //@C++
    Root;
    SM_Circle;
    SceneCoordinates;
    CircleScale;
    CoordinateConverterMgr;
    //@ts
    data;
    CesiumPawn;
    IsAutoScale;
    IsAddMsg;
    FocusDistance;
    lastScreenLoction;
    CurjsonData;
    IsSendScreemCoordinates;
    tickTime;
    curTickTime;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric("Root", UE.SceneComponent.StaticClass());
        this.SM_Circle = this.CreateDefaultSubobjectGeneric("SM_Circle", UE.StaticMeshComponent.StaticClass());
        this.RootComponent = this.Root;
        this.SM_Circle.SetupAttachment(this.Root, "SM_Circle");
        let hit = (0, puerts_1.$ref)(new UE.HitResult);
        let tempR = new UE.Rotator(0, 0, 0);
        let tempV = new UE.Vector(0, 0, 0);
        let tempS = new UE.Vector(1, 1, 1);
        this.SM_Circle.K2_SetRelativeTransform(new UE.Transform(tempR, tempV, tempS), false, hit, false);
        this.SM_Circle.SetCastShadow(false);
        this.SceneCoordinates = new UE.Vector(0, 0, 0);
        this.CircleScale = new UE.Vector(20, 20, 20);
        this.CesiumPawn = undefined;
        this.IsAutoScale = true;
        this.IsAddMsg = false;
        this.lastScreenLoction = new UE.Vector2D(0, 0);
        this.FocusDistance = 0;
        this.CurjsonData = undefined;
        this.tickTime = 0;
        this.curTickTime = 0;
    }
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay();
        this.Init();
        this.SM_Circle.OnClicked.Add((TouchedComponent, ButtonPressed) => {
            this.AlarmClicked();
        });
    }
    AlarmClicked() {
        console.log("OnMouseClicked");
        let InputData = { location: this.K2_GetActorLocation(), distance: this.FocusDistance };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.ONPOINTBE_CLICKED, InputData);
        UE.AxesToolSubsystem.Get().SetSelectObjectsFormLogic(this, false);
        let Msg = (0, IAPIMessageHandle_1.PackBroadcastMessage)({ classDef: "AlarmAnchor", funcDef: "OnMouseClicked" }, { id: this.data.id });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(Msg);
    }
    Focus(msg) {
        let data = msg.data;
        this.FocusDistance = data.focusDistance;
        let InputData = { location: this.K2_GetActorLocation(), distance: data.focusDistance };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.ONPOINTBE_CLICKED, InputData);
        return "success";
    }
    ReceiveTick(DeltaSeconds) {
        if (this.IsAutoScale) {
            let CurPawn = UE.GameplayStatics.GetPlayerPawn(this, 0);
            let CurPawnName = CurPawn.GetClass().GetName();
            if (CurPawnName.indexOf("ObserverPawnView") >= 0) {
                if (!this.IsAddMsg) {
                    MessageManager_1.MessageCenter.Add(this, this.SetScaleTargetArmLength, NotificationLists_1.NotificationLists.API.CAMERA_HEIGHT);
                    this.IsAddMsg = true;
                }
            }
        }
        if (!UE.OpenZIFrameworkLibrary.GetActorHiddenInGame(this)) {
            if (this.IsSendScreemCoordinates) {
                this.curTickTime += DeltaSeconds;
                if (this.curTickTime >= this.tickTime) {
                    this.RefreshCoordinates();
                    this.curTickTime = 0;
                }
            }
        }
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
                classDef: "AlarmAnchor",
                funcDef: "ScreenCoordinates",
                callback: this.CurjsonData.callback,
                pageID: this.CurjsonData.pageID,
            };
            let message = (0, IAPIMessageHandle_1.PackBroadcastMessage)(msg, {
                id: this.data.id,
                ScreenPosition: { X: this.lastScreenLoction.X, Y: this.lastScreenLoction.Y }
            });
            WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        }
    }
    ScreenCoordinates(msg) {
        this.IsSendScreemCoordinates = msg.data.sendScreemCoordinates;
        if (this.IsSendScreemCoordinates) {
            this.tickTime = msg.data.tickTime;
            this.curTickTime = 0;
        }
        return "success";
    }
    Init() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
    }
    ReceiveEndPlay(EndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
        if (this.IsAutoScale) {
            if (this.IsAddMsg) {
                MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.API.CAMERA_HEIGHT);
                this.IsAddMsg = false;
            }
        }
    }
    RefreshView(jsonData) {
        this.CurjsonData = jsonData;
        this.data = jsonData.data;
        this.IsSendScreemCoordinates = this.data.sendScreemCoordinates;
        this.tickTime = this.data.tickTime;
        this.curTickTime = 0;
        this.FocusDistance = this.data.focusDistance;
        let GeographicPos = new UE.GeographicCoordinates(this.data.coordinates.X, this.data.coordinates.Y, this.data.coordinates.Z);
        let CurEngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation);
        let EngineLocation = (0, puerts_1.$unref)(CurEngineLocation);
        if ((0, puerts_1.$unref)(CurEngineLocation) === null)
            return "coordinates is error";
        if (this.data.checkFloor) {
            const startp = new UE.Vector(0, 0, 1000000);
            const endp = new UE.Vector(0, 0, -1000000);
            let hit = (0, puerts_1.$ref)(new UE.HitResult);
            let bsucess = UE.KismetSystemLibrary.LineTraceSingle(this, startp, endp, UE.ETraceTypeQuery.Visibility, true, undefined, UE.EDrawDebugTrace.None, hit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5);
            if (bsucess) {
                this.SceneCoordinates = new UE.Vector((0, puerts_1.$unref)(hit).ImpactPoint.X, (0, puerts_1.$unref)(hit).ImpactPoint.Y, (0, puerts_1.$unref)(hit).ImpactPoint.Z + 1);
            }
            else {
                this.SceneCoordinates = new UE.Vector(EngineLocation.X, EngineLocation.Y, EngineLocation.Z + 1);
            }
        }
        else {
            this.SceneCoordinates = new UE.Vector(EngineLocation.X, EngineLocation.Y, EngineLocation.Z + 1);
        }
        let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.K2_SetActorLocation(this.SceneCoordinates, false, FHitResult, false);
        this.IsAutoScale = this.data.isAutoScale;
        if (!this.IsAutoScale) {
            if (this.IsAddMsg) {
                MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.API.CAMERA_HEIGHT);
                this.IsAddMsg = false;
            }
            let CircleTransform = this.SM_Circle.K2_GetComponentToWorld();
            let TempCircleTransform = new UE.Transform(CircleTransform.Rotator(), CircleTransform.GetLocation(), new UE.Vector(this.data.scale, this.data.scale, this.data.scale));
            this.SM_Circle.K2_SetWorldTransform(TempCircleTransform, false, FHitResult, false);
        }
        if (this.data.customStyle) {
            let curmesh = UE.StaticMesh.Load(this.data.meshStyle);
            if (curmesh) {
                this.SM_Circle.SetStaticMesh(curmesh);
            }
            else {
                return "Current Mesh Load Failure";
            }
        }
        else {
            this.SM_Circle.SetStaticMesh(UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/waring_0.waring_0"));
        }
        return "success";
    }
    SetScaleTargetArmLength(TargetArmLength) {
        let ScaleCell = TargetArmLength * 0.001;
        let Scale = UE.KismetMathLibrary.Multiply_VectorFloat(new UE.Vector(this.data.scale, this.data.scale, this.data.scale), ScaleCell);
        let CircleTransform = this.SM_Circle.K2_GetComponentToWorld();
        let TempCircleTransform = new UE.Transform(CircleTransform.Rotator(), CircleTransform.GetLocation(), Scale);
        let hit1 = (0, puerts_1.$ref)(new UE.HitResult);
        this.SM_Circle.K2_SetWorldTransform(TempCircleTransform, false, hit1, false);
    }
}
exports.AlarmAnchorView = AlarmAnchorView;
//# sourceMappingURL=AlarmAnchorView.js.map