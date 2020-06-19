<template>
    <div class="other-profile">
        <header>
            <a-button type="primary" class="back" @click="back">←返回</a-button>
            <a-avatar class="user-avater" v-if="!!aid" size="large" :src="'/getimage?iid='+aid"/>
            <a-avatar class="user-avater" size="large" icon="user" v-else/>
            <div class="fan-follow">
                <a-tooltip placement="bottom" title="取消关注" v-if="isFollow">
                    <a-icon type="heart" @click.stop="cancelFollow" theme="filled"/>
                </a-tooltip>
                <a-tooltip placement="bottom" title="关注" v-else>
                    <a-icon type="heart" @click.stop="followUser"/>
                </a-tooltip>
            </div>
            <div class="fan-follow">
                <span>粉丝人数：{{uidCount}}</span>
                <span>关注人数：{{buidCount}}</span>
                <span>积分：{{points}}</span>
            </div>
        </header>
        <main>
            <a-tabs default-active-key="1" @change="callback">
                <a-tab-pane key="1" tab="个人信息">
                    <a-form class="register-form" layout="horizontal">
                <a-form-item label="昵称">
                    <a-input v-model="nickName" :disabled="true"/>
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input v-model="email" :disabled="true"/>
                </a-form-item>
                <a-form-item label="创建日期">
                    <a-input v-model="createDate" :disabled="true"/>
                </a-form-item>
                <a-form-item label="性别">
                    <a-radio-group v-model="gender" :disabled="true">
                        <a-radio value="男">
                            男
                        </a-radio>
                        <a-radio value="女">
                            女
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="学校">
                    <a-input v-model="school" :disabled="true"/>
                </a-form-item>
                <a-form-item label="个人简介">
                    <a-textarea v-model="description" :disabled="true" :autosize="true"></a-textarea>
                </a-form-item>
            </a-form>
                </a-tab-pane>
                <a-tab-pane key="2" tab="他的帖子" force-render>
                    <div v-for="(item, index) in posts" :key="index">
                        <a-card :title="item.title" @click="gotoDetail(item)">
                            <span slot="extra">{{item.topic_main + ' / '}}{{item.topic_sub | isEmpty}}</span>
                            <p class="post-content content">{{item.content}}</p>
                            <template slot="actions" class="ant-card-actions">
                                <span>{{item.create_date}}</span>
                                <span>回复数：{{item.comment_count}}</span>
                            </template>
                        </a-card>
                    </div>
                    <a-pagination v-model="current" 
                        :total="count" 
                        :page-size="pageSize"
                        @change="pageChange"/>
                </a-tab-pane>
                <!-- <a-tab-pane key="3" tab="Tab 3">
                    Content of Tab Pane 3
                </a-tab-pane> -->
            </a-tabs>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return{
            uid: '',
            aid: 1,
            email: '',
            gender: '',
            school: '',
            nickName: '',
            createDate: '',
            description: '',
            posts: [],
            isEdit: false,
            isFollow: false,
            pageSize: 5,
            current: 1,
            count: 0,
            pageSize: 5,
            uidCount: 0,
            buidCount: 0,
            points: 0
        }
    },
    computed: {
        ...mapGetters(["userId"])
    },
    filters: {
        isEmpty(val) {
            if(val)
                return val;
            return '';
        }
    },
    methods:{
        pageChange(page) {
            this.getPost(page)
        },
        isStar() {
            let postData = {
                uid: this.userId,
                build: this.uid
            }
            const self = this;
            this.$axios.get(`/getfollow?uid=${this.userId}&&build=${this.uid}`)
                .then(res => {
                    let data = res.data;
                    if(data.success == true) {
                        self.isFollow = true; 
                    } else {
                        self.isFollow = false;
                    }
                })
                .catch(err => {
                    self.isFollow = false;
                })
        },
        cancelFollow() {
            let postData = {
                uid: this.userId,
                buid: this.uid
            }
            const self = this;
            this.$axios.post('/deleteFollower', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.status) {
                        self.$message.success("取消关注成功")
                        self.isStar()
                    } else {
                        self.$message.error("操作失败")
                    }
                })
                .catch(err => {
                    self.$message.error("操作失败")
                })
        },
        followUser() {
            let postData = {
                uid: this.userId,
                buid: this.uid
            }
            const self = this;
            this.$axios.post('/addFollower', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.status) {
                        self.$message.success("关注成功")
                        self.isStar()
                    } else {
                        self.$message.error("操作失败")
                    }
                })
                .catch(err => {
                    self.$message.error("操作失败")
                })
        },
        callback() {},
        getInfo() {
            const self = this;
            this.$axios.get('/getUserDetailInfo?uid=' + this.uid)
                .then(res => {
                    let data = res.data;
                    if(data) {
                        self.description = data.content;
                        self.gender = data.gendar;
                        self.nickName = data.nickName;
                        self.aid = data.imageId;
                        self.school = data.school;
                        self.email = data.email;
                        self.createDate = data.createDate;
                        self.buidCount = data.buidCount;
                        self.uidCount = data.uidCount;
                        self.points = data.points;
                    }
                })
        },
        gotoDetail(post) {
            this.$router.push({path: '/home/postdetail', 
            query: {
                id: post.pid,
                title: post.title
            }})
        },
        back() {
            this.$router.go(-1);
        },
        getPost(page) {
            let postData = {
                myid: this.userId,
                uid: this.uid,
                page,
                pagesize: this.pageSize
            };
            const self = this;
            this.$axios({
                method: 'GET',
                url: '/posts?' + this.$qs.stringify(postData)
            })
            .then(res => {
                let data = res.data;
                if(data) {
                    self.posts = data.posts;
                    self.count = data.count;
                }
            })
        }
    },
    created() {
        this.uid = this.$route.query.uid;
        this.getInfo();
        this.getPost(1);
        this.isStar();
    }
}
</script>
<style lang="scss" scoped>
.other-profile {
    padding: 24px 10%;
}
header {
    text-align: center;
    .fan-follow {
        margin-top: 20px;
        span {
            margin: 0 20px;
        }
    }
}
.ant-pagination {
    margin-top: 20px;
    text-align: center;
}
.back {
    position: absolute;
    left: 190px;
}
</style>