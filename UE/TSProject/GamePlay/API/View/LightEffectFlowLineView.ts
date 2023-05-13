///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2023/01/12 14:43
///

import * as UE from 'ue'
import {BaseView} from "../../../System/API/View/BaseView";
import {NewArray} from "ue";
import {$ref, $unref} from "puerts";

export class LightEffectFlowLineView extends BaseView {

    //@C++
    Root: UE.SceneComponent
    CoordinateConverterMgr: UE.CoordinateConverterMgr
    Spline: UE.SplineComponent
    SplineMesh: UE.TArray<UE.SplineMeshComponent>
    MI_Base: UE.MaterialInstanceDynamic
    NS_LightEffect: UE.TArray<UE.NiagaraComponent>
    //@ts
    data: any
    CurSeconds: number
    IsStart: boolean
    TotalTime: number
    FlowRate: number
    NiagaraLocArray: UE.TArray<UE.Vector>
    MeanDdistance: number

    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>("Root", UE.SceneComponent.StaticClass())
        this.RootComponent = this.Root
        this.Spline = this.CreateDefaultSubobjectGeneric<UE.SplineComponent>("Spline", UE.SplineComponent.StaticClass())
        this.Spline.SetupAttachment(this.Root, "Spline")
        this.Spline.SetMobility(UE.EComponentMobility.Movable)
        this.MI_Base = new UE.MaterialInstanceDynamic()
        this.SplineMesh = NewArray(UE.SplineMeshComponent)
        this.NS_LightEffect = NewArray(UE.NiagaraComponent)

        this.CurSeconds = 0
        this.IsStart = false
        this.TotalTime = 0
        this.FlowRate = 0
        this.NiagaraLocArray = NewArray(UE.Vector)
        this.MeanDdistance = undefined
    }

    ReceiveBeginPlay(): void {
        super.ReceiveBeginPlay()
        this.Init()
    }

    ReceiveTick(DeltaSeconds: number): void {
        if (this.IsStart) {
            this.TotalTime = 1 / this.FlowRate
            this.CurSeconds = this.CurSeconds + DeltaSeconds
            if (this.CurSeconds <= this.TotalTime) {
                let CurNum = this.CurSeconds / this.TotalTime
                for (let i = 0; i < this.NS_LightEffect.Num(); i++) {
                    this.NS_LightEffect.Get(i).SetVariableFloat("Alpha", 1.0)
                    let CurDistance = this.MeanDdistance * (i + CurNum)
                    let CurLoc = this.Spline.GetLocationAtDistanceAlongSpline(CurDistance, UE.ESplineCoordinateSpace.World)
                    let FHitResult = $ref(new UE.HitResult)
                    this.NS_LightEffect.Get(i).K2_SetWorldLocation(CurLoc, false, FHitResult, false)
                    this.NS_LightEffect.Get(i).SetVariableFloat("Rate", this.FlowRate * 5000)
                    this.NS_LightEffect.Get(i).SetVariableFloat("Lifetime", this.data.lifeTime)
                }
            } else {
                for (let i = 0; i < this.NS_LightEffect.Num(); i++) {
                    this.NS_LightEffect.Get(i).SetVariableFloat("Alpha", 0.0)
                }
                if (this.CurSeconds - this.TotalTime > 0.2) {
                    for (let i = 0; i < this.NS_LightEffect.Num(); i++) {
                        let FHitResult = $ref(new UE.HitResult)
                        this.NS_LightEffect.Get(i).K2_SetWorldLocation(this.NiagaraLocArray.Get(i), false, FHitResult, false)
                    }
                    this.CurSeconds = 0
                }
            }
        }
    }

    private Init(): void {
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
        let Material = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/M_OD_Inst")
        this.MI_Base = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this, Material, "None", UE.EMIDCreationFlags.None)
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
    }

    ClearAllData(): void {
        this.Spline.ClearSplinePoints()
        for (let i = 0; i < this.NS_LightEffect.Num(); i++) {
            this.NS_LightEffect.Get(i).K2_DestroyComponent(this.NS_LightEffect.Get(i))
        }
        this.NS_LightEffect.Empty()
        this.NiagaraLocArray.Empty()
        for (let i = 0; i < this.SplineMesh.Num(); i++) {
            this.SplineMesh.Get(i).K2_DestroyComponent(this.SplineMesh.Get(i))
        }
        this.SplineMesh.Empty()

    }

    RefreshView(jsonData): string {
        this.ClearAllData()
        this.data = jsonData.data
        if (this.data.coordinatesList.length == 0){
            return "success"
        }
        let CurVector = new UE.Vector(0, 0, 0)
        let AllPoints = NewArray(UE.Vector)
        for (let i = 0; i < this.data.coordinatesList.length; i++) {
            if (this.data.coordinatesList[i] === "") {
                return "coordinatesList: index " + i + "is empty !"
            }
            let GeographicPos = new UE.GeographicCoordinates(this.data.coordinatesList[i].X, this.data.coordinatesList[i].Y, this.data.coordinatesList[i].Z)
            let CurEngineLocation = $ref(new UE.Vector(0, 0, 0))
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
            let EngineLocation = $unref(CurEngineLocation)
            CurVector = new UE.Vector(CurVector.X + EngineLocation.X, CurVector.Y + EngineLocation.Y, CurVector.Z + EngineLocation.Z)
            AllPoints.Add(EngineLocation)
        }
        CurVector = new UE.Vector(CurVector.X / this.data.coordinatesList.length, CurVector.Y / this.data.coordinatesList.length, CurVector.Z / this.data.coordinatesList.length)
        let originCoordinate = $ref(new UE.GeographicCoordinates(0, 0,0))
        this.CoordinateConverterMgr.EngineToGeographic(this.data.GISType, CurVector, originCoordinate)
        this.CoordinatesToRelative(this.data.coordinatesList,{ X: $unref(originCoordinate).Longitude, Y: $unref(originCoordinate).Latitude, Z: $unref(originCoordinate).Altitude})
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(CurVector, false, FHitResult, false)
        // if (this.data.loop) {
        //     AllPoints.Add(AllPoints.Get(0))
        // }
        for (let i = 0; i < AllPoints.Num(); i++) {
            this.Spline.AddSplinePointAtIndex(AllPoints.Get(i), i, UE.ESplineCoordinateSpace.World, false)
            this.Spline.SetSplinePointType(i, this.data.splinePointType, false)
        }
        this.Spline.SetClosedLoop(this.data.loop, true)
        this.Spline.UpdateSpline()

        this.CreatSplineMesh()

        this.CreatNiagara()
        this.IsStart = true
        this.FlowRate = this.data.flowRate
        return "success"
    }

    CreatSplineMesh() {
        // let SplineMeshNum = this.Spline.GetNumberOfSplinePoints() - 1
        let SplineMeshNum
        if (this.data.loop) {
            SplineMeshNum = this.Spline.GetNumberOfSplinePoints() - 1
        } else {
            SplineMeshNum = this.Spline.GetNumberOfSplinePoints() - 2
        }
        if (SplineMeshNum < 0) {
            return "No valid point currently exists"
        }
        if (this.SplineMesh) {
            for (let i = 0; i < this.SplineMesh.Num(); i++) {
                this.SplineMesh.Get(i).K2_DestroyComponent(this.SplineMesh.Get(i))
            }
            this.SplineMesh.Empty()
        }
        let CurStaticMesh = UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/StaticMeshOD.StaticMeshOD")
        this.MI_Base.SetVectorParameterValue("LineColor", new UE.LinearColor(this.data.lineColor.X, this.data.lineColor.Y, this.data.lineColor.Z, this.data.lineColor.W))
        this.MI_Base.SetScalarParameterValue("LineGlow", this.data.lineGlow)
        for (let i = 0; i <= SplineMeshNum; i++) {
            let name = "SplineMesh_" + i
            let CurSplineMesh = new UE.SplineMeshComponent(this, name)
            CurSplineMesh.SetMobility(UE.EComponentMobility.Movable)
            CurSplineMesh.SetStaticMesh(CurStaticMesh)
            CurSplineMesh.RegisterComponent()
            CurSplineMesh.K2_AttachToComponent(this.Root, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
            CurSplineMesh.SetMaterial(0, this.MI_Base)
            CurSplineMesh.SetStartScale(new UE.Vector2D(this.data.lineRadius, this.data.lineRadius), true)
            CurSplineMesh.SetEndScale(new UE.Vector2D(this.data.lineRadius, this.data.lineRadius), true)
            this.SplineMesh.Add(CurSplineMesh)
            let location_1_rev = $ref(new UE.Vector)
            let tangent_1_rev = $ref(new UE.Vector)
            this.Spline.GetLocationAndTangentAtSplinePoint(i, location_1_rev, tangent_1_rev, UE.ESplineCoordinateSpace.World)
            let location_2_rev = $ref(new UE.Vector)
            let tangent_2_rev = $ref(new UE.Vector)
            this.Spline.GetLocationAndTangentAtSplinePoint(i + 1, location_2_rev, tangent_2_rev, UE.ESplineCoordinateSpace.World)
            let tangent_1 = $unref(tangent_1_rev)
            let tangent_2 = $unref(tangent_2_rev)
            if (this.Spline.GetSplinePointType(i) === UE.ESplinePointType.Linear) {
                tangent_1 = new UE.Vector(0, 0, 0)
                tangent_2 = new UE.Vector(0, 0, 0)
            }
            this.SplineMesh.Get(i).SetStartAndEnd($unref(location_1_rev), tangent_1, $unref(location_2_rev), tangent_2, true)
        }
    }

    CreatNiagara() {
        let NiagaraNum
        if (this.data.flowNumber < 1) {
            NiagaraNum = 1
        } else {
            NiagaraNum = Math.round(this.data.flowNumber)
        }
        let splinedistance = this.Spline.GetSplineLength()
        this.MeanDdistance = splinedistance / NiagaraNum
        let CurNiaAsset = UE.NiagaraSystem.Load("/OpenZIAPI/Asset/Niagara/N_OD3.N_OD3")
        for (let i = 0; i < NiagaraNum; i++) {
            let name = "Niagara_" + i
            let CurNiagara = new UE.NiagaraComponent(this, name)
            CurNiagara.SetMobility(UE.EComponentMobility.Movable)
            CurNiagara.RegisterComponent()
            CurNiagara.K2_AttachToComponent(this.Root, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true)
            CurNiagara.SetAsset(CurNiaAsset, true)
            CurNiagara.SetTickBehavior(UE.ENiagaraTickBehavior.UsePrereqs)
            this.NS_LightEffect.Add(CurNiagara)
            let CurLoc = this.Spline.GetLocationAtDistanceAlongSpline(this.MeanDdistance * i, UE.ESplineCoordinateSpace.World)
            let FHitResult = $ref(new UE.HitResult)
            this.NS_LightEffect.Get(i).K2_SetWorldLocation(CurLoc, false, FHitResult, false)
            this.NiagaraLocArray.Add(CurLoc)
            CurNiagara.SetVariableLinearColor("Color", new UE.LinearColor(this.data.flowColor.X,this.data.flowColor.Y,this.data.flowColor.Z,this.data.flowColor.W))
            CurNiagara.SetVariableFloat("Scale",this.data.flowScale)
        }
    }
}
