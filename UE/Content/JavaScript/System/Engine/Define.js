"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/21 下午2:32
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRunType = exports.RunType = void 0;
const UE = require("ue");
var RunType;
(function (RunType) {
    RunType[RunType["Preview"] = 0] = "Preview";
    RunType[RunType["Edit"] = 1] = "Edit";
})(RunType = exports.RunType || (exports.RunType = {}));
function GetRunType() {
    // @ts-ignore
    return UE.CoreFunctionLibrary.GetRunType();
}
exports.GetRunType = GetRunType;
//# sourceMappingURL=Define.js.map