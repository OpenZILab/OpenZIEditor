import { SceneNode } from "../SceneNode";
export declare class FolderNode extends SceneNode {
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>);
    toJSON(): {
        [key: string]: any;
    };
    fromJSON(json: any): void;
}
