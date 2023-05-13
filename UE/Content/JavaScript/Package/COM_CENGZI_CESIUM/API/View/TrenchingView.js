"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrenchingView = void 0;
const puerts_1 = require("puerts");
const UE = require("ue");
const MessagePupop_1 = require("./../../../../System/Core/MessagePupop/MessagePupop");
const MessageList_1 = require("../../../../System/Core/MessagePupop/MessageList");
const MessageNotificationHandle_1 = require("../../../../System/API/Handle/MessageNotificationHandle");
const MessageManager_1 = require("../../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../../System/Core/NotificationCore/NotificationLists");
class TrenchingView extends UE.TrenchingActor {
    bStart;
    DrawTool;
    DynamicMeshMgr;
    id;
    ButtomMaterial;
    SideMaterial;
    Constructor() { }
    ReceiveBeginPlay() {
        UE.AxesToolSubsystem.Get().RegisterNoSelectClass(UE.DrawPolygonWireFrame.StaticClass());
        this.bStart = false;
        this.DrawTool = null;
        let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
        UE.GameplayStatics.GetAllActorsOfClass(this, UE.DynamicMeshMgrActor.StaticClass(), OutActorList);
        if ((0, puerts_1.$unref)(OutActorList).Num() > 0) {
            this.DynamicMeshMgr = (0, puerts_1.$unref)(OutActorList).Get(0);
        }
        else {
            this.DynamicMeshMgr = this.GetWorld().SpawnActor(UE.DynamicMeshMgrActor.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        }
    }
    ReceiveEndPlay(EndPlayReason) {
        let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
        UE.GameplayStatics.GetAllActorsOfClass(this, UE.Cesium3DTileset.StaticClass(), OutActorList);
        if ((0, puerts_1.$unref)(OutActorList).Num() > 0) {
            for (let i = 0; i < (0, puerts_1.$unref)(OutActorList).Num(); i++) {
                let Tileset = (0, puerts_1.$unref)(OutActorList).Get(i);
                if (Tileset) {
                    Tileset.PolygonWire.Polygons.RemoveAt(Tileset.PolygonWire.Polygons.FindIndex(this.DrawTool));
                    Tileset.PolygonWire.Refresh();
                }
            }
        }
        if (this.DrawTool) {
            this.DrawTool.K2_DestroyActor();
            this.DrawTool = null;
        }
        if (this.ToolMesh) {
            this.DynamicMeshMgr.WhenTrenchingActorDelete(this.ToolMesh);
            if (this.id && this.DynamicMeshMgr.TrenchingActorIds.Num() > 0) {
                this.DynamicMeshMgr.TrenchingActorIds.RemoveAt(this.DynamicMeshMgr.TrenchingActorIds.FindIndex(this.id));
            }
            if (this.DynamicMeshMgr.TrenchingActorIds.Num() == 0) {
                this.DynamicMeshMgr.K2_DestroyActor();
            }
        }
    }
    ReceiveTick(DeltaSeconds) {
        this.ListenKeyAction();
    }
    RefreshView(jsonData) {
        this.id = jsonData.data.id;
        this.PolygonHeight = jsonData.data.depth;
        this.ButtomMaterial = UE.MaterialInterface.Load(jsonData.data.ButtomMaterial);
        this.SideMaterial = UE.MaterialInterface.Load(jsonData.data.SideMaterial);
        this.DrawTool = this.GetWorld().SpawnActor(UE.DrawPolygonWireFrame.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        if (jsonData.bUpdate) {
            this.bStart = false;
            let UEVectors = UE.NewArray(UE.Vector);
            let TsVectors = jsonData.data.Vectors;
            TsVectors.forEach(item => {
                let requireSceneNodeUtil = require("../../../../System/Project/Scene/SceneNodeUtil");
                let Vectors = requireSceneNodeUtil.TransformHelper.StrToVector(item);
                UEVectors.Add(Vectors);
            });
            this.DrawTool.SetDrawPoints(UEVectors);
            this.DrawTool.FindHitActorsByDrawPoints();
            this.UpdateTrenching(UEVectors);
        }
        else {
            this.bStart = true;
            this.DrawTool.StartDrawRange();
            let NotifiItem;
            let NotifiStyle = new MessageNotificationHandle_1.NotificationStyle();
            NotifiStyle.RegisterFrameStyle(MessageList_1.MessageTips.API.Trenching, 500, 3, false);
            NotifiItem = MessagePupop_1.MessagePopup.ShowNotification(MessageList_1.MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle);
            NotifiItem.SetCompletionState(UE.EDisplayState.CS_None);
            NotifiItem.ExpireAndFadeout();
        }
        return "success";
    }
    MakeKey(keyName) {
        let Key = new UE.Key();
        Key.KeyName = keyName;
        return Key;
    }
    ListenKeyAction() {
        if (this.bStart == false)
            return;
        let CurPlayerController = UE.GameplayStatics.GetPlayerController(this, 0);
        let LeftMouse = this.MakeKey("LeftMouseButton");
        let RightMouse = this.MakeKey("RightMouseButton");
        let Touch1 = this.MakeKey("Touch1");
        let IsMouse1 = CurPlayerController.WasInputKeyJustPressed(LeftMouse);
        let IsTouch1 = CurPlayerController.WasInputKeyJustPressed(Touch1);
        let IsRightMouse = CurPlayerController.WasInputKeyJustPressed(RightMouse);
        if (IsMouse1 || IsTouch1) {
            this.DrawTool.DrawPolygonWire();
        }
        if (IsRightMouse) {
            this.EndDrawing();
        }
    }
    EndDrawing() {
        if (this.DrawTool?.GetBAllowDrawRange()) {
            this.DrawTool.EndDrawRange();
            this.StartTrenching();
            this.bStart = false;
        }
    }
    StartTrenching() {
        let Vectors = this.PointsToLocal(this.DrawTool.GetDrawPoints());
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.UPDATE_TRENCH_DATA, this.id, Vectors);
        this.UpdateTrenching(Vectors);
    }
    UpdateTrenching(Vectors) {
        if (this.DynamicMeshMgr == null) {
            let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
            UE.GameplayStatics.GetAllActorsOfClass(this, UE.DynamicMeshMgrActor.StaticClass(), OutActorList);
            if ((0, puerts_1.$unref)(OutActorList).Num() > 0) {
                this.DynamicMeshMgr = (0, puerts_1.$unref)(OutActorList).Get(0);
            }
        }
        let ProcessType = this.DynamicMeshMgr.MakeSureBeTrenchingSMC(this.DrawTool.GetHitActors());
        if (ProcessType == 0) {
            return;
        }
        else if (ProcessType == 1) {
            let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
            UE.GameplayStatics.GetAllActorsOfClass(this, UE.Cesium3DTileset.StaticClass(), OutActorList);
            if ((0, puerts_1.$unref)(OutActorList).Num() > 0) {
                for (let i = 0; i < (0, puerts_1.$unref)(OutActorList).Num(); i++) {
                    let Tileset = (0, puerts_1.$unref)(OutActorList).Get(i);
                    let PolygonWire = UE.NewObject(UE.CesiumPolygonWire.StaticClass(), this, "PolygonWire");
                    UE.OpenZIFrameworkLibrary.AddOwnedComponent(Tileset, PolygonWire);
                    if (Tileset) {
                        Tileset.PolygonWire.Polygons.Add(this.DrawTool);
                        Tileset.PolygonWire.Refresh();
                    }
                }
            }
            this.DrawMeshForSection(Vectors, this.ButtomMaterial, this.SideMaterial);
        }
        else {
            let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
            UE.GameplayStatics.GetAllActorsOfClass(this, UE.Cesium3DTileset.StaticClass(), OutActorList);
            if ((0, puerts_1.$unref)(OutActorList).Num() > 0) {
                for (let i = 0; i < (0, puerts_1.$unref)(OutActorList).Num(); i++) {
                    let Tileset = (0, puerts_1.$unref)(OutActorList).Get(i);
                    if (Tileset) {
                        Tileset.PolygonWire.Polygons.Add(this.DrawTool);
                        Tileset.PolygonWire.Refresh();
                    }
                }
            }
            this.DrawMeshForBoolean(Vectors);
            this.PMC_DMC();
            this.DynamicMeshMgr.TrenchingMeshBoolean(this.GetToolMesh());
            this.DynamicMeshMgr.TrenchingActorIds.Add(this.id);
            this.DrawMeshForSection(Vectors, this.ButtomMaterial, this.SideMaterial);
        }
    }
}
exports.TrenchingView = TrenchingView;
//# sourceMappingURL=TrenchingView.js.map