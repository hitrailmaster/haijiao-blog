<template>
    <div class="rank-container">
        <header>
            <div>
                <a-avatar class="user-avater" v-if="!!aid" size="large" :src="'/getimage?iid='+aid"/>
                <a-avatar class="user-avater" size="large" icon="user" v-else/>
                <span class="user-name">
                    {{username}}
                </span>
                <div class="fan-follow">
                    <span>粉丝人数：{{uidCount}}</span>
                    <span>关注人数：{{buidCount}}</span>
                    <span>积分：{{points}}</span>
                </div>
            </div>
            <span class="before-font">&ensp;</span>
            <span>&ensp;排行榜</span>
        </header>
        <div v-for="(item, index) in users" :key="index">
            <a-card @click="viewUser(item.uid)">
                <span>{{index + 1}}&ensp;</span>
                <!-- <span slot="extra" title="关注"><a-icon type="star"/></span> -->
                <!-- <router-link :to="{path: '/home/otherprofile', query: {uid: item.uid}}"> -->
                    <a-avatar shape="circle" v-if="!item.aid" icon="user" :size="'small'"/>
                    <a-avatar shape="circle" :src="'/getimage?iid='+item.aid" :size="'small'"/>
                    <span class="card-title">{{item.nickname}}</span>
                    <span class="star">
                        <article>{{item.points}}</article>
                        <!-- <a-tooltip placement="bottom" title="取消关注" v-if="item.followmess">
                            <a-icon type="heart" @click.stop="cancelFollow(item.uid)" theme="filled"/>
                        </a-tooltip>
                        <a-tooltip placement="bottom" title="关注" v-else>
                            <a-icon type="heart" @click.stop="followUser(item.uid)"/>
                        </a-tooltip> -->
                    </span>
            </a-card>
        </div>
        <!-- <a-pagination 
            v-model="current" 
            :total="len" 
            :page-size="pageSize"
            @change="pageChange"
            show-less-items /> -->
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            users: [],
            current: 1,
            pageSize: 10,
            len: 0,
            uidCount: 0,
            buidCount: 0
        }
    },
    computed: {
        ...mapGetters(["userId", "aid", "username", "points"])
    },
    methods: {
        cancelFollow(buid) {
            let postData = {
                uid: this.userId,
                buid
            }
            const self = this;
            this.$axios.post('/deleteFollower', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.status) {
                        self.$message.success("取消关注成功")
                        self.getRank(self.current)
                    } else {
                        self.$message.error("操作失败")
                    }
                })
                .catch(err => {
                    self.$message.error("操作失败")
                })
        },
        followUser(buid) {
            let postData = {
                uid: this.userId,
                buid
            }
            const self = this;
            this.$axios.post('/addFollower', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.status) {
                        self.$message.success("关注成功")
                        self.getRank(self.current)
                    } else {
                        self.$message.error("操作失败")
                    }
                })
                .catch(err => {
                    self.$message.error("操作失败")
                })
        },
        pageChange(page) {
            this.getRank(page);
        },
        getRank(page) {
            let postData = {
                uid: this.userId,
                page,
                pagesize: this.pageSize
            }
            const self = this;
            this.$axios({
                url: '/rank?' + this.$qs.stringify(postData),
                method: 'GET',
                })
                .then(res => {
                    let data = res.data;
                    if(data) {
                        self.users = data.rankmessage;
                        self.len = data.common;
                    }
                })
        },
        getInfo() {
            const self = this;
            this.$axios.get('/getUserDetailInfo?uid=' + this.userId)
                .then(res => {
                    let data = res.data;
                    if(data) {
                        self.uidCount = data.uidCount;
                        self.buidCount = data.buidCount;
                    }
                })
        }
    },
    created() {
        this.getRank(1);
        this.getInfo();
        console.log(this.username, this.aid)
    }
}
</script>
<style lang="scss" scoped>
header {
    span {
        font-size: 18px;
    }
    .user-name {
        margin-left: 20px;
    }
    margin-bottom: 10px;
    .before-font {
        background: red;
        color: red;
    }
    .fan-follow {
        margin: 10px 0;
        span {
            font-size: 16px;
            display: block;
        }
    }
}
.rank-container {
    .ant-pagination {
        text-align: center;
    }
}
.card-title {
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    margin-left: 10px;
    color: black;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.rank-card-body {
    margin-top: 10px;
    padding: 5px;
}
article {
    display: inline-block;
}
</style>