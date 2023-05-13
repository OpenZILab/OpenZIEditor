import { ComponentContainer } from "../../Core/Component/ComponentContainer";
import { QTransformComponent } from "../../Core/Component/Transform/QTransformComponent";
export declare class SceneObject extends ComponentContainer {
    nodeId: string;
    constructor();
    InitTsComponent(): void;
    GetTsTransformComponent(): QTransformComponent;
    fromJSON(json: string | {}): any;
}
