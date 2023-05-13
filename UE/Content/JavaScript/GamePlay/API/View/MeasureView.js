"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/08 11:23
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureView = void 0;
const UE = require("ue");
const ue_1 = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const ApiViewModelSystem_1 = require("../../../System/API/ApiViewModelSystem");
const CoodinateConverterViewModel_1 = require("../ViewModel/CoodinateConverterViewModel");
class MeasureView extends BaseView_1.BaseView {
    //@C++
    SenceRoot;
    MaterialInstPoint;
    MaterialInstCable;
    IsEnd;
    PointLocation;
    CoordinateConverterMgr;
    PointSceneComponent;
    CableSceneComponent;
    PlaneSceneComponent;
    //@ts
    data;
    MeasureType;
    MinDistance;
    MaxDistance;
    JsonData;
    IsAddMsg;
    coordinatesList;
    IsAuto;
    startPoint;
    startPointName;
    lastPoint;
    lastPointName;
    curPoint;
    curPointName;
    index;
    firstLocation;
    secondLocation;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.SenceRoot = this.CreateDefaultSubobjectGeneric("SenceRoot", UE.SceneComponent.StaticClass());
        this.RootComponent = this.SenceRoot;
        let Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/PureColorMaterial_3_Inst");
        this.MaterialInstPoint = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this, Material, "None", UE.EMIDCreationFlags.None);
        this.MaterialInstCable = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this, Material, "None", UE.EMIDCreationFlags.None);
        this.MaterialInstPoint.SetVectorParameterValue("BaseColor", new UE.LinearColor(1, 0.1, 0.1, 1));
        this.MaterialInstCable.SetVectorParameterValue("BaseColor", new UE.LinearColor(0.15, 1, 0.33, 0.4));
        this.IsEnd = false;
        this.PointLocation = (0, ue_1.NewArray)(UE.Vector);
        this.K2_GetRootComponent().Mobility = UE.EComponentMobility.Movable;
        this.JsonData = undefined;
        this.IsAddMsg = false;
        this.coordinatesList = [];
        this.IsAuto = false;
        this.startPoint = undefined;
        this.startPointName = "";
        this.lastPoint = undefined;
        this.lastPointName = "";
        this.curPoint = undefined;
        this.curPointName = "";
        this.index = 0;
        this.firstLocation = undefined;
        this.secondLocation = undefined;
        this.PointSceneComponent = (0, ue_1.NewArray)(UE.StaticMeshComponent);
        this.CableSceneComponent = (0, ue_1.NewArray)(UE.CableComponent);
        this.PlaneSceneComponent = undefined;
    }
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay();
        this.Init();
        let CurController = UE.GameplayStatics.GetPlayerController(this, 0);
        CurController.HitResultTraceDistance = 10000000000.0;
    }
    ReceiveTick(DeltaSeconds) {
        if (this.IsEnd === false) {
            this.ListenKeyAction();
        }
        let CurPawn = UE.GameplayStatics.GetPlayerPawn(this, 0);
        let CurPawnName = CurPawn.GetClass().GetName();
        if (CurPawnName.indexOf("ObserverPawnView") >= 0) {
            if (!this.IsAddMsg) {
                MessageManager_1.MessageCenter.Add(this, this.SetScaleTargetArmLength, NotificationLists_1.NotificationLists.API.CAMERA_HEIGHT);
                this.IsAddMsg = true;
            }
        }
        else {
            if (this.IsAddMsg) {
                MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.API.CAMERA_HEIGHT);
                this.IsAddMsg = false;
            }
        }
    }
    RefreshUI() {
    }
    ReceiveEndPlay(EndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
        // this.RemoveUI()
        if (this.IsAddMsg) {
            MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.API.CAMERA_HEIGHT);
            this.IsAddMsg = false;
        }
        if (this.IsEnd !== true) {
            this.IsEnd = true;
            this.EndDrawEvent();
        }
    }
    RemoveUI() {
    }
    Init() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
    }
    ClearAllData() {
        this.RemoveUI();
        this.IsEnd = false;
        this.PointLocation.Empty();
        this.IsAddMsg = false;
        this.coordinatesList = [];
        this.startPoint = undefined;
        this.startPointName = "";
        this.lastPoint = undefined;
        this.lastPointName = "";
        this.curPoint = undefined;
        this.curPointName = "";
        this.index = 0;
        this.firstLocation = undefined;
        this.secondLocation = undefined;
        if (this.PlaneSceneComponent) {
            this.PlaneSceneComponent.K2_DestroyComponent(this);
            this.PlaneSceneComponent = undefined;
        }
        for (let index = 0; index < this.CableSceneComponent.Num(); index++) {
            this.CableSceneComponent.Get(index).K2_DestroyComponent(this);
        }
        this.CableSceneComponent.Empty();
        for (let index = 0; index < this.PointSceneComponent.Num(); index++) {
            this.PointSceneComponent.Get(index).K2_DestroyComponent(this);
        }
        this.PointSceneComponent.Empty();
    }
    RefreshView(jsonData) {
        this.data = jsonData.data;
        this.JsonData = jsonData;
        if (!this.data.isAuto && this.IsAuto) {
            this.ClearAllData();
            this.IsEnd = false;
        }
        this.MeasureType = this.data.measureType;
        this.IsAuto = this.data.isAuto;
        this.MinDistance = Math.min(this.data.MinDistance, this.data.MaxDistance);
        this.MaxDistance = Math.max(this.data.MinDistance, this.data.MaxDistance);
        this.MaterialInstPoint.SetVectorParameterValue("BaseColor", new UE.LinearColor(this.data.pointColor.X, this.data.pointColor.Y, this.data.pointColor.Z, this.data.pointColor.W));
        this.MaterialInstCable.SetVectorParameterValue("BaseColor", new UE.LinearColor(this.data.lineColor.X, this.data.lineColor.Y, this.data.lineColor.Z, this.data.lineColor.W));
        if (this.IsAuto) {
            this.ClearAllData();
            this.IsEnd = true;
            if (this.data.coordinatesList.length == 0) {
                return "success";
            }
            return this.Measure();
        }
        return "success";
    }
    Measure() {
        return "";
    }
    MeasurePoints() {
        let CurVector = new UE.Vector(0, 0, 0);
        for (let i = 0; i < this.data.coordinatesList.length; i++) {
            if (this.data.coordinatesList[i] === "") {
                return "coordinatesList: index " + i + "is empty !";
            }
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[i].X, this.data.coordinatesList[i].Y, this.data.coordinatesList[i].Z);
            let CurEngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation);
            let EngineLocation = (0, puerts_1.$unref)(CurEngineLocation);
            this.PointLocation.Add(EngineLocation);
            CurVector = new UE.Vector(CurVector.X + EngineLocation.X, CurVector.Y + EngineLocation.Y, CurVector.Z + EngineLocation.Z);
        }
        CurVector = new UE.Vector(CurVector.X / this.data.coordinatesList.length, CurVector.Y / this.data.coordinatesList.length, CurVector.Z / this.data.coordinatesList.length);
        let originCoordinate = (0, puerts_1.$ref)(new UE.GeographicCoordinates(0, 0, 0));
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CurVector, originCoordinate);
        this.CoordinatesToRelative(this.data.coordinatesList, {
            X: (0, puerts_1.$unref)(originCoordinate).Longitude,
            Y: (0, puerts_1.$unref)(originCoordinate).Latitude,
            Z: (0, puerts_1.$unref)(originCoordinate).Altitude
        });
        let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.K2_SetActorLocation(CurVector, false, FHitResult, false);
        for (let i = 0; i < this.PointLocation.Num(); i++) {
            this.index++;
            this.DrawPoint(this.PointLocation.Get(i));
        }
        return "success";
    }
    MeasurePointsAndCable() {
        let CurVector = new UE.Vector(0, 0, 0);
        for (let i = 0; i < this.data.coordinatesList.length; i++) {
            if (this.data.coordinatesList[i] === "") {
                return "coordinatesList: index " + i + "is empty !";
            }
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[i].X, this.data.coordinatesList[i].Y, this.data.coordinatesList[i].Z);
            let CurEngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation);
            let EngineLocation = (0, puerts_1.$unref)(CurEngineLocation);
            this.PointLocation.Add(EngineLocation);
            CurVector = new UE.Vector(CurVector.X + EngineLocation.X, CurVector.Y + EngineLocation.Y, CurVector.Z + EngineLocation.Z);
        }
        CurVector = new UE.Vector(CurVector.X / this.data.coordinatesList.length, CurVector.Y / this.data.coordinatesList.length, CurVector.Z / this.data.coordinatesList.length);
        let originCoordinate = (0, puerts_1.$ref)(new UE.GeographicCoordinates(0, 0, 0));
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CurVector, originCoordinate);
        this.CoordinatesToRelative(this.data.coordinatesList, {
            X: (0, puerts_1.$unref)(originCoordinate).Longitude,
            Y: (0, puerts_1.$unref)(originCoordinate).Latitude,
            Z: (0, puerts_1.$unref)(originCoordinate).Altitude
        });
        let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.K2_SetActorLocation(CurVector, false, FHitResult, false);
        for (let i = 0; i < this.PointLocation.Num(); i++) {
            this.index++;
            this.DrawPoint(this.PointLocation.Get(i));
            if (i > 0) {
                this.DrawCable(this.curPoint, 1, this.lastPoint, this.lastPointName);
            }
        }
        return "success";
    }
    GetUnderHit() {
        let CurPlayerController = UE.GameplayStatics.GetPlayerController(this, 0);
        let HitResult1 = (0, puerts_1.$ref)(new UE.HitResult);
        let IsBool1 = CurPlayerController.GetHitResultUnderCursorByChannel(UE.ETraceTypeQuery.Visibility, true, HitResult1);
        let HitResult2 = (0, puerts_1.$ref)(new UE.HitResult);
        let IsBool2 = CurPlayerController.GetHitResultUnderFingerByChannel(UE.ETouchIndex.Touch1, UE.ETraceTypeQuery.Visibility, true, HitResult2);
        let Hit = new UE.HitResult;
        if (IsBool1) {
            Hit = (0, puerts_1.$unref)(HitResult1);
        }
        else {
            if (IsBool2) {
                Hit = (0, puerts_1.$unref)(HitResult2);
            }
        }
        return Hit;
    }
    ListenKeyAction() {
        let CurPlayerController = UE.GameplayStatics.GetPlayerController(this, 0);
        let LeftMouse = this.MakeKey("LeftMouseButton");
        let Touch1 = this.MakeKey("Touch1");
        let MiddleMouse = this.MakeKey("MiddleMouseButton");
        let IsMouse1 = CurPlayerController.WasInputKeyJustPressed(LeftMouse);
        let IsTouch1 = CurPlayerController.WasInputKeyJustPressed(Touch1);
        let IsMouse2 = CurPlayerController.WasInputKeyJustReleased(LeftMouse);
        let IsTouch2 = CurPlayerController.WasInputKeyJustReleased(Touch1);
        let IsMiddleMouse1 = CurPlayerController.WasInputKeyJustPressed(MiddleMouse);
        if (IsMouse1 || IsTouch1) {
            this.DrawDown();
        }
        else {
            if (IsMouse2 || IsTouch2) {
                this.DrawUp();
            }
            else {
                this.Uping();
            }
        }
        if (IsMiddleMouse1) {
            this.EndDraw();
        }
    }
    MakeKey(KeyName) {
        let key = new UE.Key;
        key.KeyName = KeyName;
        return key;
    }
    DrawDown() {
        if (this.IsEnd !== true) {
            let Hit = this.GetUnderHit();
            if (Hit) {
                if (Hit.bBlockingHit) {
                    let curloc = new UE.Vector(Hit.ImpactPoint.X, Hit.ImpactPoint.Y, Hit.ImpactPoint.Z + 1);
                    this.PointLocation.Add(curloc);
                    this.DrawDownEvent(curloc);
                }
            }
        }
    }
    DrawUp() {
    }
    Uping() {
    }
    DrawDownEvent(CurLocation) {
    }
    DrawPoint(CurLocation) {
        let Transform = new UE.Transform(new UE.Rotator(0, 0, 0), CurLocation, new UE.Vector(1, 1, 1));
        let PointLoc;
        if (this.IsAuto) {
            PointLoc = this.index;
        }
        else {
            PointLoc = this.PointLocation.Num();
        }
        let name = "Poi_" + PointLoc;
        let staticmeshComponent = new UE.StaticMeshComponent(this, name);
        staticmeshComponent.RegisterComponent();
        staticmeshComponent.SetStaticMesh(UE.StaticMesh.Load("/Engine/BasicShapes/Sphere"));
        staticmeshComponent.SetMaterial(0, this.MaterialInstPoint);
        staticmeshComponent.K2_AttachToComponent(this.SenceRoot, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
        staticmeshComponent.SetCollisionEnabled(UE.ECollisionEnabled.NoCollision);
        let HitResult = (0, puerts_1.$ref)(new UE.HitResult);
        staticmeshComponent.K2_SetWorldTransform(Transform, false, HitResult, false);
        this.PointSceneComponent.Add(staticmeshComponent);
        if (this.startPoint === undefined) {
            this.startPoint = staticmeshComponent;
            this.startPointName = name;
            this.lastPoint = staticmeshComponent;
            this.lastPointName = name;
            this.curPoint = staticmeshComponent;
            this.curPointName = name;
        }
        this.lastPoint = this.curPoint;
        this.lastPointName = this.curPointName;
        this.curPoint = staticmeshComponent;
        this.curPointName = name;
        if (this.firstLocation === undefined) {
            this.firstLocation = CurLocation;
            this.secondLocation = CurLocation;
        }
        this.firstLocation = this.secondLocation;
        this.secondLocation = CurLocation;
    }
    DrawCable(StartParam, StartNameId, EndParam, EndName) {
        let PointLoc;
        if (this.IsAuto) {
            PointLoc = this.PointLocation.Num() - this.index;
        }
        else {
            PointLoc = this.PointLocation.Num();
        }
        let temp = PointLoc - StartNameId;
        let name = "Cable_" + temp;
        let CableComponent = new UE.CableComponent(this, name);
        CableComponent.RegisterComponent();
        CableComponent.SolverIterations = 16;
        CableComponent.CableGravityScale = 0;
        CableComponent.EndLocation = new UE.Vector(0, 0, 0);
        CableComponent.CableWidth = 50;
        CableComponent.CableLength = 0;
        CableComponent.NumSegments = 1;
        CableComponent.K2_AttachToComponent(StartParam, name, UE.EAttachmentRule.KeepRelative, UE.EAttachmentRule.KeepRelative, UE.EAttachmentRule.KeepRelative, true);
        CableComponent.SetAttachEndToComponent(EndParam, EndName);
        CableComponent.SetCollisionEnabled(UE.ECollisionEnabled.NoCollision);
        CableComponent.SetMaterial(0, this.MaterialInstCable);
        this.CableSceneComponent.Add(CableComponent);
    }
    GetPoi(index) {
        let ChildIndex;
        if (index === 0) {
            ChildIndex = index;
        }
        else {
            ChildIndex = this.PointLocation.Num() - index;
        }
        let CurComponent = this.SenceRoot.GetChildComponent(ChildIndex);
        let name = UE.KismetSystemLibrary.GetObjectName(CurComponent);
        let R = [CurComponent, name];
        return R;
    }
    EndDraw() {
        if (this.IsEnd !== true) {
            this.IsEnd = true;
            this.EndDrawEvent();
        }
        else {
            let msg = {
                classDef: "Measure",
                funcDef: "Stop",
                data: undefined,
                callback: this.JsonData.callback,
                pageID: this.JsonData.pageID,
            };
            msg.data = { "result": "There are currently no measurements to be concluded" };
            let message = (0, IAPIMessageHandle_1.PackCallBacKMessage)(msg, msg.data);
            WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        }
    }
    EndDrawEvent() {
        //store the data in the model
        if (!this.IsAuto) {
            let GeographicPos = (0, puerts_1.$ref)(new UE.GeographicCoordinates(0, 0, 0));
            for (let i = 0; i < this.PointLocation.Num(); i++) {
                this.CoordinateConverterMgr.EngineToGeographic((0, ApiViewModelSystem_1.GetViewModel)(CoodinateConverterViewModel_1.CoodinateConverterViewModel).GetGISType(), this.PointLocation.Get(i), GeographicPos);
                let OriginCoordinate = {
                    X: (0, puerts_1.$unref)(GeographicPos).Longitude,
                    Y: (0, puerts_1.$unref)(GeographicPos).Latitude,
                    Z: (0, puerts_1.$unref)(GeographicPos).Altitude
                };
                this.coordinatesList.push(OriginCoordinate);
            }
            let data = {
                id: this.data.id,
                isAuto: true,
                GISType: (0, ApiViewModelSystem_1.GetViewModel)(CoodinateConverterViewModel_1.CoodinateConverterViewModel).GetGISType(),
                coordinatesList: this.coordinatesList
            };
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.Drawn_Measure_Coodinate, data);
        }
    }
    SetScaleTargetArmLength(TargetArmLength) {
        let ChildrenComponents = (0, puerts_1.$ref)((0, ue_1.NewArray)(UE.SceneComponent));
        this.SenceRoot.GetChildrenComponents(true, ChildrenComponents);
        let tempChildrens = (0, puerts_1.$unref)(ChildrenComponents);
        let ScaleCell = TargetArmLength * 0.001;
        let Scale = UE.KismetMathLibrary.Multiply_VectorFloat(new UE.Vector(0.1, 0.1, 0.1), ScaleCell);
        for (let index = 0; index < tempChildrens.Num(); index++) {
            let temp = UE.GameplayStatics.GetObjectClass(tempChildrens.Get(index));
            let name = UE.KismetSystemLibrary.GetClassDisplayName(temp);
            if (name !== "ProceduralMeshComponent" && name !== "WidgetComponent") {
                let Transform = tempChildrens.Get(index).K2_GetComponentToWorld();
                let TempTransform = new UE.Transform(Transform.Rotator(), Transform.GetLocation(), Scale);
                let hit = (0, puerts_1.$ref)(new UE.HitResult);
                tempChildrens.Get(index).K2_SetWorldTransform(TempTransform, false, hit, false);
            }
        }
        if (TargetArmLength > this.MinDistance) {
            let Scale = UE.KismetMathLibrary.SafeDivide(this.MinDistance, TargetArmLength);
            this.RefreshScale(TargetArmLength, Scale);
        }
    }
    RefreshScale(Distance, Scale) {
    }
}
exports.MeasureView = MeasureView;
//# sourceMappingURL=MeasureView.js.map