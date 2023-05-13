import * as UE from "ue";
import { BaseView } from "../../API/View/BaseView";
import { SceneNode } from "./SceneNode";
import { DataSmithNode } from "./SceneType/DataSmithNode";
export type Et_Actor = UE.Actor;
export type Et_Object = UE.Object;
export type Et_Folder = JSON;
export type Et_API = BaseView;
export declare function GenNode(InJsonData: any, ParentNode: any): SceneNode;
export declare class NamingHelper {
    RootName: string;
    Repeat: boolean;
    AllName: string[];
    constructor(rootName: string);
    RegisterAllNames(allName: any): void;
    bRepeat(newName: string): void;
    GetNewName(): string;
    static GetTrueName(name: any): any;
}
export declare class TransformHelper {
    static TransformToJson(Transform: UE.Transform): {
        T: {
            x: number;
            y: number;
            z: number;
        };
        R: {
            x: number;
            y: number;
            z: number;
            w: number;
        };
        S: {
            x: number;
            y: number;
            z: number;
        };
    };
    static VectorToJson(vec: UE.Vector): {
        x: number;
        y: number;
        z: number;
    };
    static QVectorToJson(vec: UE.Vector): {
        X: number;
        Y: number;
        Z: number;
    };
    static RotationToJson(rot: UE.Quat): {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    static RotatorToJson(rot: UE.Rotator): {
        x: number;
        y: number;
        z: number;
    };
    static JsonToTransform(transform: any): UE.Transform;
    static JsonToVector(json: any): UE.Vector;
    static QJsonToVector(json: any): UE.Vector;
    static StrToVector(json: any): UE.Vector;
    static JsonToRotator(json: any): UE.Rotator;
}
export declare function GetActorUUName(Actor: UE.Actor): {
    ActorName: string;
    LevelName: string;
};
export declare class TimerHelper {
    seperator: string;
    constructor();
    SetSeperator(Inseperator: string): void;
    zeroPadd(indate: any): {
        time: string;
        currentdate: string;
    };
    getNowFormatDate(): {
        time: string;
        currentdate: string;
    };
    accessTimeInAnHour(): {
        time: string;
        currentdate: string;
    };
}
export declare enum EFindType {
    id = 0,
    name = 1,
    actor = 2,
    obj = 3
}
export declare class NodeHelper {
    static FindParentTwinByChild(childNode: any): any;
    static MergeAttribute(InTwinBodys: any, changePropertys: any): void;
    static MergeNode(Nodes: any, changeNodes: any): void;
    static GetAttributeDifferences(IntwinBodys: any, path: any): any[];
    static SynchronousTags(newNodes: any, oldNodes: any): void;
    static FindTwinBodyById(ttt: any, Id: any): any;
    static GetNodesAttributeDiff(newNodes: any, oldNodes: any, ChangeNodes: any): void;
    static GetPrefabNodeAttributeDiff(newNode: any, path: any): any[];
    static MergePrefabNode(node: any, changeNode: any): void;
    static FindSceneNode(findType: EFindType, findValue: any): SceneNode;
    static GetRootNode(): SceneNode;
    static FindNodeById(Nodes: any, Id: any): any;
    static FindNodeByActor(actor: UE.Actor): any;
    static FindNodeBySceneObject(obj: UE.SceneObject): any;
    static FindNodeByDigitalTwinObject(obj: UE.SceneObject): any;
    static TwinFindNodeByActor(actor: any): any;
    static GetNodeActor(Node: SceneNode): any;
    static CopyNodes(Nodes: SceneNode[]): void;
    static LoadNodeEntry(Node: any): void;
    /**
 * node attachment
 * @param perNode: parent node
 * @param childNode: child node
 */
    static NodeAttach(preNode: SceneNode, childNode: SceneNode, bKeepWorld: boolean): void;
    /**
    * node separation
    * @param perNode: parent node
    * @param childNode: child node
    */
    static NodeDetach(preNode: SceneNode, childNode: SceneNode, bKeepWorld: boolean): void;
    static FindTwinNodeFormChildTwin(node: any): any;
    static FindComponentByName(Node: any, Name: any): any;
    static SynPosition(Nodes: SceneNode[]): void;
    static _GetNodeByActor(Actor: any, NodeList: any): any;
    static UpdateCoordinate(Nodes: any): void;
    static GetNodeAllChilds(SceneNode: SceneNode, ChildNodes: SceneNode[]): void;
    static GetNodeByName(node: SceneNode, Name: string): SceneNode;
    static _GetNodeByName(Name: string, NodeList: Array<SceneNode>): SceneNode;
}
export declare class APIHelper {
    static FindNewIdFormAPI(ViewModel: any, id: any): any;
}
export declare class DataSmithHelper {
    static SpawnChildNode(Node: DataSmithNode, Actor: UE.Actor): void;
    static _SpawnChildNode(Actors: UE.TArray<UE.Actor>, Node: SceneNode, dataSmithNode: DataSmithNode): void;
    static DeleteChildNode(Nodes: SceneNode[]): void;
    static SynProperty(Node: SceneNode, Actor: UE.Actor): boolean;
}
export declare class MathHelper {
    /**
     * Whether two arrays contain the same elements
     * @param
     * @return
     */
    static ArraysHasSameElem(arr1: any[], arr2: any[]): boolean;
}
export declare class HttpHelper {
}
