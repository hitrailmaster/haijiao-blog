<template>
    <div class="rank-container">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;排行榜</span>
        </header>
        <div v-for="(item, index) in users" :key="index">
            {{index + 1 + (current - 1) * pageSize}}
            <a-card @click="viewUser(item.uid)">
                <!-- <span slot="extra" title="关注"><a-icon type="star"/></span> -->
                <!-- <router-link :to="{path: '/home/otherprofile', query: {uid: item.uid}}"> -->
                    <a-avatar shape="circle" v-if="!item.aid" icon="user" :size="'middle'"/>
                    <a-avatar shape="circle" :src="'/getimage?iid='+item.aid" :size="'middle'"/>
                    <span class="card-title">{{item.nickname}}</span>
                    <span class="star">
                        <article>积分：{{item.points}}</article>
                        <a-tooltip placement="bottom" title="取消关注" v-if="item.followmess">
                            <a-icon type="heart" @click.stop="cancelFollow(item.uid)" theme="filled"/>
                        </a-tooltip>
                        <a-tooltip placement="bottom" title="关注" v-else>
                            <a-icon type="heart" @click.stop="followUser(item.uid)"/>
                        </a-tooltip>
                    </span>
                <!-- </router-link> -->
                <div class="rank-card-body">
                    <article>{{item.content}}</article>
                </div>
                <!-- <template slot="actions" class="ant-card-actions">
                    <div class="icons">
                        <span>2020-06-02</span>
                        <a-icon type="like" />
                        <a-icon key="dislike" type="dislike" />
                        <a-icon type="star" />
                    </div>
                </template> -->
            </a-card>
        </div>
        <a-pagination 
            v-model="current" 
            :total="len" 
            :page-size="pageSize"
            @change="pageChange"
            show-less-items />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            users: [],
            current: 1,
            pageSize: 5,
            len: 0
        }
    },
    computed: {
        ...mapGetters(["userId"])
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
        }
    },
    created() {
        this.getRank(1);
    }
}
</script>
<style lang="scss" scoped>
header {
    span {
        font-size: 26px;
    }
    margin-bottom: 40px;
    .before-font {
        background: red;
        color: red;
    }
}
.rank-container {
    .ant-pagination {
        text-align: center;
    }
}
.ant-card {
    // display: inline-block;
    margin-bottom: 20px;
    border-color: #E33E33;
}
.card-title {
    font-weight: 500;
    font-size: 18px;
    margin-left: 20px;
    color: black;
}
.star {
    float: right;
    color: black;
    article {
        margin-right: 20px;
        vertical-align: -3px;
    }
}
.rank-card-body {
    margin-top: 10px;
    padding: 5px;
}
article {
    display: inline-block;
}
</style>