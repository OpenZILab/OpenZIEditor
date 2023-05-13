import { IPropertyMetadata, PropertyMetadata } from "../Property/PropertyMetadata";
import { PropertyHandle } from "../Property/PropertyHandle";
import { NoArgsClassType } from "../TsUtils/ClassUtils";
/**
 * Objects of type QObject must be created through this function, and cannot have parameterized constructors
 * @param Class class
 * @constructor
 */
export declare function NewQObject<T extends QObject>(Class: NoArgsClassType<T>): T;
/**
 * QObject class, the base class of all classes that need to be displayed in the Details panel
 * Support automatic serialization and deserialization of properties
 */
export declare class QObject {
    constructor();
    selfInspection(): void;
    /**
     * Called by the NewQObject function after instantiating the object
     * @protected
     */
    protected objectInitializer(): void;
    createProxy(): void;
    createRecursiveProxy(target: any, handler: ProxyHandler<any>): any;
    private redefinePre;
    private redefinePropertys;
    getPropertyMetadats(): Map<string, PropertyMetadata>;
    GetPropertys(): Array<PropertyHandle<any>>;
    getMetadata(name: string): IPropertyMetadata<any>;
    /**
     * Serialize the object into JSON format
     * By default, only the properties that can be reflected to the panel will be obtained, so additional properties need to be serialized. Please override this function in the subclass and fill in the property name
     * @param extraNames extra attribute names
     */
    toJSON(extraNames?: string[]): any;
    /**
     将 JSON 格式反序列化成对象
     @param json JSON 格式
     */
    fromJSON(json: any): void;
    get ClassName(): string;
    OnPropertyChanged(propertyHandle: PropertyHandle<any>): void;
    /**
     * This method will copy all the properties of the source object to the target object. If the property names are the same, the latter value will overwrite the previous value.
     * The copy here is a shallow copy, that is, if the attribute value of the object is an object or an array, only their references are copied.
     */
    shallowCopy(): any;
    /**
     * This function first judges whether the object to be copied is an object, and then creates a new object according to the constructor new
     * Then, use a for...of loop to iterate over the object's properties, and use recursion to copy each property. Finally return the new copy object.
     * @param obj is used to recursively copy sub-objects
     */
    deepCopy(exclude?: string[]): QObject;
}
