<template>
    <div class="collection">
        <header>
            <a-button type="primary" class="back" @click="back">←返回</a-button>
            <span class="before-font">&ensp;</span>
            <span>&ensp;{{title}}</span>

            <div class="header-right">
                <a-popconfirm title="确定删除这条帖子吗？" 
                        ok-text="Yes" 
                        cancel-text="No"
                        @confirm="delPost"
                        v-if="isShowDel">
                    <a-button style="margin-right: 10px">删除</a-button>
                </a-popconfirm>
                <a-button v-else style="margin-right: 10px" @click="setVisible(0)">举报</a-button>
                <a-modal :visible="visible" 
                        title="举报"
                        @ok="reportPost"
                        @cancel="setVisible">
                    <label>请填写原因: </label>
                    <a-textarea v-model="reason"/>
                </a-modal>
                <span>评论： {{len}}</span>
            </div>
            <div class="post-user">
                <span class="post-user-info"
                    @click.stop="viewUser(post.uid)">
                    发帖人：
                    <br/>
                    <br/>
                    <a-avatar class="user-avater" v-if="!!post.aid" size="large" :src="'/getimage?iid='+post.aid"/>
                    <a-avatar class="user-avater" size="large" icon="user" v-else/>
                    &emsp;{{post.nickname}}
                </span>
            </div>
            <div v-html="post.content" class="post-detail">

            </div>

        </header>
        <div class="best-comment" v-show="hasBestComment">
            <span>最佳回答</span>
             <a-comment>
                <a slot="author">{{bestComment.username}}</a>
                <a-avatar
                    slot="avatar"
                    :src="'/getimage?iid='+bestComment.aid"
                    alt="Han Solo"
                    @click="viewUser(bestComment.commentuserID)"
                />
                <p slot="content">
                {{ bestComment | isEmpty }}
                </p>
                <span>{{ bestComment.create_date }}</span>
            </a-comment>
        </div>
        <div >
            <a-list
                class="comment-list"
                :header="`${comments.length} 回复`"
                item-layout="horizontal"
                :data-source="comments"
            >
                <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-comment :key="index">
                        <div slot="author" class="title">
                            <a @click="viewUser(item.commentuserID)">{{item.username}}</a>
                            <span class="del-btn">
                                <a-button v-show="post.uid == userId && !hasBestComment"
                                    @click.stop="setUseful(item.commentID)"
                                >设为有用</a-button>
                                <a-popconfirm title="确定删除吗？" 
                                        ok-text="Yes" 
                                        cancel-text="No"
                                        @confirm="delComment(item.commentID)"
                                        v-if="item.commentuserID == userId || isShowDel">
                                    <a-button v-if="item.commentuserID == userId || isShowDel">删除</a-button>
                                </a-popconfirm>
                                <!-- <a-popconfirm title="确定举报吗？" 
                                        ok-text="Yes" 
                                        cancel-text="No"
                                        @confirm="reportComment(item.commentID)"
                                        v-else> -->
                                    <a-button v-else @click="setVisible(1)">举报</a-button>
                                <!-- </a-popconfirm> -->
                            </span>
                        </div>
                            <a-avatar
                                slot="avatar"
                                :src="'/getimage?iid='+item.aid"
                                alt="Han Solo"
                                @click="viewUser(item.commentuserID)"
                            />
                        <p slot="content">
                        {{ item.commentContent }}
                        </p>
                        <span>{{ item.commentdate }}</span>
                        <span class="post-action">
                            <a-tooltip placement="bottom" title="赞一下" v-if="item.commentupdown == 0">
                                <a-icon type="like" @click="likeComment(item.commentID, 1)"/>
                            </a-tooltip>
                            <a-tooltip placement="bottom" title="取消赞" v-else>
                                <a-icon type="like" theme="filled" @click="likeComment(item.commentID, 0)"/>
                            </a-tooltip>
                            {{item.commentupcount}}
                            <!-- <a-icon type="dislike" /> -->
                        </span>
                    </a-comment>
                </a-list-item>
            </a-list>
        </div>
        <a-pagination v-model="current" 
                :total="len" 
                show-less-items 
                @change="pageChange" 
                :page-size="pageSize"/>
        <div>
            <a-textarea :rows="4" v-model="reply"/>
            <a-form-item>
            <a-button html-type="submit" type="primary" @click="handleSubmit">
                回复
            </a-button>
            </a-form-item>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            current: 1,
            title: '',
            pid: '',
            reply: '',
            submitting: false,
            comments: [],
            bestComment: {
                aid: '',
                username: '',
                content: '',
                commentuserID: ''
            },
            content: `aa`,
            hasBestComment: false,
            isUseful: false,
            post: {
                content: '',
                nickname: '',
                uid: '',
                aid: '',
                id_sub: ''
            },
            visible: false, //填写举报的弹窗
            len: 0,
            pageSize: 5,
            isShowDel: false,
            subId: '',
            reportType: -1, //举报类型
            reason: '', //举报原因
            msg: {   //用于点赞节流
                cid: '',
                action:  ''
            }
        }
    },
    filters: {
        isEmpty(val) {
            if(val)
                return val.commentContent;
            return '';
        }
    },
    computed: {
        ...mapGetters(["userId", "masterList", "status"])
    },
    methods: {
        setVisible(type = -1) {
            this.visible = !this.visible;
            this.reportType = type;
            this.reason = '';
        },
        reportPost() {
            this.setVisible()
            this.$message.success('举报成功')
        },
        reportComment(cid) {
            this.setVisible()
            this.$message.success('举报成功')
        },
        delPost() {
            const self = this;
            this.$axios.get('/delpost?pid=' + this.pid)
                .then(res => {
                    let data = res.data;
                    if(data.success) {
                        self.$message.success('删除成功');
                        self.$router.go(-1);
                    } else {
                        self.$message.error('删除失败');
                    }
                })
                .catch(err => {
                    self.$message.error('删除失败');
                })
        },
        pageChange(page) {
            this.getPostDetail(page);
        },
        setUseful(cid) {
            let postData = {
                pid: this.pid,
                cid,
            }
            const self = this;
            this.$axios.post('/setuseful', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.success) {
                        self.$message.success('设置成功')
                        self.getPostDetail(self.current)
                    } else {
                        self.$message.error('设置失败')
                    }
                })
                .catch(err => {
                    self.$message.error('设置失败')
                })
        },
        delComment(cid) {
            const self = this;
            this.$axios.post('/deletecomment', this.$qs.stringify({cid}))
                .then(res => {
                    let data = res.data;
                    if(data.success) {
                        self.$message.success('删除成功');
                        self.getPostDetail();
                    } else {
                        self.$message.error('删除失败');
                    }
                })
                .catch(err => {
                    self.$message.error('删除失败');
                })
        },
        likeComment(cid, action) {
            if(this.msg.cid == cid && this.msg.action == action)
                return;
            let postData = {
                action,
                uid: this.userId,
                cid,
            }
            this.msg = {
                cid,
                action
            };
            const self = this;
            this.$axios.post('/up', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    self.getPostDetail(self.current);
                    if(!data.success) {
                        this.msg = {
                            cid: '',
                            action: ''
                        };
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.msg = {
                        cid: '',
                        action: ''
                    };
                })
        },
        handleChange() {},
        handleSubmit() {
            let postData = {
                content: this.reply,
                uid: this.userId,
                pid: this.pid
            };
            const self = this;
            this.$axios.post('/addcomment', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.cid !== -1) {
                        self.getPostDetail(self.current);
                        self.$message.success('回复成功');
                        self.reply = '';
                        self
                    } else {
                        self.$message.error('回复失败');
                    }
                })
                .catch(err => {
                    console.log(err)
                    // self.$message.error('回复失败');
                })
        },
        back() {
            this.$router.go(-1);
        },
        getPostDetail(page = 1) {
            let postData = {
                uid: this.userId,
                pid: this.pid,
                page,
                pagesize: this.pageSize
            }
            const self = this;
            this.$axios.get('/postmessage?' + this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data) {
                        self.post = data.post[0];
                        self.comments = data.comment;
                        let bestComment = data.bestcomment;
                        self.len = parseInt(data.commentnum);
                        if(bestComment.length > 0) {
                            self.bestComment = bestComment[0];
                            self.hasBestComment = true;
                        }
                        // this.$message.success('获取成功');
                    } else {
                        self.$message.error('获取失败');
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$message.error('获取失败');
                })
        }
    },
    mounted() {
        if(this.$route.query.title) {
            this.title = this.$route.query.title;
            this.pid = this.$route.query.id;
            this.subId = this.$route.query.subId
        }
        this.isShowDel = this.status == 1 && this.masterList.indexOf(this.subId) != -1;
        this.isShowDel = this.status == 2 || this.isShowDel;
        this.getPostDetail(1);
    }
}
</script>
<style lang="scss" scoped>
.ant-comment {
    width: 100%;
}
.post-action {
    float: right;
    margin-right: 20px;
}
.best-comment {
    border: 1px solid #32ff44;
}
.post-user {
    margin-top: 30px;
}
.post-detail {
    margin-top: 10px;
    border: 1px solid #e8e8e8;
    min-height: 150px;
    padding: 5px;
}
.collection {
    padding-left: 20px;
    flex-grow: 2;
}
.back {
    position: absolute;
    left: 190px;
}

.anticon {
    margin-left: 20px;
    cursor: pointer;
}
.icons {
    font-size: 14px;
    text-align: right;
}
.icons span {
    vertical-align: -3px;
}
.header-right {
    float: right;
}
.ant-pagination {
    text-align: center;
}
.del-btn {
    position: absolute;
    right: 0;
}
.ant-comment {
    position: relative;
}
.post-user-info:hover {
    cursor: pointer;
}

</style>