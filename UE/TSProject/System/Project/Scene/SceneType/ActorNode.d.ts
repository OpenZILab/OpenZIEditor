import { SceneNode } from "../SceneNode";
import * as UE from "ue";
export declare class ActorNode extends SceneNode {
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): {
        [key: string]: any;
    };
    fromJSON(json: any): void;
    CopyNode(): SceneNode;
    LoadEntry(): void;
    UnloadEntry(): void;
    SetHiddenNode(bHidden: boolean): void;
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
    bMatchSearchActor(actor: UE.Actor): boolean;
    TryGetActor(): UE.Actor;
}
