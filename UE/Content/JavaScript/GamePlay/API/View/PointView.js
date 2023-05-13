"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2022/9/21 22:05
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointView = void 0;
const puerts_1 = require("puerts");
const UE = require("ue");
const WebSocketServer_1 = require("../../../System/API/Handle/WebSocketServer");
const IAPIMessageHandle_1 = require("../../../System/API/IHandle/IAPIMessageHandle");
const BaseView_1 = require("../../../System/API/View/BaseView");
const CoodinateConverterViewModel_1 = require("../ViewModel/CoodinateConverterViewModel");
const ApiViewModelSystem_1 = require("../../../System/API/ApiViewModelSystem");
const MessageManager_1 = require("../../../System/Core/NotificationCore/MessageManager");
const NotificationLists_1 = require("../../../System/Core/NotificationCore/NotificationLists");
const SystemSetting_1 = require("../../../System/Setting/SystemSetting");
class PointView extends BaseView_1.BaseView {
    //@C++
    RootScene;
    Widget;
    Label;
    StaticMesh;
    CoordinateConverterMgr;
    id;
    //@blueprint
    WBP_PointWidget;
    WBP_PointLabel;
    //@ts
    data;
    lastScreenLoction;
    CurjsonData;
    IsSendScreemCoordinates;
    tickTime;
    curTickTime;
    bDestory;
    IsAdd;
    Constructor() {
        super.Constructor();
        this.PrimaryActorTick.bCanEverTick = true;
        this.RootScene = this.CreateDefaultSubobjectGeneric("Scene", UE.SceneComponent.StaticClass());
        this.Widget = this.CreateDefaultSubobjectGeneric("Widget", UE.WidgetComponent.StaticClass());
        this.Label = this.CreateDefaultSubobjectGeneric("Label", UE.WidgetComponent.StaticClass());
        this.StaticMesh = this.CreateDefaultSubobjectGeneric("StaticMesh", UE.StaticMeshComponent.StaticClass());
        this.RootComponent = this.RootScene;
        this.InstanceComponents.Add(this.Widget);
        this.InstanceComponents.Add(this.Label);
        this.InstanceComponents.Add(this.StaticMesh);
        this.Widget.SetupAttachment(this.RootComponent, "Widget");
        this.Label.SetupAttachment(this.RootComponent, "Label");
        this.Widget.SharedLayerName = "PoiName1";
        this.Widget.LayerZOrder = -1000;
        this.Label.SharedLayerName = "PoiName2";
        this.Label.LayerZOrder = -50;
        // this.Label.K2_SetRelativeLocation(new UE.Vector(10,10,10),false,undefined,false)
        this.StaticMesh.SetupAttachment(this.RootComponent, "StaticMesh");
        this.StaticMesh.StaticMesh = UE.StaticMesh.Load("/Engine/BasicShapes/Cone.Cone");
        this.StaticMesh.SetHiddenInGame(true);
        //Init-widget
        this.InitWidget(this.Widget, "/OpenZIAPI/API/Plot/General/Point/WBP_PointWidget.WBP_PointWidget_C");
        //Init-label
        this.InitWidget(this.Label, "/OpenZIAPI/API/Plot/General/Point/WBP_PointLabel.WBP_PointLabel_C");
        this.lastScreenLoction = new UE.Vector2D(0, 0);
        this.CurjsonData = undefined;
        this.tickTime = 0;
        this.curTickTime = 0;
        this.bDestory = false;
        this.IsAdd = false;
    }
    ReceiveBeginPlay() {
        this.WBP_PointWidget = this.Widget.GetWidget();
        this.WBP_PointLabel = this.Label.GetWidget();
        this.WBP_PointWidget.PointBtn.OnClicked.Add(() => {
            this.OnMouseClicked();
        });
        this.WBP_PointLabel.LabelBtn.OnClicked.Add(() => {
            this.OnMouseClicked();
        });
        this.CoordinateConverterMgr = UE.CoordinateConverterMgr.GetCoodinateConverterMgr();
        //this.WBP_PointWidget.PointBtn.SetVisibility(UE.ESlateVisibility.Visible)
        //MessageCenter.Add(this, this.OnSelectChanged.bind(this), NotificationLists.SCENE.ON_SELECT_CHANGED_DETAIL)
    }
    OnSelectChanged(sceneObjects) {
        let bSelected = false;
        if (sceneObjects && sceneObjects.Num() > 0) {
            for (let i = 0; i < sceneObjects.Num(); i++) {
                if (sceneObjects.Get(i).MyActor == this) {
                    bSelected = true;
                    break;
                }
            }
        }
        if (bSelected) {
            this.WBP_PointWidget.PointBtn.SetVisibility(UE.ESlateVisibility.HitTestInvisible);
            this.WBP_PointLabel.LabelBtn.SetVisibility(UE.ESlateVisibility.HitTestInvisible);
        }
        else {
            this.WBP_PointWidget.PointBtn.SetVisibility(UE.ESlateVisibility.Visible);
            this.WBP_PointLabel.LabelBtn.SetVisibility(UE.ESlateVisibility.Visible);
        }
    }
    ReceiveTick(DeltaSeconds) {
        this.UpdateShow(this);
        this.UpdateShow(this.Label);
        if (!UE.OpenZIFrameworkLibrary.GetActorHiddenInGame(this)) {
            if (this.IsSendScreemCoordinates) {
                this.curTickTime += DeltaSeconds;
                if (this.curTickTime >= this.tickTime) {
                    this.RefreshCoordinates();
                    this.curTickTime = 0;
                }
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
    RefreshCoordinates() {
        let CurScreenPosition_Ref = (0, puerts_1.$ref)(new UE.Vector2D);
        let Controller = UE.GameplayStatics.GetPlayerController(this, 0);
        let Curlocation = this.K2_GetActorLocation();
        let IsToScreenSucess = UE.GameplayStatics.ProjectWorldToScreen(Controller, Curlocation, CurScreenPosition_Ref, false);
        let CurScreenPosition = (0, puerts_1.$unref)(CurScreenPosition_Ref);
        if (CurScreenPosition !== this.lastScreenLoction && (CurScreenPosition.X - this.lastScreenLoction.X > 0.01 ||
            CurScreenPosition.X - this.lastScreenLoction.X < -0.01 ||
            CurScreenPosition.Y - this.lastScreenLoction.Y > 0.01 ||
            CurScreenPosition.Y - this.lastScreenLoction.Y < -0.01)) {
            this.lastScreenLoction = CurScreenPosition;
            let msg = {
                classDef: "POI",
                funcDef: "ScreenCoordinates",
                callback: this.CurjsonData.callback,
                pageID: this.CurjsonData.pageID,
            };
            let message = (0, IAPIMessageHandle_1.PackBroadcastMessage)(msg, {
                id: this.data.id,
                ScreenPosition: { X: this.lastScreenLoction.X, Y: this.lastScreenLoction.Y }
            });
            WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(message);
        }
    }
    OnMouseHovered() {
        console.log("OnMouseHovered");
    }
    OnUnMousehovered() {
        console.log("OnUnMousehovered");
    }
    OnMouseClicked() {
        console.log("OnMouseClicked");
        let InputData = { location: this.K2_GetActorLocation(), distance: this.data.focusDistance };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.ONPOINTBE_CLICKED, InputData);
        UE.AxesToolSubsystem.Get().SetSelectObjectsFormLogic(this, false);
        let Msg = (0, IAPIMessageHandle_1.PackBroadcastMessage)({ classDef: "POI", funcDef: "OnMouseClicked" }, { id: this.id });
        WebSocketServer_1.WebSocketServer.GetInstance().OnSendWebMessage(Msg);
    }
    Focus(msg) {
        let data = msg.data;
        let InputData = { location: this.K2_GetActorLocation(), distance: data.focusDistance };
        MessageManager_1.MessageCenter.Execute(NotificationLists_1.NotificationLists.API.ONPOINTBE_CLICKED, InputData);
        return "success";
    }
    ScreenCoordinates(msg) {
        this.IsSendScreemCoordinates = msg.data.sendScreemCoordinates;
        if (this.IsSendScreemCoordinates) {
            this.tickTime = msg.data.tickTime;
            this.curTickTime = 0;
        }
        return "success";
    }
    UpdateImage() {
        //@blueprint
        let Wbp_PointWidget = this.Widget.GetWidget();
        this.Widget.SetPivot(new UE.Vector2D(0.5, 2));
    }
    InitWidget(widget, bpPath) {
        widget.WidgetClass = UE.Class.Load(bpPath);
        widget.SetDrawAtDesiredSize(true);
        widget.Pivot = new UE.Vector2D(0.5, 1);
        widget.Space = UE.EWidgetSpace.Screen;
    }
    RefreshView(jsonData) {
        this.CurjsonData = jsonData;
        this.id = jsonData.data.id;
        this.data = jsonData.data;
        this.IsSendScreemCoordinates = this.data.sendScreemCoordinates;
        this.tickTime = this.data.tickTime;
        this.curTickTime = 0;
        let GeographicPos = new UE.GeographicCoordinates(this.data.coordinates.X, this.data.coordinates.Y, this.data.coordinates.Z);
        let bCoordinate = true;
        if (bCoordinate) {
            let EngineLocation = (0, puerts_1.$ref)(new UE.Vector(0, 0, 0));
            this.CoordinateConverterMgr.GeographicToEngine(this.data.GISType, GeographicPos, EngineLocation);
            if ((0, puerts_1.$unref)(EngineLocation) == null)
                return "coordinates is error";
            if (!this.data.bAutoHeight) {
                this.K2_SetActorLocation(new UE.Vector((0, puerts_1.$unref)(EngineLocation).X, (0, puerts_1.$unref)(EngineLocation).Y, (0, puerts_1.$unref)(EngineLocation).Z), false, null, false);
            }
            else {
                let startPos = new UE.Vector((0, puerts_1.$unref)(EngineLocation).X, (0, puerts_1.$unref)(EngineLocation).Y, 1000000);
                let endPos = new UE.Vector((0, puerts_1.$unref)(EngineLocation).X, (0, puerts_1.$unref)(EngineLocation).Y, -1000000);
                let hit = (0, puerts_1.$ref)(new UE.HitResult());
                let isFinish;
                isFinish = UE.KismetSystemLibrary.LineTraceSingle(this, startPos, endPos, UE.ETraceTypeQuery.TraceTypeQuery1, true, null, UE.EDrawDebugTrace.None, hit, true, new UE.LinearColor(1, 0, 0, 1), new UE.LinearColor(0, 1, 0, 1));
                if (isFinish) {
                    this.K2_SetActorLocation((0, puerts_1.$unref)(hit).ImpactPoint, false, null, false);
                }
                else {
                    this.K2_SetActorLocation(new UE.Vector((0, puerts_1.$unref)(EngineLocation).X, (0, puerts_1.$unref)(EngineLocation).Y, this.data.coordinates.Z), false, null, false);
                }
            }
        }
        this.Widget.SetPivot(new UE.Vector2D(this.data.imagePivot.X, this.data.imagePivot.Y));
        this.SetImageSize(new UE.Vector2D(this.data.imageSize.X, this.data.imageSize.Y));
        this.WBP_PointWidget.WidgetRoot.SetRenderTranslation(new UE.Vector2D(this.data.imageOffset.X, this.data.imageOffset.Y));
        if (this.data.imageAddress != null && this.data.imageAddress != "") {
            if (this.data.imageType == 0) {
                let Texture = UE.Texture2D.Load(this.data.imageAddress);
                if (Texture) {
                    this.WBP_PointWidget.PointImage.SetBrushFromTexture(Texture);
                }
            }
            else if (this.data.imageType == 1) {
                let str = "";
                if (this.data.imageAddress.charAt(0) != "/") {
                    str = "/";
                }
                let CurPath = (0, puerts_1.$ref)("String");
                UE.BlueprintPathsLibrary.NormalizeDirectoryName(SystemSetting_1.ProjectSetting.ProjectPath, CurPath);
                //let FilePath = $unref(CurPath) + "/Script/Web/APITextures" + str + this.data.imageAddress
                let FilePath = (0, puerts_1.$unref)(CurPath) + "/" + this.data.imageAddress;
                if (UE.BlueprintPathsLibrary.FileExists(FilePath)) {
                    let Texture = (0, puerts_1.$ref)(new UE.Texture2D());
                    let x = (0, puerts_1.$ref)(Number());
                    let y = (0, puerts_1.$ref)(Number());
                    let bSuccess = UE.AdvancedUmgLibrary.GetTexture2DFromImage(FilePath, Texture, x, y);
                    if (bSuccess) {
                        this.WBP_PointWidget.PointImage.SetBrushFromTexture((0, puerts_1.$unref)(Texture));
                    }
                }
            }
            else if (this.data.imageType == 2) {
                this.WBP_PointWidget.PointImage.RefreshOnlineImage(this.data.imageAddress, this.data.imageForceRefresh);
            }
        }
        else {
            let Texture = UE.Texture2D.Load('/OpenZIAPI/Asset/Texture/T_Point.T_Point');
            if (Texture) {
                this.WBP_PointWidget.PointImage.SetBrushFromTexture(Texture);
            }
        }
        if (this.data.labelImageAddress != null && this.data.labelImageAddress != "") {
            if (this.data.labelImageType == 0) {
                let Texture = UE.Texture2D.Load(this.data.labelImageAddress);
                if (Texture) {
                    this.WBP_PointLabel.LabelImage.SetBrushFromTexture(Texture);
                    let LineColor = new UE.LinearColor(1, 1, 1, 1);
                    this.WBP_PointLabel.LabelImage.SetColorAndOpacity(LineColor);
                    this.SetLabelImageSize(new UE.Vector2D(this.data.labelImageSize.X, this.data.labelImageSize.Y));
                }
            }
            else if (this.data.labelImageType == 1) {
                let str = "";
                if (this.data.labelImageAddress.charAt(0) != "/") {
                    str = "/";
                }
                let CurPath = (0, puerts_1.$ref)("String");
                UE.BlueprintPathsLibrary.NormalizeDirectoryName(SystemSetting_1.ProjectSetting.ProjectPath, CurPath);
                //let FilePath = $unref(CurPath) + "/Script/Web/APITextures" + str + this.data.labelImageAddress
                let FilePath = (0, puerts_1.$unref)(CurPath) + "/" + this.data.labelImageAddress;
                if (UE.BlueprintPathsLibrary.FileExists(FilePath)) {
                    let Texture = (0, puerts_1.$ref)(new UE.Texture2D());
                    let x = (0, puerts_1.$ref)(Number());
                    let y = (0, puerts_1.$ref)(Number());
                    let bSuccess = UE.AdvancedUmgLibrary.GetTexture2DFromImage(FilePath, Texture, x, y);
                    if (bSuccess) {
                        this.WBP_PointLabel.LabelImage.SetBrushFromTexture((0, puerts_1.$unref)(Texture));
                        let LineColor = new UE.LinearColor(1, 1, 1, 1);
                        this.WBP_PointLabel.LabelImage.SetColorAndOpacity(LineColor);
                        this.SetLabelImageSize(new UE.Vector2D(this.data.labelImageSize.X, this.data.labelImageSize.Y));
                    }
                }
            }
            else if (this.data.labelImageType == 2) {
                this.WBP_PointLabel.LabelImage.RefreshOnlineImage(this.data.imageAddress, this.data.imageForceRefresh);
                let LineColor = new UE.LinearColor(1, 1, 1, 1);
                this.WBP_PointLabel.LabelImage.SetColorAndOpacity(LineColor);
                this.SetLabelImageSize(new UE.Vector2D(this.data.labelImageSize.X, this.data.labelImageSize.Y));
            }
        }
        else {
            let LineColor = new UE.LinearColor(0, 0, 0, 0);
            this.WBP_PointLabel.LabelImage.SetColorAndOpacity(LineColor);
            this.SetLabelImageSize(new UE.Vector2D(0, 0));
        }
        if (this.data.labe == "") {
            this.Label.SetHiddenInGame(true);
        }
        else {
            this.Label.SetHiddenInGame(false);
            this.Label.SetPivot(new UE.Vector2D(this.data.labelPivot.X, this.data.labelPivot.Y));
            this.WBP_PointLabel.LabelText.SetText(this.data.label);
            this.WBP_PointLabel.SetFontFamily(this.data.labelFontName);
            this.WBP_PointLabel.SetFontSize(this.data.labelFontSize);
            let BackColor = new UE.LinearColor(this.data.labelBackgroundColor.X, this.data.labelBackgroundColor.Y, this.data.labelBackgroundColor.Z, this.data.labelBackgroundColor.W);
            this.WBP_PointLabel.LabelBorder.SetBrushColor(BackColor);
            let LineColor = new UE.LinearColor(this.data.labelFontColor.X, this.data.labelFontColor.Y, this.data.labelFontColor.Z, this.data.labelFontColor.W);
            let FontColor = new UE.SlateColor(LineColor, UE.ESlateColorStylingMode.UseColor_Specified);
            this.WBP_PointLabel.LabelText.SetColorAndOpacity(FontColor);
            this.WBP_PointLabel.LabelBorder.SetRenderTranslation(new UE.Vector2D(this.data.labelOffset.X, this.data.labelOffset.Y));
            this.Label.SetHiddenInGame(!this.data.labelAlwaysVisible);
        }
        this.SetActorHiddenInGame(!this.data.poiAlwaysVisible);
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
    SetImageSize(value) {
        let SlateBrush = this.WBP_PointWidget.PointImage.Brush;
        SlateBrush.ImageSize = value;
        this.WBP_PointWidget.PointImage.SetBrush(SlateBrush);
    }
    SetLabelImageSize(value) {
        let SlateBrush = this.WBP_PointLabel.LabelImage.Brush;
        SlateBrush.ImageSize = value;
        this.WBP_PointLabel.LabelImage.SetBrush(SlateBrush);
    }
    UpdateShow(obj) {
        if (this.bDestory)
            return;
        if (this.data.poiAlwaysVisible == false) {
            let cameraPos = UE.GameplayStatics.GetPlayerCameraManager(this, 0).K2_GetActorLocation();
            let dis = UE.KismetMathLibrary.Vector_Distance(this.K2_GetActorLocation(), cameraPos) / (0, ApiViewModelSystem_1.GetViewModel)(CoodinateConverterViewModel_1.CoodinateConverterViewModel).GetScale();
            if (dis > this.data.poiVisibleRange.X && dis < this.data.poiVisibleRange.Y) {
                if (obj instanceof UE.Actor) {
                    let actor = obj;
                    actor.SetActorHiddenInGame(false);
                    return true;
                }
                else if (obj instanceof UE.SceneComponent) {
                    //let com = obj as UE.SceneComponent
                    obj.SetHiddenInGame(false);
                    return true;
                }
            }
            else {
                if (obj instanceof UE.Actor) {
                    let actor = obj;
                    actor.SetActorHiddenInGame(true);
                    return false;
                }
                else if (obj instanceof UE.WidgetComponent) {
                    let com = obj;
                    com.SetHiddenInGame(true);
                    return false;
                }
            }
        }
        return true;
    }
}
exports.PointView = PointView;
//# sourceMappingURL=PointView.js.map