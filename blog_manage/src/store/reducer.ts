import * as types from './ActionType';
const defaultState = {
    uid: '',
    email: '',
    userName: '',
    isProhibitVisible: false,
    prohibitMsg: {
        reason: '',
        type: '',
        len: '',
        userId: ''
    },
    isAddManagerVisible: false,
    isAddTopicVisible: false,
    isAddSubTopicVisible: false,
    addManagerMsg: {
        userId: '',
        topicId: ''
    },
    userList: [],
    topicList: []
}; // 默认数据
export default (state = defaultState, action: any) => {
    if (action.type === types.UPDATE_USER_DATA) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.uid = action.value.uid;
        newState.email = action.value.email;
        newState.userName = action.value.userName;
        return newState
    }
    if (action.type === types.UPDATE_TOPIC_LIST) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.topicList = action.value;
        return newState
    }
    if (action.type === types.UPDATE_USER_LIST) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.userList = JSON.parse(JSON.stringify(action.value));
        return newState
    }
    if (action.type === types.CHANGE_PROHIBIT_VISIBLE) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.isProhibitVisible = action.value;
        return newState
    }
    if (action.type === types.CHANGE_ADD_TOPIC_VISIBLE) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.isAddTopicVisible = action.value;
        return newState
    }
    if (action.type === types.CHANGE_ADD_SUB_TOPIC_VISIBLE) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.isAddSubTopicVisible = action.value;
        return newState
    }
    if (action.type === types.CHANGE_ADD_MANAGER_VISIBLE) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.isAddManagerVisible = action.value;
        return newState
    }
    if (action.type === types.CHANGE_PROHIBIT_MSG) {
        let newState = JSON.parse(JSON.stringify(state)) 
        for(let item in action.value) {
            newState.prohibitMsg[item] = action.value[item];
        }
        return newState
    }
    if (action.type === types.CHANGE_ADD_MANAGER_MSG) {
        let newState = JSON.parse(JSON.stringify(state)) 
        newState.msg = JSON.parse(JSON.stringify(action.value))
        for(let item in action.value) {
            newState.addManagerMsg[item] = action.value[item];
        }
        return newState
    }
    return state
}