///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/15 14:30
///

import { Sigleton } from "./Sigleton"

class TakeProcess
{
    private processFunc: Function = null

    constructor(func){
        this.processFunc = func
    }

    public OnProcess(obj,data){
        if (this.processFunc != null){
            this.processFunc.apply(obj,data)
        }
    }
}


export class EventDispatcher extends Sigleton {
    static GetInstance(): EventDispatcher {
        return super.TakeInstance(EventDispatcher)
    }

    OnInit(){
        console.log("EventDispatcher OnInit")
    }

    protected callMap: Map<string, any[]> = new Map()

    public Add(obj: any, func: Function, name: string){
        let listMaps = this.callMap.get(name)
            if (listMaps){
                for (let i = 0; i < listMaps.length; i++){
                    if (listMaps[i][0] == obj && listMaps[i][1].processFunc == func){
                        return
                    }
                }
            } else {
                this.callMap.set(name, [])
                listMaps = this.callMap.get(name)
                // console.log(this.callMap.size)
            }
        let process = new TakeProcess(func)
        listMaps.push([obj,process])
    }

    public Remove(obj: any , name: string){
        console.log("Remove          "+name)
        let listMaps = this.callMap.get(name)
        if (listMaps){
            for (let i = listMaps.length - 1; i >= 0; i--){
                if (listMaps[i][0] == obj){
                    listMaps.splice(i, 1)
                }
            }
        }
        if (listMaps && listMaps.length == 0){
            this.callMap.delete(name)
        }
    }

    public Fire(name: string,...data: any[]){
        // console.log("wwwwwwwwwwwwwww  "+data)
        //     console.log(name + this.callMap.size)
        let listMaps = this.callMap.get(name)
        if (listMaps){
            for (let i = listMaps.length - 1; i >= 0; i--){
                listMaps[i][1].OnProcess(listMaps[i][0],data)
            }
        }
    }

    public Excute(name: string,data: any){
        // console.log("wwwwwwwwwwwwwww  "+data)
        //     console.log(name + this.callMap.size)
        let listMaps = this.callMap.get(name)
        if (listMaps){
            for (let i = listMaps.length - 1; i >= 0; i--){
                listMaps[i][1].OnProcess(listMaps[i][0],data)
            }
        }
    }
}