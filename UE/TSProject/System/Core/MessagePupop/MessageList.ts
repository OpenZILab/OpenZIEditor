///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by xLin.,
/// DateTime:  2022/12/07
///


const MessageTips_cn = {
    SCENE_MESSAGE: {
        CREATE_SCENE: "请输入一个场景名字",
        CREATE_SCENE_FILE: "创建场景失败,当前场景已经存在",
        RENAME_SCENE: "请输入一个新场景名字",
        RENAME_SCENE_FILE: "重命名失败,当前命名已经存在",
        DELETE_SCENE: "删除场景后将无法还原,你确定要删除当前场景吗?",
        SAVE_DEFALUT_SCENE: "当前场景为默认场景，是否需要保存？如果需要请为场景命名",
        SCENE_SAVE_WARN: "场景名重复，请重新输入！",
        SAVE_CURRENT_SCENE: "加载一个新的场景将导致您丢失当前场景中任何未保存的更改。你想继续吗?",
        SET_MAIN_SCENE: "项目的主场景是默认情况下将为项目加载的内容,您确定要将此场景设置为主场景吗?",
        COPY_SCENE: "复制场景不会复制当前场景未保存的内容,是否保存后复制?"
    },
    OUTLINE_MESSAGE: {

    },
    DETAIL_MESSAGE: {},
    TEST_MESSAGE: {
        NOTIFICATION: "消息弹出框测试"
    },
    OPERATION_MESSAGE: {
        NOTIFICATION: "操作消息提示"
    },
    DIGITALTWIN: {
        CREATE_TIMELINE: "请输入孪生体时间线的创建时间和阶段名称",
        CREATE_TWIN: "请输入一个数字孪生体名字",
        SAVE_CURRENT_DIGITAL_SCENE: "加载一个新的场景将导致您丢失当前数字孪生体中任何未保存的更改。你想继续吗?",
        SAVE_CURRENT_DIGITAL: "加载一个新的数字孪生体将导致您丢失当前数字孪生体中任何未保存的更改。你想继续吗?",
        DELETE_TWINBODY:"删除数字孪生体时间线将无法回退，你想要继续吗？",
        RENAME_TWINBODY:"重命名时间线的创建时间，以及阶段名称"

    },
    PREFAB: {
        CREATE_PREFAB: "请输入一个预制体名称"
    },
    API: {
        Flatten: "正在进行压平，点击鼠标右键结束绘制",
        Trenching: "正在进行挖坑，点击鼠标右键结束绘制",
        DrawPoint: "正在进行标绘点，点击鼠标中键结束标绘点，或者调用结束API结束标绘",
        DrawLine: "正在进行标绘线，点击鼠标中键结束标绘点，或者调用结束API结束标绘",
        DrawArea: "正在进行标绘面，点击鼠标中键结束标绘点，或者调用结束API结束标绘",
        MeasureCoordinates: "正在进行测量坐标点，点击鼠标中键结束测量坐标点，或者调用结束API结束测量",
        MeasureDistance: "正在进行测量距离，点击鼠标中键结束测量距离，或者调用结束API结束测量",
        MeasureArea: "正在进行测量面积，点击鼠标中键结束测量面积，或者调用结束API结束测量",
        ViewshedAnalysis: "正在进行可视域分析，鼠标左键点击场景将在点击位置生成可视域",
        ScreenViewing_1: "正在进行添加漫游镜头点，‘WSAD’和鼠标进行操控，按下空格进行添加，调用结束添加API进行结束",
        ScreenViewing_2: "添加漫游镜头期间，请不要点击镜头点进行位移等操作",
        TrafficCongestion: "当前坐标点位数量和状态数量不一致，必须一一对应"
    }
}

const MessageTips_en = {
    SCENE_MESSAGE: {
        CREATE_SCENE: "Please enter a new scene name",
        CREATE_SCENE_FILE: "Description Failed to create a scenario because the current scenario already exists",
        RENAME_SCENE: "Please enter a scene name",
        RENAME_SCENE_FILE: "Failed to rename. The current name already exists. Procedure",
        DELETE_SCENE: "Deleted scenes will not be restored. Are you sure you want to delete the current scene",
        SAVE_DEFALUT_SCENE: "The current scenario is the default one. Do you want to save it? Name the scene if necessary",
        SCENE_SAVE_WARN: "The scene name is repeated. Please enter a new one！",
        SAVE_CURRENT_SCENE: "Loading a new Scene will casuse you to lose any unsaved changes in the current scene.Do you wish to continue?",
        SET_MAIN_SCENE: "The main scene of the project is what will be loaded  by default for the project. Are you sure you want to make this the main scene?",
        COPY_SCENE: "In the replication scenario, the contents that are not saved in the current scenario will not be copied. Do you want to save the data and then copy it?"
    },
    OUTLINE_MESSAGE: {

    },
    DETAIL_MESSAGE: {},
    TEST_MESSAGE: {
        NOTIFICATION: "Message pop-up test"
    },
    OPERATION_MESSAGE: {
        NOTIFICATION: "Operation message prompt"
    },
    DIGITALTWIN: {
        CREATE_TIMELINE: "Please enter the creation time and stage name for the twin timeline",
        CREATE_TWIN: "Please enter a new digital twin name",
        SAVE_CURRENT_DIGITAL_SCENE: "Loading a new scene will cause you to lose any unsaved changes in the current digital twin. Do you want to continue?",
        SAVE_CURRENT_DIGITAL: "Loading a new digital twin will cause you to lose any unsaved changes in the current digital twin. Do you want to continue?",
        DELETE_TWINBODY:"Deleting the digital twin timeline will not go back. Do you want to continue?",
        RENAME_TWINBODY:"Rename the creation time of the timeline, as well as the phase name"

    },
    PREFAB: {
        CREATE_PREFAB: "Please enter a prefab name"
    },
    API: {
        Flatten: "While flattening, click the right mouse button to finish drawing",
        Trenching: "While Trenching, click the right mouse button to end the drawing",
        DrawPoint: "While plotting points, click the middle mouse button to end plotting points, or call the end API to end plotting",
        DrawLine: "While plotting a line, click the middle mouse button to end the plotting point, or call the end API to end the plotting",
        DrawArea: "While plotting the area, click the middle mouse button to end the plotting point, or call the end API to end the plotting",
        MeasureCoordinates: "When measuring coordinate points, click the middle mouse button to end the measurement coordinate points, or call the end API to end the measurement",
        MeasureDistance: "When measuring distance, click the middle mouse button to end the distance measurement, or call the end API to end the measurement",
        MeasureArea: "When measuring the area, click the middle mouse button to end the measurement, or call the end API to end the measurement",
        ViewshedAnalysis: "Visual field analysis is being carried out. The left mouse button clicking the scene will generate visual field at the click position",
        ScreenViewing_1: "Adding roaming camera point, 'WSAD' and mouse control, press space to add, call end add API to end",
        ScreenViewing_2: "Please do not click on the lens point for displacement and other operations during the adding of roaming lens",
        TrafficCongestion: "The number of current coordinate points is inconsistent with the number of states, so it must correspond one by one"

    }
}

export enum language {
    cn,
    en
}


export let MessageTips = MessageTips_cn

export function SetMessageLanguage(lan: language) {
    if (lan == language.cn) {
        MessageTips = MessageTips_cn
    } else if (lan == language.en) {
        MessageTips = MessageTips_en
    }
}