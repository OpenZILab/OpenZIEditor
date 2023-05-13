"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/10 上午11:16
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lib_Map = void 0;
class Lib_Map {
}
exports.Lib_Map = Lib_Map;
Map.prototype.toArray = function () {
    let arr = new Array();
    this.forEach((v, k) => {
        arr.push({ Key: k, Value: v });
    });
    return arr;
};
Map.prototype.deepCopy = function () {
    let map = new Map();
    this.forEach((v, k) => {
        let kk = typeof k.deepCopy === "function" ? k.deepCopy() : k;
        let vv = typeof v.deepCopy === "function" ? v.deepCopy() : v;
        map.set(kk, vv);
    });
    return map;
};
Map.prototype.toString = function () {
    let result = "";
    for (const pair of this) {
        let Key = pair[0].toString();
        let Value = pair[1].toString();
        if (typeof pair[1] === "string")
            Value = `"${Value}"`;
        let KeyValueStr = `"${Key}":${Value}`;
        result += KeyValueStr + ",";
    }
    if (this.size > 0)
        result = result.substring(0, result.length - 1);
    result = `{${result}}`;
    return result;
};
// Map.prototype.fromString = function (str, metadata) {
//     this.fromJSON(str, metadata)
// }
Map.prototype.toJSON = function () {
    let pairs = {};
    this.forEach((v, k) => {
        pairs[k.toString()] = typeof v.toJSON === "function" ? v.toJSON() : v;
    });
    return pairs;
};
//
// Map.prototype.fromJSON = function (json, metadata: IPMetadata_Map<any>) {
//     this.clear()
//
//     let createElement = function (metadata: IPropertyMetadata<any>, value): any {
//         switch (metadata.type) {
//             case PropertyType.Color:
//                 return new Vector4Impl(value)
//             case PropertyType.Transform:
//                 return new TransformImpl(value)
//             case PropertyType.Vector2:
//                 return new Vector2Impl(value)
//             case PropertyType.Vector3:
//                 return new Vector3Impl(value)
//             case PropertyType.Vector4:
//                 return new Vector4Impl(value)
//             case PropertyType.Enum:
//                 return value
//             case PropertyType.Struct: {
//                 let structMetadata = metadata as IPMetadata_Struct<any>
//                 let struct = structMetadata.class()
//                 struct.fromJSON(value)
//                 return struct
//             }
//             default:
//                 return value
//         }
//     }
//
//     for (const value of json) {
//         if (metadata == null) {
//             let k = createElement(metadata.keyMetadata, value)
//             let v = createElement(metadata.valueMetadata, value)
//             this.set(k, v)
//         }
//     }
// }
//# sourceMappingURL=Lib_Map.js.map