import * as types from './ActionType';
export const changeProhibitMsg = (value: object) => ({
    type: types.CHANGE_PROHIBIT_MSG,
    value
})
export const changeAddManagerMsg = (value: object) => ({
    type: types.CHANGE_ADD_MANAGER_MSG,
    value
})
export const changeProhibitVisible = (value: boolean) => ({
    type: types.CHANGE_PROHIBIT_VISIBLE,
    value
})
export const changeAddManagerVisible = (value: boolean) => ({
    type: types.CHANGE_ADD_MANAGER_VISIBLE,
    value
})
export const updateUserData = (value: object) => ({
    type: types.UPDATE_USER_DATA,
    value
})
export const updateUserList = (value: object) => ({
    type: types.UPDATE_USER_LIST,
    value
})
export const changeAddTopicVisible = (value: boolean) => ({
    type: types.CHANGE_ADD_TOPIC_VISIBLE,
    value
})
export const changeAddSubTopicVisible = (value: boolean) => ({
    type: types.CHANGE_ADD_SUB_TOPIC_VISIBLE,
    value
})
export const updateTopicList = (value: object) => ({
    type: types.UPDATE_TOPIC_LIST,
    value
})