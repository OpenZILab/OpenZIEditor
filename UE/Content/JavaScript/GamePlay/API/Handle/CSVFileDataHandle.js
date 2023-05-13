"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2022/10/10 18:10
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCSVFileData = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const QEngine_1 = require("../../../System/Engine/QEngine");
const ProjectSystem_1 = require("../../../System/Project/Project/ProjectSystem");
const path = require("path");
function GetCSVFileData(inpath, type) {
    let Path = path.join((0, QEngine_1.GetSystem)(ProjectSystem_1.ProjectSystem).GetProjectDir(), inpath);
    let Headers = (0, ue_1.NewArray)(UE.BuiltinString);
    let Data = (0, ue_1.NewArray)(UE.BuiltinString);
    let Total = 0;
    let data = [];
    let AllData = (0, ue_1.NewArray)(UE.BuiltinString);
    let bsuccess = UE.FileHelperBPLibrary.ReadCSV(Path, (0, puerts_1.$ref)(Headers), (0, puerts_1.$ref)(Data), (0, puerts_1.$ref)(Total), true);
    if (bsuccess) {
        console.error(`Data.Num():${Data.Num()}`);
        console.error(`Data.Num() / Headers.Num():${Data.Num() / Headers.Num()}`);
        for (let j = 0; j < Data.Num() / Headers.Num(); j++) {
            data[j] = [];
            for (let i = 0; i < Headers.Num(); i++) {
                data[j][i] = Data.Get(j * Headers.Num() + i);
            }
        }
    }
    return data;
}
exports.GetCSVFileData = GetCSVFileData;
//# sourceMappingURL=CSVFileDataHandle.js.map