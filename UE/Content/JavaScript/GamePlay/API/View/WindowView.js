"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/11 18:43
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowView = void 0;
const UE = require("ue");
const puerts_1 = require("puerts");
const BaseView_1 = require("../../../System/API/View/BaseView");
const WindowViewModel_1 = require("../ViewModel/WindowViewModel");
const ApiViewModelSystem_1 = require("../../../System/API/ApiViewModelSystem");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
class WindowView extends BaseView_1.BaseView {
    //@C++
    Root;
    UIRoot;
    CoordinateConverterMgr;
    WBP_Window;
    //@ts
    data;
    isFirst;
    time;
    IsAdd;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric("Root", UE.SceneComponent.StaticClass());
        this.RootComponent = this.Root;
        this.UIRoot = this.CreateDefaultSubobjectGeneric("UIRoot", UE.WidgetComponent.StaticClass());
        this.UIRoot.SetupAttachment(this.Root, "UIRoot");
        this.UIRoot.SetWidgetSpace(UE.EWidgetSpace.Screen);
        this.UIRoot.WidgetClass = UE.Class.Load("/OpenZIAPI/API/View/Windows/WebUI.WebUI_C");
        this.UIRoot.SetDrawAtDesiredSize(true);
        this.UIRoot.Space = UE.EWidgetSpace.Screen;
        this.isFirst = true;
        this.time = 0;
        this.IsAdd = false;
    }
    ReceiveBeginPlay() {
        this.Init();
    }
    ReceiveTick(DeltaSeconds) {
        if (this.isFirst === true) {
            this.time += DeltaSeconds;
            if (this.time > 0.2) {
                this.isFirst = false;
                this.WBP_Window.OpenZIBrowser.LoadURL(this.data.url);
            }
        }
        if (this.data.autoMove) {
            if (!UE.OpenZIFrameworkLibrary.GetActorHiddenInGame(this)) {
                if (this.IsAdd === false) {
                    MessageManager_1.MessageCenter.Add(this, this.FollowerMove, NotificationLists_1.NotificationLists.API.FOLLOWER_API_MOVE);
                    this.IsAdd = true;
                }
            }
            else {
                if (this.IsAdd === true) {
                    MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.API.FOLLOWER_API_MOVE);
                    this.IsAdd = false;
                }
            }
        }
    }
    ReceiveEndPlay(EndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
        MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.API.FOLLOWER_API_MOVE);
    }
    Init() {
        this.UIRoot.SetDrawAtDesiredSize(true);
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
        this.WBP_Window = this.UIRoot.GetWidget();
        this.WBP_Window.OpenZIBrowser.OnBeforePopup.Add((URL, Frame) => {
            this.WebPopup(URL, Frame);
        });
        this.WBP_Window.Button.OnClicked.Add(() => {
            this.WebClose();
        });
    }
    WebPopup(URL, Frame) {
        this.WBP_Window.OpenZIBrowser.LoadURL(URL);
    }
    WebClose() {
        let jsondata = {
            data: {
                ids: [this.data.id]
            }
        };
        //Click the close button to delete
        (0, ApiViewModelSystem_1.GetViewModel)(WindowViewModel_1.WindowViewModel).ExecuteDelete(jsondata);
    }
    RefreshView(jsonData) {
        this.data = jsonData.data;
        if (this.isFirst === false) {
            this.WBP_Window.OpenZIBrowser.LoadURL(this.data.url);
        }
        this.UIRoot.SetPivot(new UE.Vector2D(this.data.pivot.X, this.data.pivot.Y));
        let GeographicPos = new UE.GeographicCoordinates(this.data.coordinates.X, this.data.coordinates.Y, this.data.coordinates.Z);
        let CurEngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
        this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, CurEngineLocation);
        let EngineLocation = (0, puerts_1.$unref)(CurEngineLocation);
        if ((0, puerts_1.$unref)(CurEngineLocation) === null)
            return "coordinates is error";
        let SceneCoordinates;
        if (EngineLocation.Z === 0) {
            const startp = new UE.Vector(EngineLocation.X, EngineLocation.Y, 1000000);
            const endp = new UE.Vector(EngineLocation.X, EngineLocation.Y, -1000000);
            let hit = (0, puerts_1.$ref)(new UE.HitResult);
            let bsucess = UE.KismetSystemLibrary.LineTraceSingle(this, startp, endp, UE.ETraceTypeQuery.Visibility, true, undefined, UE.EDrawDebugTrace.None, hit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1), 5);
            if (bsucess) {
                SceneCoordinates = new UE.Vector((0, puerts_1.$unref)(hit).ImpactPoint.X, (0, puerts_1.$unref)(hit).ImpactPoint.Y, (0, puerts_1.$unref)(hit).ImpactPoint.Z);
            }
            else {
                SceneCoordinates = new UE.Vector(EngineLocation.X, EngineLocation.Y, EngineLocation.Z);
            }
        }
        else {
            SceneCoordinates = new UE.Vector(EngineLocation.X, EngineLocation.Y, EngineLocation.Z);
        }
        let FHitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.K2_SetActorLocation(SceneCoordinates, false, FHitResult, false);
        let WebRoot = UE.WidgetLayoutLibrary.SlotAsCanvasSlot(this.WBP_Window.OpenZIBrowser);
        WebRoot.SetSize(new UE.Vector2D(this.data.size.X, this.data.size.Y));
        this.WBP_Window.OpenZIBrowser.SetRenderTranslation(new UE.Vector2D(this.data.offset.X, this.data.offset.Y));
        if (this.data.showCloseButton) {
            this.WBP_Window.Button.SetVisibility(UE.ESlateVisibility.Visible);
            this.WBP_Window.Button.SetRenderTranslation(new UE.Vector2D(this.data.offset.X + this.data.closeOffset.X, this.data.offset.Y + this.data.closeOffset.Y));
        }
        else {
            this.WBP_Window.Button.SetVisibility(UE.ESlateVisibility.Hidden);
        }
        this.ShowWeb(this.data.isVisible);
        if (this.data.autoMove) {
            if (this.IsAdd === false) {
                MessageManager_1.MessageCenter.Add(this, this.FollowerMove, NotificationLists_1.NotificationLists.API.FOLLOWER_API_MOVE);
                this.IsAdd = true;
            }
        }
        else {
            if (this.IsAdd === true) {
                MessageManager_1.MessageCenter.Remove(this, NotificationLists_1.NotificationLists.API.FOLLOWER_API_MOVE);
                this.IsAdd = false;
            }
        }
        return "success";
    }
    FollowerMove(data) {
        if (data.type === this.data.followerFromType && data.id === this.data.followerFromId) {
            this.K2_SetActorLocation(data.location, false, null, false);
        }
        else {
            // console.error("当前需要跟随的API的类型或者Id不存在")
        }
    }
    ShowWeb(state) {
        if (state === true) {
            this.WBP_Window.OpenZIBrowser.SetVisibility(UE.ESlateVisibility.SelfHitTestInvisible);
        }
        else {
            this.WBP_Window.OpenZIBrowser.SetVisibility(UE.ESlateVisibility.Collapsed);
        }
    }
}
exports.WindowView = WindowView;
//# sourceMappingURL=WindowView.js.map