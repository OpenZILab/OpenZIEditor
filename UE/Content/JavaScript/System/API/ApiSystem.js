"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/2/27 下午4:39
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSystem = exports.Coordinates_Max = exports.Coordinates_Min = void 0;
const System_1 = require("../Engine/System");
const ApiListClass_1 = require("../Core/Object/API/ApiListClass");
const QColor_1 = require("../Core/Property/QColor");
const QTransform_1 = require("../Core/Property/QTransform");
const QVector2_1 = require("../Core/Property/QVector2");
const QVector4_1 = require("../Core/Property/QVector4");
const Delegate_1 = require("../Core/Delegate/Delegate");
const PropertyHandle_1 = require("../Core/Property/PropertyHandle");
const ClassUtils_1 = require("../Core/TsUtils/ClassUtils");
const ApiActionObject_1 = require("../Core/Object/API/ApiActionObject");
const path = require("path");
const QEngine_1 = require("../Engine/QEngine");
const ProjectSystem_1 = require("../Project/Project/ProjectSystem");
const UE = require("ue");
const puerts_1 = require("puerts");
const MessageManager_1 = require("../Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../Core/NotificationCore/NotificationLists");
const ComponentContainer_1 = require("../Core/Component/ComponentContainer");
const PropertyMetadata_1 = require("../Core/Property/PropertyMetadata");
const QVector3_1 = require("../Core/Property/QVector3");
const QStruct_1 = require("../Core/Property/QStruct");
const QObject_1 = require("../Core/Object/QObject");
const PropertyType_1 = require("../Core/Property/PropertyType");
const ComponentSystem_1 = require("../Core/Component/ComponentSystem");
const MiscTools_1 = require("../Utils/MiscTools");
const Activator_1 = require("../Core/Activator/Activator");
const FileSetting_1 = require("../Setting/FileSetting");
const SystemSetting = require("../Setting/SystemSetting");
const SystemAPI = require("../API/System_APIList");
const WebPageViewModel = require("../../GamePlay/API/ViewModel/WebPageViewModel");
const MessageQueue_1 = require("../Core/NetWork/MessageQueue");
const ApiViewModelSystem_1 = require("./ApiViewModelSystem");
const CoodinateConverterViewModel_1 = require("../../GamePlay/API/ViewModel/CoodinateConverterViewModel");
const GameAPI = require("../../GamePlay/API/Game_APIList");
const puerts = require("puerts");
const ExecuteMixin_1 = require("./Handle/ExecuteMixin");
const SceneViewingUIView_1 = require("../../GamePlay/API/View/SceneViewingUIView");
const DynamicWeatherView_1 = require("../../GamePlay/API/View/DynamicWeatherView");
const LevelViewModel_1 = require("../../GamePlay/API/ViewModel/LevelViewModel");
const ApiListConfig_Dev = "APIListConfig-Dev.json";
const ApiListConfig_Dev_Test = "APIListConfig-Dev_Test.json";
const ApiListConfig_User = "APIListConfig-User.json";
const ApiListConfig_User_Test = "APIListConfig-User_Test.json";
// let openTest = true
let openTest = false;
//latitude and longitude
exports.Coordinates_Min = "-180,-90,-1000000000,0";
// export const Coordinates_Min: IVector4 = {X: -180, Y: -90, Z: -1000000000, W: 0}
exports.Coordinates_Max = "180,90,1000000000,0";
class ApiSystem extends System_1.QSystem {
    apiList = new Array();
    builders = new Map();
    Init() {
        this.RegisterBuilders();
        this.apiList = this.GenerateApiList(true);
        // this.WriteClassMetadata()
        MessageManager_1.MessageCenter.Add(this, this.CopyMessageToClipboard.bind(this), NotificationLists_1.NotificationLists.API.COPY_API_CLIPBOARD);
        //The test generates an ApiAction object based on the class and Action name
        Activator_1.Activator.Get().RegisterCreateFunction(ApiActionObject_1.QApiActionComponent.name, this.CreateApiActionObject.bind(this));
    }
    GetApiConfigPath(apiPath) {
        //let projectSystem = GetSystem(ProjectSystem)
        //let absolutePath = path.join(, "API", apiPath)
        let ProjectDir = (0, QEngine_1.GetSystem)(ProjectSystem_1.ProjectSystem).GetProjectDir();
        //let absolutePath = path.join(UE.BlueprintPathsLibrary.ProjectDir(),"Script/Config",apiPath)
        let absolutePath = path.join(ProjectDir, "Script/Config", apiPath);
        return absolutePath;
    }
    CopyMessageToClipboard(apiComponts) {
        let curapiComponts = [];
        if (apiComponts instanceof ApiActionObject_1.QApiActionComponent) {
            curapiComponts.push(apiComponts.toAPIModel());
        }
        else if (apiComponts instanceof ComponentContainer_1.ComponentContainer) {
            apiComponts.GetAllTsComponents().forEach(item => {
                if (item instanceof ApiActionObject_1.QApiActionComponent) {
                    curapiComponts.push(item.toAPIModel());
                    //item.toExeAPI()
                }
            });
        }
        if (curapiComponts.length <= 0)
            return;
        let str = JSON.stringify(curapiComponts);
        UE.OpenZIFrameworkLibrary.CopyMessageToClipboard(str);
    }
    //Clean up the TsComponent generated after Mixin QApiActionObject, because the API panel does not need to display components
    WriteClassMetadata() {
        this.apiList.forEach((apiObject) => {
            let names = Object.getOwnPropertyNames(apiObject);
            for (const name of names) {
                let propertyDes = Object.getOwnPropertyDescriptor(apiObject, name);
                let actionProperty = propertyDes.value;
                if (actionProperty instanceof ApiActionObject_1.QApiActionComponent) {
                    ClassUtils_1.ClassUtils.Metadata({ NoShowComponents: true })(actionProperty.constructor);
                }
            }
        });
    }
    //Generate corresponding objects based on class names and behavior names
    CreateApiActionObject(data) {
        let className = data.className;
        let actionName = data.actionName;
        let [devData, userData] = this.ReadConfigData();
        if (devData == null)
            return;
        if (userData == null)
            return;
        let dataArray_Dev = devData.apiList;
        let data_Dev = dataArray_Dev.find((item) => {
            return item.class === className;
        });
        let actionDataArray_Dev = data_Dev.actions;
        let actionData_Dev = actionDataArray_Dev.find((item) => {
            return item.function === actionName;
        });
        let user_DataArray = userData.apiList;
        let data_User = user_DataArray.find((item) => {
            return item.class === className;
        });
        let actionDataArray_User = data_User.actions;
        let actionData_User = actionDataArray_User.find((item) => {
            return item.function === actionName;
        });
        let newAction = (0, QObject_1.NewQObject)(ApiActionObject_1.QApiActionComponent);
        newAction.ApiClass = data_Dev.class;
        newAction.Method = actionData_Dev.function;
        newAction.DisplayName = actionData_Dev.displayName ?? actionData_Dev.description;
        newAction.Description = actionData_Dev.description;
        this.AddPropertys(newAction, actionData_Dev.jsondata, actionData_User.jsondata);
        // @ts-ignore
        newAction.objectInitializer();
        return newAction;
    }
    GenerateApiList(generateForApiList = false) {
        let list = new Array();
        let [devData, userData] = this.ReadConfigData();
        if (devData && userData) {
            this.CreateListItemByConfigData(list, devData, userData, generateForApiList);
        }
        return list;
    }
    ReadConfigData() {
        let DevPath = openTest ? this.GetApiConfigPath(ApiListConfig_Dev_Test) : this.GetApiConfigPath(ApiListConfig_Dev);
        let UserPath = openTest ? this.GetApiConfigPath(ApiListConfig_User_Test) : this.GetApiConfigPath(ApiListConfig_User);
        let devData = this.JsonToObject(DevPath);
        if (devData == null) {
            (0, MiscTools_1.ERROR)(`config data [${DevPath}] is null`);
            return [null, null];
        }
        let userData = this.JsonToObject(UserPath);
        if (userData == null) {
            (0, MiscTools_1.ERROR)(`config data [${UserPath}] is null`);
            return [null, null];
        }
        return [devData, userData];
    }
    JsonToObject(file) {
        let fileContent = (0, puerts_1.$ref)("");
        UE.OpenZIFrameworkLibrary.LoadFileToString(fileContent, file);
        let fileString = (0, puerts_1.$unref)(fileContent);
        return fileString.length > 0 ? JSON.parse(fileString) : null;
    }
    CreateListItemByConfigData(list, data, userData, generateForApiList = false) {
        for (let i = 0; i < data.apiList.length; i++) {
            this.AddApiListItem(list, data.apiList[i], userData.apiList[i], generateForApiList);
        }
    }
    RegisterBuilders() {
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Array, this.defineArray.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Bool, this.defineBool.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Color, this.defineColor.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Enum, this.defineEnum.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Float, this.defineFloat.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Integer, this.defineInteger.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Double, this.defineDouble.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Map, this.defineMap.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.String, this.defineString.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Struct, this.defineStruct.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Transform, this.defineTransform.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Vector2, this.defineVector2.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Vector3, this.defineVector3.name);
        this.AddPropertyBuilder(PropertyType_1.PropertyType.Vector4, this.defineVector4.name);
    }
    AddPropertyBuilder(type, funcName) {
        if (this.builders.has(type)) {
            (0, MiscTools_1.WARNING)(`this type [${type}] has registered`);
            return;
        }
        let callback = new Delegate_1.Singlecast();
        callback.Bind(this, funcName);
        this.builders.set(type, callback);
    }
    //添加一个ApiListItem
    AddApiListItem(list, data, userData, generateForApiList = false) {
        let newApi = (0, QObject_1.NewQObject)(ApiListClass_1.QApiObject);
        newApi.Name = data.name;
        newApi.ApiClass = data.class;
        newApi.Description = data.description;
        newApi.Category = data.category;
        this.AddActions(newApi, data.actions, newApi.ApiClass, userData.actions, generateForApiList, newApi.Category);
        // @ts-ignore
        newApi.objectInitializer();
        this.AddApiObject(list, newApi);
    }
    AddActions(apiObject, data, apiClass, userData, generateForApiList = false, category) {
        for (let i = 0; i < data.length; i++) {
            let action = this.AddAction(data[i], apiClass, userData[i], generateForApiList, category);
            let hasMethod = Reflect.has(apiObject, action.Method);
            let propertyName = hasMethod ? action.Method + i : action.Method;
            Object.defineProperty(apiObject, propertyName, { value: action });
        }
    }
    AddAction(data, apiClass, userData, generateForApiList = false, category) {
        let newAction = (0, QObject_1.NewQObject)(ApiActionObject_1.QApiActionComponent);
        newAction.ApiClass = apiClass;
        newAction.Method = data.function;
        newAction.DisplayName = data.displayName ?? data.description;
        newAction.Description = data.description;
        newAction.bGenerateForApiList = generateForApiList;
        if (generateForApiList) {
            let componentInfo = new ComponentSystem_1.ComponentInfo();
            let className = `${newAction.ApiClass}_${newAction.Method}`;
            componentInfo.Name = className;
            componentInfo.Category = category;
            componentInfo.DisplayName = className;
            componentInfo.spawner = () => {
                let spawnComponent = this.CreateApiActionObject({
                    className: newAction.ApiClass,
                    actionName: newAction.Method
                });
                spawnComponent.SetDisplayName(className);
                return spawnComponent;
            };
            (0, QEngine_1.GetSystem)(ComponentSystem_1.ComponentSystem).RegisterComponent(componentInfo);
        }
        this.AddPropertys(newAction, data.jsondata, userData.jsondata);
        // @ts-ignore
        newAction.objectInitializer();
        return newAction;
    }
    AddPropertys(action, data, userData) {
        if (action == null)
            return;
        for (let i = 0; i < data.length; i++) {
            this.AddProperty(action, data[i], userData[i]);
        }
    }
    AddProperty(action, data, userData) {
        if (data == null)
            return;
        let propertyType = data.class;
        //need to be dealt with because some are generic
        let index = propertyType.indexOf("<");
        propertyType = index != -1 ? propertyType.substring(0, index) : propertyType;
        let builderDelegate = this.GetBuilder(propertyType);
        if (builderDelegate)
            builderDelegate.Execute(action, data, userData);
        else
            (0, MiscTools_1.WARNING)(`${propertyType} not found builder`);
    }
    GetBuilder(type) {
        if (this.builders.has(type))
            return this.builders.get(type);
        return null;
    }
    MakeEnumClass(kvs) {
        if (kvs == null)
            return;
        let enumClass = {};
        if (Array.isArray(kvs)) {
            for (let i = 0; i < kvs.length; i++) {
                enumClass[kvs[i]] = i;
            }
        }
        else if (kvs.constructor.name === "Object") {
            for (const k of Object.keys(kvs)) {
                enumClass[k] = kvs[k];
            }
        }
        else {
            enumClass = null;
        }
        return enumClass;
    }
    defineArray(action, data, userData) {
        let propertyType = data.class; //QArray<string>
        let startIndex = propertyType.indexOf("<");
        let endIndex = propertyType.indexOf(">");
        let itemTypeStr = propertyType.substring(startIndex + 1, endIndex);
        let itemType = PropertyType_1.PropertyType[itemTypeStr];
        let kvs = data.enumKeys ?? data.enumKeyValues;
        let enumClass = this.MakeEnumClass(kvs);
        let structInstance = this.MakeStruct(data.struct, userData.struct);
        let structClass = structInstance?.constructor;
        let itemMetadata = new PropertyMetadata_1.PropertyMetadata(new PropertyMetadata_1.ArrayPropertyMetadata());
        itemMetadata.type = itemType;
        itemMetadata.allowSlide = data.allowSlide;
        let minMaxStr = data.coordinates ? exports.Coordinates_Min : data.range?.min;
        itemMetadata.min = minMaxStr ? new QVector3_1.QVector3(minMaxStr) : undefined;
        minMaxStr = data.coordinates ? exports.Coordinates_Max : data.range?.max;
        itemMetadata.max = minMaxStr ? new QVector3_1.QVector3(minMaxStr) : undefined;
        itemMetadata.enumClass = enumClass;
        itemMetadata.valuAsString = data.valueAsString;
        // itemMetadata.class = structClass
        itemMetadata.objectArchetype = structInstance;
        itemMetadata = this.RunDecorator({}, {
            tooltip: "",
            displayName: "",
            editable: true,
            name: "array Item"
        }, itemMetadata);
        let array = new Array();
        let index = 0;
        for (let item of userData.value) {
            let itemInstance = item;
            if (itemMetadata.type === PropertyType_1.PropertyType.Struct) {
                itemInstance = structInstance.deepCopy();
            }
            itemMetadata.default = item;
            let itemPropertyHandle = new PropertyHandle_1.PropertyHandle("", itemInstance, item, itemMetadata);
            itemPropertyHandle.SetPropertyValue(item);
            array.push(itemPropertyHandle.GetPropertyValue());
            index++;
        }
        let dv = array;
        let propertyDescriptor = { value: dv, writable: true, enumerable: true, configurable: true };
        Object.defineProperty(action, data.name, propertyDescriptor ?? {});
        let metadata = new PropertyMetadata_1.ArrayPropertyMetadata();
        metadata.type = PropertyType_1.PropertyType.Array;
        metadata.default = dv;
        metadata.valueMetadata = itemMetadata;
        this.RunDecorator(action, data, metadata);
    }
    StringToVectorObject(str) {
        if (str == null)
            return null;
        let [X, Y, Z, W] = this.ConvertToObject(str);
        return { X: X ?? 0, Y: Y ?? 0, Z: Z ?? 0, W: W ?? 0 };
    }
    RunDecorator(action, data, metadata) {
        metadata.description = data.description;
        metadata.displayName = data.displayName;
        // metadata.editable = data.editable
        metadata.instanceMetadata = true;
        let conditionFunc = function (condition, self, key) {
            if (condition == null || typeof condition !== "string")
                return true;
            let conditions = condition.split("&&");
            for (let conditionExpression of conditions) {
                conditionExpression = conditionExpression.trim();
                let [keyValueStr, valueStr] = conditionExpression.split("=");
                let propertyName = keyValueStr;
                if (valueStr.length <= 0)
                    return false;
                let value = JSON.parse(valueStr);
                if (self[propertyName] !== value)
                    return false;
            }
            return true;
        };
        if (data.editable) {
            metadata.editable = (self, key) => conditionFunc(data.editable, self, key);
        }
        if (data.visible) {
            metadata.visible = (self, key) => conditionFunc(data.visible, self, key);
        }
        const decoratorFunc = {
            [PropertyType_1.PropertyType.None]: null,
            [PropertyType_1.PropertyType.Array]: PropertyMetadata_1.array,
            [PropertyType_1.PropertyType.Bool]: PropertyMetadata_1.bool,
            [PropertyType_1.PropertyType.String]: PropertyMetadata_1.string,
            [PropertyType_1.PropertyType.Integer]: PropertyMetadata_1.integer,
            [PropertyType_1.PropertyType.Float]: PropertyMetadata_1.float,
            [PropertyType_1.PropertyType.Double]: PropertyMetadata_1.double,
            [PropertyType_1.PropertyType.Enum]: PropertyMetadata_1.enumType,
            [PropertyType_1.PropertyType.Object]: PropertyMetadata_1.object,
            [PropertyType_1.PropertyType.Struct]: PropertyMetadata_1.struct,
            [PropertyType_1.PropertyType.Map]: PropertyMetadata_1.map,
            [PropertyType_1.PropertyType.Vector2]: PropertyMetadata_1.vector2,
            [PropertyType_1.PropertyType.Vector3]: PropertyMetadata_1.vector3,
            [PropertyType_1.PropertyType.Vector4]: PropertyMetadata_1.vector4,
            [PropertyType_1.PropertyType.Color]: PropertyMetadata_1.color,
            [PropertyType_1.PropertyType.Transform]: PropertyMetadata_1.transform
        };
        let func = decoratorFunc[metadata.type];
        if (func != null) {
            let propertyKey = data.name;
            let target = action;
            let fullMetadata = func(metadata)(target, propertyKey);
            if (fullMetadata) {
                const properties = target[PropertyMetadata_1.__Dynamic_Instance_Properties__] || new Map();
                // deepFreeze(fullMetadata)
                properties.set(propertyKey, fullMetadata);
                target[PropertyMetadata_1.__Dynamic_Instance_Properties__] = properties;
                return fullMetadata;
            }
        }
        (0, MiscTools_1.ERROR)(`${data.name} not found property decorator`);
        return null;
    }
    defineBool(action, data, userData) {
        let dv = userData.value;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.BoolPropertyMetadata();
        metadata.type = PropertyType_1.PropertyType.Bool;
        metadata.default = dv;
        this.RunDecorator(action, data, metadata);
    }
    defineColor(action, data, userData) {
        let valueObj = this.ConvertToObject(userData.value);
        let dv = new QColor_1.QColor(valueObj[0], valueObj[1], valueObj[2], valueObj[3]);
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Vector4);
        metadata.type = PropertyType_1.PropertyType.Color;
        metadata.default = dv;
        this.RunDecorator(action, data, metadata);
    }
    defineEnum(action, data, userData) {
        let value = userData.value;
        let kvs = data.enumKeys ?? data.enumKeyValues;
        let enumClass = this.MakeEnumClass(kvs);
        if (enumClass == null)
            throw new Error(`${data.name}: The key value of the enumeration property is not correct`);
        if (Object.keys(enumClass).length <= 0)
            throw new Error(`${data.name}: The key value of the enumeration property is not correct`);
        let dv = value;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.EnumPropertyMetadata();
        metadata.type = PropertyType_1.PropertyType.Enum;
        metadata.default = dv;
        metadata.enumClass = enumClass;
        metadata.valueAsString = data.valueAsString;
        this.RunDecorator(action, data, metadata);
    }
    defineFloat(action, data, userData) {
        let min = data.range?.min;
        let max = data.range?.max;
        let dv = userData.value;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Float);
        metadata.type = PropertyType_1.PropertyType.Float;
        metadata.default = dv;
        metadata.min = min;
        metadata.max = max;
        metadata.allowSlide = data.allowSlide;
        this.RunDecorator(action, data, metadata);
    }
    defineInteger(action, data, userData) {
        let min = data.range?.min;
        let max = data.range?.max;
        let dv = userData.value;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Integer);
        metadata.type = PropertyType_1.PropertyType.Integer;
        metadata.default = dv;
        metadata.min = min;
        metadata.max = max;
        metadata.allowSlide = data.allowSlide;
        this.RunDecorator(action, data, metadata);
    }
    defineDouble(action, data, userData) {
        let min = data.range?.min;
        let max = data.range?.max;
        let dv = userData.value;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Double);
        metadata.type = PropertyType_1.PropertyType.Double;
        metadata.default = dv;
        metadata.min = min;
        metadata.max = max;
        metadata.allowSlide = data.allowSlide;
        this.RunDecorator(action, data, metadata);
    }
    defineMap(action, data, userData) {
        let propertyType = data.class; //QMap<QString,QVector3>
        let startIndex = propertyType.indexOf("<");
        let endIndex = propertyType.indexOf(">");
        let keyValueType = propertyType.substring(startIndex + 1, endIndex);
        let pair = keyValueType.split(",");
        if (pair.length != 2)
            (0, MiscTools_1.ERROR)("ApiSystem.AddQMap map 缺少键和值");
        let keyType = PropertyType_1.PropertyType[pair[0]];
        let valueType = PropertyType_1.PropertyType[pair[1]];
        let keyMetadata = new PropertyMetadata_1.PropertyMetadata(new PropertyMetadata_1.BoolPropertyMetadata());
        let kkvs = data.mapkey?.enumKeys ?? data.mapkey?.enumKeyValues;
        keyMetadata.type = keyType;
        keyMetadata.min = data.mapkey?.coordinates ? exports.Coordinates_Min : data.mapkey?.range.min;
        keyMetadata.max = data.mapkey?.coordinates ? exports.Coordinates_Max : data.mapkey?.range.max;
        keyMetadata.enumClass = this.MakeEnumClass(kkvs);
        keyMetadata.valueAsString = data.mapkey?.valueAsString;
        let keyStructInstance = this.MakeStruct(data.mapkey?.struct, data.mapkey?.struct);
        keyMetadata.objectArchetype = keyStructInstance;
        keyMetadata.allowSlide = data.mapkey?.allowSlide;
        let valueMetadata = new PropertyMetadata_1.PropertyMetadata(new PropertyMetadata_1.BoolPropertyMetadata());
        let vkvs = data.mapValue?.enumKeys ?? data.mapValue?.enumKeyValues;
        valueMetadata.type = valueType;
        valueMetadata.min = data.mapValue?.coordinates ? exports.Coordinates_Min : data.mapValue?.range.min;
        valueMetadata.max = data.mapValue?.coordinates ? exports.Coordinates_Max : data.mapValue?.range.max;
        valueMetadata.enumClass = this.MakeEnumClass(vkvs);
        valueMetadata.valueAsString = data.mapValue?.valueAsString;
        let valueStructInstance = this.MakeStruct(data.mapValue?.struct, data.mapValue?.struct);
        valueMetadata.objectArchetype = valueStructInstance;
        valueMetadata.allowSlide = data.mapkey?.allowSlide;
        let map = new Map();
        let keys = Reflect.ownKeys(userData.value);
        let i = 0;
        for (const mapPair in userData.value) {
            let k = keys[i];
            let v = userData.value[k];
            let kPropertyHandle = new PropertyHandle_1.PropertyHandle("", mapPair, k, keyMetadata);
            let itemKey = kPropertyHandle.GetPropertyValue();
            let vPropertyHandle = new PropertyHandle_1.PropertyHandle("", mapPair, v, valueMetadata);
            let itemValue = vPropertyHandle.GetPropertyValue();
            map.set(itemKey, itemValue);
            i++;
        }
        let dv = map;
        let propertyDescriptor = { value: dv, writable: true, enumerable: true, configurable: true };
        Object.defineProperty(action, data.name, propertyDescriptor ?? {});
        let metadata = new PropertyMetadata_1.MapPropertyMetadata();
        metadata.type = PropertyType_1.PropertyType.Map;
        metadata.default = dv;
        metadata.keyMetadata = keyMetadata;
        metadata.valueMetadata = valueMetadata;
        this.RunDecorator(action, data, metadata);
    }
    defineString(action, data, userData) {
        let dv = userData.value;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.StringPropertyMetadata();
        metadata.type = PropertyType_1.PropertyType.String;
        metadata.default = dv;
        this.RunDecorator(action, data, metadata);
    }
    MakeStruct(data, userData) {
        if (data == null)
            return null;
        let newStruct = (0, QObject_1.NewQObject)(QStruct_1.QStruct);
        for (let i = 0; i < data.length; i++) {
            let structItemValue = { value: userData[i].value };
            this.AddProperty(newStruct, data[i], structItemValue);
        }
        // @ts-ignore
        newStruct.objectInitializer();
        return newStruct;
    }
    defineStruct(action, data, userData) {
        let struct = this.MakeStruct(data.struct, userData.struct);
        let dv = struct;
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.StructPropertyMetadata();
        metadata.type = PropertyType_1.PropertyType.Struct;
        metadata.default = dv;
        // @ts-ignore
        metadata.class = struct.constructor;
        this.RunDecorator(action, data, metadata);
    }
    defineTransform(action, data, userData) {
        let dv = new QTransform_1.QTransform(userData.value);
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Transform);
        metadata.type = PropertyType_1.PropertyType.Transform;
        metadata.default = dv;
        this.RunDecorator(action, data, metadata);
    }
    defineVector2(action, data, userData) {
        let value = this.StringToVectorObject(userData.value);
        let minValue = data.coordinates ? exports.Coordinates_Min : data.range?.min;
        let maxValue = data.coordinates ? exports.Coordinates_Max : data.range?.max;
        let min = this.StringToVectorObject(minValue);
        let max = this.StringToVectorObject(maxValue);
        let dv = new QVector2_1.QVector2(value.X, value.Y);
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Vector2);
        metadata.type = PropertyType_1.PropertyType.Vector2;
        metadata.default = dv;
        metadata.min = new QVector2_1.QVector2(min);
        metadata.max = new QVector2_1.QVector2(max);
        metadata.allowSlide = data.allowSlide;
        this.RunDecorator(action, data, metadata);
    }
    defineVector3(action, data, userData) {
        let value = this.StringToVectorObject(userData.value);
        let minValue = data.coordinates ? exports.Coordinates_Min : data.range?.min;
        let maxValue = data.coordinates ? exports.Coordinates_Max : data.range?.max;
        let min = this.StringToVectorObject(minValue);
        let max = this.StringToVectorObject(maxValue);
        let dv = new QVector3_1.QVector3(value.X, value.Y, value.Z);
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Vector3);
        metadata.type = PropertyType_1.PropertyType.Vector3;
        metadata.default = dv;
        metadata.min = new QVector3_1.QVector3(min);
        metadata.max = new QVector3_1.QVector3(max);
        metadata.allowSlide = data.allowSlide;
        this.RunDecorator(action, data, metadata);
    }
    defineVector4(action, data, userData) {
        let value = this.StringToVectorObject(userData.value);
        let minValue = data.coordinates ? exports.Coordinates_Min : data.range?.min;
        let maxValue = data.coordinates ? exports.Coordinates_Max : data.range?.max;
        let min = this.StringToVectorObject(minValue);
        let max = this.StringToVectorObject(maxValue);
        let dv = new QVector4_1.QVector4(value.X, value.Y, value.Z, value.W);
        Object.defineProperty(action, data.name, { value: dv, writable: true, enumerable: true, configurable: true });
        let metadata = new PropertyMetadata_1.NumberPropertyMetadata(PropertyType_1.PropertyType.Vector4);
        metadata.type = PropertyType_1.PropertyType.Vector4;
        metadata.default = dv;
        metadata.min = new QVector4_1.QVector4(min);
        metadata.max = new QVector4_1.QVector4(max);
        metadata.allowSlide = data.allowSlide;
        this.RunDecorator(action, data, metadata);
    }
    ConvertToObject(str) {
        if (str == null || str === "")
            return null;
        return JSON.parse(`{"Value":[${str}]}`).Value;
    }
    AddApiObject(list, object) {
        if (object == null)
            return;
        list.push(object);
    }
    GetAllApi() {
        return this.apiList;
    }
    PostInit() {
        // this.GetSystem(SceneEditor).GetDetail().SetObject(this.testApiObject)
    }
    PreInit() {
    }
    Shutdown() {
    }
    BeginPlay() {
        this.ApiInit();
    }
    Tick(DeltaTime) {
    }
    ApiInit() {
        let commandline = UE.KismetSystemLibrary.GetCommandLine();
        let refPort = (0, puerts_1.$ref)("");
        let succeed = UE.KismetSystemLibrary.ParseParamValue(commandline, "-Port", refPort);
        if (succeed) {
            // execute function
            let Port = (0, puerts_1.$unref)(refPort);
            Port = Port.slice(1, Port.length);
            let StrPort = String(Port);
            let unrealProjectDir = UE.BlueprintPathsLibrary.ConvertRelativePathToFull(UE.BlueprintPathsLibrary.ProjectDir(), "");
            let CurPath = path.join(unrealProjectDir, "Script/Web/WebServer.cmd");
            UE.OpenZIFrameworkLibrary.LaunchProcess(CurPath, StrPort);
        }
        SystemSetting.WriteSetting(FileSetting_1.SettingConfigFilePath);
        if (SystemSetting.bCloudRenderingMode) {
            SystemAPI.CreatePixelStreamListener();
        }
        else {
            WebPageViewModel.Ctor();
            SystemAPI.ShowMouseCursor();
        }
        (0, MiscTools_1.LOG)("Start StartServer");
        MessageQueue_1.MessageQueueList.GetInstance().Ctor();
        if (succeed) {
            let Port = (0, puerts_1.$unref)(refPort);
            Port = Port.slice(1, Port.length);
            SystemAPI.StartWebSocketServer(SystemSetting.bWebsocketServerMode, Port, SystemSetting.WebSocketUrl);
        }
        else {
            SystemAPI.StartWebSocketServer(SystemSetting.bWebsocketServerMode, SystemSetting.ApiWebServerPort, SystemSetting.WebSocketUrl);
        }
        (0, ApiViewModelSystem_1.GetViewModel)(CoodinateConverterViewModel_1.CoodinateConverterViewModel).Refresh({});
        //GetViewModel(ObserverPawnViewModel).SpawnDefalutPawn()
        GameAPI.GetDefaultPawn();
        let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
        let Controller = UE.GameplayStatics.GetPlayerController(CurrentWorld, 0);
        Controller.bEnableClickEvents = true;
        (0, ApiViewModelSystem_1.GetViewModel)(LevelViewModel_1.LevelViewModel).AddPreLoadMaps(SystemSetting.PreLoadMaps);
        const CameraPointPath = "/OpenZIAPI/API/View/Roaming/UMG_CameraPoint.UMG_CameraPoint_C";
        const DynamicWeatherPath = "/DynamicWeather/DynamicWeather/Blueprints/BP_DynamicSKY.BP_DynamicSKY_C";
        //Mixin
        (0, ExecuteMixin_1.Execute_BlueprintMixin)(CameraPointPath, SceneViewingUIView_1.SceneViewingUIView);
        (0, ExecuteMixin_1.Execute_BlueprintMixin)(DynamicWeatherPath, DynamicWeatherView_1.DynamicWeatherView);
    }
}
exports.ApiSystem = ApiSystem;
//# sourceMappingURL=ApiSystem.js.map