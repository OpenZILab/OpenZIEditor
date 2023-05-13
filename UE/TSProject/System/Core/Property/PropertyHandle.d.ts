import { PropertyMetadata } from "./PropertyMetadata";
import { Multicast, SimpleDelegate } from "../Delegate/Delegate";
/**
 * attribute base class
 */
export declare class PropertyHandle<T> {
    private name;
    private owner;
    private property;
    private metadata;
    OnModify: Multicast<SimpleDelegate>;
    constructor(name: string, owner: any, property: any, metadata: any);
    get Type(): any;
    get Name(): string;
    get DisplayName(): any;
    get Owner(): any;
    get Property(): T;
    QuietlySet(v: T): void;
    set Property(v: T);
    OnChildPropertyModified(): void;
    OnValueChanged(): void;
    CallOwnerValueChange(): void;
    OnPropertyChanged(childHandle: PropertyHandle<any>): void;
    get Metadata(): any;
    set Metadata(v: any);
    /**
     * The property's, outermost object
     * @constructor
     */
    get Outer(): any;
    SetPropertyValue(value: any): void;
    GetPropertyValue(): T;
    GetDefaultValue(): any;
    ResetToDefault(): void;
    EqualDefault(): any;
    Copy(): void;
    Paste(): void;
    deepCopy(): T;
    Duplicate(): PropertyHandle<unknown>;
    fromJSON(v: any): void;
    toJSON(): any;
    CreateDefaultProperty(metadata?: PropertyMetadata): any;
}
export declare class ContainerPropertyHandle<T> extends PropertyHandle<T> {
    constructor(name: string, owner: any, property: any, metadata: any);
    CreateElementPropertyHandle(): any;
}
export declare class ArrayPropertyHandle extends ContainerPropertyHandle<Array<any>> {
    CreateElementPropertyHandle(): PropertyHandle<any>;
    fromJSON(v: any): void;
}
export declare class PairsPropertyHandle extends PropertyHandle<any> {
    keyHandle: PropertyHandle<any>;
    valueHandle: PropertyHandle<any>;
    OldKey: any;
    Index: number;
    constructor(name: string, owner: any, property: any, metadata: any);
    OnPropertyChanged(childHandle: PropertyHandle<any>): void;
    ResetToDefault(): void;
}
export declare class MapPropertyHandle extends ContainerPropertyHandle<Map<any, any>> {
    keyMetadata: PropertyMetadata;
    valueMetadata: PropertyMetadata;
    constructor(name: string, owner: any, property: any, metadata: any);
    CreateElementPropertyHandle(): PairsPropertyHandle;
}
