import { IPropertyMetadata } from "../Property/PropertyMetadata";
/**
 * Constructor that can take parameters
 */
export interface ClassType<T> extends Function {
    new (...args: any[]): T;
}
/**
 * Constructor takes no parameters
 */
export interface NoArgsClassType<T> extends Function {
    new (): T;
}
/**
 * The metadata of the class is added on the prototype, so the value is retrieved through the prototype
 */
export type ClassMetadata = {
    ExpandToStructure?: boolean;
    CustomDetail?: string;
    NoShowComponents?: boolean;
    Struct?: {
        [Others: string]: any;
    };
    Component?: {
        OnlyOne?: boolean;
        Category?: string;
        DisplayName?: string;
        Description?: string;
        CanNotRename?: boolean;
        CanNotDelete?: boolean;
        [Others: string]: any;
    };
    [Others: string]: any;
};
/**
 * class decorator
 */
export declare namespace ClassUtils {
    function registerClass(): (constructor: NoArgsClassType<object>) => void;
    /**
     * Get all registered classes
     */
    function getRegisteredClasses(): Map<string, NoArgsClassType<object>>;
    /**
     * Get the constructor of a class by name
     */
    function getConstructor(name: string): Function;
    function QObjectInitializer<T extends {
        new (...args: any[]): any;
    }>(constructor: T): any;
    function modifyConstruct1(target: any): any;
    function Metadata(metadata: ClassMetadata): <TFunction extends Function>(target: TFunction) => void;
    /**
     * 获取类的metadata
     * @param metadataKey
     * @param target
     * @constructor
     */
    function GetMetadata(metadataKey: string, target: object): any;
    class DynamicProperty {
        name: string;
        metadata?: IPropertyMetadata<any>;
        [options: string]: any;
        constructor(_name: string, _metadata: IPropertyMetadata<any>);
    }
    class DynamicMethod {
    }
    function GenerateClass(className: string, baseClass: new (...args: any[]) => {}, properties?: IPropertyMetadata<any>[], methods?: DynamicMethod): {
        (...args: any[]): void;
        prototype: any;
    };
}
