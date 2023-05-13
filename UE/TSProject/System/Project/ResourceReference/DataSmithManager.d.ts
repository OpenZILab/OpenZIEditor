import { QSystem } from "../../Engine/System";
import { DataSmithNode } from "../Scene/SceneType/DataSmithNode";
import * as UE from "ue";
export declare class DataSmithManager extends QSystem {
    DataSmithNodes: Array<DataSmithNode>;
    DataSmithActors: Array<UE.DataSmithImporterActor>;
    bFinished: boolean;
    LoadTime: number;
    LoadingNode: DataSmithNode;
    /**
  * The final process of the entire system initialization
  * ! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
  * @constructor
  */
    PostInit(): void;
    /**
     * Called by the first level BeginPlay
     * The Unreal side can get the World, and can normally access anything related to the Unreal engine
     * @constructor
    */
    BeginPlay(): void;
    /**
     * Called when the entire editor exits
     * @constructor
     */
    Shutdown(): void;
    RemoveDataSmithActor(): void;
    AddDataSmithActors(Actor: UE.DataSmithImporterActor): void;
    Reinti(): void;
    LoadState(): void;
    LoadDataSmithNode(): void;
    AddDataSmithNode(dataSmithNode: DataSmithNode): void;
    RemoveDataSmithNode(dataSmithNode: DataSmithNode): void;
    ClearDataSmithNode(): void;
    CheckArrayNotNone(): void;
}
