import { IVector3 } from "./QVector3";
import { SimpleDelegate, Singlecast } from "../Delegate/Delegate";
import * as UE from "ue";
export interface IVector4 extends IVector3 {
    W?: number;
}
export declare class QVector4 implements IVector4 {
    X: number;
    Y: number;
    Z: number;
    W: number;
    static Zero: () => QVector4;
    static One: () => QVector4;
    OnModify: Singlecast<SimpleDelegate>;
    constructor(v?: IVector4 | number, y?: number, z?: number, w?: number);
    fromString(str: string): void;
    equals(o: IVector4): boolean;
    set(v: IVector4): void;
    less(v: IVector4): boolean | undefined;
    greater(v: IVector4): boolean | undefined;
    ToFLinearColor(): UE.LinearColor;
    deepCopy(): QVector4;
    toString(): string;
    fromJSON(data: any): void;
    toJSON(): {};
}
