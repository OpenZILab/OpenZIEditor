import { IModel } from "./TModel";
export declare function SetValueFromPropertyNameChain(Obj: any, PropertyNameChain: string, Value: any, Tag?: string): void;
export declare function GetValueFromPropertyNameChain(Obj: any, PropertyNameChain: string, DefaultValue: any, Tag?: string): any;
export declare class TViewModel<T extends IModel> {
    private Data;
    private Tag;
    bActive: boolean;
    bNotifyToRootProperty: boolean;
    bNotifyChainProperty: boolean;
    constructor(Data: T, Tag: string, ObservePropertyNames: string[]);
    private OnModelValueChanged;
    SetValue(PropertyNameChain: string, Value: any): void;
    GetValue(PropertyNameChain: string, DefaultValue?: any): any;
}
