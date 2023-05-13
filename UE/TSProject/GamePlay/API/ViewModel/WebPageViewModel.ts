///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/19 0:52
///

import * as SystemSetting from  "../../../System/Setting/SystemSetting"
import * as WebPageView from "../View/WebPageView"

export function Ctor(): void{

}

export function OnWebPageChange(url): void{
    if (SystemSetting.bCloudRenderingMode != true){
        WebPageView.OnWebPageChange(url)
    }
}