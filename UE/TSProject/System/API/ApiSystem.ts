/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午4:39
 */

import { QSystem } from "../Engine/System";
import { QApiObject } from "../Core/Object/API/ApiListClass";
import { QColor } from "../Core/Property/QColor";
import { QTransform } from "../Core/Property/QTransform";
import { QVector2 } from "../Core/Property/QVector2";
import { QVector4 } from "../Core/Property/QVector4";
import { Singlecast } from "../Core/Delegate/Delegate";
import { PropertyHandle } from "../Core/Property/PropertyHandle";
import { ClassUtils } from "../Core/TsUtils/ClassUtils";
import { QApiActionComponent } from "../Core/Object/API/ApiActionObject";
import * as path from "path";
import { GetSystem } from "../Engine/QEngine";
import { ProjectSystem } from "../Project/Project/ProjectSystem";
import * as UE from "ue";
import { $ref, $unref } from "puerts";
import { MessageCenter } from "../Core/NotificationCore/MessageManager";
import { NotificationLists } from "../Core/NotificationCore/NotificationLists";
import { ComponentContainer } from "../Core/Component/ComponentContainer";
import {
    __Dynamic_Instance_Properties__,
    array,
    ArrayPropertyMetadata,
    bool,
    BoolPropertyMetadata,
    color,
    double,
    EnumPropertyMetadata,
    enumType,
    float,
    integer,
    IPropertyMetadata,
    map,
    MapPropertyMetadata,
    NumberPropertyMetadata,
    object,
    PropertyMetadata,
    string,
    StringPropertyMetadata,
    struct,
    StructPropertyMetadata,
    transform,
    vector2,
    vector3,
    vector4
} from "../Core/Property/PropertyMetadata";
import { QVector3 } from "../Core/Property/QVector3";
import { QStruct } from "../Core/Property/QStruct";
import { NewQObject, QObject } from "../Core/Object/QObject";
import { PropertyType } from "../Core/Property/PropertyType";
import { ComponentInfo, ComponentSystem } from "../Core/Component/ComponentSystem";
import { QComponent } from "../Core/Component/QComponent";
import { ERROR, LOG, WARNING } from "../Utils/MiscTools";
import { Activator } from "../Core/Activator/Activator";
import { CSVConfigFilePath, SettingConfigFilePath } from "../Setting/FileSetting";
import * as SystemSetting from "../Setting/SystemSetting"
import * as SystemAPI from "../API/System_APIList"
import * as WebPageViewModel from "../../GamePlay/API/ViewModel/WebPageViewModel"
import { MessageQueueList } from "../Core/NetWork/MessageQueue";
import { GetViewModel } from "./ApiViewModelSystem";
import { CoodinateConverterViewModel } from "../../GamePlay/API/ViewModel/CoodinateConverterViewModel";
import * as GameAPI from "../../GamePlay/API/Game_APIList"
import * as puerts from "puerts";
import { Execute_BlueprintMixin } from "./Handle/ExecuteMixin";
import { SceneViewingUIView } from "../../GamePlay/API/View/SceneViewingUIView";
import { DynamicWeatherView } from "../../GamePlay/API/View/DynamicWeatherView";
import { LevelViewModel } from "../../GamePlay/API/ViewModel/LevelViewModel";

const ApiListConfig_Dev = "APIListConfig-Dev.json"
const ApiListConfig_Dev_Test = "APIListConfig-Dev_Test.json"
const ApiListConfig_User = "APIListConfig-User.json"
const ApiListConfig_User_Test = "APIListConfig-User_Test.json"

// let openTest = true
let openTest = false

//latitude and longitude
export const Coordinates_Min: string = "-180,-90,-1000000000,0"
// export const Coordinates_Min: IVector4 = {X: -180, Y: -90, Z: -1000000000, W: 0}
export const Coordinates_Max: string = "180,90,1000000000,0"
// export const Coordinates_Max: IVector4 = {X: 180, Y: 90, Z: 1000000000, W: 0}

type PropertyBuilderFunc = (action: QApiActionComponent, data: any, userData: any) => void

type PropertyInfo = {
    value: any
    data: any
    enumKeys?: string[]
    struct?: any
    structData?: any

    [Others: string]: any
}

export class ApiSystem extends QSystem {
    apiList: Array<QApiObject> = new Array<QApiObject>()
    builders = new Map<string, Singlecast<PropertyBuilderFunc>>()

    Init() {
        this.RegisterBuilders()
        this.apiList = this.GenerateApiList(true)
        // this.WriteClassMetadata()

        MessageCenter.Add(this, this.CopyMessageToClipboard.bind(this), NotificationLists.API.COPY_API_CLIPBOARD)
        //The test generates an ApiAction object based on the class and Action name

        Activator.Get().RegisterCreateFunction(QApiActionComponent.name, this.CreateApiActionObject.bind(this))
    }

    GetApiConfigPath(apiPath: string): string {
        //let projectSystem = GetSystem(ProjectSystem)
        //let absolutePath = path.join(, "API", apiPath)
        let ProjectDir = GetSystem(ProjectSystem).GetProjectDir()
        //let absolutePath = path.join(UE.BlueprintPathsLibrary.ProjectDir(),"Script/Config",apiPath)
        let absolutePath = path.join(ProjectDir,"Script/Config",apiPath)
        return absolutePath
    }

    CopyMessageToClipboard(apiComponts: any) {
        let curapiComponts = []
        if (apiComponts instanceof QApiActionComponent) {
            curapiComponts.push(apiComponts.toAPIModel())

        } else if (apiComponts instanceof ComponentContainer) {
            apiComponts.GetAllTsComponents().forEach(item => {
                if (item instanceof QApiActionComponent) {
                    curapiComponts.push(item.toAPIModel())
                    //item.toExeAPI()
                }
            })
        }
        if (curapiComponts.length <= 0) return
        let str = JSON.stringify(curapiComponts)
        UE.OpenZIFrameworkLibrary.CopyMessageToClipboard(str)
    }

    //Clean up the TsComponent generated after Mixin QApiActionObject, because the API panel does not need to display components
    private WriteClassMetadata() {
        this.apiList.forEach((apiObject) => {
            let names = Object.getOwnPropertyNames(apiObject)
            for (const name of names) {
                let propertyDes = Object.getOwnPropertyDescriptor(apiObject, name)
                let actionProperty = propertyDes.value
                if (actionProperty instanceof QApiActionComponent) {
                    ClassUtils.Metadata({ NoShowComponents: true })(actionProperty.constructor)
                }
            }
        })
    }

    //Generate corresponding objects based on class names and behavior names
    CreateApiActionObject(data: any) {
        let className = data.className
        let actionName = data.actionName
        let [devData, userData] = this.ReadConfigData()

        if (devData == null) return
        if (userData == null) return;

        let dataArray_Dev: Array<any> = devData.apiList
        let data_Dev = dataArray_Dev.find((item) => {
            return item.class === className
        })
        let actionDataArray_Dev: Array<any> = data_Dev.actions
        let actionData_Dev = actionDataArray_Dev.find((item) => {
            return item.function === actionName
        })

        let user_DataArray: Array<any> = userData.apiList
        let data_User = user_DataArray.find((item) => {
            return item.class === className
        })
        let actionDataArray_User: Array<any> = data_User.actions
        let actionData_User = actionDataArray_User.find((item) => {
            return item.function === actionName
        })

        let newAction = NewQObject(QApiActionComponent)
        newAction.ApiClass = data_Dev.class
        newAction.Method = actionData_Dev.function
        newAction.DisplayName = actionData_Dev.displayName ?? actionData_Dev.description
        newAction.Description = actionData_Dev.description

        this.AddPropertys(newAction, actionData_Dev.jsondata, actionData_User.jsondata)
        // @ts-ignore
        newAction.objectInitializer()

        return newAction
    }

    GenerateApiList(generateForApiList: boolean = false): Array<QApiObject> {
        let list = new Array<QApiObject>()

        let [devData, userData] = this.ReadConfigData()
        if (devData && userData) {
            this.CreateListItemByConfigData(list, devData, userData, generateForApiList)
        }

        return list
    }

    ReadConfigData(): [any, any] {
        let DevPath = openTest ? this.GetApiConfigPath(ApiListConfig_Dev_Test) : this.GetApiConfigPath(ApiListConfig_Dev)
        let UserPath = openTest ? this.GetApiConfigPath(ApiListConfig_User_Test) : this.GetApiConfigPath(ApiListConfig_User)

        let devData = this.JsonToObject(DevPath)
        if (devData == null) {
            ERROR(`config data [${DevPath}] is null`)
            return [null, null]
        }

        let userData = this.JsonToObject(UserPath)
        if (userData == null) {
            ERROR(`config data [${UserPath}] is null`)
            return [null, null]
        }

        return [devData, userData]
    }

    JsonToObject(file: string): any {
        let fileContent = $ref<string>("")
        UE.OpenZIFrameworkLibrary.LoadFileToString(fileContent, file);
        let fileString = $unref(fileContent)
        return fileString.length > 0 ? JSON.parse(fileString) : null
    }

    CreateListItemByConfigData(list: Array<QApiObject>, data: any, userData: any, generateForApiList: boolean = false) {
        for (let i = 0; i < data.apiList.length; i++) {
            this.AddApiListItem(list, data.apiList[i], userData.apiList[i], generateForApiList)
        }
    }

    RegisterBuilders() {
        this.AddPropertyBuilder(PropertyType.Array, this.defineArray.name);
        this.AddPropertyBuilder(PropertyType.Bool, this.defineBool.name);
        this.AddPropertyBuilder(PropertyType.Color, this.defineColor.name);
        this.AddPropertyBuilder(PropertyType.Enum, this.defineEnum.name);
        this.AddPropertyBuilder(PropertyType.Float, this.defineFloat.name);
        this.AddPropertyBuilder(PropertyType.Integer, this.defineInteger.name);
        this.AddPropertyBuilder(PropertyType.Double, this.defineDouble.name);
        this.AddPropertyBuilder(PropertyType.Map, this.defineMap.name);
        this.AddPropertyBuilder(PropertyType.String, this.defineString.name);
        this.AddPropertyBuilder(PropertyType.Struct, this.defineStruct.name);
        this.AddPropertyBuilder(PropertyType.Transform, this.defineTransform.name);
        this.AddPropertyBuilder(PropertyType.Vector2, this.defineVector2.name);
        this.AddPropertyBuilder(PropertyType.Vector3, this.defineVector3.name);
        this.AddPropertyBuilder(PropertyType.Vector4, this.defineVector4.name);
    }

    AddPropertyBuilder(type: string, funcName: string) {
        if (this.builders.has(type)) {
            WARNING(`this type [${type}] has registered`)
            return
        }

        let callback = new Singlecast<PropertyBuilderFunc>()
        callback.Bind(this, funcName)
        this.builders.set(type, callback);
    }

    //添加一个ApiListItem
    AddApiListItem(list: Array<QApiObject>, data: any, userData: any, generateForApiList: boolean = false) {
        let newApi = NewQObject(QApiObject)
        newApi.Name = data.name
        newApi.ApiClass = data.class
        newApi.Description = data.description
        newApi.Category = data.category

        this.AddActions(newApi, data.actions, newApi.ApiClass, userData.actions, generateForApiList, newApi.Category)
        // @ts-ignore
        newApi.objectInitializer()

        this.AddApiObject(list, newApi)
    }

    AddActions(apiObject: QApiObject, data: any, apiClass: string, userData: any, generateForApiList: boolean = false, category: string) {
        for (let i = 0; i < data.length; i++) {
            let action = this.AddAction(data[i], apiClass, userData[i], generateForApiList, category)
            let hasMethod = Reflect.has(apiObject, action.Method)
            let propertyName = hasMethod ? action.Method + i : action.Method
            Object.defineProperty(apiObject, propertyName, { value: action })
        }
    }

    AddAction(data: any, apiClass: string, userData: any, generateForApiList: boolean = false, category: string): QApiActionComponent {
        let newAction = NewQObject(QApiActionComponent)
        newAction.ApiClass = apiClass
        newAction.Method = data.function
        newAction.DisplayName = data.displayName ?? data.description
        newAction.Description = data.description
        newAction.bGenerateForApiList = generateForApiList

        if (generateForApiList) {
            let componentInfo = new ComponentInfo()
            let className = `${newAction.ApiClass}_${newAction.Method}`
            componentInfo.Name = className
            componentInfo.Category = category
            componentInfo.DisplayName = className
            componentInfo.spawner = (): QComponent => {
                let spawnComponent = this.CreateApiActionObject({
                    className: newAction.ApiClass,
                    actionName: newAction.Method
                })
                spawnComponent.SetDisplayName(className)
                return spawnComponent
            }
            GetSystem(ComponentSystem).RegisterComponent(componentInfo)
        }

        this.AddPropertys(newAction, data.jsondata, userData.jsondata)

        // @ts-ignore
        newAction.objectInitializer()
        return newAction
    }

    AddPropertys(action: QApiActionComponent, data: any, userData: any) {
        if (action == null) return

        for (let i = 0; i < data.length; i++) {
            this.AddProperty(action, data[i], userData[i])
        }
    }

    AddProperty(action: QObject, data: any, userData: any) {
        if (data == null) return;

        let propertyType: string = data.class;
        //need to be dealt with because some are generic
        let index = propertyType.indexOf("<")
        propertyType = index != -1 ? propertyType.substring(0, index) : propertyType

        let builderDelegate = this.GetBuilder(propertyType);
        if (builderDelegate)
            builderDelegate.Execute(action as QApiActionComponent, data, userData)
        else
            WARNING(`${propertyType} not found builder`)
    }

    GetBuilder(type: string): Singlecast<PropertyBuilderFunc> {
        if (this.builders.has(type))
            return this.builders.get(type);
        return null
    }

    MakeEnumClass(kvs: object): object {
        if (kvs == null) return

        let enumClass = {}
        if (Array.isArray(kvs)) {
            for (let i = 0; i < kvs.length; i++) {
                enumClass[kvs[i]] = i
            }
        } else if (kvs.constructor.name === "Object") {
            for (const k of Object.keys(kvs)) {
                enumClass[k] = kvs[k]
            }
        } else {
            enumClass = null
        }

        return enumClass
    }

    defineArray(action: QObject, data: any, userData: any) {
        let propertyType = data.class//QArray<string>
        let startIndex = propertyType.indexOf("<")
        let endIndex = propertyType.indexOf(">")
        let itemTypeStr: string = propertyType.substring(startIndex + 1, endIndex)
        let itemType = PropertyType[itemTypeStr]

        let kvs = data.enumKeys ?? data.enumKeyValues
        let enumClass = this.MakeEnumClass(kvs)
        let structInstance = this.MakeStruct(data.struct, userData.struct)
        let structClass = structInstance?.constructor

        let itemMetadata = new PropertyMetadata(new ArrayPropertyMetadata())
        itemMetadata.type = itemType
        itemMetadata.allowSlide = data.allowSlide

        let minMaxStr = data.coordinates ? Coordinates_Min : data.range?.min
        itemMetadata.min = minMaxStr ? new QVector3(minMaxStr) : undefined

        minMaxStr = data.coordinates ? Coordinates_Max : data.range?.max
        itemMetadata.max = minMaxStr ? new QVector3(minMaxStr) : undefined

        itemMetadata.enumClass = enumClass
        itemMetadata.valuAsString = data.valueAsString
        // itemMetadata.class = structClass
        itemMetadata.objectArchetype = structInstance

        itemMetadata = this.RunDecorator({}, {
            tooltip: "",
            displayName: "",
            editable: true,
            name: "array Item"
        }, itemMetadata);

        let array = new Array<any>()
        let index = 0
        for (let item of userData.value) {
            let itemInstance = item
            if (itemMetadata.type === PropertyType.Struct) {
                itemInstance = structInstance.deepCopy()
            }

            itemMetadata.default = item
            let itemPropertyHandle = new PropertyHandle("", itemInstance, item, itemMetadata)
            itemPropertyHandle.SetPropertyValue(item)
            array.push(itemPropertyHandle.GetPropertyValue())
            index++
        }

        let dv = array
        let propertyDescriptor: PropertyDescriptor = { value: dv, writable: true, enumerable: true, configurable: true }
        Object.defineProperty(action, data.name, propertyDescriptor ?? {})

        let metadata = new ArrayPropertyMetadata()
        metadata.type = PropertyType.Array
        metadata.default = dv
        metadata.valueMetadata = itemMetadata
        this.RunDecorator(action, data, metadata)
    }

    StringToVectorObject(str: string) {
        if (str == null) return null
        let [X, Y, Z, W] = this.ConvertToObject(str)
        return { X: X ?? 0, Y: Y ?? 0, Z: Z ?? 0, W: W ?? 0 }
    }

    RunDecorator(action: object, data: any, metadata: IPropertyMetadata<any>): PropertyMetadata {
        metadata.description = data.description
        metadata.displayName = data.displayName
        // metadata.editable = data.editable
        metadata.instanceMetadata = true

        let conditionFunc = function (condition: string, self, key): boolean {
            if (condition == null || typeof condition !== "string") return true

            let conditions = condition.split("&&")
            for (let conditionExpression of conditions) {
                conditionExpression = conditionExpression.trim()
                let [keyValueStr, valueStr] = conditionExpression.split("=")
                let propertyName = keyValueStr;
                if (valueStr.length <= 0) return false

                let value = JSON.parse(valueStr)
                if (self[propertyName] !== value) return false
            }

            return true;
        }

        if (data.editable) {
            metadata.editable = (self, key) => conditionFunc(data.editable, self, key)
        }

        if (data.visible) {
            metadata.visible = (self, key) => conditionFunc(data.visible, self, key)
        }

        const decoratorFunc = {
            [PropertyType.None]: null,
            [PropertyType.Array]: array,
            [PropertyType.Bool]: bool,
            [PropertyType.String]: string,
            [PropertyType.Integer]: integer,
            [PropertyType.Float]: float,
            [PropertyType.Double]: double,
            [PropertyType.Enum]: enumType,
            [PropertyType.Object]: object,
            [PropertyType.Struct]: struct,
            [PropertyType.Map]: map,
            [PropertyType.Vector2]: vector2,
            [PropertyType.Vector3]: vector3,
            [PropertyType.Vector4]: vector4,
            [PropertyType.Color]: color,
            [PropertyType.Transform]: transform
        };

        let func = decoratorFunc[metadata.type];
        if (func != null) {
            let propertyKey = data.name
            let target = action
            let fullMetadata = func(metadata)(target, propertyKey)
            if (fullMetadata) {
                const properties = target[__Dynamic_Instance_Properties__] || new Map<string, PropertyMetadata>();
                // deepFreeze(fullMetadata)
                properties.set(propertyKey, fullMetadata);
                target[__Dynamic_Instance_Properties__] = properties;
                return fullMetadata
            }
        }

        ERROR(`${data.name} not found property decorator`)
        return null
    }

    defineBool(action: QObject, data: any, userData: any) {
        let dv = userData.value
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new BoolPropertyMetadata()
        metadata.type = PropertyType.Bool
        metadata.default = dv
        this.RunDecorator(action, data, metadata)
    }

    defineColor(action: QObject, data: any, userData: any) {
        let valueObj = this.ConvertToObject(userData.value);
        let dv = new QColor(valueObj[0], valueObj[1], valueObj[2], valueObj[3]);
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata<QVector4>(PropertyType.Vector4)
        metadata.type = PropertyType.Color
        metadata.default = dv
        this.RunDecorator(action, data, metadata)
    }

    defineEnum(action: QObject, data: any, userData: any) {
        let value = userData.value

        let kvs = data.enumKeys ?? data.enumKeyValues
        let enumClass = this.MakeEnumClass(kvs)
        if (enumClass == null)
            throw new Error(`${data.name}: The key value of the enumeration property is not correct`)

        if (Object.keys(enumClass).length <= 0)
            throw new Error(`${data.name}: The key value of the enumeration property is not correct`)

        let dv = value;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata: EnumPropertyMetadata = new EnumPropertyMetadata()
        metadata.type = PropertyType.Enum
        metadata.default = dv
        metadata.enumClass = enumClass
        metadata.valueAsString = data.valueAsString
        this.RunDecorator(action, data, metadata)
    }

    defineFloat(action: QStruct, data: any, userData: any) {
        let min = data.range?.min
        let max = data.range?.max
        let dv = userData.value
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata(PropertyType.Float)
        metadata.type = PropertyType.Float
        metadata.default = dv
        metadata.min = min
        metadata.max = max
        metadata.allowSlide = data.allowSlide
        this.RunDecorator(action, data, metadata)
    }

    defineInteger(action: QStruct, data: any, userData: any) {
        let min = data.range?.min
        let max = data.range?.max
        let dv = userData.value
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata(PropertyType.Integer)
        metadata.type = PropertyType.Integer
        metadata.default = dv
        metadata.min = min
        metadata.max = max
        metadata.allowSlide = data.allowSlide
        this.RunDecorator(action, data, metadata)
    }

    defineDouble(action: QStruct, data: any, userData: any) {
        let min = data.range?.min
        let max = data.range?.max
        let dv = userData.value
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata(PropertyType.Double)
        metadata.type = PropertyType.Double
        metadata.default = dv
        metadata.min = min
        metadata.max = max
        metadata.allowSlide = data.allowSlide
        this.RunDecorator(action, data, metadata)
    }

    defineMap(action: QObject, data: any, userData: any) {
        let propertyType = data.class//QMap<QString,QVector3>
        let startIndex = propertyType.indexOf("<")
        let endIndex = propertyType.indexOf(">")
        let keyValueType = propertyType.substring(startIndex + 1, endIndex)

        let pair = keyValueType.split(",")
        if (pair.length != 2) ERROR("ApiSystem.AddQMap map 缺少键和值",)
        let keyType = PropertyType[pair[0]]
        let valueType = PropertyType[pair[1]]

        let keyMetadata = new PropertyMetadata(new BoolPropertyMetadata())
        let kkvs = data.mapkey?.enumKeys ?? data.mapkey?.enumKeyValues
        keyMetadata.type = keyType;
        keyMetadata.min = data.mapkey?.coordinates ? Coordinates_Min : data.mapkey?.range.min
        keyMetadata.max = data.mapkey?.coordinates ? Coordinates_Max : data.mapkey?.range.max
        keyMetadata.enumClass = this.MakeEnumClass(kkvs)
        keyMetadata.valueAsString = data.mapkey?.valueAsString
        let keyStructInstance = this.MakeStruct(data.mapkey?.struct, data.mapkey?.struct)
        keyMetadata.objectArchetype = keyStructInstance
        keyMetadata.allowSlide = data.mapkey?.allowSlide

        let valueMetadata = new PropertyMetadata(new BoolPropertyMetadata())
        let vkvs = data.mapValue?.enumKeys ?? data.mapValue?.enumKeyValues
        valueMetadata.type = valueType;
        valueMetadata.min = data.mapValue?.coordinates ? Coordinates_Min : data.mapValue?.range.min
        valueMetadata.max = data.mapValue?.coordinates ? Coordinates_Max : data.mapValue?.range.max
        valueMetadata.enumClass = this.MakeEnumClass(vkvs)
        valueMetadata.valueAsString = data.mapValue?.valueAsString
        let valueStructInstance = this.MakeStruct(data.mapValue?.struct, data.mapValue?.struct)
        valueMetadata.objectArchetype = valueStructInstance
        valueMetadata.allowSlide = data.mapkey?.allowSlide

        let map = new Map<any, any>()
        let keys = Reflect.ownKeys(userData.value)
        let i = 0;
        for (const mapPair in userData.value) {
            let k = keys[i]
            let v = userData.value[k]

            let kPropertyHandle = new PropertyHandle("", mapPair, k, keyMetadata);
            let itemKey = kPropertyHandle.GetPropertyValue()

            let vPropertyHandle = new PropertyHandle("", mapPair, v, valueMetadata);
            let itemValue = vPropertyHandle.GetPropertyValue()

            map.set(itemKey, itemValue)
            i++;
        }

        let dv = map
        let propertyDescriptor: PropertyDescriptor = { value: dv, writable: true, enumerable: true, configurable: true }
        Object.defineProperty(action, data.name, propertyDescriptor ?? {})

        let metadata = new MapPropertyMetadata()
        metadata.type = PropertyType.Map
        metadata.default = dv
        metadata.keyMetadata = keyMetadata
        metadata.valueMetadata = valueMetadata
        this.RunDecorator(action, data, metadata)
    }

    defineString(action: QStruct, data: any, userData: any) {
        let dv = userData.value
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new StringPropertyMetadata()
        metadata.type = PropertyType.String
        metadata.default = dv
        this.RunDecorator(action, data, metadata)
    }

    MakeStruct(data: any, userData: any): QStruct {
        if (data == null) return null

        let newStruct = NewQObject(QStruct);
        for (let i = 0; i < data.length; i++) {
            let structItemValue = { value: userData[i].value }
            this.AddProperty(newStruct, data[i], structItemValue)
        }
        // @ts-ignore
        newStruct.objectInitializer()
        return newStruct
    }

    defineStruct(action: QObject, data: any, userData: any) {
        let struct = this.MakeStruct(data.struct, userData.struct)
        let dv = struct
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new StructPropertyMetadata()
        metadata.type = PropertyType.Struct
        metadata.default = dv
        // @ts-ignore
        metadata.class = struct.constructor
        this.RunDecorator(action, data, metadata)
    }

    defineTransform(action: QObject, data: any, userData: any) {
        let dv = new QTransform(userData.value)
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata<QTransform>(PropertyType.Transform)
        metadata.type = PropertyType.Transform
        metadata.default = dv
        this.RunDecorator(action, data, metadata)
    }

    defineVector2(action: QObject, data: any, userData: any) {
        let value = this.StringToVectorObject(userData.value)
        let minValue = data.coordinates ? Coordinates_Min : data.range?.min
        let maxValue = data.coordinates ? Coordinates_Max : data.range?.max
        let min = this.StringToVectorObject(minValue)
        let max = this.StringToVectorObject(maxValue)

        let dv = new QVector2(value.X, value.Y)
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata<QVector2>(PropertyType.Vector2)
        metadata.type = PropertyType.Vector2
        metadata.default = dv
        metadata.min = new QVector2(min)
        metadata.max = new QVector2(max)
        metadata.allowSlide = data.allowSlide
        this.RunDecorator(action, data, metadata)
    }

    defineVector3(action: QObject, data: any, userData: any) {
        let value = this.StringToVectorObject(userData.value)
        let minValue = data.coordinates ? Coordinates_Min : data.range?.min
        let maxValue = data.coordinates ? Coordinates_Max : data.range?.max
        let min = this.StringToVectorObject(minValue)
        let max = this.StringToVectorObject(maxValue)

        let dv = new QVector3(value.X, value.Y, value.Z)
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata<QVector3>(PropertyType.Vector3)
        metadata.type = PropertyType.Vector3
        metadata.default = dv
        metadata.min = new QVector3(min)
        metadata.max = new QVector3(max)
        metadata.allowSlide = data.allowSlide
        this.RunDecorator(action, data, metadata)
    }

    defineVector4(action: QObject, data: any, userData: any) {
        let value = this.StringToVectorObject(userData.value)
        let minValue = data.coordinates ? Coordinates_Min : data.range?.min
        let maxValue = data.coordinates ? Coordinates_Max : data.range?.max
        let min = this.StringToVectorObject(minValue)
        let max = this.StringToVectorObject(maxValue)

        let dv = new QVector4(value.X, value.Y, value.Z, value.W)
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true })

        let metadata = new NumberPropertyMetadata<QVector4>(PropertyType.Vector4)
        metadata.type = PropertyType.Vector4
        metadata.default = dv
        metadata.min = new QVector4(min)
        metadata.max = new QVector4(max)
        metadata.allowSlide = data.allowSlide
        this.RunDecorator(action, data, metadata)
    }

    ConvertToObject(str: string): any {
        if (str == null || str === "") return null
        return JSON.parse(`{"Value":[${str}]}`).Value
    }

    AddApiObject(list: Array<QApiObject>, object: QApiObject) {
        if (object == null) return

        list.push(object)
    }

    GetAllApi(): Array<QApiObject> {
        return this.apiList
    }

    PostInit() {
        // this.GetSystem(SceneEditor).GetDetail().SetObject(this.testApiObject)
    }

    PreInit() {
    }

    Shutdown() {
    }

    BeginPlay() {
        this.ApiInit()
    }

    Tick(DeltaTime: number) {
    }


    ApiInit() {
        let commandline = UE.KismetSystemLibrary.GetCommandLine()
        let refPort = $ref("")
        let succeed = UE.KismetSystemLibrary.ParseParamValue(commandline, "-Port", refPort)

        if (succeed) {
            // execute function
            let Port = $unref(refPort)
            Port = Port.slice(1, Port.length)
            let StrPort = String(Port)
            let unrealProjectDir = UE.BlueprintPathsLibrary.ConvertRelativePathToFull(UE.BlueprintPathsLibrary.ProjectDir(), "")
            let CurPath = path.join(unrealProjectDir, "Script/Web/WebServer.cmd")
            UE.OpenZIFrameworkLibrary.LaunchProcess(CurPath,StrPort)
        }
        SystemSetting.WriteSetting(SettingConfigFilePath)
        if (SystemSetting.bCloudRenderingMode) {
            SystemAPI.CreatePixelStreamListener()
        } else {
            WebPageViewModel.Ctor()
            SystemAPI.ShowMouseCursor()
        }
        LOG("Start StartServer")
        MessageQueueList.GetInstance().Ctor()
        if (succeed) {
            let Port = $unref(refPort)
            Port = Port.slice(1, Port.length)
            SystemAPI.StartWebSocketServer(SystemSetting.bWebsocketServerMode, Port, SystemSetting.WebSocketUrl)
        } else {
            SystemAPI.StartWebSocketServer(SystemSetting.bWebsocketServerMode, SystemSetting.ApiWebServerPort, SystemSetting.WebSocketUrl)
        }
        GetViewModel(CoodinateConverterViewModel).Refresh({})
        //GetViewModel(ObserverPawnViewModel).SpawnDefalutPawn()
        GameAPI.GetDefaultPawn()
        let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
        let Controller = UE.GameplayStatics.GetPlayerController(CurrentWorld, 0)
        Controller.bEnableClickEvents = true
        GetViewModel(LevelViewModel).AddPreLoadMaps(SystemSetting.PreLoadMaps)
        const CameraPointPath = "/OpenZIAPI/API/View/Roaming/UMG_CameraPoint.UMG_CameraPoint_C";
        const DynamicWeatherPath = "/DynamicWeather/DynamicWeather/Blueprints/BP_DynamicSKY.BP_DynamicSKY_C"
        //Mixin
        Execute_BlueprintMixin(CameraPointPath, SceneViewingUIView)
        Execute_BlueprintMixin(DynamicWeatherPath, DynamicWeatherView)
    }

}



