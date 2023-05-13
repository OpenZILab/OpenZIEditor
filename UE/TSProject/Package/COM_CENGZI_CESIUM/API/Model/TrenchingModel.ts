///self.
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/10/17 11:05
///

import { BaseModel } from "../../../../System/API/Model/BaseModel";

export class TrenchingModel extends BaseModel{
    constructor() {
        super()
        this.DefaultData = {
            id: "Flatten_id",
            depth : 500,
            SideMaterial : "Material'/OpenZIAPI/CesiumTools/Material/M_Side.M_Side'",
            ButtomMaterial : "Material'/OpenZIAPI/CesiumTools/Material/M_Buttom.M_Buttom'",
            Vectors:[
            ]
        }
    }
}