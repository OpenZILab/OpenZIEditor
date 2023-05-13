import * as UE from "ue";
import { ResourceInfo } from "./ResourceInfo";
export declare class EntryFactory {
    static ActorEntrySpawn(Transform: UE.Transform, Resource: ResourceInfo): UE.Actor;
    static StaticMeshSpawn(Transform: UE.Transform, Resource: ResourceInfo): UE.StaticMeshActor;
    static DatasmithSpawn(Transform: UE.Transform, Resource: ResourceInfo): UE.DataSmithImporterActor;
    static EntrySpawner(Transform: UE.Transform, Resource: ResourceInfo): UE.Actor;
}
