"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/11 上午10:25
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR = exports.WARNING = exports.LOG = exports.objectValuesToString = exports.LoadJsonFile = exports.LoadTexture = exports.GetProjectTemplate = exports.GetEditorResource = void 0;
const UE = require("ue");
const path = require("path");
const puerts_1 = require("puerts");
/**
 * Get editor resource path
 * @constructor
 */
function GetEditorResource() {
    let pluginsDir = UE.BlueprintPathsLibrary.ProjectPluginsDir();
    return path.join(pluginsDir, "OpenZIEditor/Resources/EditorResource");
}
exports.GetEditorResource = GetEditorResource;
function GetProjectTemplate() {
    return path.join(GetEditorResource(), "ProjectTemplate");
}
exports.GetProjectTemplate = GetProjectTemplate;
/**
 * Returns a Texture2D object according to the path
 * @param TexturePath relative to the path of ProjectDir/EditorResource/Resource/Textures, such as: App/AppIcon.png
 * @constructor
 */
function LoadTexture(TexturePath) {
    // let ThemeName: string = UE.ConfigManager.ReadString("Theme", "Black", false, "EditorStyle")
    let ThemeName = `Black`;
    let Filename = path.join(GetEditorResource(), "Resource/Textures", ThemeName, `${TexturePath}.png`);
    return UE.KismetRenderingLibrary.ImportFileAsTexture2D(null, Filename);
}
exports.LoadTexture = LoadTexture;
function LoadJsonFile(filename) {
    let fileContent = (0, puerts_1.$ref)("");
    UE.OpenZIFrameworkLibrary.LoadFileToString(fileContent, filename);
    let jsonString = (0, puerts_1.$unref)(fileContent);
    if (jsonString.length === 0) {
        ERROR("json is empty");
        return null;
    }
    return JSON.parse(jsonString);
}
exports.LoadJsonFile = LoadJsonFile;
function objectValuesToString(obj) {
    let result = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object') {
                result += objectValuesToString(value);
            }
            else {
                result += value.toString() + ',';
            }
        }
    }
    return result.slice(0, -1);
}
exports.objectValuesToString = objectValuesToString;
function getFilenameAndLine() {
    const callerFrame = new Error().stack?.split('\n')[3];
    const fileInfo = callerFrame?.match(/\(([^)]+)\)/)?.[1].split('\\').pop() ?? '';
    const lineInfo = callerFrame?.match(/:\d+:\d+$/)?.[0] ?? '';
    return { fileInfo, lineInfo };
}
function LOG(...args) {
    const { fileInfo, lineInfo } = getFilenameAndLine();
    console.log(`[ ${fileInfo}${lineInfo} ] `, ...args);
}
exports.LOG = LOG;
function WARNING(...args) {
    const { fileInfo, lineInfo } = getFilenameAndLine();
    console.warn(`[ ${fileInfo}${lineInfo} ] `, ...args);
}
exports.WARNING = WARNING;
function ERROR(...args) {
    const { fileInfo, lineInfo } = getFilenameAndLine();
    console.error(`[ ${fileInfo}${lineInfo} ] `, ...args);
}
exports.ERROR = ERROR;
//# sourceMappingURL=MiscTools.js.map