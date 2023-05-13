///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime. 2022/10/17 11.05
///
import { $ref, $unref } from "puerts"
import * as UE from "ue"
import { Cesium3DTilesetView } from "./Cesium3DTilesetView"
import { MessagePopup } from "../../../../System/Core/MessagePupop/MessagePupop"
import { MessageTips } from "../../../../System/Core/MessagePupop/MessageList"
import {NotificationStyle} from "../../../../System/API/Handle/MessageNotificationHandle";
import { MessageCenter } from "../../../../System/Core/NotificationCore/MessageManager"
import { NotificationLists } from "../../../../System/Core/NotificationCore/NotificationLists"

export class FlattenView extends UE.FlattenActor {

    DrawTool: UE.DrawPolygonWireFrame
    id: string

    Constructor() { }
    ReceiveBeginPlay(): void {
        UE.AxesToolSubsystem.Get().RegisterNoSelectClass(UE.DrawPolygonWireFrame.StaticClass())
    }
    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason): void {
        let OutActorList = $ref(UE.NewArray(UE.Actor))
        UE.GameplayStatics.GetAllActorsOfClass(this, UE.Cesium3DTileset.StaticClass(), OutActorList)
        if ($unref(OutActorList).Num() > 0) {
            for(let i = 0;i<$unref(OutActorList).Num();i++){
                let Tileset = $unref(OutActorList).Get(i) as Cesium3DTilesetView
                if(Tileset){
                    let Tags = Tileset.Tags
                    let bCesiumTerrain = false
                    for(let i = 0;i<Tags.Num();i++){
                        if(Tags.Get(i) == "CesiumTerrain"){
                            bCesiumTerrain = true
                        }
                    }
                    if(bCesiumTerrain == false){
                        Tileset.PolygonWire.Polygons.RemoveAt(Tileset.PolygonWire.Polygons.FindIndex(this.DrawTool))
                        Tileset.PolygonWire.Refresh()
                    }
                }
            }

        }
        this.DrawTool.K2_DestroyActor()
        this.DrawTool = null
    }
    ReceiveTick(DeltaSeconds: number): void {
        this.ListenKeyAction()
    }

    RefreshView(jsonData) {
        this.id = jsonData.data.id
        this.DrawTool = this.GetWorld().SpawnActor(UE.DrawPolygonWireFrame.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.DrawPolygonWireFrame
        if(jsonData.bUpdate){
            let UEVectors = UE.NewArray(UE.Vector)
            let TsVectors = jsonData.data.Vectors
            TsVectors.forEach(item => {
                let requireSceneNodeUtil = require("../../../../System/Project/Scene/SceneNodeUtil")
                let Vectors = requireSceneNodeUtil.TransformHelper.StrToVector(item)
                UEVectors.Add(Vectors)
            })
            this.DrawTool.SetDrawPoints(UEVectors)
            this.StartFlattnMesh()
        }else{
            this.DrawTool.StartDrawRange()
            let NotifiItem
            let NotifiStyle = new NotificationStyle()
            NotifiStyle.RegisterFrameStyle(MessageTips.API.Flatten, 500, 3, false)
            NotifiItem = MessagePopup.ShowNotification(MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle)
            NotifiItem.SetCompletionState(UE.EDisplayState.CS_None)
            NotifiItem.ExpireAndFadeout()
        }
        return "success"
    }

    private MakeKey(keyName): any {
        let Key = new UE.Key()
        Key.KeyName = keyName
        return Key
    }


    ListenKeyAction() {
        let CurPlayerController = UE.GameplayStatics.GetPlayerController(this, 0)
        let LeftMouse = this.MakeKey("LeftMouseButton")
        let RightMouse = this.MakeKey("RightMouseButton")
        let Touch1 = this.MakeKey("Touch1")
        let IsMouse1 = CurPlayerController.WasInputKeyJustPressed(LeftMouse)
        let IsTouch1 = CurPlayerController.WasInputKeyJustPressed(Touch1)
        let IsRightMouse = CurPlayerController.WasInputKeyJustPressed(RightMouse)
        if (IsMouse1 || IsTouch1 ) {
            this.DrawTool.DrawPolygonWire()
        }
        if (IsRightMouse) {
            this.EndDrawing()
        }
    }


    EndDrawing(){
        if (this.DrawTool?.GetBAllowDrawRange()) {
            this.DrawTool.EndDrawRange()
            this.StartFlattnMesh()
        }
    }

    StartFlattnMesh() {
        let Vectors = this.DrawTool.GetDrawPoints()
        MessageCenter.Execute(NotificationLists.API.UPDATE_FLATTEN_DATA,this.id,Vectors)
        this.UpdateFlattnMesh()
    }
    UpdateFlattnMesh() {
        let vectors = this.DrawTool.GetDrawPoints()
        this.FindActorInRange(vectors)
        this.SpawnProceduralMesh()
        this.FlattenMesh(vectors)
        let OutActorList = $ref(UE.NewArray(UE.Actor))
        UE.GameplayStatics.GetAllActorsOfClass(this, UE.Cesium3DTileset.StaticClass(), OutActorList)
        console.error(`${$unref(OutActorList).Num()}`)
        if ($unref(OutActorList).Num() > 0) {
            for(let i = 0;i<$unref(OutActorList).Num();i++){
                let Tileset = $unref(OutActorList).Get(i) as Cesium3DTilesetView
                if(Tileset){
                    let Tags = Tileset.Tags
                    let bCesiumTerrain = false
                    for(let i = 0;i<Tags.Num();i++){
                        if(Tags.Get(i) == "CesiumTerrain"){
                            bCesiumTerrain = true
                        }
                    }
                    if(bCesiumTerrain == false){
                        Tileset.PolygonWire.Polygons.Add(this.DrawTool)
                        Tileset.PolygonWire.Refresh()
                    }
                }
            }
        }
    }
}