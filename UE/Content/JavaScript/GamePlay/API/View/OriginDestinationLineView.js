"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 14:43
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.OriginDestinationLineView = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
class OriginDestinationLineView extends BaseView_1.BaseView {
    //@C++
    Root;
    CoordinateConverterMgr;
    Spline;
    NS_OD;
    SplineMesh;
    MI_OD;
    SplineMesh_1;
    SplineMesh_2;
    //@ts
    data;
    CurSeconds;
    IsStart;
    TotalTime;
    FlowRate;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric("Root", UE.SceneComponent.StaticClass());
        this.RootComponent = this.Root;
        this.Spline = this.CreateDefaultSubobjectGeneric("Spline", UE.SplineComponent.StaticClass());
        this.Spline.SetupAttachment(this.Root, "Spline");
        this.Spline.SetMobility(UE.EComponentMobility.Movable);
        this.NS_OD = this.CreateDefaultSubobjectGeneric("NS_OD", UE.NiagaraComponent.StaticClass());
        this.NS_OD.SetupAttachment(this.Spline, "NS_OD");
        this.MI_OD = new UE.MaterialInstanceDynamic();
        this.CurSeconds = 0;
        this.IsStart = false;
        this.TotalTime = 0;
        this.FlowRate = 0;
    }
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay();
        this.Init();
    }
    Init() {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
        let CurNiaAsset = UE.NiagaraSystem.Load("/OpenZIAPI/Asset/Niagara/N_OD3.N_OD3");
        this.NS_OD.SetAsset(CurNiaAsset, true);
        this.NS_OD.SetTickBehavior(UE.ENiagaraTickBehavior.UsePrereqs);
        let Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_OD_Inst");
        this.MI_OD = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this, Material, "None", UE.EMIDCreationFlags.None);
    }
    ReceiveTick(DeltaSeconds) {
        if (this.IsStart) {
            this.TotalTime = 1 / this.FlowRate;
            this.CurSeconds = this.CurSeconds + DeltaSeconds;
            if (this.CurSeconds <= this.TotalTime) {
                let CurNum = this.CurSeconds / this.TotalTime;
                this.NS_OD.SetVariableFloat("Alpha", 1.0);
                let CurLoc = this.Spline.GetLocationAtDistanceAlongSpline(this.Spline.GetSplineLength() * CurNum, UE.ESplineCoordinateSpace.World);
                let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
                this.NS_OD.K2_SetWorldLocation(CurLoc, false, FHitResult, false);
                this.NS_OD.SetVariableFloat("Rate", this.FlowRate * 5000);
            }
            else {
                this.NS_OD.SetVariableFloat("Alpha", 0.0);
                if (this.CurSeconds - this.TotalTime > 0.5) {
                    let CurLoc = this.Spline.GetLocationAtSplinePoint(0, UE.ESplineCoordinateSpace.World);
                    let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
                    this.NS_OD.K2_SetWorldLocation(CurLoc, false, FHitResult, false);
                    this.CurSeconds = 0;
                }
            }
        }
    }
    ReceiveEndPlay(EndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
    }
    RefreshView(jsonData) {
        this.data = jsonData.data;
        this.Spline.ClearSplinePoints();
        let GeographicPosStart = new UE.GeographicCoordinates(this.data.start.X, this.data.start.Y, this.data.start.Z);
        let CurEngineLocationStart = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPosStart, CurEngineLocationStart);
        let EngineLocationstart = (0, puerts_1.$unref)(CurEngineLocationStart);
        if ((0, puerts_1.$unref)(CurEngineLocationStart) === null)
            return "coordinates is error";
        let GeographicPosEnd = new UE.GeographicCoordinates(this.data.end.X, this.data.end.Y, this.data.end.Z);
        let CurEngineLocationEnd = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPosEnd, CurEngineLocationEnd);
        let EngineLocationEnd = (0, puerts_1.$unref)(CurEngineLocationEnd);
        if ((0, puerts_1.$unref)(CurEngineLocationEnd) === null)
            return "coordinates is error";
        let CurVector = new UE.Vector((EngineLocationstart.X + EngineLocationEnd.X) / 2, (EngineLocationstart.Y + EngineLocationEnd.Y) / 2, (EngineLocationstart.Z + EngineLocationEnd.Z) / 2);
        let originCoordinate = (0, puerts_1.$ref)(new UE.GeographicCoordinates(0, 0, 0));
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CurVector, originCoordinate);
        let coordinateArray = [];
        coordinateArray.push(this.data.start);
        coordinateArray.push(this.data.end);
        this.CoordinatesToRelative(coordinateArray, { X: (0, puerts_1.$unref)(originCoordinate).Longitude, Y: (0, puerts_1.$unref)(originCoordinate).Latitude, Z: (0, puerts_1.$unref)(originCoordinate).Altitude });
        let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.K2_SetActorLocation(CurVector, false, FHitResult, false);
        let MiddleLocation = new UE.Vector((EngineLocationstart.X + EngineLocationEnd.X) / 2, (EngineLocationstart.Y + EngineLocationEnd.Y) / 2, (EngineLocationstart.Z + EngineLocationEnd.Z) / 2 + this.data.middleHeight);
        this.Spline.AddSplinePointAtIndex(EngineLocationstart, 0, UE.ESplineCoordinateSpace.World, false);
        this.Spline.AddSplinePointAtIndex(MiddleLocation, 1, UE.ESplineCoordinateSpace.World, false);
        this.Spline.AddSplinePointAtIndex(EngineLocationEnd, 2, UE.ESplineCoordinateSpace.World, false);
        this.Spline.UpdateSpline();
        this.MI_OD.SetVectorParameterValue("LineColor", new UE.LinearColor(this.data.lineColor.X, this.data.lineColor.Y, this.data.lineColor.Z, this.data.lineColor.W));
        this.MI_OD.SetScalarParameterValue("LineGlow", this.data.lineGlow);
        let name1 = "SplineMesh_" + 0;
        let CurSplineMesh1 = new UE.SplineMeshComponent(this, name1);
        CurSplineMesh1.SetMobility(UE.EComponentMobility.Movable);
        CurSplineMesh1.SetStaticMesh(UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/StaticMeshOD.StaticMeshOD"));
        CurSplineMesh1.RegisterComponent();
        CurSplineMesh1.K2_AttachToComponent(this.Root, name1, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
        CurSplineMesh1.SetMaterial(0, this.MI_OD);
        CurSplineMesh1.SetStartScale(new UE.Vector2D(this.data.lineRadius, this.data.lineRadius), true);
        CurSplineMesh1.SetEndScale(new UE.Vector2D(this.data.lineRadius, this.data.lineRadius), true);
        this.SplineMesh_1 = CurSplineMesh1;
        let location_1_rev = (0, puerts_1.$ref)(new UE.Vector);
        let tangent_1_rev = (0, puerts_1.$ref)(new UE.Vector);
        this.Spline.GetLocationAndTangentAtSplinePoint(0, location_1_rev, tangent_1_rev, UE.ESplineCoordinateSpace.World);
        let location_2_rev = (0, puerts_1.$ref)(new UE.Vector);
        let tangent_2_rev = (0, puerts_1.$ref)(new UE.Vector);
        this.Spline.GetLocationAndTangentAtSplinePoint(1, location_2_rev, tangent_2_rev, UE.ESplineCoordinateSpace.World);
        let tangent_1 = (0, puerts_1.$unref)(tangent_1_rev);
        let tangent_2 = (0, puerts_1.$unref)(tangent_2_rev);
        this.SplineMesh_1.SetStartAndEnd((0, puerts_1.$unref)(location_1_rev), tangent_1, (0, puerts_1.$unref)(location_2_rev), tangent_2, true);
        let name2 = "SplineMesh_" + 1;
        let CurSplineMesh2 = new UE.SplineMeshComponent(this, name2);
        CurSplineMesh2.SetMobility(UE.EComponentMobility.Movable);
        CurSplineMesh2.SetStaticMesh(UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/StaticMeshOD.StaticMeshOD"));
        CurSplineMesh2.RegisterComponent();
        CurSplineMesh2.K2_AttachToComponent(this.Root, name1, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
        CurSplineMesh2.SetMaterial(0, this.MI_OD);
        CurSplineMesh2.SetStartScale(new UE.Vector2D(this.data.lineRadius, this.data.lineRadius), true);
        CurSplineMesh2.SetEndScale(new UE.Vector2D(this.data.lineRadius, this.data.lineRadius), true);
        this.SplineMesh_2 = CurSplineMesh2;
        let location_3_rev = (0, puerts_1.$ref)(new UE.Vector);
        let tangent_3_rev = (0, puerts_1.$ref)(new UE.Vector);
        this.Spline.GetLocationAndTangentAtSplinePoint(1, location_3_rev, tangent_3_rev, UE.ESplineCoordinateSpace.World);
        let location_4_rev = (0, puerts_1.$ref)(new UE.Vector);
        let tangent_4_rev = (0, puerts_1.$ref)(new UE.Vector);
        this.Spline.GetLocationAndTangentAtSplinePoint(2, location_4_rev, tangent_4_rev, UE.ESplineCoordinateSpace.World);
        let tangent_3 = (0, puerts_1.$unref)(tangent_3_rev);
        let tangent_4 = (0, puerts_1.$unref)(tangent_4_rev);
        this.SplineMesh_2.SetStartAndEnd((0, puerts_1.$unref)(location_3_rev), tangent_3, (0, puerts_1.$unref)(location_4_rev), tangent_4, true);
        this.NS_OD.SetVariableLinearColor("Color", new UE.LinearColor(this.data.flowColor.X, this.data.flowColor.Y, this.data.flowColor.Z, this.data.flowColor.W));
        this.NS_OD.SetVariableFloat("Scale", this.data.flowScale);
        this.IsStart = true;
        this.FlowRate = this.data.flowRate;
        return "success";
    }
}
exports.OriginDestinationLineView = OriginDestinationLineView;
//# sourceMappingURL=OriginDestinationLineView.js.map