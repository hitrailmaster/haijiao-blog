import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import UserManage from '../ManagePage/UserManage';
import CommentManage from '../ManagePage/CommentManage';
import ArticleManage from '../ManagePage/ArticleManage';
import TopicManage from '../ManagePage/TopicManage';
const { Content } = Layout;
const ContentContainer: React.FC = () => {
    return (
        <Content>
            <Route path="/ArticleManage" component={ArticleManage} key="2"/>
            <Route path="/TopicManage" component={TopicManage} key="3"/>
            <Route path="/CommentManage/:id" component={CommentManage} key="4"/>
            <Route exact path="/" component={UserManage} key="1"/>
        </Content>
    )
}
export default ContentContainer;