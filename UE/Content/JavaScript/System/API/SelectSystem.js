"use strict";
/*
 * Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
 * Created by xLin.
 * DateTime: 2023/04/28 17:17
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSystem = void 0;
const UE = require("ue");
const MessageManager_1 = require("../Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../Core/NotificationCore/NotificationLists");
const System_1 = require("../Engine/System");
const Define_1 = require("../Engine/Define");
class SelectSystem extends System_1.QSystem {
    //世界大纲选中需要取消轴的类
    CancelAxesClass;
    /**
     *The final process of the whole system initialization
     *! ! ! The Unreal side World and the like have not been initialized yet, so do not access things related to the Unreal engine
     *@constructor
     */
    PostInit() {
        this.CancelAxesClass = ["DynamicWeather", "CesiumRasterOverlay", "CesiumTerrain"];
    }
    /**
     *Called by the first level BeginPlay
     *The Unreal side can get the World, and can normally access anything related to the Unreal engine
     *@constructor
     */
    BeginPlay() {
        this.RegisterListen();
    }
    BeginPlayFinished() {
    }
    /**
     *Called when the entire editor exits
    *@constructor
     */
    Shutdown() {
        this.UnregisterListen();
    }
    /**
     *Does the System need to be instantiated
     */
    ShouldInstantiate() {
        return (0, Define_1.GetRunType)() === Define_1.RunType.Edit;
    }
    /**
     * 注册监听
     * @param
     * @return
     */
    RegisterListen() {
        //ts
        MessageManager_1.MessageCenter.Add(this, this.OnSelectChanged, NotificationLists_1.NotificationLists.OUTLINE.ON_SELECT_CHANGED); //这个通知是从世界大纲传回来的
        //UE
        UE.AxesToolSubsystem.Get().OnSelectionModified.Add(this.OnSelectionModifiy.bind(this)); //这个是场景选择修改
    }
    /**
     * 反注册监听
     * @param
     * @return
     */
    UnregisterListen() {
        //ts
        MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.OUTLINE.ON_SELECT_CHANGED);
        //UE
        UE.AxesToolSubsystem.Get().OnSelectionModified.Clear();
    }
    /**
     * 当世界大纲的选中传递过来
     * @param
     * @return
     */
    OnSelectChanged(Node, bSelect, bToggle) {
        let Actor = null;
        if (Node == null || bSelect == false)
            return;
        UE.AxesToolSubsystem.Get().ByOutline = true;
        if (this.CancelAxesClass.includes(Node.GetNodeEntry()?.Class) || Node.GetNodeType() == "Setting") {
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.DETAIL.SET_DETATL, Node.GetObject());
            UE.AxesToolSubsystem.Get().RemoveSelectObjectsFormLogic();
            return;
        }
        Actor = Node.TryGetActor();
        if (Actor) {
            if (UE.AxesToolSubsystem.Get().bAllowCheck) {
                if (bToggle) {
                    UE.AxesToolSubsystem.Get().ToggleSelectObjectsFormLogic(Actor, true);
                }
                else {
                    UE.AxesToolSubsystem.Get().SetSelectObjectsFormLogic(Actor, true);
                }
            }
        }
        else {
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.DETAIL.SET_DETATL, null);
            UE.AxesToolSubsystem.Get().RemoveSelectObjectsFormLogic();
        }
    }
    /**
     * 当场景选择修改
     * @param AxesToolSubsystem 轴系统
     * @return
     */
    OnSelectionModifiy(AxesToolSubsystem) {
        //是否是由细节面板通知过来的
        if (!UE.AxesToolSubsystem.Get().ByOutline) {
            MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.SCENE.ON_SELECT_CHANGED_OUTLINE, AxesToolSubsystem.SelectedSceneObjects);
        }
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.SCENE.ON_SELECT_CHANGED_DETAIL, AxesToolSubsystem.SelectedSceneObjects);
        this.NotifyObjChanged(AxesToolSubsystem.SelectedSceneObjects);
    }
    /**
     * 通知场景对象变更
     * @param SceneObjs 场景对象
     * @return
     */
    NotifyObjChanged(SceneObjs) {
        if (SceneObjs.Num() > 0) {
            for (let i = 0; i < SceneObjs.Num(); i++) {
                let SceneActor = SceneObjs.Get(i);
                let ActorName = SceneActor.MyActor.GetName();
                let pathName = UE.KismetSystemLibrary.GetPathName(SceneActor.MyActor);
                let temp = pathName.split(":", 1)[0];
                let _LevelName = temp.split(".", 2)[1];
                if (_LevelName) {
                    MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.SCENE.ON_LEVELITEM_CHANGED, { LevelName: _LevelName, IDName: ActorName, SelectActor: SceneActor.MyActor, visibility: true });
                }
            }
        }
    }
}
exports.SelectSystem = SelectSystem;
//# sourceMappingURL=SelectSystem.js.map