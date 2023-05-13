import { QSystem } from "../../Engine/System";
export declare class LevelSystem extends QSystem {
    PreInit(): void;
    Init(): void;
    PostInit(): void;
    BeginPlay(): void;
    Shutdown(): void;
    Tick(DeltaTime: number): void;
    LevelAsset: Map<string, any>;
    AddLevel(Name: any, Ins: any): void;
    RemoveLevel(Name: any): void;
    GetLevel(Name: any): any;
    SetLevel(Name: any, Ins: any): void;
    GetAllLevel(): Map<string, any>;
    bContainLevel(Name: any): boolean;
    ClearLevel(): void;
    GetLevelState(): void;
}
