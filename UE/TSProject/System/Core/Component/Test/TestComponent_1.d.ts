import { QVector4 } from "../../Property/QVector4";
import { QVector2 } from "../../Property/QVector2";
import { HaveLifeComponent } from "../QComponent";
export declare class TestComponent_1 extends HaveLifeComponent {
    cc: QVector4;
    dd: QVector2;
    constructor();
    Tick(delta: number): void;
}
