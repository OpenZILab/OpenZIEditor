import { QComponent } from "../QComponent";
import { QTransform } from "../../Property/QTransform";
import * as UE from "ue";
import { PropertyHandle } from "../../Property/PropertyHandle";
export type OnActorTransformChanged = (transform: QTransform) => void;
export declare class QTransformComponent extends QComponent {
    Transform: QTransform;
    Target: UE.Actor;
    private SceneUpdateToUI;
    constructor();
    OnPropertyChanged(propertyHandle: PropertyHandle<any>): void;
    SetTarget(target: any): void;
    SetOwnerTransform(): void;
    UpdateTransform(): void;
}
