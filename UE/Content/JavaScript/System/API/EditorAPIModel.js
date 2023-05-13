"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2023/04/28 17:17
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorAPIModel = void 0;
const QEngine_1 = require("../Engine/QEngine");
const ApiSystem_1 = require("./ApiSystem");
class EditorAPIModel {
    static ApiList = new Array();
    ApiModelMap = new Map();
    //ApiModels:Array<QApiActionObject> = new Array<QApiActionObject>()
    //ApiActionObject:QApiActionObject
    ApiType = "";
    constructor() {
        this.InitPropertyModel();
        this.MakePOIModel();
    }
    GetApiActionObj(Class) {
        let ApiModel;
        if (EditorAPIModel.ApiList === null || EditorAPIModel.ApiList.length === 0) {
            EditorAPIModel.ApiList = (0, QEngine_1.GetSystem)(ApiSystem_1.ApiSystem).GenerateApiList();
        }
        EditorAPIModel.ApiList.forEach((ApiObj) => {
            if (ApiObj.ApiClass === Class) {
                ApiModel = ApiObj.Add;
            }
            else {
                console.warn(`APIList中没有${this.ApiType}`);
            }
        });
        return ApiModel;
    }
    AddProperty(apiModel, property, Value) {
        Object.defineProperty(apiModel, property, { value: Value });
    }
    /**
     * Add properties for the corresponding API module
     */
    MakePOIModel() {
        if (this.ApiModelMap.has("POI")) {
            console.error(`POI的属性面板已经存在`);
        }
        else {
            let POI = this.GetApiActionObj("POI");
            // Object.defineProperty(POI, "AAA", { value: new QString("") })
            // Object.defineProperty(POI, "BBB", { value: new QString("") })
            // Object.defineProperty(POI, "CCC", { value: new QString("") })
            this.ApiModelMap.set("POI", POI);
        }
    }
    /**
     * Initializes default values ​​for all property panels
     */
    InitPropertyModel() {
        if (EditorAPIModel.ApiList === null || EditorAPIModel.ApiList.length === 0) {
            EditorAPIModel.ApiList = (0, QEngine_1.GetSystem)(ApiSystem_1.ApiSystem).GenerateApiList();
        }
        EditorAPIModel.ApiList.forEach((ApiObj) => {
            let ApiModel;
            if (ApiObj.Add) {
                ApiModel = ApiObj.Add;
                this.ApiModelMap.set(ApiObj.ApiClass, ApiModel);
            }
        });
    }
    GetEditorModel(Class) {
        if (this.ApiModelMap.has(Class)) {
            return this.ApiModelMap.get(Class);
        }
        else {
            return null;
        }
    }
    GetAllEditorModels() {
        return this.ApiModelMap;
    }
}
exports.EditorAPIModel = EditorAPIModel;
//# sourceMappingURL=EditorAPIModel.js.map