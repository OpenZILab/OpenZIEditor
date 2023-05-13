"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/21 17:52
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonTriangulationAreaSum = exports.VertexConversionUVs = exports.TriangulationOfPolygon = void 0;
const TriangulateHandle = require("../Handle/TriangulateHandle");
function TriangulationOfPolygon(Vertices) {
    return TriangulateHandle.TriangulationOfPolygon(Vertices);
}
exports.TriangulationOfPolygon = TriangulationOfPolygon;
function VertexConversionUVs(Vertices, Normal, UVszie, UVRot, UVOffset) {
    return TriangulateHandle.VertexConversionUVs(Vertices, Normal, UVszie, UVRot, UVOffset);
}
exports.VertexConversionUVs = VertexConversionUVs;
function PolygonTriangulationAreaSum(Points, Tri, UnitScale) {
    return TriangulateHandle.PolygonTriangulationAreaSum(Points, Tri, UnitScale);
}
exports.PolygonTriangulationAreaSum = PolygonTriangulationAreaSum;
//# sourceMappingURL=ITriangulateHandle.js.map