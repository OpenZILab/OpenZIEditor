"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/26 10:45
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseView = exports.GenClass = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
UE.Object.prototype.CreateDefaultSubobjectGeneric = function CreateDefaultSubobjectGeneric(SubobjectFName, ReturnType) {
    return this.CreateDefaultSubobject(SubobjectFName, ReturnType, ReturnType, /*bIsRequired =*/ true, /*bIsAbstract =*/ false, /*bTransient =*/ false);
};
//@blueprint
function GenClass(path) {
    let ucls = UE.Class.Load(path);
    const BluePrint = puerts_1.blueprint.tojs(ucls);
    return BluePrint;
}
exports.GenClass = GenClass;
//@C++
class BaseView extends UE.Actor {
    RelativeCoordinates = [];
    AbsoluteCoordinates = [];
    OriginCoordinate = { X: 0, Y: 0, Z: 0 };
    Constructor() {
        this.RelativeCoordinates = [];
        this.AbsoluteCoordinates = [];
        this.OriginCoordinate = { X: 0, Y: 0, Z: 0 };
    }
    //@virtual 
    RefreshView(jsonData) {
        return "当前View没有实现RefreshView";
    }
    toJSON() {
        // @ts-ignore
        if (this.tsComponents == null)
            return this;
        // @ts-ignore
        return { "tsComponents": this.tsComponents };
    }
    CoordinatesToRelative(coordinates, originCoordinate) {
        this.RelativeCoordinates = [];
        coordinates.forEach(item => {
            let newCoordinate = this.CoordinateSub(originCoordinate, item);
            this.RelativeCoordinates.push(newCoordinate);
        });
    }
    CoordinatesToAbsolute(coordinates, originCoordinate) {
        this.AbsoluteCoordinates = [];
        coordinates.forEach(item => {
            this.AbsoluteCoordinates.push(this.CoordinateAdd(originCoordinate, item));
        });
    }
    CoordinateAdd(originCoordinate, curCoordinate) {
        let newCoordinate = { X: 0, Y: 0, Z: 0 };
        newCoordinate.X = originCoordinate.X + curCoordinate.X;
        newCoordinate.Y = originCoordinate.Y + curCoordinate.Y;
        newCoordinate.Z = originCoordinate.Z + curCoordinate.Z;
        return newCoordinate;
    }
    CoordinateSub(originCoordinate, curCoordinate) {
        let newCoordinate = { X: 0, Y: 0, Z: 0 };
        newCoordinate.X = curCoordinate.X - originCoordinate.X;
        newCoordinate.Y = curCoordinate.Y - originCoordinate.Y;
        newCoordinate.Z = curCoordinate.Z - originCoordinate.Z;
        return newCoordinate;
    }
}
exports.BaseView = BaseView;
//# sourceMappingURL=BaseView.js.map