import React, { Fragment } from 'react';
import { ColumnProps } from 'antd/es/table';
import { Button, Popconfirm } from 'antd';
import { User, Article, Topic, Comment } from '../utils/types';
import { handleAccount, delTopic, handleAddManager, deleteComment, deleteArticle } from '../utils/api';
export function UserManage(update: Function): ColumnProps<User>[] { 
    return [
        {
            title: '姓名',
            dataIndex: 'nickname',
            key: '1',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: '2',
        },
        {
            title: '积分',
            dataIndex: 'points',
            key: '3',
        },
        {
            title: 'id',
            dataIndex: 'uid',
            key: '6',
        },
        {
            title: '账户类型',
            key: '4',
            render: (text: User, record: User) => {
                if(record.status == 0)
                    return <>普通用户</>
                else if(record.status == 1)
                    return <>板块主</>
                return <>平台管理员</>
            }
        },
        {
            title: '创建日期',
            key: '5',
            render: (text: User, record: User) => <>{record.create_date.slice(0, 10)}</>
        },
        {
            title: '操作',
            key: 'x',
            render: (text: User, record: User) => {
                return (
                    <Fragment>
                        {!record.forbid?
                        <Button onClick={() => handleAccount(1, record)}
                        >封号</Button>:
                        <Popconfirm
                            title="你确定要解封吗？"
                            onConfirm={() => handleAccount(0, record, update)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button>解封</Button>
                        </Popconfirm>}
                    </Fragment>
                )
            }
        }
    ];
}
export function CommentManage(update: Function): ColumnProps<Comment>[] {
    return [ 
        {
        title: '帖子名',
        dataIndex: 'commenttitle',
        key: 'commenttitle',
        },
        {
        title: '发布日期',
        dataIndex: 'commentdate',
        key: 'commentdate',
        },
        {
        title: '发布人',
        dataIndex: 'username',
        key: 'username',
        },
        {
            title: "操作",
            key: 'x',
            render: (text: Comment, record: Comment) => {
                return (
                    <Popconfirm
                        title="你确定要删除这条评论吗？"
                        onConfirm={() => deleteComment(record.commentID, update)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="link">删除</Button>
                    </Popconfirm>
                )
            }
        }
    ];
}
export function ArticleManage(update: Function): ColumnProps<Article>[] {
    return [
        {
        title: '帖子名',
        dataIndex: 'title',
        key: 'title',
        },
        {
        title: '发表日期',
        dataIndex: 'create_date',
        key: 'create_date',
        },
        {
        title: '评论数',
        dataIndex: 'comment_count',
        key: 'comment_count',
        },
        {
            title: '作者',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: "操作",
            key: 'x',
            render: (text: Article, record: Article) => {
                return (
                    <>
                        <Button type="link" href={"#/CommentManage/" + text.pid}>管理评论</Button>
                        <Popconfirm
                            title="你确定要删除这条帖子吗？"
                            onConfirm={() => deleteArticle(text.pid, update)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="link">删除</Button>
                        </Popconfirm>
                    </>
                    )
            }
        }
    ];
}
export function TopicManage(update: Function): ColumnProps<Topic>[] {
    return [
        {
            title: '话题名',
            key: '1',
            render: (text: Topic, record: Topic) => {
                return(
                        record.mainTitle?record.mainTitle:record.subTitle
                )
            }
        },
        {
            title: '帖子数',
            key: 'count',
            render: (text: Topic, record: Topic) => {
                let count = 0;
                if(!record.subTopics) return <>{record.count}</>
                record.subTopics.forEach((item: any) => count += item.count)
                return <>{count}</>}
        },
        {
            title: '板块主(id)',
            key: '2',
            render: (text: Topic, record: Topic) => {
                if(!record.masters) return <></>
                let uid:any[] =  [];
                record.masters.forEach((item: any) => uid.push(item.uid))
                return <>{uid.join(',')}</>
            }
        },
        {
            title: "操作",
            key: 'x',
            render: (text: Topic, record: Topic) => {
                return record.subID?(
                    <>
                    <Popconfirm
                        title="你确定要删除这个子版块吗？"
                        onConfirm={() => delTopic(1, record.subID, update)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="link">删除</Button>
                    </Popconfirm>
                    <Button onClick={() => handleAddManager(record.subID)}
                    >{!text.managerEmail?'添加板块主':'更换板块主'}</Button>
                    </>
                ):
                <Popconfirm
                    title="你确定要删除这个主板块吗？"
                    onConfirm={() => delTopic(0, record.mainID, update)}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type="link">删除</Button>
                </Popconfirm>
            }
        }
    ]
}