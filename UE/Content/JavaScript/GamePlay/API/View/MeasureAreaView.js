"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 18:20
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureAreaView = void 0;
const UE = require("ue");
const MeasureView_1 = require("./MeasureView");
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const ITriangulateHandle_1 = require("../IHandle/ITriangulateHandle");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const MessagePupop_1 = require("../../../System/Core/MessagePupop/MessagePupop");
const MessageList_1 = require("../../../System/Core/MessagePupop/MessageList");
const MessageNotificationHandle_1 = require("../../../System/API/Handle/MessageNotificationHandle");
class MeasureAreaView extends MeasureView_1.MeasureView {
    //@ts
    UMGArray_Area;
    // UMGArray_Area: UE.OpenZIAPI.API.Analysis.Measure.Measure.UMG_Area.UMG_Area_C
    Constructor() {
        super.Constructor();
        this.UMGArray_Area = undefined;
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
                NotifiStyle.RegisterFrameStyle(MessageList_1.MessageTips.API.MeasureArea, 600, 3, false);
                // NotifiStyle.AddNotifiButton("确定", () => { NotifiItem.SetCompletionState(UE.EDisplayState.CS_Pending) }, "cc", ENotifiButtonState.None)
                NotifiItem = MessagePupop_1.MessagePopup.ShowNotification(MessageList_1.MessageTips.OPERATION_MESSAGE.NOTIFICATION, NotifiStyle);
                NotifiItem.SetCompletionState(UE.EDisplayState.CS_None);
                NotifiItem.ExpireAndFadeout();
            }
        }
        let result = super.RefreshView(jsonData);
        return result;
    }
    Measure() {
        let result = this.MeasurePointsAndCable();
        if (result === "success") {
            this.index++;
            this.DrawCable(this.curPoint, 1, this.startPoint, this.startPointName);
            this.DrawPlane();
        }
        else {
            return result;
        }
        return result;
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
        this.DrawDownPlane(CurLocation);
    }
    EndDrawEvent() {
        super.EndDrawEvent();
        let result = "Stop";
        result = result + ": " + this.DrawPlane();
        let msg = {
            classDef: "MeasureArea",
            funcDef: "Stop",
            data: undefined,
            callback: this.JsonData.callback,
            pageID: this.JsonData.pageID,
        };
        msg.data = { "result": result };
        let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
    }
    DrawDownPlane(CurLocation) {
        this.DrawPoint(CurLocation);
        if (this.PointLocation.Num() > 1) {
            if (this.PointLocation.Num() === 2) {
                let temp1 = this.GetPoi(2);
                let StartParam = temp1[0];
                let StartName = temp1[1];
                let temp2 = this.GetPoi(1);
                let EndParam = temp2[0];
                let EndName = temp2[1];
                this.DrawCable(StartParam, 1, EndParam, EndName);
            }
            else {
                if (this.PointLocation.Num() === 3) {
                    let temp1 = this.GetPoi(2);
                    let StartParam = temp1[0];
                    let StartName = temp1[1];
                    let temp2 = this.GetPoi(1);
                    let EndParam = temp2[0];
                    let EndName = temp2[1];
                    this.DrawCable(StartParam, 1, EndParam, EndName);
                    let temp3 = this.GetPoi(0);
                    let EndParam2 = temp3[0];
                    let EndName2 = temp3[1];
                    this.DrawCable(EndParam, 0, EndParam2, EndName2);
                }
                else {
                    let temp1 = this.GetPoi(2);
                    let StartParam = temp1[0];
                    let StartName = temp1[1];
                    let temp2 = this.GetPoi(1);
                    let EndParam = temp2[0];
                    let EndName = temp2[1];
                    let ChildrenTemp = (0, puerts_1.$ref)((0, ue_1.NewArray)(UE.SceneComponent));
                    StartParam.GetChildrenComponents(false, ChildrenTemp);
                    let Children = (0, puerts_1.$unref)(ChildrenTemp);
                    let CableC = Children.Get(0);
                    let isvalid = UE.KismetSystemLibrary.IsValid(CableC);
                    if (isvalid) {
                        CableC.SetAttachEndToComponent(EndParam, EndName);
                    }
                    let temp3 = this.GetPoi(0);
                    let EndParam2 = temp3[0];
                    let EndName2 = temp3[1];
                    this.DrawCable(EndParam, 0, EndParam2, EndName2);
                }
            }
        }
    }
    AddArea(Area) {
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0);
        let UW = UE.Class.Load("/OpenZIAPI/API/Analysis/Measure/Measure/UMG_Area.UMG_Area_C");
        let name = "UMG_Area";
        let curUMG = new UE.WidgetComponent(this, name);
        curUMG.WidgetClass = UW;
        curUMG.SetDrawAtDesiredSize(true);
        curUMG.SetPivot(new ue_1.Vector2D(0, 0));
        curUMG.SetWidgetSpace(UE.EWidgetSpace.Screen);
        curUMG.K2_AttachToComponent(this.SenceRoot, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
        curUMG.RegisterComponent();
        this.UMGArray_Area = curUMG;
        let locSun = new UE.Vector(0, 0, 0);
        for (let index = 0; index < this.PointLocation.Num(); index++) {
            locSun = UE.KismetMathLibrary.Add_VectorVector(locSun, this.PointLocation.Get(index));
        }
        let CurlocSun = UE.KismetMathLibrary.Divide_VectorInt(locSun, this.PointLocation.Num());
        let hit = (0, puerts_1.$ref)(new UE.HitResult);
        curUMG.K2_SetWorldLocation(CurlocSun, false, hit, false);
        let temp = UE.KismetTextLibrary.Conv_FloatToText(Area, UE.ERoundingMode.HalfFromZero, false, true, 1, 423, 0, 2);
        let CurrenWidget = curUMG.GetWidget();
        let st = "面积：" + temp + "平方米";
        CurrenWidget.AreaText.SetText(st);
    }
    RemoveUI() {
        if (this.UMGArray_Area !== undefined) {
            this.UMGArray_Area.K2_DestroyComponent(this.UMGArray_Area);
            this.UMGArray_Area = undefined;
        }
    }
    RefreshScale(Distance, Scale) {
        if (this.UMGArray_Area !== undefined) {
            if (Distance < this.MaxDistance) {
                this.UMGArray_Area.SetVisibility(true, false);
                this.UMGArray_Area.GetWidget().SetColorAndOpacity(new UE.LinearColor(1, 1, 1, Scale));
            }
            else {
                this.UMGArray_Area.SetVisibility(false, false);
            }
        }
    }
    DrawPlane() {
        if (this.PointLocation.Num() >= 3) {
            let ProceduralMesh = new UE.ProceduralMeshComponent(this, "ProceduralMesh");
            ProceduralMesh.RegisterComponent();
            ProceduralMesh.K2_AttachToComponent(this.SenceRoot, "ProceduralMesh", UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
            ProceduralMesh.SetCollisionEnabled(UE.ECollisionEnabled.NoCollision);
            let R = (0, ITriangulateHandle_1.TriangulationOfPolygon)(this.PointLocation);
            let Tri = R[0];
            let Normal = R[1];
            let Size = (0, ITriangulateHandle_1.PolygonTriangulationAreaSum)(this.PointLocation, Tri, 100);
            let OutRectCenter = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
            let OutRectRotation = (0, puerts_1.$ref)(new UE.Rotator(0, 0, 0));
            let OutSideLengthX = (0, puerts_1.$ref)(11);
            let OutSideLengthY = (0, puerts_1.$ref)(11);
            UE.KismetMathLibrary.MinAreaRectangle(this, this.PointLocation, new UE.Vector(0, 0, 1), OutRectCenter, OutRectRotation, OutSideLengthX, OutSideLengthY);
            let temp = UE.KismetMathLibrary.FMax((0, puerts_1.$unref)(OutSideLengthX), (0, puerts_1.$unref)(OutSideLengthY));
            let CurUVs = (0, ITriangulateHandle_1.VertexConversionUVs)(this.PointLocation, Normal, temp, 0, new UE.Vector2D(0, 0));
            let Normals = (0, ue_1.NewArray)(UE.Vector);
            let Tangents = UE.NewArray(UE.ProcMeshTangent);
            UE.KismetProceduralMeshLibrary.CalculateTangentsForMesh(this.PointLocation, Tri, CurUVs, (0, puerts_1.$ref)(Normals), (0, puerts_1.$ref)(Tangents));
            ProceduralMesh.CreateMeshSection_LinearColor(0, this.PointLocation, Tri, Normals, CurUVs, undefined, undefined, undefined, undefined, Tangents, true);
            ProceduralMesh.SetMaterial(0, this.MaterialInstCable);
            this.PlaneSceneComponent = ProceduralMesh;
            this.AddArea(Size);
            return "success";
        }
        else {
            let result = "Currently, less than 3 points are drawn and cannot form a surface !!!";
            console.error("Currently, less than 3 points are drawn and cannot form a surface !!!");
            return result;
        }
    }
}
exports.MeasureAreaView = MeasureAreaView;
//# sourceMappingURL=MeasureAreaView.js.map