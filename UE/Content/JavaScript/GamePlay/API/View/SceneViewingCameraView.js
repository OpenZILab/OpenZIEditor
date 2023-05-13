"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/12/12 00:42
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneViewingCameraView = void 0;
const UE = require("ue");
const BaseView_1 = require("../../../System/API/View/BaseView");
const puerts_1 = require("puerts");
class SceneViewingCameraView extends BaseView_1.BaseView {
    //@C++
    Root;
    CameraMesh;
    UIRoot;
    //@ts
    data;
    bselect;
    Index;
    SplinePointType;
    ATangent;
    LTangent;
    RootUI;
    Onwer;
    PointSettingUI;
    IsFirstSelect;
    IsAdding;
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        this.Root = this.CreateDefaultSubobjectGeneric("Root", UE.SceneComponent.StaticClass());
        this.RootComponent = this.Root;
        this.UIRoot = this.CreateDefaultSubobjectGeneric("UIRoot", UE.WidgetComponent.StaticClass());
        this.UIRoot.SetupAttachment(this.Root, "UIRoot");
        this.UIRoot.SetWidgetSpace(UE.EWidgetSpace.Screen);
        this.UIRoot.WidgetClass = UE.Class.Load("/OpenZIAPI/API/View/Roaming/UMG_CameraPoint.UMG_CameraPoint_C");
        this.UIRoot.SetDrawAtDesiredSize(true);
        this.UIRoot.Space = UE.EWidgetSpace.Screen;
        this.Index = undefined;
        this.SplinePointType = undefined;
        this.ATangent = undefined;
        this.LTangent = undefined;
        this.IsFirstSelect = true;
        this.IsAdding = false;
    }
    ChangeTransfrom;
    ReceiveBeginPlay() {
        super.ReceiveBeginPlay();
        this.Init();
        this.ChangeTransfrom = (InTransform) => {
            this.RefreshTransform();
        };
        UE.AxesToolSubsystem.Get().OnTransfromChanged.Add(this.ChangeTransfrom);
    }
    ReceiveTick(DeltaSeconds) {
    }
    Init() {
        this.RootUI = this.UIRoot.GetWidget();
        this.PointSettingUI = this.RootUI.UMG_CameraRoamingPointSetting;
        this.RootUI.Select.OnClicked.Add(() => {
            if (!this.IsAdding) {
                this.OnClickedSelect();
            }
        });
        this.RootUI.Settings.OnClicked.Add(() => {
            if (!this.IsAdding) {
                this.OnClickedSettings();
            }
        });
        this.RootUI.Delete.OnClicked.Add(() => {
            if (!this.IsAdding) {
                this.OnClickedDelete();
            }
        });
        this.PointSettingUI.Apply.OnClicked.Add(() => {
            if (!this.IsAdding) {
                this.ApplyClicked();
            }
        });
        this.PointSettingUI.SendMsg.Add((index, position, rotation, arrive_tangent, leave_tangent, point_type) => {
            this.UpdateCameraInfo(index, position, rotation, arrive_tangent, leave_tangent, point_type);
        });
    }
    OnClickedSelect() {
        let IsVisible = this.RootUI.Overlay_0.GetVisibility();
        if (IsVisible === UE.ESlateVisibility.Visible) {
            this.RootUI.Overlay_0.SetVisibility(UE.ESlateVisibility.Collapsed);
            this.RootUI.Overlay.SetVisibility(UE.ESlateVisibility.Collapsed);
            this.PointSettingUI.SetVisibility(UE.ESlateVisibility.Collapsed);
        }
        else {
            this.RootUI.Overlay_0.SetVisibility(UE.ESlateVisibility.Visible);
            this.RootUI.Overlay.SetVisibility(UE.ESlateVisibility.Visible);
            this.SetPointSettingUI();
        }
    }
    OnClickedSettings() {
        let temp = this.PointSettingUI.GetVisibility();
        if (temp === UE.ESlateVisibility.Visible) {
            this.PointSettingUI.SetVisibility(UE.ESlateVisibility.Collapsed);
        }
        else {
            this.PointSettingUI.SetVisibility(UE.ESlateVisibility.Visible);
            this.SetPointSettingUI();
        }
    }
    OnClickedDelete() {
        this.Onwer.DeleteSlpineCamearActor(this.Index);
        this.K2_DestroyActor();
    }
    ApplyClicked() {
        this.ATangent = this.PointSettingUI.ArriveTangent;
        this.LTangent = this.PointSettingUI.LeaveTangent;
        this.SplinePointType = this.PointSettingUI.PointType;
        if (this.Onwer) {
            this.Onwer.UpdatePonitInfoOfIndex(this.Index);
        }
    }
    RefreshTransform() {
        if (this.PointSettingUI.GetVisibility() === UE.ESlateVisibility.Visible) {
            this.SetPointSettingUI();
        }
        this.Onwer.UpdatePonitInfoOfIndex(this.Index);
    }
    UpdateCameraInfo(index, position, rotation, arrive_tangent, leave_tangent, point_type) {
        this.ATangent = arrive_tangent;
        this.LTangent = leave_tangent;
        this.SplinePointType = point_type;
        let HitResult = (0, puerts_1.$ref)(new UE.HitResult);
        this.CameraMesh.K2_SetWorldTransform(new UE.Transform(rotation, position, new UE.Vector(5, 5, 5)), false, HitResult, false);
        this.Onwer.UpdatePonitInfoOfIndex(this.Index);
    }
    ReceiveEndPlay(EndPlayReason) {
        super.ReceiveEndPlay(EndPlayReason);
        this.Owner = undefined;
        this.RootUI = undefined;
        UE.AxesToolSubsystem.Get().OnTransfromChanged.Remove(this.ChangeTransfrom);
    }
    RefreshView(jsonData) {
        this.data = jsonData.data;
        return "success";
    }
    SetOwnerActor(Owner) {
        this.Onwer = Owner;
    }
    SetSplinePointInfo(location, Rotiton, Index, SplinePointType, ATangent, LTangent) {
        this.Index = Index;
        this.SplinePointType = SplinePointType;
        this.ATangent = ATangent;
        this.LTangent = LTangent;
        this.CreatCameraMesh(location, Rotiton);
    }
    CreatCameraMesh(location, Rotiton) {
        let name = "CameraMesh";
        let CurCameraMesh = new UE.StaticMeshComponent(this, name);
        CurCameraMesh.RegisterComponent();
        CurCameraMesh.SetStaticMesh(UE.StaticMesh.Load("/OpenZIAPI/Asset/Mesh/SM_CameraMesh.SM_CameraMesh"));
        CurCameraMesh.K2_AttachToComponent(this.Root, name, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, UE.EAttachmentRule.KeepWorld, true);
        let HitResult = (0, puerts_1.$ref)(new UE.HitResult);
        CurCameraMesh.K2_SetWorldTransform(new UE.Transform(Rotiton, location, new UE.Vector(5, 5, 5)), false, HitResult, false);
        CurCameraMesh.CanCharacterStepUpOn = UE.ECanBeCharacterBase.ECB_No;
        this.CameraMesh = CurCameraMesh;
        this.UIRoot.K2_AttachToComponent(this.CameraMesh, "UIRoot", UE.EAttachmentRule.KeepRelative, UE.EAttachmentRule.KeepRelative, UE.EAttachmentRule.KeepRelative, true);
    }
    SetIndex(Index) {
        this.Index = Index;
    }
    GetPointType() {
        return this.SplinePointType;
    }
    GetArriveTangent() {
        return this.ATangent;
    }
    GetLeaveTangent() {
        return this.LTangent;
    }
    SetPointSettingUI() {
        this.PointSettingUI.UpdateData(this.Index, this.CameraMesh.K2_GetComponentToWorld().GetLocation(), this.CameraMesh.K2_GetComponentToWorld().Rotator(), this.ATangent, this.LTangent, this.SplinePointType);
    }
}
exports.SceneViewingCameraView = SceneViewingCameraView;
//# sourceMappingURL=SceneViewingCameraView.js.map