import { IVector4, QVector4 } from "./QVector4";
import { ITransform, QTransform } from "./QTransform";
import { IVector2, QVector2 } from "./QVector2";
import { IVector3, QVector3 } from "./QVector3";
import { verifyResult } from "./PropertyValidation";
import { PropertyType } from "./PropertyType";
export declare class IPropertyMetadata<T> {
    displayName?: string;
    category?: string;
    description?: string;
    serialize?: boolean;
    visible?: boolean | ((self: object, key: string) => boolean);
    editable?: boolean | ((self: object, key: string) => boolean);
    default?: T;
    type?: PropertyType;
    [others: string]: any;
}
export declare class PropertyMetadata implements IPropertyMetadata<any> {
    constructor({ displayName, category, description, serialize, visible, editable, default: defaultValue, type, ...rest }?: IPropertyMetadata<any>);
    displayName?: string;
    category?: string;
    description?: string;
    serialize?: boolean;
    visible?: boolean | ((self: object, key: string) => boolean);
    editable?: boolean | ((self: object, key: string) => boolean);
    default?: any;
    type: PropertyType;
    [others: string]: any;
}
export declare class BoolPropertyMetadata extends IPropertyMetadata<boolean> {
    default?: boolean;
    static isBooleanString(value: string): boolean;
    static verifyBool(target: any, metadata: BoolPropertyMetadata, value: any): verifyResult;
}
export declare class StringPropertyMetadata extends IPropertyMetadata<string> {
    default?: string;
    static verifyString(target: any, metadata: StringPropertyMetadata, value: any): verifyResult;
}
export declare class DecimalPropertyMetadata<T> extends IPropertyMetadata<T> {
    decimal?: number;
}
export declare class NumberPropertyMetadata<T> extends DecimalPropertyMetadata<T> {
    min?: any;
    max?: any;
    default?: any;
    constructor(_type: PropertyType);
    static verifyNumber(target: any, metadata: NumberPropertyMetadata<any>, value: number): verifyResult;
    static verifyInteger(target: any, metadata: NumberPropertyMetadata<any>, value: any): verifyResult;
    static verifyFloat(target: any, metadata: NumberPropertyMetadata<any>, value: any): verifyResult;
    static verifyDouble(target: any, metadata: NumberPropertyMetadata<any>, value: any): verifyResult;
    static verifyVector2(target: any, metadata: NumberPropertyMetadata<QVector2>, value: any): verifyResult;
    static verifyVector3(target: any, metadata: NumberPropertyMetadata<QVector3>, value: any): verifyResult;
    static verifyVector4(target: any, metadata: NumberPropertyMetadata<QVector4>, value: IVector4): verifyResult;
    static verifyTransform(target: any, metadata: NumberPropertyMetadata<QTransform>, value: ITransform): verifyResult;
    static verifyColor(target: any, metadata: NumberPropertyMetadata<QVector4>, value: any): verifyResult;
    fromJSON?: (v: any, json: any, metadata: PropertyMetadata) => any;
}
export declare class ObjectPropertyMetadata extends PropertyMetadata {
    class: Function;
    objectArchetype?: any;
    default?: any;
    static verifyObject(target: any, metadata: ObjectPropertyMetadata, value: any): verifyResult;
}
export declare class StructPropertyMetadata extends ObjectPropertyMetadata {
    default?: any;
    static verifyStruct(target: any, metadata: StructPropertyMetadata, value: any): verifyResult;
}
export declare class EnumPropertyMetadata extends PropertyMetadata {
    default?: number;
    enumClass: object;
    valueAsString?: boolean;
    getNames?: () => string[];
    static verifyEnum(target: any, metadata: EnumPropertyMetadata, value: any): verifyResult;
    toJSON?: (v: any, metadata: EnumPropertyMetadata) => number | string;
    fromJSON?: (v: number, json: any, metadata: EnumPropertyMetadata) => number | string;
}
export declare class ContainerPropertyMetadata<T> extends IPropertyMetadata<T> {
    valueMetadata: PropertyMetadata;
}
export declare class SetPropertyMetadata<T> extends ContainerPropertyMetadata<T> {
}
export declare class ArrayPropertyMetadata<T> extends ContainerPropertyMetadata<T> {
    static verifyArray(target: any, metadata: PropertyMetadata, value: any): verifyResult;
    toJSON?: (arr: Array<any>, metadata: ArrayPropertyMetadata<any>) => any;
    fromJSON?: (arr: Array<any>, json: any, metadata: ArrayPropertyMetadata<any>) => any[];
}
export declare class MapPropertyMetadata<T> extends ContainerPropertyMetadata<T> {
    keyMetadata: PropertyMetadata;
    static verifyMap(target: any, metadata: PropertyMetadata, value: any): verifyResult;
    fromJSON?: (map: Map<any, any>, json: any, metadata: MapPropertyMetadata<any>) => Map<any, any>;
}
/**
 * Solution 1: To dynamically generate a class, it is necessary to verify whether the technical solution is feasible, whether the decorator, inheritance, and import file are valid
 * Solution 2: Wrap attributes, each attribute contains its own metadata
 *
 * Note: deep copy requires metadata
 *
 */
export declare const __Properties__ = "__Properties__";
export declare const __Property_Metadata__ = "__Property_Metadata__";
export declare const __Dynamic_Instance_Properties__ = "__Dynamic_Instance_Properties__";
/**
 * Decorator: basic information of mark attribute
 */
export declare function addPropertyMetadata<T>(metadata?: IPropertyMetadata<T>, type?: PropertyType, dv?: any): (target: any, propertyKey: string) => void;
export declare function array(metadata: ArrayPropertyMetadata<Array<any>>): (target: any, propertyKey: string) => void;
export declare function bool(metadata: BoolPropertyMetadata): (target: any, propertyKey: string) => void;
export declare function color(metadata: NumberPropertyMetadata<QVector4>): (target: any, propertyKey: string) => void;
export declare function double(metadata: NumberPropertyMetadata<number>): (target: any, propertyKey: string) => void;
export declare function enumType(metadata: Omit<EnumPropertyMetadata, "type">): (target: any, propertyKey: string) => void;
export declare function float(metadata: NumberPropertyMetadata<number>): (target: any, propertyKey: string) => void;
export declare function integer(metadata: NumberPropertyMetadata<number>): (target: any, propertyKey: string) => void;
export declare function map(metadata: MapPropertyMetadata<Map<any, any>>): (target: any, propertyKey: string) => void;
export declare function object(metadata: Omit<ObjectPropertyMetadata, "type">): (target: any, propertyKey: string) => void;
export declare function string(metadata: StringPropertyMetadata): (target: any, propertyKey: string) => void;
export declare function struct(metadata: Omit<StructPropertyMetadata, "type">): (target: any, propertyKey: string) => void;
export declare function transform(metadata: NumberPropertyMetadata<ITransform>): (target: any, propertyKey: string) => void;
export declare function vector2(metadata: NumberPropertyMetadata<IVector2>): (target: any, propertyKey: string) => void;
export declare function vector3(metadata: NumberPropertyMetadata<IVector3>): (target: any, propertyKey: string) => void;
export declare function vector4(metadata: NumberPropertyMetadata<IVector4>): (target: any, propertyKey: string) => void;
export declare function property(metadata: Omit<PropertyMetadata, "type">): (target: any, propertyKey: string) => void;
