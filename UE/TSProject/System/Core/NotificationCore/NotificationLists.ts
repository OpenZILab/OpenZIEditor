///
/// Copyright by Cengzi Technology Co., Ltd. All Rights Reserved.  Office Website : www.openzi.com || www.cengzi.com 成都曾自科技版权所有 保留所有权利
/// Created by behiever.
/// DateTime: 2022/9/1 16:21
///

export const NotificationLists =
{
    GLOBAL: {
        //Games start
        ON_GAME_START: {},
        //Global Ctrl+S
        ON_SAVE: {},
        //Global Ctrl+Z
        ON_UNDO: {},
        //Global Ctrl+Y
        ON_REDO: {},
        //Global Ctrl+V
        ON_PASTE: {},
        //Global Ctrl+C
        ON_COPY: {},
        //Global paste and copy
        ON_DUPLICATE: {},
        //delete globally
        ON_DELETE: {},
        ON_FOCUS: {}
    },
    SCENE: {
        //Scene selected object changes to notify the world outline
        ON_SELECT_CHANGED_OUTLINE: {},
        //Scene selected object change notification details panel
        ON_SELECT_CHANGED_DETAIL: {},
        //Default level object changes, notification record
        ON_LEVELITEM_CHANGED: {},
        //Scene Node tree change notification
        ON_SCENETREE_CHANGED: {},
        //OnSceneLoaded when the scene is loaded
        ON_SCENE_LOADED: {},
        //Scene selection returns Node
        ON_SCENE_SELECT_NODE: {},
        //When the scene is unloaded
        ON_SCENE_DESTORY: {},
        //Refresh the scene
        ON_SCENE_REFRESH: {},
        //Whether the loading scene is successful
        ON_SCENE_LOAD_SUCCESS: {},
        //When the Node node is generated
        ON_NODE_SPAWN: {},
        //UE map Actor change
        ON_LEVEL_ACTOR_TRANSFORM_CHANGED: {},
        //UE map Actor delete
        ON_LEVEL_ACTOR_HIDDEN_CHANGED: {},
        //Actor's seat update, in order to update the API
        ON_ACTOR_TRANSFORM_CHANGED: {},
        ON_TRANSFORM_CHANGED: {},
        //when the resource is renamed
        ON_SCENE_RENAME: {},
        //When the scene is saved
        ON_SCENE_SAVED: {},
        //When the DataSmith resource is imported successfully
        ON_DATASMITH_IMPORT_END: {},
        //When adding a node to the scene
        ON_SCENE_NODE_ADD: {},
        //When deleting a node from the scene
        ON_SCENE_NODE_DELETE: {},
        //When modifying the node in the scene
        ON_SCENE_NODE_CHANGED: {},
        //When the scene node data is updated
        ON_SCENE_NODE_UPDATE: {},
        //When the scene starts to unload
        ON_SCENE_BEGIN_DESTORY: {}

    },
    DETAIL: {
        //when the details panel changes
        ON_DETAIL_PANEL_CHANGE: {},
        ON_SHOW_API_DETAIL: {},
        ON_SPLITTER_VALUE_CHANGED: {},
        ON_SEARCH_TEXT_CHANGED: {},
        //add component
        ON_ADD_TS_COMPONENT_BY_CLICKED: {},
        //Component click event
        ON_COMPONENT_CLICKED: {},
        //Set the details panel
        SET_DETATL: {}
    },
    OUTLINE: {
        //world outline selected object changes
        ON_SELECT_CHANGED: {},
        //todo OnVisibilityChanged
        ON_VISIBILITY_CHANGED: {},
        //todo OnExpansionChanged
        ON_EXPANSION_CHANGED: {},
        //todo  OnRenameRequest
        ON_RENAME_REQUEST: {},
        //todo  OnItemWidgetGenerated
        ON_ITEMWIDGET_GENERATED: {},
        //todo OnItemMouseButtonDoubleClick
        ON_ITEMMOUSEBUTTON_DOUBLECLICK: {},
        //todo OnItemDragCancelled
        ON_ITEMDRAG_CANCELLED: {},
        //todo OnItemDragDetected
        ON_ITEMDRAG_DETECTED: {},
        //todo OnItemDragEnter
        ON_ITEMDRAG_ENTER: {},
        //todo OnItemDragLeave
        ON_ITEMDRAG_LEAVE: {},
        //todo OnItemDragOver
        ON_ITEMDRAG_OVER: {},
        //todo OnItemDrop
        ON_ITEM_DROP: {},
        //todo OnItemMouseButtonDown
        ON_ITEMMOUSEBUTTON_DOWN: {},
        //todo  OnItemMouseButtonUp
        ON_ITEMMOUSEBUTTON_UP: {},
        //todo OnFocusNode
        ON_FOCUS_NODE: {},
        //todo OnStatusbarInit
        ON_STATUSBAR_INIT: {},
        //todo  OnSorted
        ON_SORTED: {},
        //todo  OnSearchTextChanged
        ON_SEARCHTEXT_CHANGED: {},
        //todo RequestInterruptRenaming
        REQUEST_INTERRUPT_RENAMING: {},
        //todo RequestRecordRename
        REQUEST_RECORD_RENAME: {},
        //todo RequestRefreshTree
        REQUEST_REFRESH_TREE: {},
        //todo SetItemSelection
        SET_ITEMSELECTION: {},
        //todo PostSelect
        POST_SELECT: {},
        //todo UpdateNewFolderStatus
        UPDATE_TOOLBARBUTTON_STATUS: {},
        //todo OnActorItemCountChanged
        ON_ACTORITEMCOUNT_CHANGED: {},
        //todo PostSearch
        POST_SEARCH: {},
        //todo RequestFocusItem
        REQUEST_FOCUSITEM: {},
        //todo RequestMoveSelectedItems
        REQUEST_MOVE_SELECTEDITEMS: {},
        //rodo RequestCreateNewFolder
        REQUEST_CREATE_NEWFOLDER: {},
        //todo IsEnabledCreateNewFolder
        ISENABLED_CREATE_NEWFOLDER: {},
        //create/delete prefab toolbar button notification
        REQUEST_PREFAB_CREATE_DELETE: {},
        //Pop up the right-click menu
        REQUEST_POP_CONTEXTMENU: {},
        REQUEST_COPY_CODE: {},
        //Request to refresh the prefab
        REQUEST_REFRESH_PREFAB: {},
        //Refresh the prefab
        REFRESH_PREFAB: {},
        REQUEST_DELETE_NODE: {},
        REQUEST_COPY_NODE: {},
        //Node selected state changes
        INNER_ON_SELECTION_CHANGED: {}
    },
    API: {
        //when the level is loaded
        ON_LEVEL_LOADED: {},
        //When the origin of latitude and longitude coordinates changes
        COORDINATE_ORIGIN_CHANGED: {},
        //todo LoadInsLevel
        LOAD_INSLEVEL: {},
        //todo UnloadInsLevel
        UNLOAD_INSLEVEL: {},
        //todo OnLevelUnLoad
        ON_LEVEL_UNLOAD: {},
        //todo OnLevelShow
        ON_LEVEL_SHOW: {},
        //todo OnLevelHidden
        ON_LEVEL_HIDDEN: {},
        //todo  SpawnAPI
        SPAWN_API: {},
        //todo CesiumTerrainDeleteFinished
        CESIUMTERRAIN_DELETE_FINISHED: {},
        //todo CesiumTerrainClearFinished
        CESIUMTERRAIN_CLEAR_FINISHED: {},
        //to CameraLocation
        GET_CAMERA_LOCATION: {},
        //todo MouseHit
        MOUSE_HIT: {},
        //todo SetCameraFinish
        SET_CAMERA_FINISH: {},
        //to Coordinates
        CURRENT_COORDINATE: {},

        //copy model
        NEW_MODEL: {},

        //camera height
        CAMERA_HEIGHT: {},
        //coordinateOriginChange
        COORDINATEORIGIN_CHANGE: {},
        //OnPointBeClicked
        ONPOINTBE_CLICKED: {},
        //The level is loaded and hidden
        LEVEL_LOADEDHIDDEN: {},
        //Copy the API to the clipboard
        COPY_API_CLIPBOARD: {},
        //Generate unique API
        SPAWN_SINGLE_API: {},
        //Plot the coordinates when measuring and drawing
        Drawn_Measure_Coodinate: {},
        //delete API
        DELETE_API: {},
        //update API
        UPDATE_API: {},
        //Update camera position, rotation, arm length
        CAMERA_COORD_ROT_LEN: {},
        //Notify when the scene is loaded
        ON_SCENE_LOADED: {},
        //before the scene is loaded
        PRE_LOADLEVEL: {},
        //When the Pawn's mode is to rotate around the center of the sphere
        ON_PAWN_CENTER_SPHERE: {},
        //Arrow line coordinate movement
        FOLLOWER_API_MOVE: {},
        //Hide the API node
        HIDDEN_API: {},
        //Update Trenching model data
        UPDATE_TRENCH_DATA:{},
        //Update Trenching Component
        UPDATE_TRENCH_COM:{},
        //Update Flatten model data
        UPDATE_FLATTEN_DATA:{},
        //Update Flatten Component
        UPDATE_FLATTEN_COM:{}
    },
    COMPONENT: {
        //todo AddComponentInstance_Event
        ADD_COMPONENTINSTANCE: {},
        //todo RemoveComponentInstance_Event
        REMOVE_COMPONENTINSTANCE: {},
        //ClearComponentInstance
        CLEAR_COMPONENTINSTANCE: {}
    },

    DIGITALTWIN: {

        //When the twin object of the digital twin is loaded
        ON_TWIN_LOAD: {},
        //Drag and drop the digital twin into the scene
        DROP_DIGITAL_TWIN_IN_SCENE: {},
        //Generate the notification of the digital twin
        SPAWN_DIGITAL_TWIN: {},
        //Select the digital twin
        SELECTED_TWIN: {},
        //When the digital twin is added successfully
        ON_TWIN_ADD: {},
        //When the digital twin switches the timeline
        ON_TWIN_CHANGE: {},
        //When the digital twin viewport is closed
        ON_CLOSE: {}


    },
    //resource library
    RESOURCE_LIBRARY: {
        //The resource is double-clicked ResourceData
        RESOURCE_DOUBLE_CLICKED: {},
        //resource rename
        ON_RENAME: {},
        //resource delete
        ON_DELETE: {},
        //resource copy
        ON_DUPLICATE: {}
    },
    PREFAB: {
        //Monitor the Node selected to build the prefab
        ON_SELECT_CHANGED: {},
        //When the prefab is selected
        ON_PREFAB_SELECTED: {},
        //When the prefab is created or deleted
        ON_PREFAB_CREATE_DELETE: {},
        //Generate prefab notification
        SPAWN_PREFAB: {}
    },
    TOOLBAR: {
        ON_PUBLISH: {},
        //Save
        ON_SAVE: {},
        //Run
        ON_RUN: {},
        //Stop
        ON_STOP: {},
        ON_PREVIEW: {}
    },
    DOCK_TAB: {
        //When each DockTab is activated
        ON_DOCK_TAB_ACTIVATED: {}
    },
    RUNTIME: {
        //End RunTime
        CLOSE_RUNTIME: {},
        //Open Runtime
        RUNING_STATE: {}
    },
    DATASMITH: {
        //The current DataSmith resource starts loading
        ON_DATASMITH_START_LOAD: {},
        //When the DataSmith resource loading ends
        ON_DATASMITH_LOAD_END: {},
        //When DataSmith is uninstalled
        ON_DATASMITH_UNLOAD: {}
    },
    UNDOREDO: {
        //Empty UndoRedo
        CLEAR: {}
    },
    RESOURCE: {
        //add resource to viewport
        ON_RESOURCE_TO_VIEWPORT: {}
    },
    AXES: {
        //Notify the state of the axis
        ON_AXES_STATE_CHANGED: {}
    }
}