import { TwinBody } from "./TwinBody";
import * as UE from "ue";
import { SceneNode } from "../Scene/SceneNode";
import { DigitalTwinNode } from "../Scene/SceneType/DigitalTwinNode";
import { ResourceInfo } from "../ResourceReference/ResourceInfo";
export declare class DigitalTwin {
    CreateTime: string;
    LastSaveTime: string;
    TwinBodys: Map<string, TwinBody>;
    CurrenTwinBody: TwinBody;
    DigitalTwinRootNode: DigitalTwinNode;
    DigitalTwinName: string;
    DigitalTwinSerialize: Map<string, any>;
    TwinBodysSerialize: Map<string, string>;
    Floor: UE.StaticMeshActor;
    constructor(name: string);
    /**
     * Initialize the digital twin, only for creating a new digital twin
     */
    Init(Location?: UE.Vector): UE.OpenZIAPI.Blueprints.BP_Twin.BP_Twin_C;
    newInit(): void;
    CreateNewTwinBody(): void;
    /**
     * add listener
     */
    AddNotification(): void;
    /**
     * Add twin object
     * @param timeline
     * @param whether to load
     */
    AddTwinBody(time: string, name: string, bLoad?: boolean): void;
    RenameTwinBody(OldTime: any, NewTime: any, NewName: any): boolean;
    CopyTwinBody(twinBody: any): void;
    /**
    *Remove the twin object
     *@param timeline
     */
    RemoveTwinBody(timeLine: string): void;
    /**
     * SerializeDigitalTwin
     * @return Json
     */
    Serialize(): string;
    /**
      *Serialize TwinBodys
      *@return exp [{key:"2022_12_20",value:TwinBody},....]
      */
    SerializeTwinBody(): any[];
    /**
     * deserialization
     * @param Json
     */
    Deserialize(JosnValue: string): void;
    DeserializeFormJson(SceneData: any): void;
    DeserializeTwinBody(twinBodys: any): Map<string, TwinBody>;
    GenDefaultActor(): UE.StaticMeshActor;
    /**
     * load twin
     * @param timeline
     */
    LoadTwinBody(timeLine?: string): void;
    RegisterMonitor(): void;
    UnRegisterMonitor(): void;
    FindAPINodeByEntry(Entry: any): SceneNode;
    DeleteAPI(Entry: any): void;
    UpdateAPI(Entry: any): void;
    HiddenAPI(Entry: any): void;
    AddPrefab(InPerfabNode: SceneNode): void;
    PrefabAddTag(Nodes: any): void;
    /**
     * Uninstall the twin
     */
    UnloadTwinBody(bScene: any): void;
    SerializeTwinBodys(): void;
    DeserializeTwinBodys(): void;
    AddAPI(Entry: any): void;
    AddActor(InObject: UE.Object, resourceData: ResourceInfo): void;
    GetNodeByName(Name: string): SceneNode;
    private _GetNodeByName;
}
