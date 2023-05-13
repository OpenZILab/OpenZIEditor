"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlattenView = void 0;
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime. 2022/10/17 11.05
///
const puerts_1 = require("puerts");
const UE = require("ue");
const MessagePupop_1 = require("../../../../System/Core/MessagePupop/MessagePupop");
const MessageList_1 = require("../../../../System/Core/MessagePupop/MessageList");
const MessageNotificationHandle_1 = require("../../../../System/API/Handle/MessageNotificationHandle");
const MessageManager_1 = require("../../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../../System/Core/NotificationCore/NotificationLists");
class FlattenView extends UE.FlattenActor {
    DrawTool;
    id;
    Constructor() { }
    ReceiveBeginPlay() {
        UE.AxesToolSubsystem.Get().RegisterNoSelectClass(UE.DrawPolygonWireFrame.StaticClass());
    }
    ReceiveEndPlay(EndPlayReason) {
        let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
        UE.GameplayStatics.GetAllActorsOfClass(this, UE.Cesium3DTileset.StaticClass(), OutActorList);
        if ((0, puerts_1.$unref)(OutActorList).Num() > 0) {
            for (let i = 0; i < (0, puerts_1.$unref)(OutActorList).Num(); i++) {
                let Tileset = (0, puerts_1.$unref)(OutActorList).Get(i);
                if (Tileset) {
                    let Tags = Tileset.Tags;
                    let bCesiumTerrain = false;
                    for (let i = 0; i < Tags.Num(); i++) {
                        if (Tags.Get(i) == "CesiumTerrain") {
                            bCesiumTerrain = true;
                        }
                    }
                    if (bCesiumTerrain == false) {
                        Tileset.PolygonWire.Polygons.RemoveAt(Tileset.PolygonWire.Polygons.FindIndex(this.DrawTool));
                        Tileset.PolygonWire.Refresh();
                    }
                }
            }
        }
        this.DrawTool.K2_DestroyActor();
        this.DrawTool = null;
    }
    ReceiveTick(DeltaSeconds) {
        this.ListenKeyAction();
    }
    RefreshView(jsonData) {
        this.id = jsonData.data.id;
        this.DrawTool = this.GetWorld().SpawnActor(UE.DrawPolygonWireFrame.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        if (jsonData.bUpdate) {
            let UEVectors = UE.NewArray(UE.Vector);
            let TsVectors = jsonData.data.Vectors;
            TsVectors.forEach(item => {
                let requireSceneNodeUtil = require("../../../../System/Project/Scene/SceneNodeUtil");
                let Vectors = requireSceneNodeUtil.TransformHelper.StrToVector(item);
                UEVectors.Add(Vectors);
            });
            this.DrawTool.SetDrawPoints(UEVectors);
            this.StartFlattnMesh();
        }
        else {
            this.DrawTool.StartDrawRange();
            let NotifiItem;
            let NotifiStyle = new MessageNotificationHandle_1.NotificationStyle();
            NotifiStyle.RegisterFrameStyle(MessageList_1.MessageTips.API.Flatten, 500, 3, false);
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
            this.StartFlattnMesh();
        }
    }
    StartFlattnMesh() {
        let Vectors = this.DrawTool.GetDrawPoints();
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.UPDATE_FLATTEN_DATA, this.id, Vectors);
        this.UpdateFlattnMesh();
    }
    UpdateFlattnMesh() {
        let vectors = this.DrawTool.GetDrawPoints();
        this.FindActorInRange(vectors);
        this.SpawnProceduralMesh();
        this.FlattenMesh(vectors);
        let OutActorList = (0, puerts_1.$ref)(UE.NewArray(UE.Actor));
        UE.GameplayStatics.GetAllActorsOfClass(this, UE.Cesium3DTileset.StaticClass(), OutActorList);
        console.error(`${(0, puerts_1.$unref)(OutActorList).Num()}`);
        if ((0, puerts_1.$unref)(OutActorList).Num() > 0) {
            for (let i = 0; i < (0, puerts_1.$unref)(OutActorList).Num(); i++) {
                let Tileset = (0, puerts_1.$unref)(OutActorList).Get(i);
                if (Tileset) {
                    let Tags = Tileset.Tags;
                    let bCesiumTerrain = false;
                    for (let i = 0; i < Tags.Num(); i++) {
                        if (Tags.Get(i) == "CesiumTerrain") {
                            bCesiumTerrain = true;
                        }
                    }
                    if (bCesiumTerrain == false) {
                        Tileset.PolygonWire.Polygons.Add(this.DrawTool);
                        Tileset.PolygonWire.Refresh();
                    }
                }
            }
        }
    }
}
exports.FlattenView = FlattenView;
//# sourceMappingURL=FlattenView.js.map