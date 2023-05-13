/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/4/11 上午10:25
 */

import * as UE from "ue";
import * as path from "path";
import {$ref, $unref} from "puerts";

/**
 * Get editor resource path
 * @constructor
 */
export function GetEditorResource(): string {
    let pluginsDir = UE.BlueprintPathsLibrary.ProjectPluginsDir()
    return path.join(pluginsDir, "OpenZIEditor/Resources/EditorResource")
}

export function GetProjectTemplate(): string {
    return path.join(GetEditorResource(), "ProjectTemplate")
}

/**
 * Returns a Texture2D object according to the path
 * @param TexturePath relative to the path of ProjectDir/EditorResource/Resource/Textures, such as: App/AppIcon.png
 * @constructor
 */
export function LoadTexture(TexturePath: string): UE.Texture2D {
    // let ThemeName: string = UE.ConfigManager.ReadString("Theme", "Black", false, "EditorStyle")
    let ThemeName: string = `Black`

    let Filename = path.join(GetEditorResource(), "Resource/Textures", ThemeName, `${TexturePath}.png`)
    return UE.KismetRenderingLibrary.ImportFileAsTexture2D(null, Filename);
}

export function LoadJsonFile(filename: string): any {
    let fileContent = $ref("")
    UE.OpenZIFrameworkLibrary.LoadFileToString(fileContent, filename);
    let jsonString = $unref(fileContent)
    if (jsonString.length === 0) {
        ERROR("json is empty")
        return null
    }

    return JSON.parse(jsonString)
}

export function objectValuesToString(obj: Record<string, any>): string {
    let result = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'object') {
                result += objectValuesToString(value);
            } else {
                result += value.toString() + ',';
            }
        }
    }
    return result.slice(0, -1);
}

function getFilenameAndLine() {
    const callerFrame = new Error().stack?.split('\n')[3];
    const fileInfo = callerFrame?.match(/\(([^)]+)\)/)?.[1].split('\\').pop() ?? '';
    const lineInfo = callerFrame?.match(/:\d+:\d+$/)?.[0] ?? '';
    return {fileInfo, lineInfo};
}

export function LOG(...args) {
    const {fileInfo, lineInfo} = getFilenameAndLine();
    console.log(`[ ${fileInfo}${lineInfo} ] `, ...args);
}

export function WARNING(...args) {
    const {fileInfo, lineInfo} = getFilenameAndLine();
    console.warn(`[ ${fileInfo}${lineInfo} ] `, ...args);
}

export function ERROR(...args) {
    const {fileInfo, lineInfo} = getFilenameAndLine();
    console.error(`[ ${fileInfo}${lineInfo} ] `, ...args);
}