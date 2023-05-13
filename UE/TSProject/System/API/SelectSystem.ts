/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2023/04/28 17:17
 */


import * as UE from "ue"
import { MessageCenter } from "../Core/NotificationCore/MessageManager"
import { NotificationLists } from "../Core/NotificationCore/NotificationLists"
import { QSystem } from "../Engine/System"
import { SceneNode } from "../Project/Scene/SceneNode"
import { GetRunType, RunType } from "../Engine/Define"


export class SelectSystem extends QSystem {

    //世界大纲选中需要取消轴的类
    private CancelAxesClass: Array<string>

    /**
     *The final process of the whole system initialization
     *! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    public PostInit() {
        this.CancelAxesClass = ["DynamicWeather", "CesiumRasterOverlay", "CesiumTerrain"]
    }

    /**
     *Called by the first level BeginPlay
     *The Unreal side can get the World, and can normally access anything related to the Unreal engine
     *@constructor
     */
    public BeginPlay() {
        this.RegisterListen()
    }

    public BeginPlayFinished() {

    }

    /**
     *Called when the entire editor exits
    *@constructor
     */
    public Shutdown() {
        this.UnregisterListen()
    }

    /**
     *Does the System need to be instantiated
     */
    public ShouldInstantiate(): boolean {
        return GetRunType() === RunType.Edit
    }


    /**
     * 注册监听
     * @param
     * @return
     */
    RegisterListen() {
        //ts
        MessageCenter.Add(this, this.OnSelectChanged, NotificationLists.OUTLINE.ON_SELECT_CHANGED)//这个通知是从世界大纲传回来的
        //UE
        UE.AxesToolSubsystem.Get().OnSelectionModified.Add(this.OnSelectionModifiy.bind(this))//这个是场景选择修改
    }
    /**
     * 反注册监听
     * @param
     * @return
     */
    UnregisterListen() {
        //ts
        MessageCenter.Remove(this, NotificationLists.OUTLINE.ON_SELECT_CHANGED)
        //UE
        UE.AxesToolSubsystem.Get().OnSelectionModified.Clear()
    }

    /**
     * 当世界大纲的选中传递过来
     * @param
     * @return
     */
    OnSelectChanged(Node: SceneNode, bSelect: boolean, bToggle: boolean) {
        let Actor = null
        if (Node == null || bSelect == false) return
        UE.AxesToolSubsystem.Get().ByOutline = true
        if (this.CancelAxesClass.includes(Node.GetNodeEntry()?.Class) || Node.GetNodeType() == "Setting") {
            MessageCenter.Execute(NotificationLists.DETAIL.SET_DETATL, Node.GetObject())
            UE.AxesToolSubsystem.Get().RemoveSelectObjectsFormLogic()
            return
        }
        Actor = Node.TryGetActor()
        if (Actor) {
            if (UE.AxesToolSubsystem.Get().bAllowCheck) {
                if (bToggle) {
                    UE.AxesToolSubsystem.Get().ToggleSelectObjectsFormLogic(Actor, true)
                } else {
                    UE.AxesToolSubsystem.Get().SetSelectObjectsFormLogic(Actor, true)
                }
            }
        } else {
            MessageCenter.Execute(NotificationLists.DETAIL.SET_DETATL, null)
            UE.AxesToolSubsystem.Get().RemoveSelectObjectsFormLogic()
        }
    }


    /**
     * 当场景选择修改
     * @param AxesToolSubsystem 轴系统
     * @return
     */
    OnSelectionModifiy(AxesToolSubsystem: UE.AxesToolSubsystem) {
        //是否是由细节面板通知过来的
        if (!UE.AxesToolSubsystem.Get().ByOutline) {
            MessageCenter.Execute(NotificationLists.SCENE.ON_SELECT_CHANGED_OUTLINE, AxesToolSubsystem.SelectedSceneObjects)
        }
        MessageCenter.Execute(NotificationLists.SCENE.ON_SELECT_CHANGED_DETAIL, AxesToolSubsystem.SelectedSceneObjects)
        this.NotifyObjChanged(AxesToolSubsystem.SelectedSceneObjects)
    }

    /**
     * 通知场景对象变更
     * @param SceneObjs 场景对象
     * @return
     */
    NotifyObjChanged(SceneObjs: UE.TArray<UE.SceneObject>) {
        if (SceneObjs.Num() > 0) {
            for (let i = 0; i < SceneObjs.Num(); i++) {
                let SceneActor = SceneObjs.Get(i)
                let ActorName = SceneActor.MyActor.GetName()
                let pathName = UE.KismetSystemLibrary.GetPathName(SceneActor.MyActor);
                let temp = pathName.split(":", 1)[0]
                let _LevelName = temp.split(".", 2)[1]
                if (_LevelName) {
                    MessageCenter.Execute(NotificationLists.SCENE.ON_LEVELITEM_CHANGED, { LevelName: _LevelName, IDName: ActorName, SelectActor: SceneActor.MyActor, visibility: true })
                }
            }
        }
    }

}