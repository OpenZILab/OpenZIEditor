import { Sigleton } from "../Sigleton";
import { GetValueFromPropertyNameChain, SetValueFromPropertyNameChain, TViewModel } from "./TViewModel";
import { IModel } from "./TModel";
export declare class ViewModelManager extends Sigleton {
    private ViewModels;
    private constructor();
    static GetInstance(): ViewModelManager;
    OnInit(): void;
    Add<T extends IModel>(Data: T, Tag: string, bNotifyToRootProperty: boolean, bNotifyChainProperty: boolean, bAppendUUID: boolean, ObservePropertyNames: string[]): string;
    Remove(Tag: string): void;
    Get<T extends IModel>(Tag: string): TViewModel<T>;
    AddValue(PropertyNameChain: string, Value: any): void;
    GetValue(PropertyNameChain: string, DefaultValue?: any): any;
    SetValue(PropertyNameChain: string, Value: any): void;
    SetObjectValue: typeof SetValueFromPropertyNameChain;
    GetObjectValue: typeof GetValueFromPropertyNameChain;
    Bind(PropertyNameChain: string, Callback: Function, Target?: {}): void;
    UnBind(PropertyNameChain: string, Target?: {}): void;
    Inactive(): void;
    Active(): void;
}
export declare let GViewModelManager: ViewModelManager;
