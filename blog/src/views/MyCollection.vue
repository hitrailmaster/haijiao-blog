<template>
    <div class="collection">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;全部收藏</span>
            <div class="header-right">
                <span>数量： {{count}}</span>
            </div>

        </header>
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
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            posts: [],
            current: 1,
            count: 0,
            pageSize: 5,
        }
    },
    computed: {
        ...mapGetters(["userId"])
    },
    methods: {
        pageChange(page) {
            this.getPost(page)
        },
        gotoDetail(post) {
            this.$router.push({path: '/home/postdetail', 
            query: {
                id: post.pid,
                title: post.title
            }})
        },
        getPost(page) {
            let postData = {
                uid: this.userId,
                page,
                pagesize: this.pageSize
            };
            const self = this;
            this.$axios({
                method: 'GET',
                url: '/collectPosts?' + this.$qs.stringify(postData),
                data: this.$qs.stringify(postData)
            })
            .then(res => {
                let data = res.data;
                if(data) {
                    self.posts = data.content;
                    self.count = data.count;
                }
            })
        }
    },
    created() {
        this.getPost(1);
    }
}
</script>
<style lang="scss" scoped>
.collection {
    padding-left: 20px;
    flex-grow: 2;
}
.anticon {
    margin-left: 20px;
    cursor: pointer;
}
.content {
    width: 400px;
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