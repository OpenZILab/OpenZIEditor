import { PropertyHandle } from "../Property/PropertyHandle";
import { QObject } from "../Object/QObject";
import { Guid } from "guid-typescript";
import { ComponentContainer } from "./ComponentContainer";
export declare class QComponent extends QObject {
    private displayName;
    private category;
    protected owner: ComponentContainer;
    protected parent: QComponent;
    protected children: Array<QComponent>;
    private readonly guid;
    constructor();
    protected objectInitializer(): void;
    Initialize(): void;
    GetID(): Guid;
    GetDisplayName(): string;
    SetDisplayName(name: string): void;
    GetCategory(): string;
    GetOnlyOne(): any;
    GetOwner(): ComponentContainer;
    SetOwner(owner: ComponentContainer): void;
    GetParent(): QComponent;
    GetChildren(): QComponent[];
    AttachToComponent(parent: QComponent): void;
    DetachFromParent(): void;
    Serialize(Ar: string): void;
    ForEach(callback: (component: QComponent) => void, recursion?: boolean): void;
    fromJSON(json: string | {}): any;
}
export declare class HaveActiveComponent extends QComponent {
    protected active: boolean;
    Initialize(): void;
    SetActive(bNewActive: boolean): void;
    IsActive(): boolean;
    OnPropertyChanged(propertyHandle: PropertyHandle<any>): void;
}
/**
 * Components with a lifecycle
 */
export declare class HaveLifeComponent extends HaveActiveComponent {
    protected CanTick: boolean;
    GetCanTick(): boolean;
    BeginPlay(): void;
    Tick(delta: number): void;
    EndPlay(): void;
    Destroy(): void;
}
