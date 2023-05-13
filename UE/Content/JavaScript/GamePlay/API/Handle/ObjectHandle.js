"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectHandle = void 0;
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/10 18:10
///
const UE = require("ue");
UE.Object.prototype.CreateDefaultSubobjectGeneric = function CreateDefaultSubobjectGeneric(SubobjectFName, ReturnType) {
    return this.CreateDefaultSubobject(SubobjectFName, ReturnType, ReturnType, /*bIsRequired =*/ true, /*bIsAbstract =*/ false, /*bTransient =*/ false);
};
class ObjectHandle {
    static SpawnOBJ(cls, Name) {
        let curActor = UE.OpenZIFrameworkLibrary.SpawnAPIActor(cls, Name);
        console.log(curActor.GetName());
        if (curActor !== null) {
            return curActor;
        }
        return null;
    }
    static DestoryOBJ(obj) {
        if (obj !== null && obj instanceof UE.Actor) {
            obj.K2_DestroyActor();
        }
    }
}
exports.ObjectHandle = ObjectHandle;
//# sourceMappingURL=ObjectHandle.js.map