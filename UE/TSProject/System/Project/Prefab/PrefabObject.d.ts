import * as UE from "ue";
import { SceneNode } from "../Scene/SceneNode";
export declare class PrefabObject extends UE.Object {
    Constructor(): void;
    static New(perfabName?: string): PrefabObject;
    _LoadAllEntry(Nodes: Array<SceneNode>): void;
    _UnLoadEntry(Nodes: Array<SceneNode>): void;
}
