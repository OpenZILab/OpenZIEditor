"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/10/17 10:50
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetNiagaraVisibleWithTags = exports.SetActorVisibleWithTags = exports.SetAxesSelectionOutline = exports.GetAxesToolSelectMoth = exports.SetAxesToolSelectMoth = exports.GetAxesTool = exports.CloseAxesTool = exports.OpenAxesTool = exports.CloseSkyline_Pawn = exports.CloseSkyline = exports.OpenSkyline = exports.GetCesiumPawn = exports.DeleteCesiumPawn = exports.ChangeCesiumPawn = exports.ChangeDefaultPawn = exports.ChangePawn = exports.GetDefaultPawn = void 0;
const UE = require("ue");
const puerts = require("puerts");
const puerts_1 = require("puerts");
const ue_1 = require("ue");
const ApiViewModelSystem_1 = require("../../../System/API/ApiViewModelSystem");
var DefaultPawn;
var IsOpenSkyline = false;
var CesiumPawn;
function GetDefaultPawn() {
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    DefaultPawn = UE.GameplayStatics.GetPlayerPawn(CurrentWorld, 0);
}
exports.GetDefaultPawn = GetDefaultPawn;
function ChangePawn(jsonData) {
    let data = jsonData.data;
    let loc = data.location;
    let CurLoc;
    if (typeof loc === "string" || loc instanceof String) {
        let outStr = loc.split(",");
        CurLoc = new UE.Vector(+outStr[0], +outStr[1], +outStr[2]);
    }
    else {
        CurLoc = new UE.Vector(loc.X, loc.Y, loc.Z);
    }
    let LogMsg = "";
    let pawn_class = UE.Class.Load(data.pawn_path);
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    let Controller = UE.GameplayStatics.GetPlayerController(CurrentWorld, 0);
    let Character = UE.GameplayStatics.GetPlayerCharacter(CurrentWorld, 0);
    if (pawn_class) {
        let old_pawn = UE.GameplayStatics.GetPlayerPawn(CurrentWorld, 0);
        let newpawn = undefined;
        if (data.generate_new) {
            let NewLoc = new UE.Transform(new UE.Rotator, CurLoc, new UE.Vector);
            newpawn = UE.WorldExtensionMethods.SpawnActor(CurrentWorld, pawn_class, NewLoc, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        }
        else {
            newpawn = UE.GameplayStatics.GetActorOfClass(CurrentWorld, pawn_class);
        }
        if (newpawn) {
            Controller.SetViewTargetWithBlend(newpawn, 1, UE.EViewTargetBlendFunction.VTBlend_Linear, 0, false);
            Controller.Possess(newpawn);
            UE.WidgetBlueprintLibrary.SetInputMode_GameAndUIEx(Controller, undefined, UE.EMouseLockMode.DoNotLock, false);
            if (IsOpenSkyline) {
                OpenSkyline();
            }
            else {
                CloseSkyline();
            }
            if (data.delete_old) {
                if (old_pawn !== DefaultPawn) {
                    old_pawn.K2_DestroyActor();
                }
            }
            else {
                CloseSkyline_Pawn(old_pawn);
            }
        }
        else {
            LogMsg = LogMsg + "new pawn is no valid ! ";
        }
    }
    else {
        LogMsg = LogMsg + "pawn_path:Error !  ";
    }
    if (LogMsg === "") {
        LogMsg = "success";
    }
    return LogMsg;
}
exports.ChangePawn = ChangePawn;
function ChangeDefaultPawn() {
    if (UE.KismetSystemLibrary.IsValid(DefaultPawn)) {
        let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
        let old_pawn = UE.GameplayStatics.GetPlayerPawn(CurrentWorld, 0);
        let Controller = UE.GameplayStatics.GetPlayerController(CurrentWorld, 0);
        Controller.SetViewTargetWithBlend(DefaultPawn, 1, UE.EViewTargetBlendFunction.VTBlend_Linear, 0, false);
        Controller.Possess(DefaultPawn);
        UE.WidgetBlueprintLibrary.SetInputMode_GameAndUIEx(Controller, undefined, UE.EMouseLockMode.DoNotLock, false);
        if (IsOpenSkyline) {
            CloseSkyline_Pawn(old_pawn);
            OpenSkyline();
        }
        return "success";
    }
    else {
        DefaultPawn = undefined;
        return "Default Pawn is no valid";
    }
}
exports.ChangeDefaultPawn = ChangeDefaultPawn;
function ChangeCesiumPawn(jsondata) {
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    let old_pawn = UE.GameplayStatics.GetPlayerPawn(CurrentWorld, 0);
    let result = "";
    result = ApiViewModelSystem_1.APIViewModelSystem.GetInstance().GetViewModelByType("CesiumPawn").SpawnObject(jsondata);
    if (IsOpenSkyline) {
        CloseSkyline_Pawn(old_pawn);
        OpenSkyline();
    }
    if (result)
        return result;
}
exports.ChangeCesiumPawn = ChangeCesiumPawn;
function DeleteCesiumPawn() {
    if (CesiumPawn) {
        let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
        let CurPawn = UE.GameplayStatics.GetPlayerPawn(CurrentWorld, 0);
        if (CesiumPawn === CurPawn) {
            ChangeDefaultPawn();
        }
        CesiumPawn.K2_DestroyActor();
        CesiumPawn = undefined;
    }
}
exports.DeleteCesiumPawn = DeleteCesiumPawn;
function GetCesiumPawn() {
    return CesiumPawn;
}
exports.GetCesiumPawn = GetCesiumPawn;
function OpenSkyline() {
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    let CurrentPawn = UE.GameplayStatics.GetPlayerPawn(CurrentWorld, 0);
    let Root = CurrentPawn.K2_GetRootComponent();
    let ComArray_ref = (0, puerts_1.$ref)((0, ue_1.NewArray)(UE.SceneComponent));
    Root.GetChildrenComponents(false, ComArray_ref);
    let ComArray = (0, puerts_1.$unref)(ComArray_ref);
    for (let i = 0; i < ComArray.Num(); i++) {
        if (ComArray.Get(i).GetName() === "OpneZISkylinePostProcess" && ComArray.Get(i)) {
            let result = "Do not add Skyline functions that already exist ! ! !";
            return result;
        }
    }
    let CurPostProcess = new UE.PostProcessComponent(CurrentPawn, "OpneZISkylinePostProcess");
    CurPostProcess.RegisterComponent();
    let CurSetting = CurPostProcess.Settings;
    let PostMaterial = UE.MaterialInstance.Load("/OpenZIAPI/Asset/Material/PostProcess/M_SkylinePost_Inst");
    let Element = new UE.WeightedBlendable(1.0, PostMaterial);
    CurSetting.WeightedBlendables.Array.Add(Element);
    CurPostProcess.K2_AttachToComponent(Root, "Post", UE.EAttachmentRule.KeepRelative, UE.EAttachmentRule.KeepRelative, UE.EAttachmentRule.KeepRelative, true);
    IsOpenSkyline = true;
    return "success";
}
exports.OpenSkyline = OpenSkyline;
function CloseSkyline() {
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    let CurrentPawn = UE.GameplayStatics.GetPlayerPawn(CurrentWorld, 0);
    let Root = CurrentPawn.K2_GetRootComponent();
    let ComArray_ref = (0, puerts_1.$ref)((0, ue_1.NewArray)(UE.SceneComponent));
    Root.GetChildrenComponents(false, ComArray_ref);
    let ComArray = (0, puerts_1.$unref)(ComArray_ref);
    for (let i = 0; i < ComArray.Num(); i++) {
        if (ComArray.Get(i).GetName() === "OpneZISkylinePostProcess" && ComArray.Get(i)) {
            ComArray.Get(i).K2_DestroyComponent(ComArray.Get(i));
        }
    }
    IsOpenSkyline = false;
    return "success";
}
exports.CloseSkyline = CloseSkyline;
function CloseSkyline_Pawn(pawn) {
    let Root = pawn.K2_GetRootComponent();
    let ComArray_ref = (0, puerts_1.$ref)((0, ue_1.NewArray)(UE.SceneComponent));
    Root.GetChildrenComponents(false, ComArray_ref);
    let ComArray = (0, puerts_1.$unref)(ComArray_ref);
    for (let i = 0; i < ComArray.Num(); i++) {
        if (ComArray.Get(i).GetName() === "OpneZISkylinePostProcess" && ComArray.Get(i)) {
            ComArray.Get(i).K2_DestroyComponent(ComArray.Get(i));
        }
    }
}
exports.CloseSkyline_Pawn = CloseSkyline_Pawn;
//Start the axes function
function OpenAxesTool() {
    UE.AxesToolSubsystem.Get().TransformInteraction.SetTransformMoth(UE.ETransformGizmoSubElements.FullTranslateRotateScale);
    return "success";
}
exports.OpenAxesTool = OpenAxesTool;
//Turn off the axes function
function CloseAxesTool() {
    UE.AxesToolSubsystem.Get().TransformInteraction.SetTransformMoth(UE.ETransformGizmoSubElements.None);
    return "success";
}
exports.CloseAxesTool = CloseAxesTool;
//Get the current axes function
function GetAxesTool() {
    return UE.AxesToolSubsystem.Get().TransformInteraction.GetTransformMoth();
}
exports.GetAxesTool = GetAxesTool;
//Set Axes selection mode to Actor or Component
function SetAxesToolSelectMoth(jsondata) {
    let data = jsondata.data;
    if (typeof data.component === "boolean") {
        UE.AxesToolSubsystem.Get().SetSelectMoth(data.component);
    }
    return "success";
}
exports.SetAxesToolSelectMoth = SetAxesToolSelectMoth;
//Get whether the current axes selection mode is component
function GetAxesToolSelectMoth() {
    return UE.AxesToolSubsystem.Get().GetSelectMoth();
}
exports.GetAxesToolSelectMoth = GetAxesToolSelectMoth;
//Set axes to select the stroke material effect
function SetAxesSelectionOutline(jsondata) {
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    let data = jsondata.data;
    let MPC_PP_SelectionSettings = UE.MaterialParameterCollection.Load("/OpenZIAPI/Asset/Material/PostProcess/MPC_PP_SelectionSettings.MPC_PP_SelectionSettings");
    if (typeof data.strength === "number") {
        UE.KismetMaterialLibrary.SetScalarParameterValue(CurrentWorld, MPC_PP_SelectionSettings, "Strength", data.strength);
    }
    if (typeof data.thickness === "number") {
        UE.KismetMaterialLibrary.SetScalarParameterValue(CurrentWorld, MPC_PP_SelectionSettings, "Thickness", data.thickness);
    }
    if (typeof data.selectionColor === "string") {
        let Color = data.selectionColor;
        let CurColor;
        if (typeof Color === "string" || Color instanceof String) {
            let outStr = Color.split(",");
            CurColor = new UE.LinearColor(+outStr[0], +outStr[1], +outStr[2], +outStr[3]);
        }
        else {
            CurColor = new UE.LinearColor(Color.X, Color.Y, Color.Z, Color.W);
        }
        UE.KismetMaterialLibrary.SetVectorParameterValue(CurrentWorld, MPC_PP_SelectionSettings, "SelectionColor", CurColor);
    }
    return "success";
}
exports.SetAxesSelectionOutline = SetAxesSelectionOutline;
function SetActorVisibleWithTags(jsondata) {
    let tags = jsondata.data.tags;
    let isVisible = jsondata.data.isVisible;
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    for (let j = 0; j < tags.length; j++) {
        let AllActor_Rev = (0, puerts_1.$ref)((0, ue_1.NewArray)(UE.Actor));
        UE.GameplayStatics.GetAllActorsWithTag(CurrentWorld, tags[j], AllActor_Rev);
        let AllActor = (0, puerts_1.$unref)(AllActor_Rev);
        if (AllActor.Num() > 0) {
            for (let i = 0; i < AllActor.Num(); i++) {
                AllActor.Get(i).SetActorHiddenInGame(!isVisible);
            }
        }
    }
    return "success";
}
exports.SetActorVisibleWithTags = SetActorVisibleWithTags;
function SetNiagaraVisibleWithTags(jsondata) {
    let tags = jsondata.data.tags;
    let isVisible = jsondata.data.isVisible;
    let CurrentWorld = puerts.argv.getByName("GameInstance").GetWorld();
    for (let j = 0; j < tags.length; j++) {
        let AllActor_Rev = (0, puerts_1.$ref)((0, ue_1.NewArray)(UE.Actor));
        UE.GameplayStatics.GetAllActorsWithTag(CurrentWorld, tags[j], AllActor_Rev);
        let AllActor = (0, puerts_1.$unref)(AllActor_Rev);
        if (AllActor.Num() > 0) {
            for (let i = 0; i < AllActor.Num(); i++) {
                let CurActor = AllActor.Get(i);
                AllActor.Get(i).SetActorHiddenInGame(!isVisible);
                CurActor.NiagaraComponent.SetVisibility(isVisible, true);
            }
        }
    }
    return "success";
}
exports.SetNiagaraVisibleWithTags = SetNiagaraVisibleWithTags;
//# sourceMappingURL=MainControllerHandle.js.map