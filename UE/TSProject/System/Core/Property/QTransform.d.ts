import { IVector3, QVector3 } from "./QVector3";
import { SimpleDelegate, Singlecast } from "../Delegate/Delegate";
import * as UE from "ue";
export interface ITransform {
    Translation?: IVector3;
    Rotation?: IVector3;
    Scale?: IVector3;
}
export declare class QTransform implements ITransform {
    Translation: QVector3;
    Rotation: QVector3;
    Scale: QVector3;
    static Zero: () => QTransform;
    static One: () => QTransform;
    OnModify: Singlecast<SimpleDelegate>;
    constructor(v?: ITransform | IVector3, r?: IVector3, s?: IVector3);
    fromString(str: string): void;
    equals(o: ITransform): boolean;
    set(v: ITransform | UE.Transform): void;
    ToUeTransform(): UE.Transform;
    SetTranslation(x?: number, y?: number, z?: number): void;
    SetRotation(x?: number, y?: number, z?: number): void;
    SetScale3D(x?: number, y?: number, z?: number): void;
    deepCopy(): QTransform;
    toString(): string;
    fromJSON(data: any): void;
    toJSON(): {};
}
