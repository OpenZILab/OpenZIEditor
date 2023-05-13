import { SimpleDelegate, Singlecast } from "../Delegate/Delegate";
export interface IVector2 {
    X?: number;
    Y?: number;
}
export declare class QVector2 implements IVector2 {
    X: number;
    Y: number;
    static Zero: () => QVector2;
    static One: () => QVector2;
    OnModify: Singlecast<SimpleDelegate>;
    constructor(v?: IVector2 | number, y?: number);
    set(v: IVector2): void;
    less(v: IVector2): boolean | undefined;
    greater(v: IVector2): boolean | undefined;
    equals(o: IVector2): boolean;
    deepCopy(): QVector2;
    toString(): string;
    fromJSON(data: any): void;
    toJSON(): {};
}
