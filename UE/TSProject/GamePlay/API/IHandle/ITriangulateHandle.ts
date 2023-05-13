///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/21 17:52
///

import * as TriangulateHandle from "../Handle/TriangulateHandle";

export function TriangulationOfPolygon(Vertices): any{
    return TriangulateHandle.TriangulationOfPolygon(Vertices)
}
export function VertexConversionUVs(Vertices,Normal,UVszie,UVRot,UVOffset): any{
    return TriangulateHandle.VertexConversionUVs(Vertices,Normal,UVszie,UVRot,UVOffset)
}
export function PolygonTriangulationAreaSum(Points,Tri,UnitScale): number{
    return TriangulateHandle.PolygonTriangulationAreaSum(Points,Tri,UnitScale)
}