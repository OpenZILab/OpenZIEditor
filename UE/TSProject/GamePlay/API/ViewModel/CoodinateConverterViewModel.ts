///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/229 09:29
///

import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {CoodinateConverterView} from "../View/CoodinateConverterView"
import {PackCallBacKMessage} from "../../../System/API/IHandle/IAPIMessageHandle"
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer"
import {CoodinateConventerModel} from "../Model/CoodinateConventerModel"

export class CoodinateConverterViewModel extends BaseViewModel {

    OBJ: CoodinateConverterView

    constructor() {
        super()
        this.BaseModel = new CoodinateConventerModel()
        this.OBJ = new CoodinateConverterView()
        this.Type = "CoodinateConventer"
        this.Birthplace = "Scene"
    }

    SpawnCesiumGeo() {

    }

    RefreshCoordinate(jsonData): Boolean {
        let _data = jsonData
        this.BaseModel.SetSingleData(_data.data)
        _data.data = this.BaseModel.GetSingleData()
        let IsSuccess = this.OBJ.RefreshCoordinate(_data)
        return IsSuccess
    }

    InitGeo() {
        let temp: any
        temp.data = {}
        this.RefreshCoordinate(temp)
    }

    Refresh(msg) {
        let IsSuccess = this.RefreshCoordinate(msg)
        if (IsSuccess !== true) {
            msg.data.result = "Coordinate system switch failed"
        } else {
            msg.data.result = "Coordinate system switch successful"
            if (this.BaseModel.IsOverRange) {
                msg.data.result = "Coordinate system switch successful, but Some data is over the limit"
            }
        }
        let message = PackCallBacKMessage(msg, msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }

    GetGISType() {
        return this.OBJ.GetGIS_Type()
    }

    GetScale() {
        return this.OBJ.GetScale()
    }


    SetCesiumGeo(location) {
        this.OBJ.SetCesiumGeoLngLatHeight(location)
    }

    UpdateGeoLngLatHeight(location) {
        this.OBJ.UpdateGeoLngLatHeight(location)
    }

    GetCesiumGeo() {
        return this.OBJ.GeoReferencingSystem
    }


    GetOriginLocation() {
        return this.OBJ.GetOriginLocation()
    }

    ReturnToplaneOrigin() {
        let SingleData = this.BaseModel.GetSingleData()
        if (SingleData) {
            this.OBJ.RefreshCoordinate({data:SingleData})
        }
    }


}






