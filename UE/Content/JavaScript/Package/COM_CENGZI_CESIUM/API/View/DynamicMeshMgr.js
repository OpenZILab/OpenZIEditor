"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2022/10/18 17.29
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicMeshMgr = void 0;
const UE = require("ue");
class DynamicMeshMgr extends UE.DynamicMeshMgrActor {
    TrenchingActors;
    ReceiveBeginPlay() {
    }
    ReceiveEndPlay(EndPlayReason) {
        if (this.StaticMeshComponent !== null) {
            this.StaticMeshComponent.SetVisibility(true);
        }
    }
}
exports.DynamicMeshMgr = DynamicMeshMgr;
//# sourceMappingURL=DynamicMeshMgr.js.map