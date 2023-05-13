/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2022/10/10 18:10
 */


import * as UE from "ue"
import {$ref} from "puerts";
import {NewArray} from "ue";
import { GetSystem } from "../../../System/Engine/QEngine";
import { ProjectSystem } from "../../../System/Project/Project/ProjectSystem";
import * as path from "path";

export function GetCSVFileData(inpath: string, type: any): any {

    let Path: string =  path.join(GetSystem(ProjectSystem).GetProjectDir(),inpath)
    let Headers: UE.TArray<string> = NewArray(UE.BuiltinString)
    let Data: UE.TArray<string> = NewArray(UE.BuiltinString)
    let Total: number = 0
    let data = []
    let AllData: UE.TArray<string> = NewArray(UE.BuiltinString)

    let bsuccess = UE.FileHelperBPLibrary.ReadCSV(Path,$ref(Headers),$ref(Data),$ref(Total),true)
    if(bsuccess){
        console.error(`Data.Num():${Data.Num()}`)
        console.error(`Data.Num() / Headers.Num():${Data.Num() / Headers.Num()}`)
        
        for (let j = 0;  j <Data.Num() / Headers.Num(); j++) {
            data[j] = []
            for (let i = 0; i < Headers.Num()  ; i++) {
                data[j][i] =  Data.Get(j*Headers.Num()+i)
            }
        }
    }

    return data
}