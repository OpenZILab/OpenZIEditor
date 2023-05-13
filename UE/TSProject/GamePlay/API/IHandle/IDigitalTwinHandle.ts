///
/// Copyright by Cengzi Technology Co., Ltd
/// Created by xLin.,
/// DateTime:  2023/01/13
///

import { Sigleton } from "../../../System/Core/Sigleton";
import { DigitalTwinHandle } from "../Handle/DigitanTwinHandle";



export class IDigitalTwinHandle extends Sigleton {


    DigitalTwinHandle: DigitalTwinHandle
    static GetInstance(): IDigitalTwinHandle {
        return super.TakeInstance(IDigitalTwinHandle)
    }

    public OnInit() {
        this.DigitalTwinHandle = new DigitalTwinHandle()
    }

    GetAllDigitalTwin() { 
        return this.DigitalTwinHandle.GetAllDigitalTwin()
    }
    GetDigitalTwinByName(name) { 
        return this.DigitalTwinHandle.GetDigitalTwinByName(name)
    }
    GetDigitalTwinById(id) { 
        return this.DigitalTwinHandle.GetDigitalTwinById(id)
    }
    GetDigitalTwinAllAPI(id) { 
        return this.DigitalTwinHandle.GetDigitalTwinAllAPI(id)
    }
    GetDigitalTwinAPIById(twinId,apiId) { 
        return this.DigitalTwinHandle.GetDigitalTwinAPIById(twinId,apiId)

    }
    SetDigitalTwinLocation(id,location) {
        this.DigitalTwinHandle.SetDigitalTwinLocation(id,location)
     }
    GetDigitalTwinLocaion(id) { 
        return this.DigitalTwinHandle.GetDigitalTwinLocaion(id)
    }
    SetDigitalTwinRotation(id,rotation) { 
        this.DigitalTwinHandle.SetDigitalTwinRotation(id,rotation)
    }
    GetDigitalTwinRotation(id) { 
        return this.DigitalTwinHandle.GetDigitalTwinRotation(id)
    }
    UpdateDigitalTwinAPI(twinId,apiId,Model) {
        this.DigitalTwinHandle.UpdateDigitalTwinAPI(twinId,apiId,Model)
     }

    SetDigitalTwinAPILocationById(twinId,apiId,location) {
        this.DigitalTwinHandle.SetDigitalTwinAPILocationById(twinId,apiId,location)
    }



}