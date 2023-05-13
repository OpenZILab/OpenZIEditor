///
/// Copyright by Cengzi Technology Co., Ltd
/// Created by xLin.
/// DateTime:  2022/10/10 11:34
///
import {LevelModel, LevelState} from "../Model/LevelModel"
import * as CSV from "../IHandle/ICSVFileDataHandle"
import {LevelView} from "../View/LevelView"
import {PackCallBacKMessage, PackBroadcastMessage} from "../../../System/API/IHandle/IAPIMessageHandle"
import {WebSocketServer} from "../../../System/API/Handle/WebSocketServer"
import {BroadcastMessage} from "../IHandle/IMessageBroadcast"
import * as SystemAPI from "../../../System/API/System_APIList"
import {EventDispatcher} from "../../../System/Core/EventDispatcher"
import {BaseViewModel} from "../../../System/API/ViewModel/BaseViewModel"
import {GetSystemMemoryTotal, GetUserSystemMemory} from "../IHandle/IMemoryHandle"
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists"
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager"
import { GetSystem } from "../../../System/Engine/QEngine"
//import { SceneSystem } from "../../../System/Project/Scene/SceneSystem"


export class LevelViewModel extends BaseViewModel {


    // Whether to enable gc unloading level
    bUseLoad: boolean

    constructor() {
        super()
        this.BaseModel = new LevelModel()
        this.Type = "Level"
        this.bUseLoad = false
        MessageCenter.Add(this, () => {
        }, "OnMapItemVisibilityChanged")
    }


    // let EngineStringArrayConfig = UE.ConfigManager.ReadStringArray("场景预加载关卡", UE.NewArray(UE.BuiltinString), false, "默认配置")
    // let StringArrayConfig = ContainerConverter.ToTsArray(EngineStringArrayConfig)

    // for (let Item of StringArrayConfig) {
    //     console.log(`[LogConfigTool] Value=${Item}`)
    // }


    // let StringConfig: string = UE.ConfigManager.ReadString("WebSocket端口", "", false, "默认配置")

    /**
     * Load Csv resource
     * @param Csv path
     */
    AddCsvAsset(path: any) {
        let CsvData = CSV.GetCSVLevelData(path, null)
        CsvData.forEach((itemData) => {
            let LevelData = (<LevelModel>this.BaseModel).ProcessCsvData(itemData)
            this.AddLevelInstance(LevelData.levelName)
            this.BaseModel.AddData(LevelData.levelName, LevelData)
        })
    }

    AddPreLoadMaps(preLoadMaps:Array<string>){
        preLoadMaps.forEach(item=>{
            let LevelData = (<LevelModel>this.BaseModel).ProcessCsvData([item])
            this.AddLevelInstance(item)
            this.BaseModel.AddData(item, LevelData)
        })
    }


    /**
     * Open the start level in the Csv file
     */
    OpenStartLevel() {
        let SceRequire = require("../../../System/Project/Scene/SceneSystem")
        //@ts-ignore
        if(GetSystem(SceRequire.SceneSystem).IsEnableSerializeScene()){


        }else{
            this.BaseModel.GetAllData().forEach((value, key) => {
                if (value.startToLoad === true) {
                    if (this.OBJMaps.has(key)) {
                        this.LoadInsLevel(value, true)
                        this.LoadUrl(key)
                    }
                }
            })
        }

    }


    /**
     * Load the web interface
     * @param level name
     */
    LoadUrl(name: string) {
        let AllData = this.BaseModel.GetAllData()
        AllData.forEach((v, k) => {
            if (k == name) {
                if (v.levelPage !== null && v.levelPage !== "") {
                    SystemAPI.LoadWebPageFile(v.levelPage)
                }
            }
        })
    }


    /**
     * Add a level instance
     * @param string level name
     * @return
     */
    AddLevelInstance(levelName: string): boolean {

        if (!this.OBJMaps.has(levelName)) {
            let NewLevelIns = new LevelView(levelName, this.bUseLoad)
            let bInitFinished = NewLevelIns.Init()
            if (bInitFinished) {

                //Add to ins cache
                this.OBJMaps.set(levelName, NewLevelIns)

                //Web message notification
                return true
            } else {
                console.log(`${levelName} 关卡实例化失败`)
                return false
            }
        }

        return true
    }


    /**
     * Load instance level
     * @param level name
     */
    LoadInsLevel(_data: any, bNotify: boolean) {
        if (this.OBJMaps.has(_data.levelName)) {
            let levelIns = this.OBJMaps.get(_data.levelName)
            this.AddLevelStateChangeBing(levelIns)
            this.SiwtchLevelLoadMothByMemory()
            if (this.bUseLoad) {
                levelIns.Ins.OnLevelLoaded.Clear()
                levelIns.Ins.OnLevelShown.Clear()
                levelIns.Ins.OnLevelShown.Add(() => {
                    this.OnLevelShow(levelIns)
                })
                levelIns.Ins.OnLevelLoaded.Add(() => {
                    this.OnLevelLoad(levelIns)
                })
                levelIns.Open()
            } else {
                levelIns.Ins.OnLevelLoaded.Clear()
                levelIns.Ins.OnLevelShown.Clear()
                levelIns.Ins.OnLevelShown.Add(() => {
                    this.OnLevelLoad(levelIns)
                })
                if (_data.levelState !== LevelState.LoadedNotVisible) {
                    //levelIns.Open()
                    levelIns.SetVisble(true)
                } else {
                    ///levelIns.Open()
                    levelIns.SetVisble(false)

                }

            }

            if (!this.BaseModel.ExistData(_data.levelName)) {
                this.BaseModel.AddData(_data.levelName, {levelName: _data.levelName})
            }
            this.LoadUrl(_data.levelName)
            let Entry = {
                Name: _data.levelName,
                Class: "Level",
                Model: {},
                DefaultList: [],
                FinalPropertyList: [],
                LastPropertyList: [],
                ChangedPropertyList: []
            }

            if (_data.levelState === LevelState.LoadedNotVisible) {
                console.error(`OnLevelLoad:${_data.levelName}`)

                MessageCenter.Execute(NotificationLists.API.ON_LEVEL_LOADED, levelIns.Ins)

            }
            if (bNotify == true || bNotify == undefined) {
                MessageCenter.Execute(NotificationLists.API.LOAD_INSLEVEL, Entry)
            }

        } else {
            console.log(`关卡实例列表中没有 ${_data.levelName} 关卡`)
        }
    }


    /**
     * Uninstall instance level
     * @param level name
     */
    UnloadInsLevel(levelName: string) {
        if (this.OBJMaps.has(levelName)) {
            let levelIns = this.OBJMaps.get(levelName)
            let levelModel = this.BaseModel.GetData(levelName)
            this.RemoveLevelStateChangeBing(levelIns)

            this.SiwtchLevelLoadMothByMemory()
            if (this.bUseLoad) {
                levelIns.Close()
            } else if ((<any>levelModel).levelState === LevelState.LoadedNotVisible) {
                this.OnLevelUnLoad(levelIns)
            } else {
                levelIns.Ins.OnLevelHidden.Clear()
                levelIns.Ins.OnLevelHidden.Add(() => {
                    this.OnLevelUnLoad(levelIns)
                })
                levelIns.SetVisble(false)
            }
            MessageCenter.Execute(NotificationLists.API.UNLOAD_INSLEVEL)
        } else {
            console.log(`关卡实例列表中没有 ${levelName} 关卡`, levelName)
        }
    }


    /**
     * Add notification binding after level status changes
     * @param levelView
     */
    AddLevelStateChangeBing(levelView) {
        levelView.Ins.OnLevelLoaded.Add(() => {
            this.OnLevelLoad(levelView)
        })
        levelView.Ins.OnLevelUnloaded.Add(() => {
            this.OnLevelUnLoad(levelView)
        })
        levelView.Ins.OnLevelShown.Add(() => {
            this.OnLevelShow(levelView)
        })
        levelView.Ins.OnLevelHidden.Add(() => {
            this.OnLevelHidden(levelView)
        })
    }

    /**
     * Remove the notification binding after the level state changes
     * @param levelView
     */
    RemoveLevelStateChangeBing(levelView) {
        levelView.Ins.OnLevelLoaded.Clear()
        levelView.Ins.OnLevelUnloaded.Clear()
        levelView.Ins.OnLevelShown.Clear()
        levelView.Ins.OnLevelHidden.Clear()
    }

    /**
     * Load level interface for API use
     * @param {levelName,bremoveOthersLevel}
     */
    LoadLevel(Msg) {
        if (Msg.data == null) {
            return
        }
        let _data = Msg.data
        let LName = _data.levelName
        let bNotify = true
        bNotify = Msg.bNotify
        let bLoaded = false
        let result
        if (this.AddLevelInstance(LName)) {
            this.BaseModel.GetAllData().forEach((data, name) => {
                if (data.levelState === LevelState.LoadedVisible && name !== LName && _data.removeOthersLevel === true) {
                    this.UnloadInsLevel(data.levelName)
                }
                if (data.levelState === LevelState.LoadedVisible && name === LName) {
                    console.log(`${LName} 关卡已经加载`)
                    result = `${LName} 关卡已经加载`
                    if (_data.bHidden) {
                        this.OBJMaps.get(LName).SetVisble(false)
                    }

                    bLoaded = true
                }
            })
            if (!bLoaded) {
                if (this.BaseModel.ExistData(LName)) {
                    if (_data.bHidden) {
                        this.OBJMaps.get(LName).SetVisble(false)
                    } else {
                        this.OBJMaps.get(LName).SetVisble(true)
                    }
                } else {
                    this.LoadInsLevel(_data, bNotify)
                    if (_data.bHidden) {
                        this.OBJMaps.get(LName).SetVisble(false)
                    }
                }
                result = `${LName} 关卡加载成功`

            }
        } else {
            result = `${LName} 关卡实例失败`
        }
        //@message callback
        Msg.data.result = result
        let message = PackCallBacKMessage(Msg, Msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }


    /**
     * Set the level display status for API use
     * @param {levelName,bShow}
     * @return execution result
     */
    ShowLevel(Msg) {
        let _data = Msg.data
        let LName = _data.levelName
        let LModel = this.BaseModel.GetData(LName)
        let result
        if (LModel) {
            let bNeedSet = true

            if (_data.bShow == false && (<any>LModel).levelState == LevelState.LoadedNotVisible) {
                result = `${LName} ：当前关卡已经隐藏`
                bNeedSet = false
            }
            if (_data.bShow == true && (<any>LModel).levelState == LevelState.LoadedVisible) {
                result = `${LName} ：当前关卡已经显示`

                bNeedSet = false
            }
            if (bNeedSet) {
                let levelIns = this.OBJMaps.get(LName)

                levelIns.Ins.OnLevelShown.Clear()
                levelIns.Ins.OnLevelHidden.Clear()

                levelIns.Ins.OnLevelShown.Add(() => {
                    this.OnLevelShow(levelIns)
                })
                levelIns.Ins.OnLevelHidden.Add(() => {
                    this.OnLevelHidden(levelIns)
                })
                levelIns.SetVisble(_data.bShow)
                result = `${LName} ：当前关卡显隐成功`
            }
        } else {
            result = `${LName} ：当前关卡没有加载`
        }
        //@message callback
        Msg.data.result = result
        let message = PackCallBacKMessage(Msg, Msg.data)
        WebSocketServer.GetInstance().OnSendWebMessage(message)
    }


    /**
     * Notification callback when the level is loaded
     */
    OnLevelLoad(ViewIns) {
        console.error(`OnLevelLoad:${ViewIns.Name}`)
        let curdata = this.BaseModel.GetData(ViewIns.Name) as LevelModel
        (<any>curdata).levelState = LevelState.LoadedVisible
        this.BaseModel.RefreshData(ViewIns.Name, curdata)
        MessageCenter.Execute(NotificationLists.API.ON_LEVEL_LOADED, ViewIns.Ins)
    }

    /**
     * Notification callback when the level is unloaded
     */
    OnLevelUnLoad(ViewIns) {
        console.error(`OnLevelUnLoad:${ViewIns.Name}`)

        this.BaseModel.DeleteData(ViewIns.Name)

        MessageCenter.Execute(NotificationLists.API.ON_LEVEL_UNLOAD, ViewIns.Ins)

    }

    /**
     * Notification callback when the level display is complete
     */
    OnLevelShow(ViewIns) {
        console.error(`OnLevelShow:${ViewIns.Name}`)

        let curdata = this.BaseModel.GetData(ViewIns.Name) as LevelModel
        if (curdata) {
            (<any>curdata).levelState = LevelState.LoadedVisible
            this.BaseModel.RefreshData(ViewIns.Name, curdata)
        }

        MessageCenter.Execute(NotificationLists.API.ON_LEVEL_SHOW, ViewIns.Ins)

    }

    /**
     * Notification callback when the level is hidden
     */
    OnLevelHidden(ViewIns) {
        console.error(`OnLevelHidden:${ViewIns.Name}`)
        let curdata = this.BaseModel.GetData(ViewIns.Name) as LevelModel
        if (curdata) {
            (<any>curdata).levelState = LevelState.LoadedNotVisible
            this.BaseModel.RefreshData(ViewIns.Name, curdata)
        }
        MessageCenter.Execute(NotificationLists.API.ON_LEVEL_HIDDEN, ViewIns.Ins)

    }


    /**
     * Switch level loading method based on memory usage
     */
    SiwtchLevelLoadMothByMemory() {
        let MemoryRate = GetUserSystemMemory() / GetSystemMemoryTotal()
        this.bUseLoad = MemoryRate > 0.95 ? true : false
    }

}

