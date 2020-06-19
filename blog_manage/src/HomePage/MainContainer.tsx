import React from 'react';
import { Layout } from 'antd';
import SiderContainer from './SiderContainer';
import ContentContainer from './ContentContainer';
const MainContainer: React.FC = () => {
    return (
        <Layout className="content">
            <SiderContainer/>
            <ContentContainer/>
        </Layout>
    )
}
export default MainContainer;