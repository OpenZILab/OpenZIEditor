"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 16:00
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaneBase = void 0;
const UE = require("ue");
const ue_1 = require("ue");
const IMathFunctionHandle_1 = require("../IHandle/IMathFunctionHandle");
const ITriangulateHandle_1 = require("../IHandle/ITriangulateHandle");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
class PlaneBase extends BaseView_1.BaseView {
    //@C++
    Scene;
    Spline;
    ProceduralMesh;
    BottomVertices;
    TopVertices;
    BodyVertices;
    Height;
    Constructor() {
        super.Constructor();
        this.PrimaryActorTick.bCanEverTick = true;
        this.Scene = this.CreateDefaultSubobjectGeneric("Scene", UE.SceneComponent.StaticClass());
        this.Spline = this.CreateDefaultSubobjectGeneric("Spline", UE.SplineComponent.StaticClass());
        this.ProceduralMesh = this.CreateDefaultSubobjectGeneric("ProceduralMesh", UE.ProceduralMeshComponent.StaticClass());
        this.RootComponent = this.Scene;
        this.Spline.SetupAttachment(this.Scene, "Spline");
        this.ProceduralMesh.SetupAttachment(this.Scene, "ProceduralMesh");
        this.BottomVertices = (0, ue_1.NewArray)(UE.Vector);
        this.TopVertices = (0, ue_1.NewArray)(UE.Vector);
        this.BodyVertices = (0, ue_1.NewArray)(UE.Vector);
        this.Height = 0;
    }
    DrawPlane(SectionIndex, Vertices, Material, UVSize, UVRot, UVOffset, bReverse) {
        let tempVertices = Vertices;
        if (bReverse) {
            tempVertices = (0, IMathFunctionHandle_1.ReverseArray)(Vertices);
        }
        let Temp = (0, ITriangulateHandle_1.TriangulationOfPolygon)(tempVertices);
        let Tri = Temp[0];
        let Normal = Temp[1];
        let CurUVs = (0, ITriangulateHandle_1.VertexConversionUVs)(tempVertices, Normal, UVSize, UVRot, UVOffset);
        let Normals = (0, ue_1.NewArray)(UE.Vector);
        let Tangents = UE.NewArray(UE.ProcMeshTangent);
        UE.KismetProceduralMeshLibrary.CalculateTangentsForMesh(tempVertices, Tri, CurUVs, (0, puerts_1.$ref)(Normals), (0, puerts_1.$ref)(Tangents));
        let Size = (0, ITriangulateHandle_1.PolygonTriangulationAreaSum)(tempVertices, Tri, 100);
        this.ProceduralMesh.CreateMeshSection_LinearColor(SectionIndex, tempVertices, Tri, Normals, CurUVs, undefined, undefined, undefined, undefined, Tangents, true);
        this.ProceduralMesh.SetMaterial(SectionIndex, Material);
        let LastUV = CurUVs.Get(CurUVs.Num() - 1);
        let R = [LastUV, Size];
        return R;
    }
}
exports.PlaneBase = PlaneBase;
//# sourceMappingURL=PlaneBase.js.map