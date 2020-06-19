import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import sideBar from './sideBar';
const { Sider } = Layout;
interface RouterLinkItem {
    to: string
    name: string
}
const SiderContainer: React.FC = () => {
    let list: Array<RouterLinkItem> = [{
        to: '/UserManage',
        name: '用户管理'
    }, {
        to: '/ArticleManage',
        name: "帖子管理"
    }, {
        to: '/TopicManage',
        name: "话题管理"
    }];
    return (
        <Sider theme="light">
            <Menu>
                {sideBar.map((item, index) =>
                    <Menu.Item key={index}>
                        <Link to={item.to}>{item.name}</Link>
                    </Menu.Item>)}
            </Menu>
        </Sider>
    )
}
export default SiderContainer;