import { QComponent } from "../../Core/Component/QComponent";
import { QSystem } from "../../Engine/System";
import { QSettingEntry } from "../ResourceReference/ResourceEntry";
import { SettingNode } from "../Scene/SceneType/SettingNode";
import * as UE from "ue";
export declare class SettingSystem extends QSystem {
    SettingMap: Map<string, SetttingObject>;
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
    OnAPISpawn(Entry: any): void;
    OnAPIDelete(Entry: any): void;
    OnAPIUpdate(Entry: any): void;
    SpawnSetting(): void;
    /**
  * Generate post-processing
  * @param SceneView node, used to generate Node
  */
    SpawnPostProcess(): void;
    /**
     * Set post-processing display parameters
     * @param Color The color of post-processing, which mainly indicates and clicks to highlight
     * @param Thickness highlight material thickness
     * @param Strength
     *
     *
     */
    SetPostProcessParam(Color: UE.LinearColor, Thickness: number, Strength: number): void;
}
export declare class SetttingObject {
    SettingName: string;
    SettingEntry: QSettingEntry;
    SettingNode: SettingNode;
    Compoent: QComponent;
    constructor();
    InitSettingObject(settingName: any, settingEntry: any): void;
    InitComponent(): void;
    AddComponent(component: any): void;
    RemoveComponent(): void;
    UpdateComponent(data: any): void;
}
export declare class WeatherSetting extends SetttingObject {
    constructor();
}
export declare class PawnSetting extends SetttingObject {
    constructor();
}
export declare class WebSetting extends SetttingObject {
    constructor();
}
