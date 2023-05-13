import 'reflect-metadata';
import { ElementType, QMapKeyElementType } from '../Property/PropertyType';
export declare enum PropertyFlags {
    Edit = 0,
    Visible = 1,
    Config = 2,
    Key = 3,
    Value = 4,
    KeyAndValue = 5,
    SkipSerialization = 6
}
/**
 * Attribute metadata is added to the attribute Metadata, so it can be retrieved through a string, such as: Reflect.getMetadata(“QArray.ElementType”, target, keyName)
 */
export type PropertyMetadata = {
    Invisible?: boolean;
    NotSerialize?: boolean;
    NotEditable?: boolean;
    Description?: string;
    Category?: string;
    EditCondition?: string;
    ElementMin?: any;
    ElementMax?: any;
    QArray?: {
        ElementType?: ElementType;
        [Others: string]: any;
    };
    QMap?: {
        KeyElementType?: QMapKeyElementType;
        ValueElementType?: ElementType;
        [Others: string]: any;
    };
    QEnum?: {
        Names?: string[];
        Type?: PropertyFlags.Key | PropertyFlags.Value | PropertyFlags.KeyAndValue;
        [Others: string]: any;
    };
    Metadata?: {};
    [Others: string]: any;
};
/**
 * property decorator
 */
export declare namespace PropertyUtils {
    function Metadata(metadata: PropertyMetadata): (target: Object, propertyKey: string | symbol) => void;
    function GetMetadata(metadataKey: any, target: Object, propertyKey: string | symbol): any;
}
