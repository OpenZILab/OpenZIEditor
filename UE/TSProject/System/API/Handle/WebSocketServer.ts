///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 2:40
///

import {Sigleton} from "../../Core/Sigleton";
import * as UE from "ue";
import * as puerts from "puerts";
import {MessageQueueList} from "../../Core/NetWork/MessageQueue"
import {MessageType} from "../../Core/NetWork/MessageProcesser"
import {Timer} from "../../Core/Timer";

export enum ESocketMode{
    observer,
    operator
}

export class WebSocketServer extends Sigleton {

    static GetInstance(): WebSocketServer {
        return super.TakeInstance(WebSocketServer);
    }

    private SocketInstance: any
    private SocketServerMode = true
    public SocketServer:UE.WebSocketServer
    static ListenMessageId: number

    public StartServer(bServer,port,url){
        this.SocketServerMode = bServer
        if (bServer){
            this.StartSocketServer(port)
        }else{
            let finalUrl = `${url}:${port}/`
            this.StartSocketClient(finalUrl)
        }
    }

    public StartSocketServer(port){
        let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld()
        this.SocketServer = World.SpawnActor(UE.WebSocketServer.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.WebSocketServer
        this.SocketServer.Start(port)
        this.SocketServer.OnSocketMessageReceived.Add(this.OnSocketMessageReceived)
        this.SocketServer.OnSocketConnectionClosed.Add(this.OnSocketConnectionClosed)
    }

    public StartSocketClient(url){
        this.SocketInstance = UE.WebSocketFunctionLibrary.CreateWebSocket(url,"ws")
        this.SocketInstance.Connect()
        this.SocketInstance.OnWebSocketConnected.Add(this.OnWebSocketOpened)
        this.SocketInstance.OnWebSocketMessageReceived.Add(this.OnWebSocketMessageReceived)
        this.SocketInstance.OnWebSocketClosed.Add(this.OnWebSocketClosed)
        this.SocketInstance.OnWebSocketMessageSent.Add(this.OnWebSocketMessageSent)
    }

    public OnSocketMessageSend(message){
        WebSocketServer.GetInstance().SocketServer.SendMessage(message)
    }

    public OnSocketMessageReceived(message){
        console.warn("OnSocketMessageReceived" + message)
        MessageQueueList.GetInstance().AddMessage(MessageType.API,message,0)
    }

    public OnSocketConnectionClosed(){
        console.warn("OnSocketConnectionClosed")
    }

    public CloseServer(code,reason){
        if(this.SocketServerMode){
            WebSocketServer.GetInstance().SocketServer.Stop()
            console.warn("OnWebSocketStoped")
        }else
        this.OnWebSocketClosed(code,reason)
    }

    public OnWebSocketOpened(){
        WebSocketServer.ListenMessageId = Timer.GetInstance().AddTimer(0.1,WebSocketServer.ListenWaitCallBack,true,"")
    }

    public OnWebSocketMessageReceived(message){
        console.warn("OnWebSocketMessageReceived : " + message)
        MessageQueueList.GetInstance().AddMessage(MessageType.API,message,0)
    }

    public OnSendWebMessage(message){
        if(this.SocketServerMode){
            WebSocketServer.GetInstance().OnSocketMessageSend(message)
        }else
        this.SocketInstance.SendMessage(message)
    }

    public OnWebSocketClosed(code,reason){
        this.SocketInstance.Close(code,reason)
        console.warn("OnWebSocketClosed")
    }

    public OnWebSocketMessageSent(message){
        console.warn("OnWebSocketMessageSent" + " " + message)
    }

    public OnSendListenerMessage(message){
        let result = new Map()
        result["data"] = message
        result["callback"] = "ALLReceiveMessage"
        let listenMessage = JSON.stringify(result)
        if(this.SocketServerMode){
            WebSocketServer.GetInstance().OnSocketMessageSend(listenMessage)
        }else
        this.SocketInstance.SendMessage(listenMessage)
    }

    static ListenWaitCallBack(message){
        WebSocketServer.GetInstance().OnSendListenerMessage("OnWebSocketOpened")
        Timer.GetInstance().DelTimer(WebSocketServer.ListenMessageId)
    }
}