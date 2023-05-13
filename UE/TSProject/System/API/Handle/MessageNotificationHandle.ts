///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/08
///

import * as UE from "ue"

export enum ENotifiButtonState{
    None,
    Success,
    Fail,
    Pending
}
export enum ECheckState{
    Checked,
    Unchecked,
}

export class NotificationStyle{

    NotifiButtons:UE.TArray<UE.NotifiButtonInfo> = UE.NewArray(UE.NotifiButtonInfo)
    CheckBox:UE.CheckBoxInfo
    HyperLink:UE.HyperInfo
    CustomWidget:UE.UserWidget
    NotifiButtonState:ENotifiButtonState
    NotifiFrameStyle:{
        SubText:string,
        DurTime:number,
        FrameWidth:number,
        bAutoRelease:boolean
    }
    
    constructor(){
        this.NotifiButtons = UE.NewArray(UE.NotifiButtonInfo)
        this.NotifiFrameStyle = { SubText:"",
        DurTime:2.0,
        FrameWidth:350,
        bAutoRelease:true}
    }

    AddNotifiButton(inText:string,fCallback:Function,inToolTip?:string,buttonState?:ENotifiButtonState){
        let NotifiButton = UE.NewObject(UE.NotifiButtonInfo.StaticClass()) as UE.NotifiButtonInfo
        NotifiButton.InText = inText
        NotifiButton.InToolTip = inToolTip
        NotifiButton.OnClickedDelegate.Bind(() => {
            fCallback?.call(this)
        })
        let ButtonDisplayState:UE.EDisplayState
        if(buttonState == ENotifiButtonState.None){
            ButtonDisplayState = UE.EDisplayState.CS_None
        }else if(buttonState == ENotifiButtonState.Success){
            ButtonDisplayState = UE.EDisplayState.CS_Success
        }else if(buttonState == ENotifiButtonState.Fail){
            ButtonDisplayState = UE.EDisplayState.CS_Fail
        }else if(buttonState == ENotifiButtonState.Pending){
            ButtonDisplayState = UE.EDisplayState.CS_Pending
        }
        NotifiButton.DisplayState = ButtonDisplayState
        NotifiButton.ConstructNotifiButton()
        this.NotifiButtons.Add(NotifiButton)
    }

    RegisterNotifiCheckBox(inText:string,fCallback:Function,startCheckState?:ECheckState){
        this.CheckBox = UE.NewObject(UE.CheckBoxInfo.StaticClass()) as UE.CheckBoxInfo
        this.CheckBox.CheckBoxDelegate.Bind((state:UE.ECheckBoxState)=>{
            let CheckStete:ECheckState
            if(state == UE.ECheckBoxState.Checked) CheckStete = ECheckState.Checked
            else if(state == UE.ECheckBoxState.Unchecked)  CheckStete = ECheckState.Unchecked
            fCallback?.call(this,CheckStete)
        })
        this.CheckBox.BindHyperDelegate()
        this.CheckBox.CheckBoxText = inText
        if(startCheckState){
            this.CheckBox.StartCheckBoxState = startCheckState === ECheckState.Unchecked?UE.ECheckBoxState.Unchecked:UE.ECheckBoxState.Checked
        }
        else{
            this.CheckBox.StartCheckBoxState = UE.ECheckBoxState.Unchecked
        }
    }

    RegisterNotifiHyperLink(inText:string,fCallback:Function){
        this.HyperLink = UE.NewObject(UE.HyperInfo.StaticClass()) as UE.HyperInfo
        this.HyperLink.HyperlinkDelegate.Bind(()=>{
            fCallback?.call(this)
        })
        this.HyperLink.BindHyperDelegate()
        this.HyperLink.HyperlinkText = inText
    }

    RegisterFrameStyle(subText?:string,frameWidth?:number,durTime?:number,autoRelease?:boolean){
        this.NotifiFrameStyle.SubText = subText??""
        this.NotifiFrameStyle.FrameWidth = frameWidth??350
        this.NotifiFrameStyle.DurTime = durTime??2.0
        this.NotifiFrameStyle.bAutoRelease = autoRelease??true
    }

    RegisterWidget(widgetPath:string){
        let widgetClass = UE.Class.Load(widgetPath);
        let Widget = UE.WidgetBlueprintLibrary.Create(UE.OpenZIFrameworkLibrary.GetCurrentWorld(), widgetClass, null);
        this.CustomWidget = Widget
    }
}
