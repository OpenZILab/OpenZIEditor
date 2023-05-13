/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/3/14 下午8:47
 */

import {ERROR} from "./MiscTools";

export class Lib_JSON {
    /**
     * Attempts to convert the string, returns null if failed, object if successful
     * @param text
     * @param reviver
     */
    static tryParse(text: string, reviver?: (this: any, key: string, value: any) => any): any | null {
        let result = null;
        try {
            result = JSON.parse(text, reviver);
        } catch (e) {
            ERROR(`Failed to parse JSON string: ${text}`);
        }
        return result;
    }
}
