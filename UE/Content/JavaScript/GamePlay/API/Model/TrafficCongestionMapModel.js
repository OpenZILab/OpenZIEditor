"use strict";
///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by Mixzy.
/// DateTime: 2022/9/29 18:30
///
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficCongestionMapModel = void 0;
const BaseModel_1 = require("../../../System/API/Model/BaseModel");
class TrafficCongestionMapModel extends BaseModel_1.BaseModel {
    constructor() {
        super();
        this.DefaultData = {
            id: "交通导航线",
            GISType: 0,
            coordinatesList: [
                { X: 104.06000134996, Y: 30.644621567209, Z: 0 },
                { X: 104.06004264274, Y: 30.644092436878, Z: 0 },
                { X: 104.06004656514, Y: 30.643522163516, Z: 0 },
                { X: 104.05940719382, Y: 30.643748250587, Z: 0 },
                { X: 104.05898424812, Y: 30.643614907403, Z: 0 },
                { X: 104.05907979008, Y: 30.643200741772, Z: 0 },
                { X: 104.05952951135, Y: 30.642249115972, Z: 0 },
                { X: 104.05996047859, Y: 30.641580504977, Z: 0 },
                { X: 104.06044173361, Y: 30.641442653431, Z: 0 },
                { X: 104.06095340697, Y: 30.641437115556, Z: 0 },
                { X: 104.06166607377, Y: 30.64158622637, Z: 0 },
                { X: 104.06218939761, Y: 30.64262404188, Z: 0 },
                { X: 104.06285049048, Y: 30.643581237869, Z: 0 },
                { X: 104.06375255228, Y: 30.643797846864, Z: 0 },
                { X: 104.06404828579, Y: 30.642873503981, Z: 0 },
                { X: 104.06425634285, Y: 30.642337360566, Z: 0 },
                { X: 104.06514538937, Y: 30.642622800041, Z: 0 },
                { X: 104.06511769844, Y: 30.643743726833, Z: 0 },
                { X: 104.06453389612, Y: 30.645204325452, Z: 0 },
                { X: 104.06366624745, Y: 30.646031587731, Z: 0 },
                { X: 104.0628326794, Y: 30.64637742145, Z: 0 },
                { X: 104.06205709365, Y: 30.6465546097, Z: 0 },
                { X: 104.06137594458, Y: 30.646436271298, Z: 0 },
            ],
            statusList: ["畅通", "畅通", "畅通", "畅通", "缓行", "缓行", "缓行", "拥堵", "拥堵", "严重拥堵", "严重拥堵", "拥堵", "畅通", "缓行", "缓行", "畅通", "畅通", "畅通", "畅通", "畅通", "未知", "未知", "未知"],
            statusColorList: {
                "未知": { X: 0.5, Y: 0.5, Z: 0.5, W: 0 },
                "畅通": { X: 0, Y: 1, Z: 0, W: 0 },
                "缓行": { X: 1, Y: 1, Z: 0, W: 0 },
                "拥堵": { X: 1, Y: 0.5, Z: 0, W: 0 },
                "严重拥堵": { X: 1, Y: 0, Z: 0, W: 0 },
            },
            lineWidth: 2,
        };
        this.DefaultDataRange = {
            GISType: { Range: { "min": 0, "max": 3 } },
            coordinatesList: { Range: { "min": { X: -180, Y: -90 }, "max": { X: 180, Y: 90 } } },
            labelFontColor: { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            statusColorList: {
                "未知": { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
                "畅通": { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
                "缓行": { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
                "拥堵": { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
                "严重拥堵": { Range: { "min": { X: 0, Y: 0, Z: 0, W: 0 }, "max": { X: 1, Y: 1, Z: 1, W: 1 } } },
            },
            lineWidth: { Range: { "min": 0, "max": 10000 } },
        };
        this.typeName = "TrafficCongestionMap";
        this.funcName = "Add";
        this.InitDataAndRange();
    }
}
exports.TrafficCongestionMapModel = TrafficCongestionMapModel;
//# sourceMappingURL=TrafficCongestionMapModel.js.map