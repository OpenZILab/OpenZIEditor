/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/10 上午11:16
 */

export type IPair = { Key: any, Value: any }

export class Lib_Map{}

declare global {
    interface Map<K, V> {
        toArray(): Array<IPair>

        deepCopy(): Map<K, V>

        toString(): string

        // fromString(str: string, metadata: IPropertyMetadata<any>)

        toJSON(): any

        // fromJSON(json: any, metadata: IPropertyMetadata<any>)
    }
}

Map.prototype.toArray = function () {
    let arr = new Array<IPair>()
    this.forEach((v, k) => {
        arr.push({Key: k, Value: v})
    })
    return arr
}

Map.prototype.deepCopy = function (): Map<any, any> {
    let map = new Map<any, any>()
    this.forEach((v, k) => {
        let kk = typeof k.deepCopy === "function" ? k.deepCopy() : k
        let vv = typeof v.deepCopy === "function" ? v.deepCopy() : v
        map.set(kk, vv)
    })
    return map
}

Map.prototype.toString = function (): string {
    let result: string = ""

    for (const pair of this) {
        let Key = pair[0].toString()
        let Value = pair[1].toString()
        if (typeof pair[1] === "string")
            Value = `"${Value}"`
        let KeyValueStr = `"${Key}":${Value}`
        result += KeyValueStr + ","
    }

    if (this.size > 0)
        result = result.substring(0, result.length - 1)

    result = `{${result}}`
    return result
}

// Map.prototype.fromString = function (str, metadata) {
//     this.fromJSON(str, metadata)
// }

Map.prototype.toJSON = function (): any {
    let pairs = {}
    this.forEach((v, k) => {
        pairs[k.toString()] = typeof v.toJSON === "function" ? v.toJSON() : v
    })
    return pairs
}
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