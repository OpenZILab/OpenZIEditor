import { QComponent } from "../../../Core/Component/QComponent";
import { SceneNode } from "../SceneNode";
export declare class SettingNode extends SceneNode {
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): object;
    fromJSON(json: any): void;
    AddTsComponent(component: QComponent): void;
    RemoveTsComponent(component: QComponent): void;
    bExistComponent(): boolean;
    OnAddComponent(action: any): void;
    RemoveComponent(): void;
    UpdateComponent(data: any): void;
    OnAPISpawn(Entry: any): void;
    OnAPIDelete(Entry: any): void;
    OnAPIUpdate(Entry: any): void;
    UpdateCoordinate(location: any, rot: any, len: any): void;
    LoadEntry(): void;
    UnloadEntry(): void;
    RegisterListen(): void;
    UnRegisterListen(): void;
    GetApiComponent(): QComponent;
}
