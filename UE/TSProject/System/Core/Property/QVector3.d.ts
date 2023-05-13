import { IVector2 } from "./QVector2";
import { SimpleDelegate, Singlecast } from "../Delegate/Delegate";
import * as UE from "ue";
export interface IVector3 extends IVector2 {
    Z?: number;
}
export declare class QVector3 implements IVector3 {
    X: number;
    Y: number;
    Z: number;
    static Zero: () => QVector3;
    static One: () => QVector3;
    OnModify: Singlecast<SimpleDelegate>;
    constructor(v?: IVector3 | number, y?: number, z?: number);
    set(v: IVector3): void;
    less(v: IVector3): boolean | undefined;
    greater(v: IVector3): boolean | undefined;
    equals(o: IVector3): boolean;
    toUeVector(): UE.Vector;
    toUeRotator(): UE.Rotator;
    deepCopy(): QVector3;
    toString(): string;
    fromJSON(data: any): void;
    toJSON(): string;
}
