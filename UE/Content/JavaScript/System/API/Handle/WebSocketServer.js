"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/20 2:40
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = exports.ESocketMode = void 0;
const Sigleton_1 = require("../../Core/Sigleton");
const UE = require("ue");
const MessageQueue_1 = require("../../Core/NetWork/MessageQueue");
const MessageProcesser_1 = require("../../Core/NetWork/MessageProcesser");
const Timer_1 = require("../../Core/Timer");
var ESocketMode;
(function (ESocketMode) {
    ESocketMode[ESocketMode["observer"] = 0] = "observer";
    ESocketMode[ESocketMode["operator"] = 1] = "operator";
})(ESocketMode = exports.ESocketMode || (exports.ESocketMode = {}));
class WebSocketServer extends Sigleton_1.Sigleton {
    static GetInstance() {
        return super.TakeInstance(WebSocketServer);
    }
    SocketInstance;
    SocketServerMode = true;
    SocketServer;
    static ListenMessageId;
    StartServer(bServer, port, url) {
        this.SocketServerMode = bServer;
        if (bServer) {
            this.StartSocketServer(port);
        }
        else {
            let finalUrl = `${url}:${port}/`;
            this.StartSocketClient(finalUrl);
        }
    }
    StartSocketServer(port) {
        let World = UE.OpenZIFrameworkLibrary.GetCurrentWorld();
        this.SocketServer = World.SpawnActor(UE.WebSocketServer.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
        this.SocketServer.Start(port);
        this.SocketServer.OnSocketMessageReceived.Add(this.OnSocketMessageReceived);
        this.SocketServer.OnSocketConnectionClosed.Add(this.OnSocketConnectionClosed);
    }
    StartSocketClient(url) {
        this.SocketInstance = UE.WebSocketFunctionLibrary.CreateWebSocket(url, "ws");
        this.SocketInstance.Connect();
        this.SocketInstance.OnWebSocketConnected.Add(this.OnWebSocketOpened);
        this.SocketInstance.OnWebSocketMessageReceived.Add(this.OnWebSocketMessageReceived);
        this.SocketInstance.OnWebSocketClosed.Add(this.OnWebSocketClosed);
        this.SocketInstance.OnWebSocketMessageSent.Add(this.OnWebSocketMessageSent);
    }
    OnSocketMessageSend(message) {
        WebSocketServer.GetInstance().SocketServer.SendMessage(message);
    }
    OnSocketMessageReceived(message) {
        console.warn("OnSocketMessageReceived" + message);
        MessageQueue_1.MessageQueueList.GetInstance().AddMessage(MessageProcesser_1.MessageType.API, message, 0);
    }
    OnSocketConnectionClosed() {
        console.warn("OnSocketConnectionClosed");
    }
    CloseServer(code, reason) {
        if (this.SocketServerMode) {
            WebSocketServer.GetInstance().SocketServer.Stop();
            console.warn("OnWebSocketStoped");
        }
        else
            this.OnWebSocketClosed(code, reason);
    }
    OnWebSocketOpened() {
        WebSocketServer.ListenMessageId = Timer_1.Timer.GetInstance().AddTimer(0.1, WebSocketServer.ListenWaitCallBack, true, "");
    }
    OnWebSocketMessageReceived(message) {
        console.warn("OnWebSocketMessageReceived : " + message);
        MessageQueue_1.MessageQueueList.GetInstance().AddMessage(MessageProcesser_1.MessageType.API, message, 0);
    }
    OnSendWebMessage(message) {
        if (this.SocketServerMode) {
            WebSocketServer.GetInstance().OnSocketMessageSend(message);
        }
        else
            this.SocketInstance.SendMessage(message);
    }
    OnWebSocketClosed(code, reason) {
        this.SocketInstance.Close(code, reason);
        console.warn("OnWebSocketClosed");
    }
    OnWebSocketMessageSent(message) {
        console.warn("OnWebSocketMessageSent" + " " + message);
    }
    OnSendListenerMessage(message) {
        let result = new Map();
        result["data"] = message;
        result["callback"] = "ALLReceiveMessage";
        let listenMessage = JSON.stringify(result);
        if (this.SocketServerMode) {
            WebSocketServer.GetInstance().OnSocketMessageSend(listenMessage);
        }
        else
            this.SocketInstance.SendMessage(listenMessage);
    }
    static ListenWaitCallBack(message) {
        WebSocketServer.GetInstance().OnSendListenerMessage("OnWebSocketOpened");
        Timer_1.Timer.GetInstance().DelTimer(WebSocketServer.ListenMessageId);
    }
}
exports.WebSocketServer = WebSocketServer;
//# sourceMappingURL=WebSocketServer.js.map