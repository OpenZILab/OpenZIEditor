///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/08
///
import * as UE from "ue";
import {blueprint} from "puerts";
import {Class} from "ue";

let BlueprintClasses: Set<UE.Class> = new Set<UE.Class>()
let MixinJsClasses: Set<any> = new Set<any>()

/**
 * Implement Mixin for Unreal blueprint classes, you can override its blueprints, cpp functions and events
 *     class MyTsBlueprint { Add(a:number, b:number){ return a-b; } }
 *     Execute_BlueprintMixin("/Game/BlueprintMixin.BlueprintMixin_C", MyTsBlueprint)
 * @param blueprintPath
 * @param mixinMethods
 * @constructor
 */
export function Execute_BlueprintMixin<T extends typeof UE.Object, R extends InstanceType<T>>(blueprintPath: string, mixinMethods: new (...args: any) => R, config?: blueprint.MixinConfig): any {
    let BlueprintClass = UE.Class.Load(blueprintPath);
    BlueprintClasses.add(BlueprintClass)
    const toJsClass = blueprint.tojs<T>(BlueprintClass)
    MixinJsClasses.add(toJsClass)
    // config.inherit = true
    // config.objectTakeByNative = true
    return blueprint.mixin<T, R>(toJsClass, mixinMethods, config)
    /**
     *         function mixin<T extends typeof Object, R extends InstanceType<T>>(to:T, mixinMethods:new (...args: any) => R, config?: MixinConfig) : {
     *             new (Outer?: Object, Name?: string, ObjectFlags?: number) : R;
     *             StaticClass(): Class;
     *         };
     */
}

/**
 * Execute Mixin for Unreal Cpp, you can override its cpp function
 *      class MyTsObject { Add(a:number, b:number){ return a-b; } }
 *      Execute_CppMixin(UE. MyObject, MyTsObject);
 * @param cppClass
 * @param mixinMethods
 * @constructor
 */
export function Execute_CppMixin<T extends typeof UE.Object, R extends InstanceType<T>>(cppClass: T, mixinMethods: new (...args: any) => R, config?: blueprint.MixinConfig): {
    new(Outer?: Object, Name?: string, ObjectFlags?: number): R;
    StaticClass(): Class;
} {
    // config.inherit = true
    // config.objectTakeByNative = true
    return blueprint.mixin<T, R>(cppClass, mixinMethods, config)
    /**
     *         function mixin<T extends typeof Object, R extends InstanceType<T>>(to:T, mixinMethods:new (...args: any) => R, config?: MixinConfig) : {
     *             new (Outer?: Object, Name?: string, ObjectFlags?: number) : R;
     *             StaticClass(): Class;
     *         };
     */
}

/**
 * Execute Mixin for TS class, which is equivalent to multiple inheritance
 * @param derivedCtor subclass
 * @param baseCtors parent class, there can be multiple
 * @constructor
 */
export function Execute_Mixin(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        })
    });
}