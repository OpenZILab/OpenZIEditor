"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/26 16:25
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseArray = void 0;
const UE = require("ue");
const ue_1 = require("ue");
function ReverseArray(Vec) {
    let InVecs = (0, ue_1.NewArray)(UE.Vector);
    let n = Vec.Num();
    for (let i = 0; i < n; i++) {
        InVecs.Add(Vec.Get(n - i - 1));
    }
    return InVecs;
}
exports.ReverseArray = ReverseArray;
//# sourceMappingURL=MathFunctionHandle.js.map