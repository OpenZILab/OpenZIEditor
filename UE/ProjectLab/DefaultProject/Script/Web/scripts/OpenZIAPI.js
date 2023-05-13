///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2023/4/23 09:00
///

class OpenZILab {
    config;
    eventListener;
    eventStr;
    pageId;
    APISocket;
    callbackMap;
    static instance;
    constructor(socketUrl) {
        if (!OpenZILab.instance) {
            OpenZILab.instance = this;
            OpenZILab.instance.init(socketUrl);
        }
        return OpenZILab.instance;
    }
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    destroy() {
        if (this.APISocket)
            this.APISocket.close()
    }

    Call(cName, fName, data, callback) {
        try {
            console.log("cName", cName);
            console.log("fName", fName);
            console.log("data", data);
            if (cName == this.eventStr) {
                if (typeof fName === "function")
                    this.eventListener = fName;
            } else {
                let callbackID = "";
                let callData;
                if (callback) {
                    callbackID = this.guid();
                    this.callbackMap.set(callbackID, callback);
                    callData = data;
                }
                else {
                    if (typeof data === "function") {
                        callbackID = this.guid();
                        this.callbackMap.set(callbackID, data);
                    }
                }
                let jsonData = {
                    "classDef": cName,
                    "funcDef": fName,
                    "data": callData,
                    "callback": callbackID,
                    "pageID": this.pageId
                }
                this.APISocket.send(JSON.stringify(jsonData))
            }
        } catch (error) {
            console.log(error)
        }
    }

    Start(socketUrl) {
        var receive = this;
        if (typeof (WebSocket) === "undefined") {
            alert('not support socket');
        } else {
            this.APISocket = new WebSocket(socketUrl);
        }
        this.APISocket.onerror = function (ev) {
            console.log("socket connect error");
        };

        this.APISocket.onopen = function (ev) {
            console.log("socket connect sucess");
        }

        this.APISocket.onmessage = function (event) {
            try {
                event.data.text().then((txt) => {
                    var receive_data = txt;
                    console.error(receive_data)
                    const reData = JSON.parse(receive_data);
                    const callbackID = reData.callback;
                    if (callbackID) {
                        delete reData.callback;
                        if (callbackID == receive.eventStr && receive.eventListener) {
                            receive.eventListener(reData);
                        } else {
                            if (receive.callbackMap.get(callbackID)) {
                                receive.callbackMap.get(callbackID)(reData);
                                receive.callbackMap.delete(callbackID);
                            }
                        }
                    }
                })
            } catch (error) {
                try {
                    var receive_data = event.data;
                    console.error(receive_data)
                    const reData = JSON.parse(receive_data);
                    const callbackID = reData.callback;
                    if (callbackID) {
                        delete reData.callback;
                        if (callbackID == receive.eventStr && receive.eventListener) {
                            receive.eventListener(reData);
                        } else {
                            if (receive.callbackMap.get(callbackID)) {
                                receive.callbackMap.get(callbackID)(reData);
                                receive.callbackMap.delete(callbackID);
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        this.APISocket.onclose = function (ev) {
            console.log("socket closed");
            receive.APISocket = null;
        }
    }

    init(socketUrl) {
        this.config = socketUrl;
        this.eventListener;
        this.eventStr = "ALLReceiveMessage";
        this.pageId = this.guid();
        this.APISocket;
        this.callbackMap = new Map();
        if (socketUrl) {
            try {
                this.Start(socketUrl)
            } catch (error) {
                console.log("socket connect error");
            }
        } else {
            console.log("socket address nor define");
        }
    }
}
