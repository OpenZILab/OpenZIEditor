import { SceneNode } from "../SceneNode";
export declare class LevelNode extends SceneNode {
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): Object;
    fromJSON(json: any): void;
    LoadEntry(): void;
    UnloadEntry(): void;
    SetHiddenNode(bHidden: boolean): void;
    ChangeNode(obj: any): void;
    LevelActorTransformChanged(sceneObjects: any): void;
    LevelActorHiddenChanged(actor: any, node: any, bvisbe: any): void;
    RefreshLastPropertyList(obj: any, propertyList: any): void;
    OnLevelLoaded(levelIns: any): void;
    RestoreLevel(): void;
}
