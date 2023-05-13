///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/23 16:40
///

import path = require("path")
import { PropertyCopy } from "../../Core/PropertyCopy"
import { GetSystem } from "../../Engine/QEngine"
import { ProjectSystem } from "../../Project/Project/ProjectSystem"
import * as UE from "ue"

const ApiListConfig_Dev = "Script/Config/APIListConfig-Dev.json"
const ApiListConfig_User = "Script/Config/APIListConfig-User.json"

export class BaseModel {
    //@默认数据
    DefaultData: { [key: string]: any }
    DefaultDataRange: {
        [key: string]: {}
    }
    AllData: Map<string, any> = new Map<string, any>()
    SingleData: object
    typeName: string
    funcName: string
    IsOverRange: boolean

    constructor() {
        this.IsOverRange = false
    }

    InitDataAndRange() {
        let RangeDataByJson = this.GenDefaultRange(this.typeName, this.funcName)
        this.CoverObject(this.DefaultDataRange, RangeDataByJson)
        let DataByJson = this.GenDefaultValue(this.typeName, this.funcName)
        this.IsOverRange = false
        this.DefaultData = this.ProcessData(DataByJson, this.DefaultData, this.DefaultDataRange)
    }

    AddData(id, inData) {
        if (this.AllData.has(id))
            return
        this.IsOverRange = false
        let ruleData = this.ProcessData(inData, this.DefaultData, this.DefaultDataRange)
        this.AllData.set(id, ruleData)
        return true
    }
    ExistData(id) {
        return this.AllData.has(id) ? true : false
    }
    GetData(id): object {
        if (this.AllData.has(id)) {
            return this.AllData.get(id)
        }
        return null
    }

    RefreshData(id, inData) {
        if (!this.AllData.has(id))
            return
        this.IsOverRange = false
        let ruleData = this.ProcessData(inData, this.DefaultData, this.DefaultDataRange)
        if (ruleData === undefined) {
            return undefined
        }
        this.AllData.set(id, ruleData)
        return true
    }

    DeleteData(id) {
        if (!this.AllData.has(id))
            return
        this.AllData.delete(id)
    }

    ClearData() {
        this.AllData.clear()
    }

    SetSingleData(data) {
        this.IsOverRange = false
        this.SingleData = this.ProcessData(data, this.DefaultData, this.DefaultDataRange)
    }

    GetSingleData(): object {
        return this.SingleData
    }

    GetAllData(): Map<string, any> {
        return this.AllData
    }

    GetDefaultData(): Object {
        return this.DefaultData
    }

    ProcessData(jsonData, defaultData, defaultDataRange): object {
        let curData = PropertyCopy.SimpleCopy(jsonData)
        let ruleData = PropertyCopy.SimpleCopy(defaultData)
        let ruleDateRange = PropertyCopy.SimpleCopy(defaultDataRange)
        if (curData != null) {
            for (const key in curData) {
                if (key == "statusColorList") {
                    ruleData[key] = curData[key]
                    if (typeof Object.entries(ruleData[key])[0][1] === "string") {
                        Object.entries(ruleData[key]).forEach(([k, v]) => {
                            let CurValue = ruleData[key][k]
                            let outStr: string[] = CurValue.split(",")
                            let SingleNum = outStr.length
                            let index: number = 0
                            let OneObj: { [key: string]: any } = {}
                            if (SingleNum == 2)
                                OneObj = { X: Number, Y: Number }
                            else if (SingleNum == 3)
                                OneObj = { X: Number, Y: Number, Z: Number }
                            else if (SingleNum == 4)
                                OneObj = { X: Number, Y: Number, Z: Number, W: Number }
                            for (const _key in OneObj) {
                                OneObj[_key] = isNaN(Number(outStr[index])) ? 0 : Number(outStr[index])
                                index++
                            }
                            ruleData[key][k] = OneObj
                        });
                    }
                    continue
                }
                if (ruleData[key] == null)
                    continue
                if (typeof ruleData[key] === typeof curData[key]) {
                    if (curData[key] instanceof Array) {
                        if (typeof ruleData[key][0] === "object" && typeof curData[key][0] === "string") {
                            let SingleNum = Object.keys(ruleData[key][0]).length
                            ruleData[key] = []
                            for (var i = 0; i < curData[key].length; i++) {
                                let curStr = curData[key][i] as string
                                let outStr: string[] = curStr.split(",")
                                let index: number = 0
                                let OneObj = {}
                                if (SingleNum == 2)
                                    OneObj = { X: Number, Y: Number }
                                else if (SingleNum == 3)
                                    OneObj = { X: Number, Y: Number, Z: Number }
                                else if (SingleNum == 4)
                                    OneObj = { X: Number, Y: Number, Z: Number, W: Number }
                                for (const _key in OneObj) {
                                    OneObj[_key] = isNaN(Number(outStr[index])) ? 0 : Number(outStr[index])
                                    if (ruleDateRange[key] != null) {
                                        let CurRangeValue_Min
                                        let CurRangeValue_Max
                                        if (index === 0) {
                                            CurRangeValue_Min = ruleDateRange[key].Range.min.X
                                            CurRangeValue_Max = ruleDateRange[key].Range.max.X
                                        } else if (index === 1) {
                                            CurRangeValue_Min = ruleDateRange[key].Range.min.Y
                                            CurRangeValue_Max = ruleDateRange[key].Range.max.Y
                                        } else if (index === 2) {
                                            CurRangeValue_Min = ruleDateRange[key].Range.min.Z
                                            CurRangeValue_Max = ruleDateRange[key].Range.max.Z
                                        } else if (index === 3) {
                                            CurRangeValue_Min = ruleDateRange[key].Range.min.W
                                            CurRangeValue_Max = ruleDateRange[key].Range.max.W
                                        }
                                        if (OneObj[_key] < CurRangeValue_Min) {
                                            this.IsOverRange = true
                                            OneObj[_key] = CurRangeValue_Min
                                        }
                                        else if (OneObj[_key] > CurRangeValue_Max) {
                                            this.IsOverRange = true
                                            OneObj[_key] = CurRangeValue_Max
                                        }
                                    }
                                    index++
                                }
                                ruleData[key].push(OneObj)
                            }
                        } else if (typeof ruleData[key][0] === "object" && typeof curData[key][0] === "object") {
                            for (let i = 0; i < curData[key].length; i++) {
                                if (ruleData[key].length < i + 1) {
                                    ruleData[key][i] = PropertyCopy.DeepCopy(ruleData[key][0])
                                }
                                if (typeof Object.values(ruleData[key][i])[0] === "object" && typeof Object.values(curData[key][i])[0] === "string") {
                                    ruleData[key][i] = this.ProcessData(curData[key][i], ruleData[key][i], ruleDateRange[key])
                                }
                                else {
                                    // if (ruleDateRange[key] != null) {
                                    //     if (curData[key] < ruleDateRange[key].Range.min) {
                                    //         this.IsOverRange = true
                                    //         curData[key] = ruleDateRange[key].Range.min
                                    //     }
                                    //     else if (curData[key] > ruleDateRange[key].Range.max) {
                                    //         this.IsOverRange = true
                                    //         curData[key] = ruleDateRange[key].Range.max
                                    //     }
                                    // }
                                    ruleData[key] = curData[key]
                                }
                            }
                        } else {
                            // if (ruleDateRange[key] != null) {
                            //     if (curData[key] < ruleDateRange[key].Range.min) {
                            //         this.IsOverRange = true
                            //         curData[key] = ruleDateRange[key].Range.min
                            //     }
                            //     else if (curData[key] > ruleDateRange[key].Range.max) {
                            //         this.IsOverRange = true
                            //         curData[key] = ruleDateRange[key].Range.max
                            //     }
                            // }
                            ruleData[key] = curData[key]
                        }
                    }
                    else if (typeof ruleData[key] === "object" && typeof curData[key] === "object") {
                        let a = ruleData[key]
                        if (typeof Object.values(ruleData[key])[0] === "object" && typeof Object.values(curData[key])[0] === "string") {
                            ruleData[key] = this.ProcessData(curData[key], ruleData[key], ruleDateRange[key])
                        } else {
                            // if (ruleDateRange[key] != null) {
                            //     if (curData[key] < ruleDateRange[key].Range.min) {
                            //         this.IsOverRange = true
                            //         curData[key] = ruleDateRange[key].Range.min
                            //     }
                            //     else if (curData[key] > ruleDateRange[key].Range.max) {
                            //         this.IsOverRange = true
                            //         curData[key] = ruleDateRange[key].Range.max
                            //     }
                            // }

                            ruleData[key] = curData[key]
                        }
                    }
                    else {
                        if (ruleDateRange[key] != null) {
                            if (curData[key] < ruleDateRange[key].Range.min) {
                                this.IsOverRange = true
                                curData[key] = ruleDateRange[key].Range.min
                            }
                            else if (curData[key] > ruleDateRange[key].Range.max) {
                                this.IsOverRange = true
                                curData[key] = ruleDateRange[key].Range.max
                            }
                        }
                        ruleData[key] = curData[key]
                    }
                }
                else {
                    if (typeof ruleData[key] === "object" && typeof curData[key] === "string") {
                        let curStr = curData[key] as string
                        let outStr: string[] = curStr.split(",")
                        let index: number = 0
                        for (const _key in ruleData[key]) {
                            ruleData[key][_key] = isNaN(Number(outStr[index])) ? 0 : Number(outStr[index])
                            if (ruleDateRange[key] != null) {
                                let CurRangeValue_Min
                                let CurRangeValue_Max
                                if (index === 0) {
                                    CurRangeValue_Min = ruleDateRange[key].Range.min.X
                                    CurRangeValue_Max = ruleDateRange[key].Range.max.X
                                } else if (index === 1) {
                                    CurRangeValue_Min = ruleDateRange[key].Range.min.Y
                                    CurRangeValue_Max = ruleDateRange[key].Range.max.Y
                                } else if (index === 2) {
                                    CurRangeValue_Min = ruleDateRange[key].Range.min.Z
                                    CurRangeValue_Max = ruleDateRange[key].Range.max.Z
                                } else if (index === 3) {
                                    CurRangeValue_Min = ruleDateRange[key].Range.min.W
                                    CurRangeValue_Max = ruleDateRange[key].Range.max.W
                                }
                                if (ruleData[key][_key] < CurRangeValue_Min) {
                                    this.IsOverRange = true
                                    ruleData[key][_key] = CurRangeValue_Min
                                }
                                else if (ruleData[key][_key] > CurRangeValue_Max) {
                                    this.IsOverRange = true
                                    ruleData[key][_key] = CurRangeValue_Max
                                }
                            }
                            index++
                        }
                    }
                }
            }
        }
        return ruleData
    }


    EditorValueToAPIValue() {

    }




    GenDefaultRange(typeName: string, funcName: string) {
        let OutRangeData: { [key: string]: any } = {}
        let [devData, userData] = this.ReadConfigData()
        if (devData == null) return
        if (userData == null) return
        let dataArray_Dev: Array<any> = devData.apiList
        let data_Dev = dataArray_Dev.find((item) => {
            return item.class === typeName
        })
        let actionDataArray_Dev: Array<any> = data_Dev.actions
        let actionData_Dev = actionDataArray_Dev.find((item) => {
            return item.function === funcName
        })
        actionData_Dev.jsondata.forEach((item) => {
            if (item.range) {
                let RangeData: { [key: string]: any } = {}
                let RangeValue: { [key: string]: any } = {}

                if (item.class == "Integer") {
                    RangeValue.min = item.range.min
                    RangeValue.max = item.range.max

                } else if (item.class.indexOf("Color") != -1) {
                    RangeValue.min = { X: 0, Y: 0, Z: 0, W: 0 }
                    RangeValue.max = { X: 1, Y: 1, Z: 1, W: 1 }

                } else if (item.class.indexOf("Vector2") != -1) {
                    let valueMin: any = item.range.min
                    valueMin = {}
                    [valueMin.X, valueMin.Y] = this.ConvertToObject(item.range.min)
                    RangeValue.min = this.ArraytoVector(valueMin)

                    let valueMax: any = item.range.max
                    valueMax = {}
                    [valueMax.X, valueMax.Y] = this.ConvertToObject(item.range.max)
                    RangeValue.max = this.ArraytoVector(valueMax)
                } else if (item.class.indexOf("Vector3") != -1) {
                    let valueMin: any = item.range.min
                    valueMin = {}
                    [valueMin.X, valueMin.Y, valueMin.Z] = this.ConvertToObject(item.range.min)
                    this.ArraytoVector(valueMin)
                    RangeValue.min = valueMin

                    let valueMax: any = item.range.max
                    valueMax = {}
                    [valueMax.X, valueMax.Y, valueMax.Z] = this.ConvertToObject(item.range.max)
                    RangeValue.max = this.ArraytoVector(valueMax)

                } else if (item.class.indexOf("Vector4") != -1) {
                    let valueMin: any = item.range.min
                    valueMin = {}
                    [valueMin.X, valueMin.Y, valueMin.Z, valueMin.W] = this.ConvertToObject(item.range.min)

                    RangeValue.min = this.ArraytoVector(valueMin)

                    let valueMax: any = item.range.max
                    valueMax = {}
                    [valueMax.X, valueMax.Y, valueMax.Z, valueMin.W] = this.ConvertToObject(item.range.max)
                    RangeValue.max = this.ArraytoVector(valueMax)
                }
                RangeData.Range = RangeValue
                OutRangeData[item.name] = RangeData
            }
        })
        return OutRangeData
    }

    GenDefaultValue(typeName: string, funcName: string) {
        let OutRangeData: { [key: string]: any } = {}
        let [devData, userData] = this.ReadConfigData()
        if (devData == null) return
        if (userData == null) return
        let user_DataArray: Array<any> = userData.apiList
        let data_User = user_DataArray.find((item) => {
            return item.class === typeName
        })
        let actionDataArray_User: Array<any> = data_User.actions
        let actionData_User = actionDataArray_User.find((item) => {
            return item.function === funcName
        })
        actionData_User.jsondata.forEach((item) => {
            if (item.name && item.value) {
                OutRangeData[item.name] = item.value
            }
        })
        return OutRangeData
    }
    ReadConfigData(): [any, any] {
        let ProjectDir = GetSystem(ProjectSystem).GetProjectDir()
        let absolutePathDev = path.join(ProjectDir,ApiListConfig_Dev)
        let absolutePathUser = path.join(ProjectDir,ApiListConfig_User)
        let DevPath = absolutePathDev
        let UserPath = absolutePathUser
        let devData = this.JsonToObject(DevPath)
        if (devData == null) {
            console.error(`config data [${DevPath}] is null`)
            return null
        }
        let userData = this.JsonToObject(UserPath)
        if (userData == null) {
            console.error(`config data [${UserPath}] is null`)
            return null
        }
        return [devData, userData]
    }

    JsonToObject(file: string): any {
        let Str = UE.OpenZIFrameworkLibrary.ReadFile(file)
        if (Str == "") {
            return null
        }else{
            return JSON.parse(Str)
        }
    }

    ConvertToObject(str: string): any {
        if (str == null) return null
        return JSON.parse(`{"Value":[${str}]}`).Value
    }

    ArraytoVector(array) {
        let vector = ["X", "Y", "Z", "W"]
        let OutObjectValue: { [key: string]: any } = {}
        if (array instanceof Array) {
            for (let i = 0; i < array.length; i++) {
                if (i < 4) {
                    OutObjectValue[vector[i]] = array[i]
                }
            }
        }
        return OutObjectValue
    }

    CoverObject(oldObject, newObject) {
        Object.keys(oldObject).forEach(key => {
            if (newObject[key]) {
                oldObject[key] = newObject[key]
            }
        });
    }
}








