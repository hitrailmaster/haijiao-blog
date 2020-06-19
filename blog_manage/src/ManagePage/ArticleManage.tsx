import React, { useState, useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import './index.css';
import { RouterProps, EVENT } from '../utils/types';
import * as Columns from '../js/Columns';
import axios from 'axios'
const ArticleManage: React.FC<RouterProps> = (props: RouterProps) => {

    const [dataSource, setDataSource] = useState({data: []});
    const [isFresh, setIsFresh] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [keyword, setKeyword] = useState<string>('');
    const [pageSize, setPageSize] = useState<number>(5);
    const [count, setCount] = useState<number>(0);
    const refresh = () => {
        setIsFresh(!isFresh);
    };
    const columns = Columns.ArticleManage(refresh);
    useEffect(() => {
        setLoading(true)
        const fetchData = async() => {
            const result = await axios.get(`/manage/search?type=0&&keyword=${keyword}&&page=${page}&&pagesize=${pageSize}`);
            setDataSource({data: result.data.result});
            setCount(result.data.count);
        }
        fetchData().then()
        setLoading(false)
    }, [isFresh, page, pageSize])
    const handleInput = (event: EVENT) => {
        setKeyword(event.target.value);
    }
    const pageChange = (page: number) => {
        setPage(page)
    }
    const sizeChange = (current: number, size: number) => {
        setPageSize(size)
    }
    
    return (
        <div className="table">
            <div className="search-bar">
                <Input onChange={handleInput}/>
                <Button className="search" onClick={() => setIsFresh(!isFresh)}>搜索</Button>
            </div>
            <Table  rowKey="pid"
                    dataSource={dataSource.data} 
                    columns={columns}
                    loading={loading}
                    indentSize={50}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.content}</p>,
                        rowExpandable: record => !!record.content,
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