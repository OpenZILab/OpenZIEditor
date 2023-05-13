export interface IModel {
}
export declare class TModel<T extends IModel> {
    private ValueChangedCallback;
    private ObservePropertyNames;
    constructor(Obj: T, ValueChangedCallback: (NewValue: any, OldValue: any, PropertyNameChain: string[]) => void, ObservePropertyNames: string[]);
    private Observe;
    private ObserveArray;
}
