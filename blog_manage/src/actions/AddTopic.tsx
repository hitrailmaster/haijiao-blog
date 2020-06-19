import React, { useState } from 'react';
import { Modal, Input, message } from 'antd';
import { EVENT, ModalProps } from '../utils/types'; 
import store from '../store';
import axios from 'axios';
import qs from 'qs';
import { changeAddTopicVisible } from '../store/actionCreators';
const ModalAction: React.FC<ModalProps> = (props: ModalProps) => {
    const [visible, setVisible] = useState(store.getState().isAddTopicVisible);
    let topicName = '';
    const storeChange = () => {
        let newVisible = store.getState().isAddTopicVisible;
        if(newVisible !== visible){
            setVisible(newVisible);
        }
    }
    store.subscribe(storeChange);
    const hideVisible = (value: boolean) => {
        setVisible(value);
        store.dispatch(changeAddTopicVisible(value))
    }
    const submit = () => {
        if(!topicName) {
            message.error('请输入板块名');
            return ;
        }
        let postData = {
            title: topicName
        }
        axios.post('/manage/addMainTopic', qs.stringify(postData))
            .then(res => {
                let data = res.data;
                if(data.status) {
                    message.success('添加成功')
                    hideVisible(false);
                    props.refresh();
                } else {
                    message.error('添加失败')
                }
            })
            .catch(err => {
                message.error('添加失败')
            })
    }
    const change = (event: EVENT) => {
        topicName = event.target.value;
    }

    return visible?(
        <Modal title="添加主板块"
                visible={visible}
                onOk={submit}
                onCancel={() => hideVisible(false)}
                key="AddTopic"
        >
            <div className="add-manager">
                <span className="prohibit-title">请输入板块名: </span>
                <Input onChange={change}/>
            </div>
        </Modal>
    ): null
}
export default ModalAction;