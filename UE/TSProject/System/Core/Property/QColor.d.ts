import * as UE from "ue";
import { IVector4, QVector4 } from "./QVector4";
export declare class ColorImpl extends QVector4 {
}
export declare class QColor extends QVector4 {
    private _value?;
    private _default?;
    GetDefaultValue(): ColorImpl;
    ResetToDefault(): void;
    get Value(): ColorImpl;
    GetPropertyValue(): any;
    EqualDefault(): boolean;
    set Value(value: IVector4);
    QuietlySet(value: IVector4): void;
    /**************************************************************
     扩展函数
     **************************************************************/
    ToFColor(): UE.Color;
    ToFLinearColor(): UE.LinearColor;
    /**************************************************************
     基类虚函数
     **************************************************************/
    Duplicate(): QColor;
}
