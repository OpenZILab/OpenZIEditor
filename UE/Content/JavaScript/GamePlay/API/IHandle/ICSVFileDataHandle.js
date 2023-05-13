"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/10 18:10
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCSVLevelData = exports.CSVSeparaterType = void 0;
const FileSetting_1 = require("../../../System/Setting/FileSetting");
const CSVFileDataHandle_1 = require("../Handle/CSVFileDataHandle");
var CSVSeparaterType;
(function (CSVSeparaterType) {
    CSVSeparaterType[CSVSeparaterType["Comma"] = 0] = "Comma";
    CSVSeparaterType[CSVSeparaterType["Space"] = 1] = "Space";
    CSVSeparaterType[CSVSeparaterType["Tab"] = 2] = "Tab";
})(CSVSeparaterType = exports.CSVSeparaterType || (exports.CSVSeparaterType = {}));
function GetCSVLevelData(path, type) {
    if (path == null)
        path = FileSetting_1.CSVConfigFilePath;
    if (type == null)
        type = CSVSeparaterType.Comma;
    let filedata = (0, CSVFileDataHandle_1.GetCSVFileData)(path, type);
    return filedata;
}
exports.GetCSVLevelData = GetCSVLevelData;
//# sourceMappingURL=ICSVFileDataHandle.js.map