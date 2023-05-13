import { SceneNode } from "../SceneNode";
import { QApiActionComponent } from "../../../Core/Object/API/ApiActionObject";
import * as UE from "ue";
export declare class APISingleNode extends SceneNode {
    bDigitalTwin: boolean;
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): Object;
    toVector(vec: UE.Vector): {
        x: number;
        y: number;
        z: number;
    };
    toRotation(rot: UE.Quat): {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    fromJSON(json: any): void;
    LoadEntry(): void;
    SynTransform(NodesOld: SceneNode[], NodesNew: SceneNode[]): void;
    UnloadEntry(): void;
    GenDefalutModel(curActor: UE.Actor, Action: QApiActionComponent): void;
    SetbDigitalTwin(bdigitalTwin: boolean): void;
    GetbDigitalTwin(): boolean;
    UpdateCoordinate(location: any): void;
}
