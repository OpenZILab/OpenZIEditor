///
/// Copyright by Cengzi Technology Co., Ltd
/// Created by xLin.
/// DateTime: 2022/10/10 11:34
///


export enum LevelState {
    Removed = 0,
    Unloaded = 1,
    FailedToLoad = 2,
    Loading = 3,
    LoadedNotVisible = 4,
    MakingVisible = 5,
    LoadedVisible = 6,
    MakingInvisible = 7
}

import { BaseModel } from "../../../System/API/Model/BaseModel";

export class LevelModel extends BaseModel {
    constructor() {
        super()
        this.DefaultData = {
            levelName: "defalut",
            levelHeight: 0,
            levelRoot: "",
            startToLoad: false,
            levelPage: "",
            levelState:LevelState.LoadedNotVisible
        }
    }

    //@parse csv data and store
    AnalysisData(InData):void {
        for (let i = 0; i < InData.length; i++) {
            let temp = {
                LevelName: String,
                LevelHeight: Number,
                LevelRoot: String,
                StartToLoad: Boolean,
                LevelPage: String
            }
            temp.LevelName = InData[i][0]
            temp.LevelHeight = InData[i][1]
            temp.LevelRoot = InData[i][2]
            temp.StartToLoad = InData[i][3]
            temp.LevelPage = InData[i][4]
            this.AddData(temp.LevelName,temp)
        }
    }


    ProcessCsvData(CsvData:any){
        let temp = {
            levelName: "",
            levelHeight: 0,
            levelRoot: "",
            startToLoad: false,
            levelPage: "",
            levelState:LevelState.Unloaded
        }
        temp.levelName = CsvData[0]
        temp.levelHeight = CsvData[1]
        temp.levelRoot = CsvData[2]
        temp.startToLoad =  CsvData[3] === "是"?true:false
        temp.levelPage = CsvData[4]
        return temp
    }

}

