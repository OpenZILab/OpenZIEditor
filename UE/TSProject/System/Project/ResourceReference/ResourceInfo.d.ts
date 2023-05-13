import { QObject } from "../../Core/Object/QObject";
export declare class ResourceInfo extends QObject {
    Name: string;
    ObjectName: string;
    Path: string;
    FileName: string;
    InitResource(name: string, className: string, path: string, fileName?: string): void;
}
