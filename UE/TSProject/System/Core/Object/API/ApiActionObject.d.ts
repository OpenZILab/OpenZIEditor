import { QComponent } from "../../Component/QComponent";
import { PropertyHandle } from "../../Property/PropertyHandle";
import * as UE from "ue";
export declare class QApiActionComponent extends QComponent {
    Description: string;
    ApiClass: string;
    DisplayName: string;
    Method: string;
    bAssign: boolean;
    bNotify: boolean;
    bGenerateForApiList: boolean;
    protected objectInitializer(): void;
    Duplicate(): QApiActionComponent;
    toModel(): any;
    toAPIModel(): any;
    toExeAPICopy(): string;
    fromModel(ModelData: any): void;
    deepCopy(): QApiActionComponent;
    OnPropertyChanged(propertyHandle: PropertyHandle<any>): void;
    CreateCustomDetailWidget(): UE.UserWidget;
    toJSON(): any;
}
