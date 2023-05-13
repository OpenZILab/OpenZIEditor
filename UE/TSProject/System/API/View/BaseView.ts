///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/26 10:45
///

import * as UE from "ue"
import {blueprint} from 'puerts';

//@no-blueprint
declare module "ue" {
    interface Object {
        CreateDefaultSubobjectGeneric<T extends UE.Object>(SubobjectFName: string, ReturnType: UE.Class): T
    }
}

UE.Object.prototype.CreateDefaultSubobjectGeneric = function CreateDefaultSubobjectGeneric<T extends UE.Object>(SubobjectFName: string, ReturnType: UE.Class): T {
    return this.CreateDefaultSubobject(SubobjectFName, ReturnType, ReturnType, /*bIsRequired =*/ true, /*bIsAbstract =*/ false, /*bTransient =*/ false) as T;
}

//@blueprint
export function GenClass<T extends typeof UE.Object>(path:string):T{
    let ucls = UE.Class.Load(path);
    const BluePrint = blueprint.tojs<T>(ucls);
    return BluePrint
}

//@C++
export class BaseView extends UE.Actor{

    RelativeCoordinates:{X:number,Y:number,Z:number}[] = []
    AbsoluteCoordinates:{X:number,Y:number,Z:number}[] = []
    OriginCoordinate ={X:0,Y:0,Z:0}
    Constructor() {
        this.RelativeCoordinates = []
        this.AbsoluteCoordinates = []
        this.OriginCoordinate ={X:0,Y:0,Z:0}
    }
    //@virtual 
    RefreshView(jsonData): string {
        return "当前View没有实现RefreshView"
    }

    toJSON() {
        // @ts-ignore
        if (this.tsComponents == null)
            return this

        // @ts-ignore
        return { "tsComponents": this.tsComponents }
    }

    CoordinatesToRelative(coordinates:{X:number,Y:number,Z:number}[],originCoordinate:{X:number,Y:number,Z:number}){
        this.RelativeCoordinates = []
        coordinates.forEach(item=>{
            let newCoordinate = this.CoordinateSub(originCoordinate,item)
            this.RelativeCoordinates.push(newCoordinate)
        })
    }
    CoordinatesToAbsolute(coordinates:{X:number,Y:number,Z:number}[],originCoordinate:{X:number,Y:number,Z:number}){
        this.AbsoluteCoordinates = []
        coordinates.forEach(item=>{
            this.AbsoluteCoordinates.push(this.CoordinateAdd(originCoordinate,item))
        })
    }
    CoordinateAdd(originCoordinate:{X:number,Y:number,Z:number},curCoordinate:{X:number,Y:number,Z:number}){
        let newCoordinate ={X:0,Y:0,Z:0}
        newCoordinate.X = originCoordinate.X+curCoordinate.X
        newCoordinate.Y = originCoordinate.Y+curCoordinate.Y
        newCoordinate.Z = originCoordinate.Z+curCoordinate.Z
        return newCoordinate
    }
    CoordinateSub(originCoordinate:{X:number,Y:number,Z:number},curCoordinate:{X:number,Y:number,Z:number}){
        let newCoordinate = {X:0,Y:0,Z:0}
        newCoordinate.X = curCoordinate.X -originCoordinate.X
        newCoordinate.Y = curCoordinate.Y - originCoordinate.Y
        newCoordinate.Z = curCoordinate.Z -originCoordinate.Z
        return newCoordinate
    }

}


