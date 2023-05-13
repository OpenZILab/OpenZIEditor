"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/15 14:30
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sigleton = void 0;
class Sigleton {
    OnInit() { }
    OnDestory() { }
    static InstanceList = [];
    static InstanceCount = 0;
    static DebugInstanceCount() {
        return this.InstanceCount;
    }
    static TakeInstance(Obj) {
        if (Obj.Ins == null) {
            Obj.Ins = new Obj();
            Obj.Ins.OnInit();
            this.InstanceCount = this.InstanceCount + 1;
            this.InstanceList.push(Obj.Ins);
        }
        return Obj.Ins;
    }
    static DeleteInstance(Obj) {
        if (Obj.Ins !== null) {
            Obj.Ins.OnDestory();
            let instanceLength = this.InstanceList.length;
            for (let i = instanceLength - 1; i >= 0; i--) {
                if (this.InstanceList[i] == Obj.Ins) {
                    this.InstanceCount = this.InstanceCount - 1;
                    this.InstanceList.splice(i, 1);
                }
            }
            Obj.Ins = null;
        }
        return Obj.Ins;
    }
}
exports.Sigleton = Sigleton;
//# sourceMappingURL=Sigleton.js.map