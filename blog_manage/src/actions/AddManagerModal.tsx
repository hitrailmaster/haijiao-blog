import React, { useState } from 'react';
import { Modal, Select, message } from 'antd';
import { User, ModalProps } from '../utils/types'; 
import store from '../store';
import axios from 'axios';
import qs from 'qs';
import { changeAddManagerVisible } from '../store/actionCreators';
const { Option } = Select;
const ModalAction: React.FC<ModalProps> = (props: ModalProps) => {
    const [visible, setVisible] = useState(store.getState().isAddManagerVisible);
    let uid = "", userList = store.getState().userList;
    const storeChange = () => {
        let newVisible = store.getState().isAddManagerVisible;
        if(newVisible !== visible){
            setVisible(newVisible);
        }
    }
    store.subscribe(storeChange);
    const hideVisible = (value: boolean) => {
        setVisible(value);
        store.dispatch(changeAddManagerVisible(value))
    }
    const userChange = (value: string) => {
        uid = value;
    }
    const submit = () => {
        if(!uid) {
            message.error('请选择一个用户');
            return ;
        }
        let postData = {
            uid,
            tid: store.getState().addManagerMsg.topicId
        }
        axios.post('/manage/setmaster', qs.stringify(postData))
            .then(res => {
                let data = res.data;
                if(data.status == 1) {
                    message.success('设置成功')
                    hideVisible(false);
                    props.refresh();
                } else {
                    message.error('设置失败')
                }
            })
            .catch(err => {
                message.error('设置失败')
            })
    }

    return visible?(
        <Modal title="添加版主"
                visible={visible}
                onOk={submit}
                onCancel={() => hideVisible(false)}
                key="AddManager"
        >
            <div className="add-manager">
                <span className="prohibit-title">请选择: </span>
                <Select onChange={userChange} style={{'width': '400px'}}>
                    {
                        userList.map((user: User) => <Option value={user.uid}>{user.email}</Option>)
                    }
                </Select>
            </div>
        </Modal>
    ): null
}
export default ModalAction;