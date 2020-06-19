import React from 'react';
import { Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import store from '../store';
import { updateUserData } from '../store/actionCreators';
const { Header } = Layout;
interface Props {
    user: string
}
const HeaderContainer: React.FC<Props> = (props: Props) => {
    function logout() {
        store.dispatch(updateUserData({userName: ''}))
    }
    return (
        <Header>
            论坛后台管理
            <div className="user-info">
                你好： {props.user}
                <LogoutOutlined spin={true}
                        rotate={360}
                        onClick={logout}/>
            </div>
        </Header>
    )
}
export default HeaderContainer;