import { SceneNode } from "../Scene/SceneNode";
import { FolderNode } from "../Scene/SceneType/FolderNode";
import * as UE from "ue";
import { DigitalTwinNode } from "../Scene/SceneType/DigitalTwinNode";
export declare class TwinBody extends UE.Object {
    TimeLine: string;
    TwinName: string;
    TwinNode: FolderNode;
    bMainTwin: boolean;
    bLoad: boolean;
    DigitalNode: DigitalTwinNode;
    Constructor(): void;
    static New(timeLine?: string, twinName?: string): TwinBody;
    Init(): void;
    GetNodeByActor(Actor: UE.Actor): any;
    GetNodeByName(Name: string): SceneNode;
    private _GetNodeByName;
    formJSON(json: any): void;
    toJSON(): {
        [key: string]: any;
    };
    LoadNode(): void;
    UnloadNode(): void;
    private _LoadAllEntry;
    private _UnLoadEntry;
}
