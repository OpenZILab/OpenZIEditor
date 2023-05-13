import { QObject } from "../Object/QObject";
import { QComponent } from "./QComponent";
import { ClassType } from "../TsUtils/ClassUtils";
import { Guid } from "guid-typescript";
/**
 * Component container, mix in ComponentsOwner through Mixin
 * This class indicates that components can be mounted
 */
export declare class ComponentContainer extends QObject {
    protected tsComponents: Array<QComponent>;
    constructor();
    protected InitObject(): void;
    protected InitializeComponentsOwner(): void;
    AddTsComponent(component: QComponent): void;
    RemoveTsComponent(component: QComponent): void;
    ClearTsComponents(): void;
    GetAllTsComponents(): Set<QComponent>;
    GetComponentById(id: Guid): QComponent;
    GetComponentsByDisplayName(name: string): QComponent[];
    GetComponentsByClass(cls: ClassType<QComponent>): QComponent[];
    fromJSON_Owner(json: string | {}): void;
}
