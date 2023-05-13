import { SceneNode } from "../SceneNode";
import * as UE from "ue";
import { DigitalTwin } from "../../DigitalTwin/DigitalTwin";
export declare class DigitalTwinNode extends SceneNode {
    MyActor: UE.Actor;
    TwinName: string;
    TwinTimeLine: string;
    DigitalTwin: DigitalTwin;
    TwinID: string;
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): object;
    fromJSON(json: any): void;
    CopyNode(): SceneNode;
    RemoveComponent(): void;
    AddComponent(): void;
    _AddComponent(SceneObject: any, Nodes: any): void;
    LoadEntry(): void;
    UnloadEntry(): void;
    SetHiddenNode(bHidden: boolean): void;
    /**
     * Get the relative position of Actor
     * @param
     * @return
     */
    GetRelativeTransform(): void;
    /**
     * Gets all interface properties of the current digital twin
     * @param
     * @return
     */
    GetAllAPIList(): any[];
    UpdateAllApiList(twinApiList: any): void;
    bMatchSearchActor(actor: UE.Actor): boolean;
    TryGetActor(): UE.Actor;
}
