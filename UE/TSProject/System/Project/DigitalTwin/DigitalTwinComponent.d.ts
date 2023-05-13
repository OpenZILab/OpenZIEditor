import { QComponent } from "../../Core/Component/QComponent";
import { DigitalTwinNode } from "../Scene/SceneType/DigitalTwinNode";
export declare class QDigitalTwinComponent extends QComponent {
    DigitalTwinNode: DigitalTwinNode;
    constructor();
    SetDigitalTwinNode(Node: any): void;
}
