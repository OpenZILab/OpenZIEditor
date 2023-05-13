"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by JJCoder.
 * DateTime: 2023/3/14 下午8:47
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lib_JSON = void 0;
const MiscTools_1 = require("./MiscTools");
class Lib_JSON {
    /**
     * Attempts to convert the string, returns null if failed, object if successful
     * @param text
     * @param reviver
     */
    static tryParse(text, reviver) {
        let result = null;
        try {
            result = JSON.parse(text, reviver);
        }
        catch (e) {
            (0, MiscTools_1.ERROR)(`Failed to parse JSON string: ${text}`);
        }
        return result;
    }
}
exports.Lib_JSON = Lib_JSON;
//# sourceMappingURL=Lib_JSON.js.map