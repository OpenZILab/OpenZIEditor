import * as UE from "ue";
import { QSystem } from "../../Engine/System";
import { SceneNode } from "../Scene/SceneNode";
import { ProjectSystem } from "../Project/ProjectSystem";
export declare const NotPackPrefabNode: string[];
export declare class PrefabSystem extends QSystem {
    AllPrefabNames: string[];
    ProjectSystem: ProjectSystem;
    SelectNode: SceneNode;
    prefabMap: Map<string, SceneNode>;
    prefabs: SceneNode[];
    curPrefabNode: SceneNode;
    bLoad: boolean;
    PreInit(): void;
    Init(): void;
    PostInit(): void;
    Shutdown(): void;
    Tick(DeltaTime: number): void;
    BeginPlay(): void;
    PackPrefab(node: SceneNode): void;
    UnpackPrefab(node: SceneNode): void;
    RefreshPrefab(node: SceneNode): void;
    Serialize(node: SceneNode): void;
    Deserialize(name: string): SceneNode;
    LoadPrefab(name: string, location?: UE.Vector, transfrom?: UE.Transform, Name?: string): SceneNode;
    UnloadPrefab(node: SceneNode): void;
    RegisterNotify(): void;
    AddTagforChildNode(childNodes: SceneNode[]): void;
    RemoveTagforChildNode(childNodes: SceneNode[]): void;
    FindPrefabNum(id: number): number;
    NameExists(name: string): boolean;
    ChildNodeHasPrefab(nodes: any): boolean;
}
