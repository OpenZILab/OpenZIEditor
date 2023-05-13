import { SceneObject } from "./SceneObject";
import { DigitalTwinNode } from "./SceneType/DigitalTwinNode";
import { IPoolObject } from "../../Core/Pool/TsObjectPool";
import * as UE from "ue";
export declare enum FindType {
    id = 0,
    name = 1,
    type = 2,
    actor = 3,
    api = 4
}
export declare enum EMobility {
    static = 0,
    movable = 1
}
export interface SceneBaseSerializer {
    /**
      *Serialization
      *@return JsonObj
      */
    toJSON(): object;
    /**
     *deserialization
     *@param JsonObj
     */
    fromJSON(json: any): void;
    /**
    *Load the corresponding Entry method
    */
    LoadEntry(): void;
    /**
    *Uninstall the corresponding Entry method
     */
    UnloadEntry(): void;
}
export declare class SceneNode implements SceneBaseSerializer, IPoolObject {
    protected Id: number;
    protected Name: string;
    protected Parent: SceneNode;
    protected Type: string;
    protected Entry: any;
    protected Childs: Array<SceneNode>;
    protected Tags: string[];
    protected JsonObj: {
        [key: string]: any;
    };
    protected DigitalTwinNode: DigitalTwinNode;
    protected NodeObject: SceneObject;
    protected bShowInOutLine: boolean;
    protected PrefabName: string;
    protected Mobility: EMobility;
    Hidden: boolean;
    static SceneIndex: number;
    constructor(Name?: string, Parent?: SceneNode, Entry?: any, Childs?: Array<SceneNode>, Hidden?: boolean);
    /**
     * reset object
     * @memberof IPoolObject
     */
    reset(): void;
    /**
     *
     * get pool size
     * @return {number}
     * @memberof IPoolObject
     */
    getPoolSize(): number;
    /**
     * Get node ID
     */
    GetNodeId(): number;
    /**
     *Set node ID
     */
    SetNodeId(Id: number): void;
    /**
     *Get node name
     */
    GetNodeName(): string;
    /**
     *Set node name
     */
    SetNodeName(Name: string): void;
    /**
    *Get node name
    */
    GetMobility(): EMobility;
    /**
     *Set node name
     */
    SetMobility(mobility: EMobility): void;
    /**
     *Get the parent node
     */
    GetParent(): SceneNode;
    /**
     *set the parent node
     */
    SetParent(Parent: SceneNode): void;
    /**
     *Set node type
     */
    SetNodeType(Type: string): void;
    /**
     *Get node type
     */
    GetNodeType(): string;
    /**
     *Get Entry
     */
    GetNodeEntry(): any;
    /**
     *Set Entry
     */
    SetNodeEntry(Entry: any): void;
    /**
     *Get all child nodes
     */
    GetChildNodes(): SceneNode[];
    /**
    *add tag
    */
    AddTag(tag: string): void;
    /**
    *remove tag
    */
    RemoveTag(tag: string): void;
    /**
        *Clear tab
        */
    ClearTags(): void;
    /**
    *get all tags
    */
    GetTags(): string[];
    /**
    *set all tags
    */
    SetTags(tags: string[]): void;
    /**
    *Get prefab name
    */
    GetPrefabName(): string;
    /**
    *Set prefab name
    */
    SetPrefabName(name: string): void;
    /**
    *Serialization
    */
    toJSON(): {
        [key: string]: any;
    };
    /**
    *deserialization
    */
    fromJSON(json: any): void;
    /**
     *load
     */
    LoadEntry(): void;
    /**
     *uninstall
     */
    UnloadEntry(): void;
    /**
    *remove component
     */
    RemoveComponent(): void;
    /**
     *add components
     */
    AddComponent(): void;
    /**
     * 匹配搜索的Id是否与Node中的Id相等
     * @param id
     * @return 是否相等
     */
    bMatchSearchId(id: number): boolean;
    /**
     * 匹配搜索的Name是否与Node中的Name相等
     * @param name
     * @return 是否相等
     */
    bMatchSearchName(name: string): boolean;
    /**
     * 匹配搜索的Actor是否与Node中的Actor相等
     * @param Actor
     * @return 是否相等
     */
    bMatchSearchActor(actor: UE.Actor): boolean;
    /**
     * 尝试获取Node中的Actor
     * @return Actor
     */
    TryGetActor(): UE.Actor;
    /**
     *Set the array of child nodes
     */
    SetChildNodes(SceneNodes: Array<SceneNode>): void;
    /**
    *Set whether to display in the world outline
    */
    SetbShowInOutLine(InbShowInOutLine: boolean): void;
    /**
     *Get whether to display in the world outline
     */
    GetbShowInOutLine(): boolean;
    /**
     *Determine whether the node belongs to the digital twin
     */
    IsDigitalTwin(): boolean;
    /**
     *Get the digital twin in the node
     */
    GetTwinNode(): DigitalTwinNode;
    /**
     *Set up the digital twin in the node
     */
    SetTwinNode(InDigitalTwinNode: DigitalTwinNode): void;
    /**
     *Add a child node to the current node
     */
    AddChild(node: SceneNode, bNotify?: boolean): void;
    /**
        *remove node
        */
    RemoveNode(Node: SceneNode): void;
    /**
     * remove child node
     */
    RemoveChildNode(Name: any): void;
    RemoveChildItem(node: SceneNode, bNotify?: boolean): void;
    /**
     * Determine whether the child node contains Entry
     */
    bChildsHasEntry(name: string): boolean;
    /**
     * Get all node types by type
     */
    GetNodesByType(TypeName: any): SceneNode[];
    /**
     * Get all node types by type
     */
    private _GetNodesByType;
    FindNodes(InFindType: FindType, InFindValue: any): SceneNode[];
    private _FindNodes;
    ChangeNodeParent(ParentNode: SceneNode, bNotify?: boolean): void;
    GetObject(): SceneObject;
    SetObject(InObject: any): void;
    /**copy node
     * @param Node
     */
    CopyNode(): any;
    /**
     * delete node
     * @param
     * @return
     */
    DeleteNode(): void;
    /**
      *Set hidden nodes
      *@param Boolean whether to hide
      *@return
      */
    SetHiddenNode(bHidden: boolean): void;
    /**
     *Get whether the node is hidden
     *@param
     *@return
     */
    HasHidden(): boolean;
    static GenUUID(): number;
    GenJson(): {
        [key: string]: any;
    };
    FindChildNodeById(id: number): boolean;
    FindChildNodesByPrefabName(PrefabName: string): SceneNode[];
    _FindChildNodesByPrefabName(PrefabName: string, Nodes: SceneNode[], OutNodes: SceneNode[]): void;
}
