import { QSystem } from "../../Engine/System";
import { QComponent } from "./QComponent";
export declare class ComponentInfo {
    Name: string;
    DisplayName: string;
    OnlyOne: boolean;
    Description: string;
    Category: string;
    spawner: () => QComponent;
}
export declare class ComponentSystem extends QSystem {
    private Spawner;
    private ComponentInstances;
    Init(): void;
    RegisterComponents(): void;
    RegisterComponent(info: ComponentInfo): void;
    CreateComponent(className: string): QComponent;
    GetAllClasses(): Set<ComponentInfo>;
    AddComponentInstance(component: QComponent): void;
    RemoveComponentInstance(component: QComponent): void;
    ClearComponentInstance(): void;
    Tick(DeltaTime: number): void;
}
