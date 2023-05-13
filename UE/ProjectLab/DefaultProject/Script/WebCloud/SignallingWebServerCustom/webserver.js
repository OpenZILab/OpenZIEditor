///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2023/4/23 09:00
///

const WebSocket = require("ws");
const http = require("http");
let nextPlayerId = 200;

const args = process.argv.slice(2).reduce((pairs, pair) => {
    let [key, ...value] = pair.split("=");
    value = value.join("") || "true";
    try {
        value = JSON.parse(value);
    } catch { }
    pairs[key] = value;
    return pairs;
}, {});

// api client
global.API = new WebSocket.Server({
    server: http.createServer().listen(args.api || 18892),
    clientTracking: true,
});

API.on("connection", async (ws, req) => {
    console.info("api client count", API.clients.size)
    const playerId = String(++nextPlayerId);
    console.log("✅ player", playerId, "connected:", req.socket.remoteAddress, req.socket.remotePort);
    ws.req = req;
    ws.playerId = playerId;

    ws.on("message", (msg) => {
        console.info("api", playerId, String(msg));
        console.info("api client count", API.clients.size)
        try {
            API.clients.forEach(client => {
                if (ws !== client) {
                    client.send(msg);
                }
            })
        } catch (err) {
            console.info("api", playerId, String(msg));
            ws.send("server receive error " + msg.slice(0, 100));
            return;
        }
    });

    ws.on("close", (code, reason) => {
        console.log("❌ api", playerId, "closed:", String(reason));
        console.info("api client count", API.clients.size)
    });

    ws.on("error", (error) => {
        console.error("❌ api", playerId, "connection error:", error);
    });
});

const fs = require("fs");
const path = require("path");

global.API._server.prependListener("request", (req, res) => {

    let file = path.join(__dirname, req.url);
    let lastIndexOf = file.lastIndexOf("?");
    if (lastIndexOf != -1)
        file = file.substring(0, lastIndexOf);
    const r = fs.createReadStream(file);

    r.on("error", (err) => {
        res.end(err.message);
    });

    r.on("ready", (e) => {
        r.pipe(res);
    });
});
