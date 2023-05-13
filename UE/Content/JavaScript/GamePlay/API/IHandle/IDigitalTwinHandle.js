"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd
/// Created by xLin.,
/// DateTime:  2023/01/13
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDigitalTwinHandle = void 0;
const Sigleton_1 = require("../../../System/Core/Sigleton");
const DigitanTwinHandle_1 = require("../Handle/DigitanTwinHandle");
class IDigitalTwinHandle extends Sigleton_1.Sigleton {
    DigitalTwinHandle;
    static GetInstance() {
        return super.TakeInstance(IDigitalTwinHandle);
    }
    OnInit() {
        this.DigitalTwinHandle = new DigitanTwinHandle_1.DigitalTwinHandle();
    }
    GetAllDigitalTwin() {
        return this.DigitalTwinHandle.GetAllDigitalTwin();
    }
    GetDigitalTwinByName(name) {
        return this.DigitalTwinHandle.GetDigitalTwinByName(name);
    }
    GetDigitalTwinById(id) {
        return this.DigitalTwinHandle.GetDigitalTwinById(id);
    }
    GetDigitalTwinAllAPI(id) {
        return this.DigitalTwinHandle.GetDigitalTwinAllAPI(id);
    }
    GetDigitalTwinAPIById(twinId, apiId) {
        return this.DigitalTwinHandle.GetDigitalTwinAPIById(twinId, apiId);
    }
    SetDigitalTwinLocation(id, location) {
        this.DigitalTwinHandle.SetDigitalTwinLocation(id, location);
    }
    GetDigitalTwinLocaion(id) {
        return this.DigitalTwinHandle.GetDigitalTwinLocaion(id);
    }
    SetDigitalTwinRotation(id, rotation) {
        this.DigitalTwinHandle.SetDigitalTwinRotation(id, rotation);
    }
    GetDigitalTwinRotation(id) {
        return this.DigitalTwinHandle.GetDigitalTwinRotation(id);
    }
    UpdateDigitalTwinAPI(twinId, apiId, Model) {
        this.DigitalTwinHandle.UpdateDigitalTwinAPI(twinId, apiId, Model);
    }
    SetDigitalTwinAPILocationById(twinId, apiId, location) {
        this.DigitalTwinHandle.SetDigitalTwinAPILocationById(twinId, apiId, location);
    }
}
exports.IDigitalTwinHandle = IDigitalTwinHandle;
//# sourceMappingURL=IDigitalTwinHandle.js.map