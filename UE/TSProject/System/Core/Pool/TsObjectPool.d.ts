import { Sigleton } from "../Sigleton";
/**
 *pool object
 *@param
 *@return
 */
export interface IPoolObject {
    /**
     *Get the size of the pool
     *@return {number}
     *@memberof IPoolObject
     */
    getPoolSize(): number;
    /**
     *How to reset
     *
     *@memberof IPoolObject
     */
    reset(): void;
}
/**
 * object pool
 *
 * @export
 * @class TsObjectPool
 */
export declare class TsObjectPool extends Sigleton {
    private constructor();
    private _poolMap;
    static GetInstance(): TsObjectPool;
    OnInit(): void;
    /**
     * Determine whether the object pool has a corresponding pool object
     *
     * @template T
     * @param {{ new(): T}} Class
     * @returns {boolean}
     * @memberof ObjectPool
     */
    hasPool<T extends IPoolObject>(Class: {
        new (): T;
    }): boolean;
    /**
     * Join the object pool
     *
     * @template T
     * @param {T} obj
     * @memberof ObjectPool
     */
    put<T extends IPoolObject>(obj: T): void;
    /**
     * fetch data
     *
     * @template T
     * @param {{ new(): T }} Class
     * @returns {T}
     * @memberof ObjectPool
     */
    get<T extends IPoolObject>(Class: {
        new (): T;
    }): T;
    /**
     * Initialize object pool
     *
     * @template T
     * @param {{ new(): T}} Class
     * @param {number} [count=]
     * @memberof ObjectPool
     */
    initPool<T extends IPoolObject>(Class: {
        new (): T;
    }, count?: number): void;
    /**
     * clear all
     *
     * @memberof ObjectPool
     */
    clearAll(): void;
    /**
     * Create objects in batches (currently some Nodes may have listeners when they are new, so they cannot be batched temporarily)
     *
     * @private
     * @template T
     * @param {{ new(): T}} Class
     * @param {number} [count=]
     * @memberof ObjectPool
     */
    private _factoryCreate;
}
export declare let GObjectPool: TsObjectPool;
