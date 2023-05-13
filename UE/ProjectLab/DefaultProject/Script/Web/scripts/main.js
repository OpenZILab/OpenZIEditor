///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.
/// DateTime: 2023/4/23 09:00
///

var currJson;

var OpenZIAPI;

var info = document.getElementById("info");

function initData(data) {
    let newData = {};
    for (let i = 0; i < data.length; i++) {
        let cate = data[i].category.split("|");
        let currList;
        for (let j = 0; j < cate.length; j++) {
            let str = cate[j];
            let ch = {};
            ch[str] = [];
            switch (j) {
                case 0:
                    if (!newData[cate[j]]) {
                        newData[str] = {};
                        currList = newData[cate[j]];
                    }
                    continue;
                case 1:
                    if (!newData[cate[0]][cate[j]]) {
                        newData[cate[0]][str] = {};
                        currList = newData[cate[0]][cate[j]];
                    }
                    continue;
                case 2:
                    if (!newData[cate[0]][cate[1]][cate[j]]) {
                        newData[cate[0]][cate[1]][str] = {};
                        currList = newData[cate[0]][cate[1]][cate[j]];
                    }
                    continue;
                case 3:
                    if (!newData[cate[0]][cate[1]][cate[2]][cate[j]]) {
                        newData[cate[0]][cate[1]][cate[2]][str] = {};
                        currList = newData[cate[0]][cate[1]][cate[2]][cate[j]];
                    }
                    continue;
                case 4:
                    if (!newData[cate[0]][cate[1]][cate[2]][cate[3]][cate[j]]) {
                        newData[cate[0]][cate[1]][cate[2]][cate[3]][str] = {};
                        currList = newData[cate[0]][cate[1]][cate[2]][cate[3]][cate[j]];
                    }
                    continue;
            }
        }
        currList.itemList = [];
        for (let k = 0; k < data[i].actions.length; k++) {
            data[i].actions[k].class = data[i].class;
            currList.itemList.push(data[i].actions[k]);
        }
    }

    console.log(newData);
    return newData;
}

function createList(data) {
    let rootUl = document.querySelectorAll('.list')[0];
    let ul = document.createElement("ul");
    initItem(ul, data);
    rootUl.appendChild(ul);
    let listList = document.querySelectorAll('.list_list');
    for (let i = 0; i < listList.length; i++) {
        listList[i].addEventListener("click", clickListShow, true);
        let dom = listList[i].parentNode;
        let ui = dom.querySelectorAll("ul")[0];
        let icon = dom.getElementsByClassName("title_img")[0];
        if (i != 0) {
            ui.style.display = "none";
            icon.style.transform = "rotate(0deg)";
        }
    }

}

function initItem(ul, data, off = 10) {

    if (data.itemList) {
        off += 15
        for (let i in data.itemList) {
            let li = document.createElement("li");
            li.onclick = () => {
                clickItem(data.itemList[i])
            }
            li.innerHTML = `<div class="title_box list_ltem"   style="padding-left: ${off}px;">${data.itemList[i].description}</div>`;
            ul.appendChild(li);
        }
    } else {
        off += 15
        for (let i in data) {
            let li = document.createElement("li");
            li.innerHTML = `<div  class="title_box list_list" style="padding-left: ${off}px;">${i}<img class="title_img" src="./img/123.png" alt=""></div>`;
            let ul2 = document.createElement("ul");
            li.appendChild(ul2);
            initItem(ul2, data[i], off);
            ul.appendChild(li);
        }
    }
}

function clickListShow(event) {
    let dom = event.target.parentNode;
    let ui = dom.querySelectorAll("ul")[0];
    let icon = dom.getElementsByClassName("title_img")[0];
    if (ui.style.display == " " || ui.style.display == "none") {
        ui.style.display = "inherit";
        icon.style.transform = "rotate(90deg)";
    } else {
        ui.style.display = "none";
        icon.style.transform = "rotate(0deg)";
    }
}
function clickSelectShow() {
    let ui = document.querySelectorAll(".select")[0];
    let icon = document.getElementsByClassName("set_color_icon")[0];
    if (ui.style.display == "" || ui.style.display == "none") {
        ui.style.display = "inline";
    } else {
        ui.style.display = "none";
    }
}

function clickItem(data) {
    let text = document.getElementById("textarea");
    let name = document.getElementById("apiName");
    let str = `let jsondata = {\n`;
    let tab = `    `;
    text.innerHTML = "";
    text.innerHTML = JSON.stringify(data.jsondata, null, "\t");
    text.value = JSON.stringify(data.jsondata, null, "\t");
    name.innerHTML = data.description;
    currJson = data;
}




function gradeChange(index) {
    let color = "#00A27A";
    let name = "绿色";
    if (index == 0) {
        color = "#00A27A";
        name = "绿色";
    } else if (index == 1) {
        color = "#BEBEBE";
        name = "灰色";
    } else if (index == 2) {
        color = "#000000";
        name = "黑色";
    } else if (index == 3) {
        color = "#FFFFFF";
        name = "白色";
    }
    document.querySelectorAll(".set_color_name")[0].innerHTML = name;
    document.querySelectorAll(".box")[0].style.color = color;
    document.querySelectorAll("#textarea")[0].style.color = color;
    document.querySelectorAll(".left_set_btn")[0].style.color = color;
    document.querySelectorAll(".select")[0].style.color = color;
    document.querySelectorAll(".left_set_input")[0].style.color = color;
}

function zoom() {
    let value = document.querySelectorAll(".left_set_input")[0].value;
    document.querySelectorAll(".box")[0].style.width = value + "%";
    document.querySelectorAll(".textarea")[0].style.width = "auto";
    document.querySelectorAll(".app")[0].style.width = "100%";
}

function hideBtn() {
    let box = document.querySelectorAll(".box")[0];
    let hideBtn = document.querySelectorAll(".hide_btn")[0];
    if (box.style.display == " " || box.style.display == "none") {
        box.style.display = "inherit";
        hideBtn.innerHTML = "隐藏"
    } else {
        box.style.display = "none";
        hideBtn.innerHTML = "显示";
    }
}

function WebSocketInit() {
    let socketUrl = "ws://127.0.0.1:18892/";
    OpenZIAPI = new OpenZILab(socketUrl)
    if (OpenZIAPI.APISocket) {
        OpenZIAPI.APISocket.onopen = function (data) {
            // alert("socket连接成功")
            console.log("socket连接成功")
        }
        OpenZIAPI.APISocket.onerror = function (data) {
            alert("socket连接失败")
        }
    } else {
        alert("socket连接失败")
    }
    eventListener();
}
function eventListener() {
    OpenZIAPI.Call("ALLReceiveMessage", function (event) {
        console.log("监听回调：")
        console.log(event);
        info.prepend(JSON.stringify(event), "\n");
    });
}

function run() {
    let text = document.getElementById("textarea");
    try {
        let data = JSON.parse(text.value);
        if (data) {
            OpenZIAPI.Call(currJson.class, currJson.function, data, (e) => {
                console.log("点位信息回调：", e)
                info.prepend(JSON.stringify(e, null, 2).replace(/\\/g, ""), "\n");
            })
        }
    } catch (r) {
        alert("数据格式异常");
    }


}


function mutationObserver() {
    const targetNode = document.getElementById('textarea');
    const config = { attributes: true, childList: true, subtree: true };
    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type === 'attributes') {
                let textarea = document.getElementById('textarea');
                let box = document.querySelectorAll(".msg_box")[0];
                box.style.height = `calc(100% - ${textarea.style.height} - 90px)`;
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

createList(initData(APIList))
WebSocketInit();
zoom();
mutationObserver();



