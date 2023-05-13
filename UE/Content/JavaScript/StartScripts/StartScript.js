"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/12 上午10:46
 */
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const MiscTools_1 = require("../System/Utils/MiscTools");
let StartType = 0;
if (UE.OpenZIFrameworkLibrary.HasPlugin("OpenZIAPI"))
    StartType = 1;
if (UE.OpenZIFrameworkLibrary.HasPlugin("OpenZIEditor"))
    StartType = 2;
switch (StartType) {
    case 1:
        require("./StartApi");
        break;
    case 2:
        require("../Editor/StartScripts/StartEditor");
        break;
    default:
        (0, MiscTools_1.ERROR)("An error occurred when the script started");
        break;
}
//# sourceMappingURL=StartScript.js.map