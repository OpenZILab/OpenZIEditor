/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2023/04/28 17:17
 */


import { QApiActionComponent } from "../Core/Object/API/ApiActionObject"
import { QApiObject } from "../Core/Object/API/ApiListClass"
import { GetSystem } from "../Engine/QEngine"
import { ApiSystem } from "./ApiSystem"





export class EditorAPIModel {
    static ApiList: Array<QApiObject> = new Array<QApiObject>()
    ApiModelMap: Map<string, QApiActionComponent> = new Map<string, QApiActionComponent>()
    //ApiModels:Array<QApiActionObject> = new Array<QApiActionObject>()
    //ApiActionObject:QApiActionObject
    ApiType = ""
    constructor() {
        this.InitPropertyModel()
        this.MakePOIModel()
    }

    GetApiActionObj(Class: string): QApiActionComponent {
        let ApiModel: QApiActionComponent
        if (EditorAPIModel.ApiList === null || EditorAPIModel.ApiList.length === 0) {
            EditorAPIModel.ApiList = GetSystem(ApiSystem).GenerateApiList()
        }
        EditorAPIModel.ApiList.forEach((ApiObj: QApiObject) => {
            if (ApiObj.ApiClass === Class) {
                ApiModel = (<any>ApiObj).Add
            } else {
                console.warn(`APIList中没有${this.ApiType}`)
            }
        })
        return ApiModel
    }
    AddProperty(apiModel: QApiActionComponent, property: any, Value: any) {
        Object.defineProperty(apiModel, property, { value: Value })
    }


    /**
     * Add properties for the corresponding API module
     */
    MakePOIModel() {
        if (this.ApiModelMap.has("POI")) {
            console.error(`POI的属性面板已经存在`)
        } else {
            let POI = this.GetApiActionObj("POI")
            // Object.defineProperty(POI, "AAA", { value: new QString("") })
            // Object.defineProperty(POI, "BBB", { value: new QString("") })
            // Object.defineProperty(POI, "CCC", { value: new QString("") })
            this.ApiModelMap.set("POI", POI)
        }
    }

    /**
     * Initializes default values ​​for all property panels
     */
    InitPropertyModel() {
        if (EditorAPIModel.ApiList === null || EditorAPIModel.ApiList.length === 0) {
            EditorAPIModel.ApiList = GetSystem(ApiSystem).GenerateApiList()
        }
        EditorAPIModel.ApiList.forEach((ApiObj: QApiObject) => {
            let ApiModel: QApiActionComponent
            if((<any>ApiObj).Add){
                ApiModel = (<any>ApiObj).Add
                this.ApiModelMap.set(ApiObj.ApiClass, ApiModel)
            }
        })
    }




    GetEditorModel(Class: string): QApiActionComponent {
        if (this.ApiModelMap.has(Class)) {
            return this.ApiModelMap.get(Class)
        } else {
            return null
        }
    }

    GetAllEditorModels() {
        return this.ApiModelMap
    }



}