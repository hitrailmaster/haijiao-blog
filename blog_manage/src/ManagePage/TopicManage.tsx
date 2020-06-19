import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import './index.css';
import { RouterProps } from '../utils/types';
import * as Columns from '../js/Columns';
import TopicModal from '../actions/AddTopic'
import SubTopicModal from '../actions/AddSubTopic'
import store from '../store'
import axios from 'axios'
import AddManagerModal from '../actions/AddManagerModal'
import { changeAddTopicVisible, changeAddSubTopicVisible, updateTopicList  } from '../store/actionCreators'
const ArticleManage: React.FC<RouterProps> = (props: RouterProps) => {

    const [dataSource, setDataSource] = useState({data: []});
    const [isFresh, setIsFresh] = useState(false);
    useEffect(() => {
        const fetchData = async() => {
            const result = await axios.get('/manage/topics');
            setDataSource({data: result.data.mainTopics})
            store.dispatch(updateTopicList(result.data.mainTopics))
        }
        fetchData().then()
    }, [isFresh])
    const refresh = () => {
        setIsFresh(!isFresh);
    }
    const columns = Columns.TopicManage(refresh);
    const key = (record: any) => {
        if(record.mainID)
            return record.mainID
        return record.subID
    }
    const addTopic = () => {
        store.dispatch(changeAddTopicVisible(true))
    }
    const addSubTopic = () => {
        store.dispatch(changeAddSubTopicVisible(true))
    }
    return (
        <div className="table">
            <div className="search-bar">
                {/* <Input/>
                <Button className="search">搜索</Button> */}
                <Button onClick={addTopic}>添加主板块</Button>
                <Button onClick={addSubTopic}>添加子板块</Button>
            </div>
            <Table  rowKey={key}
                    dataSource={dataSource.data} 
                    columns={columns}
                    loading={false}
                    expandable={{
                        childrenColumnName: 'subTopics',
                        rowExpandable: () => true
                    }} 
                    pagination={{pageSize: 6}}
            />;
            <AddManagerModal refresh={refresh}/>
            <TopicModal refresh={refresh}/>
            <SubTopicModal refresh={refresh}/>
        </div>
    )
}
export default ArticleManage;