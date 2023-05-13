///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 14:43
///

import * as UE from 'ue'
import {$ref, $unref} from "puerts";
import {BaseView} from "../../../System/API/View/BaseView";

export class OriginDestinationLineView extends BaseView {
    //@C++
    Root: UE.SceneComponent
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    Spline: UE.SplineComponent
    NS_OD: UE.NiagaraComponent
    SplineMesh: UE.TArray<UE.SplineMeshComponent>
    MI_OD: UE.MaterialInstanceDynamic
    SplineMesh_1: UE.SplineMeshComponent
    SplineMesh_2: UE.SplineMeshComponent
    //@ts
    data: any
    CurSeconds: number
    IsStart: boolean
    TotalTime: number
    FlowRate: number
    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>("Root", UE.SceneComponent.StaticClass())
        this.RootComponent = this.Root
        this.Spline = this.CreateDefaultSubobjectGeneric<UE.SplineComponent>("Spline", UE.SplineComponent.StaticClass())
        this.Spline.SetupAttachment(this.Root, "Spline")
        this.Spline.SetMobility(UE.EComponentMobility.Movable)
        this.NS_OD = this.CreateDefaultSubobjectGeneric<UE.NiagaraComponent>("NS_OD", UE.NiagaraComponent.StaticClass())
        this.NS_OD.SetupAttachment(this.Spline, "NS_OD")
        this.MI_OD = new UE.MaterialInstanceDynamic()

        this.CurSeconds = 0
        this.IsStart = false
        this.TotalTime = 0
        this.FlowRate = 0
    }

    ReceiveBeginPlay(): void {
        super.ReceiveBeginPlay()
        this.Init()
    }

    private Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
        let CurNiaAsset = UE.NiagaraSystem.Load("/OpenZIAPI/Asset/Niagara/N_OD3.N_OD3")
        this.NS_OD.SetAsset(CurNiaAsset, true)
        this.NS_OD.SetTickBehavior(UE.ENiagaraTickBehavior.UsePrereqs)
        let Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_OD_Inst")
        this.MI_OD = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this,Material,"None",UE.EMIDCreationFlags.None)
    }

    ReceiveTick(DeltaSeconds: number): void {
        if (this.IsStart) {
            this.TotalTime = 1 / this.FlowRate
            this.CurSeconds = this.CurSeconds + DeltaSeconds
            if (this.CurSeconds <= this.TotalTime) {
                let CurNum = this.CurSeconds / this.TotalTime
                this.NS_OD.SetVariableFloat("Alpha", 1.0)
                let CurLoc = this.Spline.GetLocationAtDistanceAlongSpline(this.Spline.GetSplineLength() * CurNum, UE.ESplineCoordinateSpace.World)
                let FHitResult = $ref(new UE.HitResult)
                this.NS_OD.K2_SetWorldLocation(CurLoc, false, FHitResult, false)
                this.NS_OD.SetVariableFloat("Rate", this.FlowRate * 5000)
            } else {
                this.NS_OD.SetVariableFloat("Alpha", 0.0)
                if (this.CurSeconds - this.TotalTime > 0.5) {
                    let CurLoc = this.Spline.GetLocationAtSplinePoint(0, UE.ESplineCoordinateSpace.World)
                    let FHitResult = $ref(new UE.HitResult)
                    this.NS_OD.K2_SetWorldLocation(CurLoc, false, FHitResult, false)
                    this.CurSeconds = 0
                }
            }
        }
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
    }

    RefreshView(jsonData): string {
        this.data = jsonData.data
        this.Spline.ClearSplinePoints()
        let GeographicPosStart = new UE.GeographicCoordinates(this.data.start.X, this.data.start.Y, this.data.start.Z)
        let CurEngineLocationStart = $ref(new UE.Vector(0,0,0))
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPosStart, CurEngineLocationStart)
        let EngineLocationstart = $unref(CurEngineLocationStart)
        if ($unref(CurEngineLocationStart) === null)
            return "coordinates is error"
        let GeographicPosEnd = new UE.GeographicCoordinates(this.data.end.X, this.data.end.Y, this.data.end.Z)
        let CurEngineLocationEnd = $ref(new UE.Vector(0,0,0))
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPosEnd, CurEngineLocationEnd)
        let EngineLocationEnd = $unref(CurEngineLocationEnd)
        if ($unref(CurEngineLocationEnd) === null)
            return "coordinates is error"

        let CurVector = new UE.Vector((EngineLocationstart.X + EngineLocationEnd.X) / 2,(EngineLocationstart.Y + EngineLocationEnd.Y) / 2,(EngineLocationstart.Z + EngineLocationEnd.Z) / 2)
        let originCoordinate = $ref(new UE.GeographicCoordinates(0, 0,0))
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CurVector, originCoordinate)
        let coordinateArray :{X:number,Y:number,Z:number}[] = []
        coordinateArray.push(this.data.start)
        coordinateArray.push(this.data.end)
        this.CoordinatesToRelative(coordinateArray,{ X: $unref(originCoordinate).Longitude, Y: $unref(originCoordinate).Latitude, Z: $unref(originCoordinate).Altitude})
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(CurVector, false, FHitResult, false)

        let MiddleLocation = new UE.Vector((EngineLocationstart.X + EngineLocationEnd.X) / 2, (EngineLocationstart.Y + EngineLocationEnd.Y) / 2, (EngineLocationstart.Z + EngineLocationEnd.Z) / 2 + this.data.middleHeight)
        this.Spline.AddSplinePointAtIndex(EngineLocationstart,0,UE.ESplineCoordinateSpace.World,false)
        this.Spline.AddSplinePointAtIndex(MiddleLocation,1,UE.ESplineCoordinateSpace.World,false)
        this.Spline.AddSplinePointAtIndex(EngineLocationEnd,2,UE.ESplineCoordinateSpace.World,false)
        this.Spline.UpdateSpline()
        this.MI_OD.SetVectorParameterValue("LineColor", new UE.LinearColor(this.data.lineColor.X,this.data.lineColor.Y,this.data.lineColor.Z,this.data.lineColor.W))
        this.MI_OD.SetScalarParameterValue("LineGlow",this.data.lineGlow)
        let name1 = "SplineMesh_" + 0
        let CurSplineMesh1 = new UE.SplineMeshComponent(this, name1)
        CurSplineMesh1.SetMobility(UE.EComponentMobility.Movable)
        CurSplineMesh1.SetStaticMesh(UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/StaticMeshOD.StaticMeshOD"))
        CurSplineMesh1.RegisterComponent()
        CurSplineMesh1.K2_AttachToComponent(this.Root, name1, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
        CurSplineMesh1.SetMaterial(0,this.MI_OD)
        CurSplineMesh1.SetStartScale(new UE.Vector2D(this.data.lineRadius,this.data.lineRadius),true)
        CurSplineMesh1.SetEndScale(new UE.Vector2D(this.data.lineRadius,this.data.lineRadius),true)
        this.SplineMesh_1 = CurSplineMesh1
        let location_1_rev = $ref(new UE.Vector)
        let tangent_1_rev = $ref(new UE.Vector)
        this.Spline.GetLocationAndTangentAtSplinePoint(0, location_1_rev, tangent_1_rev, UE.ESplineCoordinateSpace.World)
        let location_2_rev = $ref(new UE.Vector)
        let tangent_2_rev = $ref(new UE.Vector)
        this.Spline.GetLocationAndTangentAtSplinePoint(1, location_2_rev, tangent_2_rev, UE.ESplineCoordinateSpace.World)
        let tangent_1 = $unref(tangent_1_rev)
        let tangent_2 = $unref(tangent_2_rev)
        this.SplineMesh_1.SetStartAndEnd($unref(location_1_rev), tangent_1, $unref(location_2_rev), tangent_2, true)
        let name2 = "SplineMesh_" + 1
        let CurSplineMesh2 = new UE.SplineMeshComponent(this, name2)
        CurSplineMesh2.SetMobility(UE.EComponentMobility.Movable)
        CurSplineMesh2.SetStaticMesh(UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/StaticMeshOD.StaticMeshOD"))
        CurSplineMesh2.RegisterComponent()
        CurSplineMesh2.K2_AttachToComponent(this.Root, name1, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
        CurSplineMesh2.SetMaterial(0,this.MI_OD)
        CurSplineMesh2.SetStartScale(new UE.Vector2D(this.data.lineRadius,this.data.lineRadius),true)
        CurSplineMesh2.SetEndScale(new UE.Vector2D(this.data.lineRadius,this.data.lineRadius),true)
        this.SplineMesh_2 = CurSplineMesh2
        let location_3_rev = $ref(new UE.Vector)
        let tangent_3_rev = $ref(new UE.Vector)
        this.Spline.GetLocationAndTangentAtSplinePoint(1, location_3_rev, tangent_3_rev, UE.ESplineCoordinateSpace.World)
        let location_4_rev = $ref(new UE.Vector)
        let tangent_4_rev = $ref(new UE.Vector)
        this.Spline.GetLocationAndTangentAtSplinePoint(2, location_4_rev, tangent_4_rev, UE.ESplineCoordinateSpace.World)
        let tangent_3 = $unref(tangent_3_rev)
        let tangent_4 = $unref(tangent_4_rev)
        this.SplineMesh_2.SetStartAndEnd($unref(location_3_rev), tangent_3, $unref(location_4_rev), tangent_4, true)
        this.NS_OD.SetVariableLinearColor("Color", new UE.LinearColor(this.data.flowColor.X,this.data.flowColor.Y,this.data.flowColor.Z,this.data.flowColor.W))
        this.NS_OD.SetVariableFloat("Scale",this.data.flowScale)
        this.IsStart = true
        this.FlowRate = this.data.flowRate
        return "success"
    }
}
