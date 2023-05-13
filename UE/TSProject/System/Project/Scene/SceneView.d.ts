import * as UE from "ue";
import { FolderNode } from "./SceneType/FolderNode";
import { SceneNode } from "./SceneNode";
import { ResourceInfo } from "../ResourceReference/ResourceInfo";
export declare class SceneView extends UE.Object {
    DisplayName: string;
    CreateTime: string;
    LastSaveTime: string;
    SceneTree: SceneNode;
    bMainScene: boolean;
    static CurClass: UE.Class;
    Constructor(): void;
    GenDefaultSceneTree(): void;
    GenDefaultActor(): {
        Floor: UE.OpenZIAPI.Blueprints.BP_Twin.BP_Twin_C;
        TsResourceData: ResourceInfo;
    };
    Init(): void;
    Save(): void;
    static New(): SceneView;
    DoLoadEntry(): void;
    DoUnloadEntry(): void;
    Serialize(): string;
    Deserialize(JosnValue: string): FolderNode;
    AddSceneNode<T extends SceneNode>(Entry: T): void;
    GetNodeByName(Name: string): SceneNode;
    private _GetNodeByName;
    GetNodeByActor(Actor: UE.Actor): any;
    _LoadAllEntry(Nodes: Array<SceneNode>): void;
    _UnLoadEntry(Nodes: Array<SceneNode>): void;
}
