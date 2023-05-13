///
/// Copyright by Cengzi Technology Co., Ltd
/// Created by xLin.
/// DateTime:  2022/10/10 11:34
///



import * as UE from "ue"
import { $ref, $unref, argv } from 'puerts'
import { BroadcastMessage } from "../IHandle/IMessageBroadcast"
import { BaseView } from "../../../System/API/View/BaseView"
import { LevelState } from "../Model/LevelModel"
export class LevelView extends BaseView {
    Name: string
    Ins: UE.LevelStreamingDynamic
    World: UE.World
    bUseLoad: boolean
    constructor(name,bUseLoad) {
        super()
        this.World = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld()
        this.Name = name
        this.bUseLoad = bUseLoad
    }


    /**
     * Load the level instance, this function is to cache the current level instance object, so the state is unLoad
     * @return bool The return value is whether the level is instantiated successfully
     */
    Init(): boolean {
        let bOutSuccess = $ref(Boolean())
        this.Ins = UE.LevelStreamingDynamic.LoadLevelInstance(this.World, this.Name, new UE.Vector(0, 0, 0), new UE.Rotator(0, 0, 0), bOutSuccess)
        if (this.Ins == undefined) {
            return false
        } else {

            if (this.bUseLoad) {
                this.Ins.SetShouldBeLoaded(false)
            } else {
                this.Ins.SetShouldBeVisible(false)
            }

            return $unref(bOutSuccess)
        }
    }



    /**
     * Level instance after Load has been cached
     */
    Open() {
        if (this.Ins !== null) {
            if (this.bUseLoad) {
                this.Ins.SetShouldBeLoaded(true)
            } else {
                this.Ins.SetShouldBeVisible(true)
            }
        }


        else
            console.log(`Failed to Load.Requested level is not valid`)
    }



    /**
     * unLoad the cached level instance
     */
    Close() {
        if (this.Ins !== null) {
         
            if (this.bUseLoad) {
                this.Ins.SetShouldBeLoaded(false)
            } else {
                this.Ins.SetShouldBeVisible(false)
            }
        }
        else {
            console.log(`Failed to unload.Requested level is not valid`)
        }
    }



    /**
     * The development of the instance level after setting the cache
     * @param bool Whether to display
     */
    SetVisble(bShow: boolean) {
        if (this.Ins != null) {
            this.Ins.SetShouldBeVisible(bShow)
        }
        else {
            console.log(`Failed to SetVisble.Requested level is not valid`)
        }
    }


    /**
     * Get the state of the cached level instance
     * @return level state enumeration
     */
    GetState(): any {
        let outState = UE.OpenZIFrameworkLibrary.GetLevelStreamingState(this.Ins)
        console.log(`${this.Name} 当前关卡状态${outState}`)
        return outState
    }


    /**
  * Temporarily deprecated, the level refresh logic of the previous API
  * @param Model data
  * @return is successful
  */
    RefreshView(jsonData): string {
        let _data = jsonData.data
        this.Name = _data.LevelName
        switch (_data.LevelState) {
            case LevelState.LoadedNotVisible:
                this.SetVisble(true)
                break;
            case LevelState.Unloaded:
                this.Close()
                break;

            case LevelState.LoadedVisible:
                this.SetVisble(true)
                break;
            case LevelState.MakingVisible:
                this.SetVisble(true)
                break;
            case LevelState.MakingInvisible:
                this.SetVisble(false)
                break;
            case LevelState.FailedToLoad:
                break;

            case LevelState.Loading:
                break;

            case LevelState.Removed:
                break;
            default:
                break;
        }
        return ""
    }

}


