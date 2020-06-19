import * as types from './types';
import axios from 'axios';
import { message } from 'antd';
import store from '../store';
import { changeProhibitMsg, changeProhibitVisible, 
    changeAddManagerMsg, changeAddManagerVisible } from '../store/actionCreators';
import qs from 'qs'
export function handleAccount(type: number, user: types.User, update?: Function) {
    if(type == 1) {
        store.dispatch(changeProhibitVisible(true))
        store.dispatch(changeProhibitMsg({userId: user.uid}))
    } else {
        axios.post("/manage/forbid", qs.stringify({action: type, uid: user.uid}))
            .then(res => {
                let data = res.data;
                if(data.success) {
                    message.success("操作成功！");
                    if(update) update();
                }
                else
                    message.success("操作失败！");
            })
            .catch(err => {
                message.success("操作失败！");
            });
    }
}
export function handleComments(pid: string): void {
    // message.success("操作成功！");
    // axios.post("", )
    //     .then(res => {
    //         let data = res.data;
    //         if(data.success)
    //             message.success("操作成功！");
    //         else
    //             message.success("操作失败！");
    //     })
    //     .catch(err => {
    //         message.success("操作失败！");
    //     });
}
export function handleAddManager(topicId: number) {
    store.dispatch(changeAddManagerVisible(true))
    store.dispatch(changeAddManagerMsg({topicId}))
}
export function deleteComment(cid: number, update: Function) {
    axios.post('/manage/deletecomment', qs.stringify({cid}))
        .then(res => {
            let data = res.data;
            if(data.success) {
                message.success('删除成功！')
                update()
            } else {
                message.error('删除失败！')
            }
        })
        .catch(err => {
            message.error('删除失败！')
        })
}
export function deleteArticle(pid: number, update: Function) {
    axios.get('/manage/delpost?' + qs.stringify({pid}))
        .then(res => {
            let data = res.data;
            if(data.success) {
                message.success('删除成功！')
                update();
            } else {
                message.error('删除失败！')
            }
        })
        .catch(err => {
            message.error('删除失败！')
        })
}
export function delTopic(type: number, topicId: number, update: Function) {
    axios.post('/manage/deleteTopic', qs.stringify({type,topicId}))
        .then(res => {
            let data = res.data;
            if(data.status) {
                message.success('删除成功！')
                update()
            }
            else
                message.error('删除失败！')
        })
        .catch(err => {
            message.error('删除失败！')
        })
}