"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/29 18:35
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpticalFlowLineView = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
const ue_1 = require("ue");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
class OpticalFlowLineView extends BaseView_1.BaseView {
    //@C++
    Root;
    CoordinateConverterMgr;
    Spline;
    SplineMesh;
    //@ts
    data;
    childActor;
    CurSeconds;
    TotalTime;
    TimeRate;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric("Root", UE.SceneComponent.StaticClass());
        this.RootComponent = this.Root;
        this.Spline = this.CreateDefaultSubobjectGeneric("Spline", UE.SplineComponent.StaticClass());
        this.Spline.SetupAttachment(this.Root, "Spline");
        this.SplineMesh = (0, ue_1.NewArray)(UE.SplineMeshComponent);
        this.childActor = undefined;
        this.TotalTime = 0;
        this.TimeRate = 0;
        this.CurSeconds = 0;
    }
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay();
        this.Init();
    }
    ReceiveTick(DeltaSeconds) {
        if (this.data.moveChildActor) {
            if (!UE.OpenZIFrameworkLibrary.GetActorHiddenInGame(this)) {
                this.TotalTime = 1 / this.TimeRate;
                this.CurSeconds = this.CurSeconds + DeltaSeconds;
                let ChildActorLocation = new UE.Vector(0, 0, 0);
                let CurNum = 0;
                if (this.CurSeconds <= this.TotalTime) {
                    CurNum = this.CurSeconds / this.TotalTime;
                }
                else if (this.CurSeconds > this.TotalTime && this.CurSeconds < this.TotalTime * 2 && this.data.loop === false) {
                    CurNum = 1 - (this.CurSeconds - this.TotalTime) / this.TotalTime;
                }
                else {
                    this.CurSeconds = 0;
                    CurNum = this.CurSeconds / this.TotalTime;
                }
                ChildActorLocation = this.Spline.GetLocationAtDistanceAlongSpline(this.Spline.GetSplineLength() * CurNum, UE.ESplineCoordinateSpace.World);
                let data = {
                    type: "OpticalFlowLine",
                    id: this.data.id,
                    location: ChildActorLocation
                };
                MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.FOLLOWER_API_MOVE, data);
            }
        }
    }
    Init() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
        this.Spline.ClearSplinePoints(true);
    }
    ReceiveEndPlay(EndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
    }
    ClearAllData() {
        this.Spline.ClearSplinePoints();
        for (let i = 0; i < this.SplineMesh.Num(); i++) {
            this.SplineMesh.Get(i).K2_DestroyComponent(this.SplineMesh.Get(i));
        }
        this.SplineMesh.Empty();
    }
    RefreshView(jsonData) {
        this.ClearAllData();
        this.data = jsonData.data;
        if (this.data.coordinatesList.length == 0) {
            return "success";
        }
        let CurVector = new UE.Vector(0, 0, 0);
        let AllPoints = (0, ue_1.NewArray)(UE.Vector);
        for (let i = 0; i < this.data.coordinatesList.length; i++) {
            if (this.data.coordinatesList[i] === "") {
                return "coordinatesList: index " + i + "is empty !";
            }
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[i].X, this.data.coordinatesList[i].Y, this.data.coordinatesList[i].Z);
            let CurEngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation);
            let EngineLocation = (0, puerts_1.$unref)(CurEngineLocation);
            CurVector = new UE.Vector(CurVector.X + EngineLocation.X, CurVector.Y + EngineLocation.Y, CurVector.Z + EngineLocation.Z);
            AllPoints.Add(EngineLocation);
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
        for (let i = 0; i < AllPoints.Num(); i++) {
            this.Spline.AddSplinePointAtIndex(AllPoints.Get(i), i, UE.ESplineCoordinateSpace.World, true);
            this.Spline.SetSplinePointType(i, this.data.splinePointType, false);
        }
        this.Spline.SetClosedLoop(this.data.loop, true);
        this.Spline.UpdateSpline();
        this.CreatSplineMesh();
        this.TimeRate = this.data.timeRate;
        return "success";
    }
    CreatSplineMesh() {
        let SplineMeshNum;
        if (this.data.loop) {
            SplineMeshNum = this.Spline.GetNumberOfSplinePoints() - 1;
        }
        else {
            SplineMeshNum = this.Spline.GetNumberOfSplinePoints() - 2;
        }
        if (SplineMeshNum < 0) {
            return "No valid point currently exists";
        }
        if (this.SplineMesh) {
            for (let i = 0; i < this.SplineMesh.Num(); i++) {
                this.SplineMesh.Get(i).K2_DestroyComponent(this.SplineMesh.Get(i));
            }
            this.SplineMesh.Empty();
        }
        let CurStaticMesh;
        let CurInForwardAxis;
        let CurInSplineUpDir;
        let CurSpeedName;
        let CurSpeed;
        let CurUVRotation;
        let UVName;
        switch (this.data.meshDirection) {
            case 0:
                CurStaticMesh = UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/CenterPlane.CenterPlane");
                CurInForwardAxis = UE.ESplineMeshAxis.X;
                CurInSplineUpDir = new UE.Vector(0, 0, 1);
                CurSpeedName = "SpeedY";
                CurSpeed = this.data.speed;
                CurUVRotation = 0.0;
                UVName = "V";
                break;
            case 1:
                CurStaticMesh = UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/SidePlane.SidePlane");
                CurInForwardAxis = UE.ESplineMeshAxis.X;
                CurInSplineUpDir = new UE.Vector(0, 0, 1);
                CurSpeedName = "SpeedX";
                CurSpeed = this.data.speed * (-0.1);
                CurUVRotation = -0.25;
                UVName = "U";
                break;
            case 2:
                CurStaticMesh = UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/CenterPlane.CenterPlane");
                CurInForwardAxis = UE.ESplineMeshAxis.Y;
                CurInSplineUpDir = new UE.Vector(0, 0, -1);
                CurSpeedName = "SpeedX";
                CurSpeed = this.data.speed;
                CurUVRotation = 0.25;
                UVName = "U";
                break;
        }
        let Material;
        switch (this.data.style) {
            case 0:
                Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_SolidColor");
                break;
            case 1:
                Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_FlowSolidColor");
                break;
            case 2:
                Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_FlowArrow");
                break;
            case 3:
                Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_VirtualActualColor");
                break;
        }
        for (let i = 0; i <= SplineMeshNum; i++) {
            this.Spline.SetSplinePointType(i, this.data.splinePointType, true);
            let name = "SplineMesh_" + i;
            let CurSplineMesh = new UE.SplineMeshComponent(this, name);
            CurSplineMesh.SetMobility(UE.EComponentMobility.Movable);
            CurSplineMesh.SetStaticMesh(CurStaticMesh);
            CurSplineMesh.SetForwardAxis(CurInForwardAxis, true);
            CurSplineMesh.SetSplineUpDir(CurInSplineUpDir, true);
            CurSplineMesh.SetStartScale(new UE.Vector2D(this.data.width / 50.0, this.data.width / 50.0), true);
            CurSplineMesh.SetEndScale(new UE.Vector2D(this.data.width / 50.0, this.data.width / 50.0), true);
            CurSplineMesh.SetMassScale("None", 1.0);
            let MaterialInst = CurSplineMesh.CreateDynamicMaterialInstance(0, Material, "None");
            MaterialInst.SetScalarParameterValue("Brightness", this.data.brightness);
            MaterialInst.SetVectorParameterValue("BaseColor", new UE.LinearColor(this.data.baseColor.X, this.data.baseColor.Y, this.data.baseColor.Z, this.data.baseColor.W));
            MaterialInst.SetScalarParameterValue(CurSpeedName, CurSpeed);
            MaterialInst.SetScalarParameterValue("UV_Rotation", CurUVRotation);
            if (this.data.isOpenStroke) {
                MaterialInst.SetScalarParameterValue("Stroke_Swich", 1.0);
            }
            else {
                MaterialInst.SetScalarParameterValue("Stroke_Swich", 0.0);
            }
            MaterialInst.SetScalarParameterValue("Base_Opacity", this.data.baseOpacity);
            let CurstrokeWidth = UE.KismetMathLibrary.MapRangeClamped(this.data.strokeWidth, 0, 1, 0.999, 1.0002);
            MaterialInst.SetScalarParameterValue("Stroke_Width", CurstrokeWidth);
            CurSplineMesh.RegisterComponent();
            CurSplineMesh.K2_AttachToComponent(this.Root, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
            this.SplineMesh.Add(CurSplineMesh);
            let location_1_rev = (0, puerts_1.$ref)(new UE.Vector);
            let tangent_1_rev = (0, puerts_1.$ref)(new UE.Vector);
            this.Spline.GetLocationAndTangentAtSplinePoint(i, location_1_rev, tangent_1_rev, UE.ESplineCoordinateSpace.World);
            let location_2_rev = (0, puerts_1.$ref)(new UE.Vector);
            let tangent_2_rev = (0, puerts_1.$ref)(new UE.Vector);
            this.Spline.GetLocationAndTangentAtSplinePoint(i + 1, location_2_rev, tangent_2_rev, UE.ESplineCoordinateSpace.World);
            let tangent_1 = (0, puerts_1.$unref)(tangent_1_rev);
            let tangent_2 = (0, puerts_1.$unref)(tangent_2_rev);
            if (this.Spline.GetSplinePointType(i) === UE.ESplinePointType.Linear) {
                tangent_1 = new UE.Vector(0, 0, 0);
                tangent_2 = new UE.Vector(0, 0, 0);
            }
            let CurVector = UE.KismetMathLibrary.Subtract_VectorVector((0, puerts_1.$unref)(location_1_rev), (0, puerts_1.$unref)(location_2_rev));
            let CurLength = UE.KismetMathLibrary.VSize(CurVector);
            let CurValue;
            switch (this.data.meshDirection) {
                case 0:
                    CurValue = CurLength / (this.data.tilling * (-1.0));
                    break;
                case 1:
                    CurValue = CurLength / this.data.tilling;
                    break;
                case 2:
                    CurValue = CurLength / this.data.tilling;
                    break;
            }
            MaterialInst.SetScalarParameterValue(UVName, CurValue);
            CurSplineMesh.SetStartAndEnd((0, puerts_1.$unref)(location_1_rev), tangent_1, (0, puerts_1.$unref)(location_2_rev), tangent_2, true);
        }
    }
}
exports.OpticalFlowLineView = OpticalFlowLineView;
//# sourceMappingURL=OpticalFlowLineView.js.map