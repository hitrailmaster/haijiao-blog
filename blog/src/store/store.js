
import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
import * as types from './mutation_type'
import CookieUtils from '../js/cookie_utils'
import axios from 'axios'
import qs from 'qs'
Vue.use(Vuex)
// const state = {
//     userId: CookieUtils.getCookie("uid"),
//     email: CookieUtils.getCookie("email"),
//     username: CookieUtils.getCookie("user_name"),
//     topicList: []
// }
const store = new Vuex.Store({
    state: {
        userId: CookieUtils.getCookie("uid"),
        email: CookieUtils.getCookie("email"),
        username: CookieUtils.getCookie("user_name"),
        topicList: [],
        message: [],
        aid: '',
        unReadMessage: 0,
        timeId: '',
        status: 0,
        masterList: [],
        points: 0
    },
    mutations: {
        [types.UPDATE_USER_DATA](state, userData) {
            let user = JSON.parse(JSON.stringify(userData))
            state.userId = user.uid;
            state.username = user.username;
            state.email = user.email;
            state.aid = user.aid;
            state.status = user.status;
            state.points = user.points;
        },
        [types.UPDATE_TOPIC_LIST](state, topicList) {
            state.topicList = JSON.parse(JSON.stringify(topicList));
        },
        [types.UPDATE_MESSAGE](state, message) {
            state.message = JSON.parse(JSON.stringify(message));
        },
        [types.UPDATE_HAS_MESSAGE](state, hasMessage) {
            state.unReadMessage = hasMessage;
        },
        [types.CLEAR_TIME_INTERVAL](state) {
            clearInterval(state.timeId)
            state.timeId = ''
        },
        [types.SET_TIME_INTERVAL](state, id) {
            state.timeId = id;
        },
        [types.UPDATE_MASTER_LIST](state, list) {
            state.masterList = list;
        }
    },
    actions: {
        updateUserData({
            commit,
            state
        }, userData) {
            commit(types.UPDATE_USER_DATA, userData);
        },
        updateTopicList({
            commit,
            state
        }, topicList) {
            commit(types.UPDATE_TOPIC_LIST, topicList);
        },
        updateMessage({
            dispatch,
            commit,
            state
        }) {
            let postData = {
                page: 1,
                uid: state.userId,
                pagesize: 999
            };
            axios.get('/getUserMessages?' + qs.stringify(postData))
            .then(res => {
                let data = res.data;
                if(data.count)
                    dispatch('updateHasMessage', data.count)
                commit(types.UPDATE_MESSAGE, data.content);
            })
        },
        updateHasMessage({
            commit
        }, unReadMessage) {
            commit(types.UPDATE_HAS_MESSAGE, unReadMessage);
        },
        setTimeInterval({
            commit
        }, id) {
            commit(types.SET_TIME_INTERVAL, id);
        },
        clearTimeInterval({
            commit
        }) {
            commit(types.CLEAR_TIME_INTERVAL);
        },
        updateMasterList({
            commit
        }, list) {
            commit(types.UPDATE_MASTER_LIST, list);
        },
    },
    getters: {
        userId: state => state.userId,
        topicList: state => state.topicList,
        email: state => state.email,
        message: state => state.message,
        aid: state => state.aid,
        unReadMessage: state => state.unReadMessage,
        status: state => state.status,
        masterList: state => state.masterList,
        username: state => state.username,
        points: state => state.points
    }
})
// if (module.hot) {
//     // 使 action 和 mutation 成为可热重载模块
//     module.hot.accept([], () => {
//       // 获取更新后的模块
//       // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
//       const newMutations = require('./mutations').default
//       const newModuleA = require('./modules/a').default
//       // 加载新模块
//       store.hotUpdate({
//         mutations: newMutations,
//         modules: {
//           a: newModuleA
//         }
//       })
//     })
//   }
export default store