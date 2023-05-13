///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/11 18:43
///

import * as UE from 'ue'
import {$ref, $unref} from "puerts";
import {BaseView} from "../../../System/API/View/BaseView";
import {WindowViewModel} from "../ViewModel/WindowViewModel";
import {APIViewModelSystem, GetViewModel, GetViewModelByType} from "../../../System/API/ApiViewModelSystem";
import {MessageCenter} from "../../../System/Core/NotificationCore/MessageManager";
import {NotificationLists} from "../../../System/Core/NotificationCore/NotificationLists";

export class WindowView extends BaseView {

    //@C++
    Root: UE.SceneComponent
    UIRoot: UE.WidgetComponent
    CoordinateConverterMgr: UE.CoordinateConverterMgr

    WBP_Window: UE.OpenZIAPI.API.View.Windows.WebUI.WebUI_C
    //@ts
    data: any
    isFirst: boolean
    time: number
    IsAdd: boolean

    Constructor(): void {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>("Root", UE.SceneComponent.StaticClass())
        this.RootComponent = this.Root
        this.UIRoot = this.CreateDefaultSubobjectGeneric<UE.WidgetComponent>("UIRoot", UE.WidgetComponent.StaticClass())
        this.UIRoot.SetupAttachment(this.Root, "UIRoot")
        this.UIRoot.SetWidgetSpace(UE.EWidgetSpace.Screen)
        this.UIRoot.WidgetClass = UE.Class.Load("/OpenZIAPI/API/View/Windows/WebUI.WebUI_C")
        this.UIRoot.SetDrawAtDesiredSize(true)
        this.UIRoot.Space = UE.EWidgetSpace.Screen
        this.isFirst = true
        this.time = 0
        this.IsAdd = false
    }

    ReceiveBeginPlay(): void {
        this.Init()
    }

    ReceiveTick(DeltaSeconds: number): void {
        if (this.isFirst === true) {
            this.time += DeltaSeconds
            if (this.time > 0.2) {
                this.isFirst = false
                this.WBP_Window.OpenZIBrowser.LoadURL(this.data.url)
            }
        }
        if (this.data.autoMove) {
            if (!UE.OpenZIFrameworkLibrary.GetActorHiddenInGame(this)) {
                if (this.IsAdd === false) {
                    MessageCenter.Add(this, this.FollowerMove, NotificationLists.API.FOLLOWER_API_MOVE)
                    this.IsAdd = true
                }
            } else {
                if (this.IsAdd === true) {
                    MessageCenter.Remove(this, NotificationLists.API.FOLLOWER_API_MOVE)
                    this.IsAdd = false
                }
            }
        }
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
        MessageCenter.Remove(this, NotificationLists.API.FOLLOWER_API_MOVE)
    }

    Init(): void {
        this.UIRoot.SetDrawAtDesiredSize(true)
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr()
        type WebUI_C = UE.OpenZIAPI.API.View.Windows.WebUI.WebUI_C
        this.WBP_Window = this.UIRoot.GetWidget() as WebUI_C

        this.WBP_Window.OpenZIBrowser.OnBeforePopup.Add((URL, Frame) => {
            this.WebPopup(URL, Frame)
        })
        this.WBP_Window.Button.OnClicked.Add(() => {
            this.WebClose()
        })
    }

    WebPopup(URL, Frame): void {
        this.WBP_Window.OpenZIBrowser.LoadURL(URL)
    }

    WebClose() {
        let jsondata = {
            data: {
                ids: [this.data.id]
            }
        }
        //Click the close button to delete
        GetViewModel(WindowViewModel).ExecuteDelete(jsondata)
 
    }

    RefreshView(jsonData): string {
        this.data = jsonData.data
        if (this.isFirst === false) {
            this.WBP_Window.OpenZIBrowser.LoadURL(this.data.url)
        }
        this.UIRoot.SetPivot(new UE.Vector2D(this.data.pivot.X, this.data.pivot.Y))
        let GeographicPos = new UE.GeographicCoordinates(this.data.coordinates.X, this.data.coordinates.Y, this.data.coordinates.Z)
        let CurEngineLocation = $ref(new UE.Vector(0, 0, 0))
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation)
        let EngineLocation = $unref(CurEngineLocation)
        if ($unref(CurEngineLocation) === null)
            return "coordinates is error"

        let SceneCoordinates
        if (EngineLocation.Z === 0) {
            const startp = new UE.Vector(EngineLocation.X, EngineLocation.Y, 1000000)
            const endp = new UE.Vector(EngineLocation.X, EngineLocation.Y, -1000000)
            let hit = $ref(new UE.HitResult)
            let bsucess = UE.KismetSystemLibrary.LineTraceSingle(this, startp, endp, UE.ETraceTypeQuery.Visibility, true, undefined, UE.EDrawDebugTrace.None, hit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5)
            if (bsucess) {
                SceneCoordinates = new UE.Vector($unref(hit).ImpactPoint.X, $unref(hit).ImpactPoint.Y, $unref(hit).ImpactPoint.Z)
            } else {
                SceneCoordinates = new UE.Vector(EngineLocation.X, EngineLocation.Y, EngineLocation.Z)
            }
        } else {
            SceneCoordinates = new UE.Vector(EngineLocation.X, EngineLocation.Y, EngineLocation.Z)
        }
        let FHitResult = $ref(new UE.HitResult)
        this.K2_SetActorLocation(SceneCoordinates, false, FHitResult, false)

        let WebRoot = UE.WidgetLayoutLibrary.SlotAsCanvasSlot(this.WBP_Window.OpenZIBrowser)
        WebRoot.SetSize(new UE.Vector2D(this.data.size.X, this.data.size.Y))
        this.WBP_Window.OpenZIBrowser.SetRenderTranslation(new UE.Vector2D(this.data.offset.X, this.data.offset.Y))

        if (this.data.showCloseButton) {
            this.WBP_Window.Button.SetVisibility(UE.ESlateVisibility.Visible)
            this.WBP_Window.Button.SetRenderTranslation(new UE.Vector2D(this.data.offset.X + this.data.closeOffset.X, this.data.offset.Y + this.data.closeOffset.Y))
        } else {
            this.WBP_Window.Button.SetVisibility(UE.ESlateVisibility.Hidden)
        }
        this.ShowWeb(this.data.isVisible)

        if (this.data.autoMove) {
            if (this.IsAdd === false) {
                MessageCenter.Add(this, this.FollowerMove, NotificationLists.API.FOLLOWER_API_MOVE)
                this.IsAdd = true
            }
        } else {
            if (this.IsAdd === true) {
                MessageCenter.Remove(this, NotificationLists.API.FOLLOWER_API_MOVE)
                this.IsAdd = false
            }
        }

        return "success"
    }

    FollowerMove(data) {
        if (data.type === this.data.followerFromType && data.id === this.data.followerFromId) {
            this.K2_SetActorLocation(data.location, false, null, false)
        } else {
            // console.error("当前需要跟随的API的类型或者Id不存在")
        }
    }

    ShowWeb(state) {
        if (state === true) {
            this.WBP_Window.OpenZIBrowser.SetVisibility(UE.ESlateVisibility.SelfHitTestInvisible)
        } else {
            this.WBP_Window.OpenZIBrowser.SetVisibility(UE.ESlateVisibility.Collapsed)
        }
    }
}



