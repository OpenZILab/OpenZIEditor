import { QObject } from "../../Core/Object/QObject";
import { QTransform } from "../../Core/Property/QTransform";
export declare class DigitalPropertyChange extends QObject {
    ChangePropertys: [];
    twinBodyId: string;
    changeNodes: [];
}
export declare class QDataSmithChanged extends QObject {
    ID: string;
    RelativeTransform: QTransform;
    bDestory: boolean;
    bHidden: boolean;
    constructor();
}
