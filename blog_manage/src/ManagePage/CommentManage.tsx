import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import './index.css';
import { RouterProps } from '../utils/types';
import * as Columns from '../js/Columns';
import axios from 'axios'
const ArticleManage: React.FC<RouterProps> = (props: RouterProps) => {

    const [isFresh, setIsFresh] = useState(false);
    const [dataSource, setDataSource] = useState({data: []});
    const [pageSize, setPageSize] = useState(5);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1)
    const refresh = () => {
        setIsFresh(!isFresh);
    }
    const columns = Columns.CommentManage(refresh);
    useEffect(() => {
        const fetchData = async() => {
            const result = await axios.get(`/manage/postmessage?pid=${props.match.params.id}&&page=${page}&&pagesize=${pageSize}`);
            setDataSource({data: result.data.comment})
            setCount(result.data.commentnum)
        }
        fetchData().then()
    }, [isFresh, page, pageSize])

    const pageChange = (page: number) => {
        setPage(page)
    }
    const sizeChange = (current: number, size: number) => {
        setPageSize(size)
    }
    
    return (
        <div className="table">
            <div className="search-bar">
                <Input/>
                <Button className="search">搜索</Button>
                <Button onClick={() => props.history.goBack()}>返回</Button>
            </div>
            <Table  rowKey="commentID"
                    dataSource={dataSource.data} 
                    columns={columns}
                    loading={false}
                    indentSize={50}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.commentContent}</p>,
                        rowExpandable: record => !!record.commentContent,
                    }} 
                    pagination={{current: page,
                        pageSize,
                        total: count,
                        onChange: pageChange,
                        pageSizeOptions: ['5', '10', '20'],
                        onShowSizeChange: sizeChange}}
            />;
        </div>
    )
}
export default ArticleManage;