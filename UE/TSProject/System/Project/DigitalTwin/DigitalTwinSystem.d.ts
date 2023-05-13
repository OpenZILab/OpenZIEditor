import { QSystem } from "../../Engine/System";
import { ProjectSystem } from "../Project/ProjectSystem";
import { DigitalTwin } from "./DigitalTwin";
import * as UE from "ue";
import { SceneSystem } from "../Scene/SceneSystem";
import { SceneNode } from "../Scene/SceneNode";
export declare class DigitalTwinSystem extends QSystem {
    CurrentDigitalTwin: DigitalTwin;
    ProjectSystem: ProjectSystem;
    DigitalTwinMap: Map<string, DigitalTwin>;
    DigitalTwinNames: string[];
    CurrentSceneName: string;
    SceneSystem: SceneSystem;
    bLoad: boolean;
    NodesFormCopy: SceneNode[];
    bSpawn: Boolean;
    bRuning: boolean;
    PreInit(): void;
    Init(): void;
    Shutdown(): void;
    Tick(DeltaTime: number): void;
    PostInit(): void;
    OnRuningStateChange(bRuning: boolean): void;
    OnFocus(): void;
    OnPaste(): void;
    OnCopy(): void;
    RequestDeleteNode(): void;
    OnDuplicate(): void;
    OnDigitalTwinDelete(): void;
    OnSave(): void;
    BeginPlay(): void;
    RegisterNotift(): void;
    OnActorTransformChanged(SceneObjects: any): void;
    /**
     * Create a new digital twin
     * @param Name of the twin
     */
    CreateNewDigitalTwin(name: string): void;
    /**
   * Saves the current digital twin
   * @param Name of the twin
   */
    SaveDigitalTwin(name: string): void;
    /**
     * Load the digital twin
     * @param  Name of the twin
     */
    LoadDigitalTwin(name: string, location?: UE.Vector, bScene?: boolean, transform?: UE.Transform, ID?: string): any;
    GetDigitalTwinStr(name: string): any;
    LoadDigitalTwinFormStr(SceneData: any, location?: UE.Vector, bScene?: boolean, transform?: UE.Transform, ID?: string): any;
    /**
     * Delete the digital twin
     * @param Name of the twin
     */
    DeleteDigtalTwin(name: string): void;
    /**
     * Rename the numeric twin
     * @param Old name
     * @param New name
     */
    RenameDegitalTwin(OldName: any, NewName: any): void;
    OpenDigitalTwin(name: string): void;
    CloseDigitalTwin(): void;
    /**
     * Gets all the twin names that deserialize from the digital twin file
     */
    GetAllDigitalTwinName(): string[];
    /**
     * Gets all the twin objects that deserialize from the digital twin file
     * @return  Dictionary of twins
     */
    GetAllDigitalTwinFromFile(): Map<string, DigitalTwin>;
    GetCurrentDigitalTwin(): DigitalTwin;
}
