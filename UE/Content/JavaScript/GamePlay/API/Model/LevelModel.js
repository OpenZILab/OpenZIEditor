"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd
/// Created by xLin.
/// DateTime: 2022/10/10 11:34
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelModel = exports.LevelState = void 0;
var LevelState;
(function (LevelState) {
    LevelState[LevelState["Removed"] = 0] = "Removed";
    LevelState[LevelState["Unloaded"] = 1] = "Unloaded";
    LevelState[LevelState["FailedToLoad"] = 2] = "FailedToLoad";
    LevelState[LevelState["Loading"] = 3] = "Loading";
    LevelState[LevelState["LoadedNotVisible"] = 4] = "LoadedNotVisible";
    LevelState[LevelState["MakingVisible"] = 5] = "MakingVisible";
    LevelState[LevelState["LoadedVisible"] = 6] = "LoadedVisible";
    LevelState[LevelState["MakingInvisible"] = 7] = "MakingInvisible";
})(LevelState = exports.LevelState || (exports.LevelState = {}));
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class LevelModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            levelName: "defalut",
            levelHeight: 0,
            levelRoot: "",
            startToLoad: false,
            levelPage: "",
            levelState: LevelState.LoadedNotVisible
        };
    }
    //@parse csv data and store
    AnalysisData(InData) {
        for (let i = 0; i < InData.length; i++) {
            let temp = {
                LevelName: String,
                LevelHeight: Number,
                LevelRoot: String,
                StartToLoad: Boolean,
                LevelPage: String
            };
            temp.LevelName = InData[i][0];
            temp.LevelHeight = InData[i][1];
            temp.LevelRoot = InData[i][2];
            temp.StartToLoad = InData[i][3];
            temp.LevelPage = InData[i][4];
            this.AddData(temp.LevelName, temp);
        }
    }
    ProcessCsvData(CsvData) {
        let temp = {
            levelName: "",
            levelHeight: 0,
            levelRoot: "",
            startToLoad: false,
            levelPage: "",
            levelState: LevelState.Unloaded
        };
        temp.levelName = CsvData[0];
        temp.levelHeight = CsvData[1];
        temp.levelRoot = CsvData[2];
        temp.startToLoad = CsvData[3] === "是" ? true : false;
        temp.levelPage = CsvData[4];
        return temp;
    }
}
exports.LevelModel = LevelModel;
//# sourceMappingURL=LevelModel.js.map