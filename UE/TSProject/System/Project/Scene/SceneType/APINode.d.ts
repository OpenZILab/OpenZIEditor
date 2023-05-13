import { SceneNode } from "../SceneNode";
import { QApiActionComponent } from "../../../Core/Object/API/ApiActionObject";
import * as UE from "ue";
export declare const NeedDeleteNodeTags: string[];
export declare const NeedDeleteNodeClass: string[];
export declare const StaticNode: string[];
export declare class APINode extends SceneNode {
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): Object;
    fromJSON(json: any): void;
    CopyNode(): SceneNode;
    SetHiddenNode(bHidden: boolean): void;
    LoadEntry(): void;
    /**
     * Judgment against the digital twin
     * @param
     * @return
     */
    NameExists(Name: any, ViewModel: any): any;
    UnloadEntry(): void;
    GenDefalutModel(ClassName: string, Func: string, data: any, curActor: UE.Actor, Action?: QApiActionComponent): void;
    /**
     * Whether the current node is displayed in the outline
     * @param
     * @return
     */
    ShowInOutLine(): void;
    /**
     * Get the relative position of Actor
     * @param
     * @return
     */
    GetRelativeTransform(): void;
    UpdateCoordinate(): void;
    UpdateComponent(id: any): void;
    FindTwinRootNode(node: SceneNode): any;
    bMatchSearchActor(actor: UE.Actor): boolean;
    TryGetActor(): UE.Actor;
}
