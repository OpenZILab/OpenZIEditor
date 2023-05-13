import { QSystem } from "../../Engine/System";
import * as UE from "ue";
import { ProjectSystem } from "../Project/ProjectSystem";
import { LevelSystem } from "./LevelSystem";
import { SceneView } from "./SceneView";
import { SceneNode } from "./SceneNode";
import { ResourceInfo } from "../ResourceReference/ResourceInfo";
export declare const DefaultPawn: {
    path: string;
    pawnTransform: {
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
    controllerRotator: {
        x: number;
        y: number;
        z: number;
    };
};
export declare const SceneSetting: string;
export declare const SceneInfo: string;
export declare const CopyFolders: string[];
export declare class SceneSystem extends QSystem {
    Scene: SceneView;
    ProjectSystem: ProjectSystem;
    LevelSystem: LevelSystem;
    SceneMap: Map<string, any>;
    SceneMapNameArray: string[];
    TempScene: SceneView;
    bLoad: boolean;
    TempFunc: any;
    SceneSetting: {
        [key: string]: any;
    };
    SceneInfo: any;
    PawnJson: any;
    NodesFormCopy: SceneNode[];
    ExclusionNode: string[];
    ChangeSenemeMessage: Array<any>;
    bLoading: boolean;
    PreInit(): void;
    Init(): void;
    PostInit(): void;
    OnFocus(): void;
    OnPaste(): void;
    OnCopy(): void;
    OnDuplicate(): void;
    OnSave(): void;
    BeginPlay(): void;
    BeginPlayFinished(): void;
    OnSceneDelete(): void;
    PushMessage(msg: any): void;
    PopMessage(): void;
    OnCopyAPI(node: SceneNode): void;
    Shutdown(): void;
    Tick(DeltaTime: number): void;
    RequestDeleteNode(nodes: SceneNode[]): void;
    OnActorTransformChanged(SceneObjects: any): void;
    IsEnableSerializeScene(): boolean;
    OpenDefalutScene(): void;
    CreatNewScene(SceneName: any): void;
    WhetherhasMap(scene: SceneNode): boolean;
    SaveScene(SceneName: any): void;
    SaveSceneSetting(): void;
    SaveSceneInfo(): void;
    LoadSceneSetting(): void;
    LoadSceneInfo(): void;
    LoadScene(SceneName: any): boolean;
    SceneOnSaveEvent(SceneName: any): void;
    SceneOnLoadWithSaving(SceneName: any): void;
    _LoadScene(sceneName: any, ReLoad?: boolean): void;
    private _loadScene;
    RenameScene(OldName: any, NewName: any): void;
    GetCurrentScene(): SceneView;
    GetAllScenes(): Map<string, any>;
    CreateScene(SceneName: any): SceneView;
    SaveCoodinateConverter(): object;
    LoadCoodinateConverter(coodinate: any): void;
    SavePawn(): {
        path: string;
        pawnTransform: {
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
        controllerRotator: {
            x: number;
            y: number;
            z: number;
        };
    };
    LoadPawn(PawnJson: any): void;
    DestroyScene(): void;
    DeleteScene(SceneName: any): void;
    SortByName(): string[];
    SortByCreateTime(): string[];
    CopyScene(sceneName: any): void;
    AddActorToScene(InObject: UE.Object, resourceData: ResourceInfo): any;
    SaveDefalutScene(): void;
    SaveCurrentSceneMessage(): void;
    CreateNewSceneMessage(): void;
    OnSaveScene(): void;
    OnSceneSaved(bFinished: any): void;
}
