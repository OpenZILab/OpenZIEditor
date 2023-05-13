import { Sigleton } from "../Sigleton";
export declare class UUIDGenerator extends Sigleton {
    private FirstId;
    private SecondId;
    private Ids;
    private constructor();
    static GetInstance(): UUIDGenerator;
    OnInit(): void;
    Get(): string;
    Recycle(Id: string): void;
}
export declare let GUUIDGenerator: UUIDGenerator;
