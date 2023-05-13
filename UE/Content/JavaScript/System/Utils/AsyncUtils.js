"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午5:21
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncLoad = exports.WaitLatentActionState = void 0;
const UE = require("ue");
function WaitLatentActionState(state) {
    return new Promise((resolve, reject) => {
        state.LatentActionCallback.Bind(() => {
            state.LatentActionCallback.Unbind();
            resolve();
        });
    });
}
exports.WaitLatentActionState = WaitLatentActionState;
function AsyncLoad(path) {
    return new Promise((resolve, reject) => {
        let asyncLoadObj = new UE.AsyncLoadState();
        asyncLoadObj.LoadedCallback.Bind((cls) => {
            asyncLoadObj.LoadedCallback.Unbind();
            if (cls) {
                resolve(cls);
            }
            else {
                reject(`load ${path} fail`);
            }
        });
        asyncLoadObj.StartLoad(path);
    });
}
exports.AsyncLoad = AsyncLoad;
//# sourceMappingURL=AsyncUtils.js.map