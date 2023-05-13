///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 16:00
///

import * as UE from 'ue'
import {NewArray} from "ue";
import {ReverseArray} from "../IHandle/IMathFunctionHandle";
import {
    PolygonTriangulationAreaSum,
    TriangulationOfPolygon,
    VertexConversionUVs
} from "../IHandle/ITriangulateHandle";
import {$ref} from "puerts";
import {BaseView} from "../../../System/API/View/BaseView";

export class PlaneBase extends BaseView {

    //@C++
    Scene: UE.SceneComponent
    Spline: UE.SplineComponent
    ProceduralMesh: UE.ProceduralMeshComponent
    BottomVertices:UE.TArray<UE.Vector>
    TopVertices:UE.TArray<UE.Vector>
    BodyVertices:UE.TArray<UE.Vector>
    Height:number

    Constructor(): void {
        super.Constructor()
        this.PrimaryActorTick.bCanEverTick = true;
        this.Scene = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>("Scene", UE.SceneComponent.StaticClass())
        this.Spline = this.CreateDefaultSubobjectGeneric<UE.SplineComponent>("Spline", UE.SplineComponent.StaticClass())
        this.ProceduralMesh = this.CreateDefaultSubobjectGeneric<UE.ProceduralMeshComponent>("ProceduralMesh", UE.ProceduralMeshComponent.StaticClass())
        this.RootComponent = this.Scene
        this.Spline.SetupAttachment(this.Scene, "Spline")
        this.ProceduralMesh.SetupAttachment(this.Scene,"ProceduralMesh")
        this.BottomVertices = NewArray(UE.Vector)
        this.TopVertices = NewArray(UE.Vector)
        this.BodyVertices = NewArray(UE.Vector)
        this.Height = 0
    }

    DrawPlane(SectionIndex,Vertices,Material,UVSize,UVRot,UVOffset,bReverse): any {
        let tempVertices = Vertices
        if (bReverse){
            tempVertices = ReverseArray(Vertices)
        }
        let Temp = TriangulationOfPolygon(tempVertices)
        let Tri = Temp[0]
        let Normal = Temp[1]
        let CurUVs = VertexConversionUVs(tempVertices,Normal,UVSize,UVRot,UVOffset)
        let Normals = NewArray(UE.Vector)
        let Tangents = UE.NewArray(UE.ProcMeshTangent)
        UE.KismetProceduralMeshLibrary.CalculateTangentsForMesh(tempVertices,Tri,CurUVs,$ref(Normals),$ref(Tangents))
        let Size = PolygonTriangulationAreaSum(tempVertices,Tri,100)
        this.ProceduralMesh.CreateMeshSection_LinearColor(SectionIndex,tempVertices,Tri,Normals,CurUVs,undefined,undefined,undefined,undefined,Tangents,true)
        this.ProceduralMesh.SetMaterial(SectionIndex,Material)
        let LastUV = CurUVs.Get(CurUVs.Num() - 1)
        let R : [any,any] = [LastUV,Size]
        return R
    }
}
