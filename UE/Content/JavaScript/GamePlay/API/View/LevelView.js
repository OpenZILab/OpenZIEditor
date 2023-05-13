"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd
/// Created by xLin.
/// DateTime:  2022/10/10 11:34
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelView = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
const LevelModel_1 = require("../Model/LevelModel");
class LevelView extends BaseView_1.BaseView {
    Name;
    Ins;
    World;
    bUseLoad;
    constructor(name, bUseLoad) {
        super();
        this.World = puerts_1.argv.getByName("GameInstance").GetWorld();
        this.Name = name;
        this.bUseLoad = bUseLoad;
    }
    /**
     * Load the level instance, this function is to cache the current level instance object, so the state is unLoad
     * @return bool The return value is whether the level is instantiated successfully
     */
    Init() {
        let bOutSuccess = (0, puerts_1.$ref)(Boolean());
        this.Ins = UE.LevelStreamingDynamic.LoadLevelInstance(this.World, this.Name, new UE.Vector(0, 0, 0), new UE.Rotator(0, 0, 0), bOutSuccess);
        if (this.Ins == undefined) {
            return false;
        }
        else {
            if (this.bUseLoad) {
                this.Ins.SetShouldBeLoaded(false);
            }
            else {
                this.Ins.SetShouldBeVisible(false);
            }
            return (0, puerts_1.$unref)(bOutSuccess);
        }
    }
    /**
     * Level instance after Load has been cached
     */
    Open() {
        if (this.Ins !== null) {
            if (this.bUseLoad) {
                this.Ins.SetShouldBeLoaded(true);
            }
            else {
                this.Ins.SetShouldBeVisible(true);
            }
        }
        else
            console.log(`Failed to Load.Requested level is not valid`);
    }
    /**
     * unLoad the cached level instance
     */
    Close() {
        if (this.Ins !== null) {
            if (this.bUseLoad) {
                this.Ins.SetShouldBeLoaded(false);
            }
            else {
                this.Ins.SetShouldBeVisible(false);
            }
        }
        else {
            console.log(`Failed to unload.Requested level is not valid`);
        }
    }
    /**
     * The development of the instance level after setting the cache
     * @param bool Whether to display
     */
    SetVisble(bShow) {
        if (this.Ins != null) {
            this.Ins.SetShouldBeVisible(bShow);
        }
        else {
            console.log(`Failed to SetVisble.Requested level is not valid`);
        }
    }
    /**
     * Get the state of the cached level instance
     * @return level state enumeration
     */
    GetState() {
        let outState = UE.OpenZIFrameworkLibrary.GetLevelStreamingState(this.Ins);
        console.log(`${this.Name} 当前关卡状态${outState}`);
        return outState;
    }
    /**
  * Temporarily deprecated, the level refresh logic of the previous API
  * @param Model data
  * @return is successful
  */
    RefreshView(jsonData) {
        let _data = jsonData.data;
        this.Name = _data.LevelName;
        switch (_data.LevelState) {
            case LevelModel_1.LevelState.LoadedNotVisible:
                this.SetVisble(true);
                break;
            case LevelModel_1.LevelState.Unloaded:
                this.Close();
                break;
            case LevelModel_1.LevelState.LoadedVisible:
                this.SetVisble(true);
                break;
            case LevelModel_1.LevelState.MakingVisible:
                this.SetVisble(true);
                break;
            case LevelModel_1.LevelState.MakingInvisible:
                this.SetVisble(false);
                break;
            case LevelModel_1.LevelState.FailedToLoad:
                break;
            case LevelModel_1.LevelState.Loading:
                break;
            case LevelModel_1.LevelState.Removed:
                break;
            default:
                break;
        }
        return "";
    }
}
exports.LevelView = LevelView;
//# sourceMappingURL=LevelView.js.map