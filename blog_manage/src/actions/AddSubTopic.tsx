import React, { Fragment, useState } from 'react';
import { Modal, Input, Select, message } from 'antd';
import { Topic, EVENT, ModalProps } from '../utils/types'; 
import store from '../store';
import axios from 'axios'
import qs from 'qs'
// import './index.css'
import { changeAddSubTopicVisible } from '../store/actionCreators';
const { Option } = Select;
const ModalAction: React.FC<ModalProps> = (props: ModalProps) => {
    const [visible, setVisible] = useState(store.getState().isAddSubTopicVisible);
    let topicName = '', mainId: number, topicList = store.getState().topicList;
    const storeChange = () => {
        let newVisible = store.getState().isAddSubTopicVisible;
        if(newVisible !== visible){
            setVisible(newVisible);
        }
    }
    store.subscribe(storeChange);
    const hideVisible = (value: boolean) => {
        setVisible(value);
        store.dispatch(changeAddSubTopicVisible(value))
    }
    const submit = () => {
        if(!mainId) {
            message.error('请选择主板块');
            return ;
        }
        if(!topicName) {
            message.error('请输入板块名');
            return ;
        }
        let postData = {
            title: topicName,
            mainId
        }
        axios.post('/manage/addSubTopic', qs.stringify(postData))
            .then(res => {
                let data = res.data;
                if(data.status) {
                    message.success('添加成功')
                    hideVisible(false);
                    props.refresh()
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
    const mainChange = (value: number) => {
        mainId = value;
    }

    return visible?(
        <Modal title="添加子板块"
                visible={visible}
                onOk={submit}
                onCancel={() => hideVisible(false)}
                key="AddSubTopic"
        >
            <div className="add-manager">
                <span className="prohibit-title">请选择主板块: </span>
                <Select onChange={mainChange} style={{'width': '400px'}}>
                    {
                        topicList.map((topic: Topic) => <Option value={topic.mainID}>{topic.mainTitle}</Option>)
                    }
                </Select>
            </div>
            <div className="add-manager">
                <span className="prohibit-title">请输入板块名: </span>
                <Input onChange={change}/>
            </div>
        </Modal>
    ): null
}
export default ModalAction;