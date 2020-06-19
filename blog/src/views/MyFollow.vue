<template>
    <div class="collection">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;我的关注</span>
            <div class="header-right">
                <span>数量： {{count}}</span>
            </div>

        </header>
        <div v-for="(item, index) in follows" :key="index">
            <a-card :title="item.nickname" :key="index" @click="viewUser(item.uid)">
                <span slot="extra" title="取消关注">
                    <a-icon type="heart" theme="filled" @click.stop="cancelFollow(item.uid)"/></span>
                <router-link to="/home/profile">
                    <a-avatar shape="circle" icon="user" size="middle"/>
                </router-link>
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
        <a-pagination v-model="current" 
                :total="count" 
                :page-size="pageSize"
                @change="pageChange"
                show-less-items />
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            current: 1,
            follows: [],
            count: 0,
            pageSize: 5
        }
    },
    computed: {
        ...mapGetters(["userId"])
    },
    methods: {
        cancelFollow(buid) {
            let postData = {
                uid: this.userId,
                buid,
            }
            const self = this;
            this.$axios.post('/deleteFollower', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.status) {
                        self.$message.success("取消关注成功")
                        self.getFollows(self.current)
                    } else {
                        self.$message.error("操作失败")
                    }
                })
                .catch(err => {
                    self.$message.error("操作失败")
                })
        },
        pageChange(page) {
            this.getFollows(page)
        },
        getFollows(page) {
            let postData = {
                uid: this.userId,
                page,
                pagesize: this.pageSize
            };
            const self = this;
            this.$axios.get('/userfollowing?' + this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.following.length > 0) {
                        self.follows = data.following;
                        self.count = data.count;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        
    },
    created() {
        this.getFollows(1);
    },
}
</script>
<style lang="scss" scoped>
.collection {
    padding-left: 20px;
    flex-grow: 2;
}
header {
    span {
        font-size: 18px;
    }
    margin-bottom: 20px;
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
.ant-card {
    margin-bottom: 20px;
}
.ant-pagination {
    text-align: center;
}

</style>