///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/10 18:10
///

import { CSVConfigFilePath } from "../../../System/Setting/FileSetting";
import { GetCSVFileData } from "../Handle/CSVFileDataHandle";


export enum CSVSeparaterType {
    Comma = 0,
    Space = 1,
    Tab = 2,
}

export function GetCSVLevelData(path, type): any {
    if (path == null)
        path = CSVConfigFilePath
    if (type == null)
        type = CSVSeparaterType.Comma
    let filedata = GetCSVFileData(path, type)
    return filedata
}


