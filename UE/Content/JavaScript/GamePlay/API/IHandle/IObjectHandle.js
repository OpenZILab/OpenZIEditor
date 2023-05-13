"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestoryOBJ = exports.SpawnOBJ = void 0;
const ObjectHanldes = require("../Handle/ObjectHandle");
function SpawnOBJ(cls, name) {
    return ObjectHanldes.ObjectHandle.SpawnOBJ(cls, name);
}
exports.SpawnOBJ = SpawnOBJ;
function DestoryOBJ(obj) {
    ObjectHanldes.ObjectHandle.DestoryOBJ(obj);
}
exports.DestoryOBJ = DestoryOBJ;
//# sourceMappingURL=IObjectHandle.js.map