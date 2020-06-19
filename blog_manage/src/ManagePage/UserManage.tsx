import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import "./index.css";
import { EVENT } from "../utils/types";
import * as Columns from "../js/Columns";
import store from "../store";
import axios from "axios";
import ModalAction from "../actions/ProhibitModal";
import { updateUserList } from "../store/actionCreators";

function UserManage(this: any) {
    const [dataSource, setDataSource] = useState({ data: [] });
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [count, setCount] = useState(0);
    const [isFresh, setIsFresh] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `/manage/search?type=2&&keyword=${keyword}&&page=${page}&&pagesize=${pageSize}`
            );
            setDataSource({ data: result.data.result });
            store.dispatch(updateUserList(result.data.result));
            setCount(result.data.count);
        };
        fetchData().then();
    }, [isFresh, page, pageSize]);
    let refresh = () => {
        setIsFresh(!isFresh);
    };
    const columns = Columns.UserManage(refresh);

    const handleInput = (event: EVENT) => {
        setKeyword(event.target.value);
    };
    const pageChange = (page: number) => {
        setPage(page);
    };
    const sizeChange = (current: number, size: number) => {
        setPageSize(size);
    };

    return (
        <div className="table">
            <div className="search-bar">
                <Input onChange={handleInput} />
                <Button className="search" onClick={() => setIsFresh(!isFresh)}>
                    搜索
                </Button>
            </div>
            <Table
                rowKey="uid"
                dataSource={dataSource.data}
                columns={columns}
                loading={false}
                indentSize={50}
                pagination={{
                    current: page,
                    pageSize,
                    total: count,
                    onChange: pageChange,
                    pageSizeOptions: ["5", "10", "20"],
                    onShowSizeChange: sizeChange
                }}
            />
            <ModalAction refresh={refresh}></ModalAction>
        </div>
    );
}
export default UserManage;
