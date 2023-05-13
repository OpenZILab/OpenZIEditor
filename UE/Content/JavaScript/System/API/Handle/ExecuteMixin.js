"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execute_Mixin = exports.Execute_CppMixin = exports.Execute_BlueprintMixin = void 0;
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/08
///
const UE = require("ue");
const puerts_1 = require("puerts");
let BlueprintClasses = new Set();
let MixinJsClasses = new Set();
/**
 * Implement Mixin for Unreal blueprint classes, you can override its blueprints, cpp functions and events
 *     class MyTsBlueprint { Add(a:number, b:number){ return a-b; } }
 *     Execute_BlueprintMixin("/Game/BlueprintMixin.BlueprintMixin_C", MyTsBlueprint)
 * @param blueprintPath
 * @param mixinMethods
 * @constructor
 */
function Execute_BlueprintMixin(blueprintPath, mixinMethods, config) {
    let BlueprintClass = UE.Class.Load(blueprintPath);
    BlueprintClasses.add(BlueprintClass);
    const toJsClass = puerts_1.blueprint.tojs(BlueprintClass);
    MixinJsClasses.add(toJsClass);
    // config.inherit = true
    // config.objectTakeByNative = true
    return puerts_1.blueprint.mixin(toJsClass, mixinMethods, config);
    /**
     *         function mixin<T extends typeof Object, R extends InstanceType<T>>(to:T, mixinMethods:new (...args: any) => R, config?: MixinConfig) : {
     *             new (Outer?: Object, Name?: string, ObjectFlags?: number) : R;
     *             StaticClass(): Class;
     *         };
     */
}
exports.Execute_BlueprintMixin = Execute_BlueprintMixin;
/**
 * Execute Mixin for Unreal Cpp, you can override its cpp function
 *      class MyTsObject { Add(a:number, b:number){ return a-b; } }
 *      Execute_CppMixin(UE. MyObject, MyTsObject);
 * @param cppClass
 * @param mixinMethods
 * @constructor
 */
function Execute_CppMixin(cppClass, mixinMethods, config) {
    // config.inherit = true
    // config.objectTakeByNative = true
    return puerts_1.blueprint.mixin(cppClass, mixinMethods, config);
    /**
     *         function mixin<T extends typeof Object, R extends InstanceType<T>>(to:T, mixinMethods:new (...args: any) => R, config?: MixinConfig) : {
     *             new (Outer?: Object, Name?: string, ObjectFlags?: number) : R;
     *             StaticClass(): Class;
     *         };
     */
}
exports.Execute_CppMixin = Execute_CppMixin;
/**
 * Execute Mixin for TS class, which is equivalent to multiple inheritance
 * @param derivedCtor subclass
 * @param baseCtors parent class, there can be multiple
 * @constructor
 */
function Execute_Mixin(derivedCtor, baseCtors) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
exports.Execute_Mixin = Execute_Mixin;
//# sourceMappingURL=ExecuteMixin.js.map