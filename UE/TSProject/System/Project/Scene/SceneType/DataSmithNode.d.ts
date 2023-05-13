import { SceneNode } from "../SceneNode";
import * as UE from "ue";
import { ActorNode } from "./ActorNode";
export declare class DataSmithNode extends ActorNode {
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): object;
    fromJSON(json: any): void;
    CopyNode(): SceneNode;
    LoadEntry(): void;
    SpawnEntry(): void;
    UnloadEntry(): void;
    ActorTransformChanged(sceneObjects: any): void;
    ActorHiddenChanged(): void;
    OnDataSmithActorImportEnd(Actor: any): void;
    bMatchSearchActor(actor: UE.Actor): boolean;
    TryGetActor(): UE.Actor;
}
