///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///


import { BaseViewModel } from "./BaseViewModel"

export class SingleViewModel extends BaseViewModel {
    SingleObject: any
    constructor() {
        super()
        this.SingleObject = null
    }

    SpawnObject(msg) {

        return "SpawnObjectSuccess"
    }
    UpdateObject(msg){
       return "UpdateObjctSuccess"
    }

    GetObject() {
        return this.SingleObject
    }
   
}

