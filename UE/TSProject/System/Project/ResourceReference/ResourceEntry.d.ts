import * as UE from "ue";
import { QObject } from "../../Core/Object/QObject";
import { SceneObject } from "../Scene/SceneObject";
import { ResourceInfo } from "./ResourceInfo";
import { QTransform } from "../../Core/Property/QTransform";
import { QComponent } from "../../Core/Component/QComponent";
import { QDataSmithChanged } from "./NodePropertyChange";
export declare class QActorEntry extends QObject {
    Object: SceneObject;
    ResourceInfo: ResourceInfo;
    RelativeTransform: QTransform;
    Actor: UE.Object;
    constructor();
    InitActorEntry(object: SceneObject, resourceInfo: ResourceInfo, actor: UE.Object, relativeTransform?: QTransform, id?: string): void;
}
export declare class QDataSmithEntry extends QActorEntry {
    DataSmithChanged: QDataSmithChanged[];
    constructor();
}
export declare class QDigitalEntry extends QActorEntry {
    ChangedProperty: any;
    twinBodys: any;
    constructor();
    InitActorEntry(object: SceneObject, resourceInfo: ResourceInfo, actor: UE.Object, relativeTransform?: QTransform, changedProperty?: any): void;
}
export declare class QAPIEnrty extends QObject {
    id: string;
    Class: string;
    Func: string;
    RelativeTransform: QTransform;
    Object: SceneObject;
    Actor: UE.Object;
    ChangedProperty: any;
    constructor();
    InitActorEntry(id: string, inClass: string, func: string, object: SceneObject, actor: UE.Object, relativeTransform?: QTransform): void;
}
export declare class QSettingEntry extends QObject {
    Class: string;
    Name: string;
    Object: SceneObject;
    Component: QComponent;
    constructor();
    InitActorEntry(name: string, object: SceneObject): void;
}
