import React, { useState } from 'react';
import { Modal, Input, Select, message } from 'antd';
import { ModalProps, EVENT } from '../utils/types'; 
import store from '../store';
import './ProhibitModal.css';
import axios from 'axios';
import qs from 'qs';
import { changeProhibitVisible } from '../store/actionCreators';
const { TextArea } = Input;
const { Option } = Select;
const ModalAction: React.FC<ModalProps> = (props: ModalProps) => {
    const [visible, setVisible] = useState(store.getState().isProhibitVisible);
    const [abled, setAbled] = useState(false);
    let handleMsg = {
        reason: "",
        len: "",
        type: "day"
    }
    const storeChange = () => {
        let newVisible = store.getState().isProhibitVisible;
        if(newVisible !== visible){
            setVisible(newVisible);
        }
    }
    store.subscribe(storeChange);
    const hideVisible = (value: boolean) => {
        setVisible(value);
        store.dispatch(changeProhibitVisible(value))
    }
    const reasonInput = (event: EVENT) => {
        handleMsg.reason = event.target.value;
    }
    const timeInput = (event: EVENT) => {
        handleMsg.len = event.target.value;
    }
    const typeInput = (value: string) => {
        handleMsg.type = value;
        if(value === 'never')
            setAbled(true)
        else
            setAbled(false)
    }
    const submitReason = () => {
        for(let item in handleMsg) {
            if(!item) {
                message.error('请将信息填写完整');
                return ;
            }
        }
        let postData = {
            uid: store.getState().prohibitMsg.userId,
            action: 1,
            time: handleMsg.len,
            type: handleMsg.type
        };
        if(postData.type === 'never') {
            postData.time = '999';
            postData.type = 'year';
        }
        axios.post('/manage/forbid', qs.stringify(postData))
            .then(res => {
                let data = res.data;
                if(data.success) {
                    message.success('封禁成功')
                    hideVisible(false);
                    props.refresh()
                } else {
                    message.error('封禁失败')
                }
            })
            .catch(err => {
                message.error('封禁失败')
            })
    }

    return visible?(
        <Modal title="封禁帐号" 
                visible={visible}
                onOk={submitReason}
                onCancel={() => hideVisible(false)}
                key="Prohibit"
        >
            <TextArea rows={4} placeholder="请输入原因" onChange={reasonInput}/>
            <div className="prohibit">
                <span className="prohibit-title">封禁时间: </span>
                <Input className="time-input" type="number" onChange={timeInput} disabled={abled}/>
                <Select defaultValue="day" onChange={typeInput}>
                    <Option value="day">天</Option>
                    <Option value="month">月</Option>
                    <Option value="year">年</Option>
                    <Option value="never">永久</Option>
                </Select>
            </div>
        </Modal>
    ): null
}
export default ModalAction;