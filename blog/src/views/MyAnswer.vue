<template>
    <div class="collection">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;我参与的帖子</span>
            <div class="header-right">
                <span>数量： {{count}}</span>
            </div>

        </header>
        <div v-for="(item, index) in posts" :key="index">
            <a-card :title="item.title" @click="gotoDetail(item)">
                <span slot="extra">{{item.maintopic + ' / '}}{{item.subtopic | isEmpty}}</span>
                <p class="post-content content">{{item.content}}</p>
                <template slot="actions" class="ant-card-actions">
                    <span>{{item.create_date}}</span>
                    <!-- <span>回复数：{{item.comment_count}}</span> -->
                </template>
            </a-card>
        </div>
        <a-pagination v-model="current" 
                :total="count" 
                :page-size="pageSize"
                @change="pageChange">
            <!-- <template slot="buildOptionText" slot-scope="props">
                <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                <span v-if="props.value === '50'">全部</span>
            </template> -->
        </a-pagination>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            current: 1,
            posts: [],
            pageSize: 5,
            pageSizeOptions: ['5', '10', '15'],
            count: 0
        }
    },
    filters: {
        isEmpty(val) {
            if(val)
                return val;
            return '';
        }
    },
    computed: {
        ...mapGetters(["userId"])
    },
    methods: {
        gotoDetail(post) {
            this.$router.push({path: '/home/postdetail', 
            query: {
                id: post.pid,
                title: post.title
            }})
        },
        pageChange(page) {
            this.getPost(page)
        },
        getPost(page) {
            let postData = {
                uid: this.userId,
                page,
                pagesize: this.pageSize
            };
            const self = this;
            this.$axios.get('/usercomments?' + this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data) {
                        self.posts = data.comments;
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
.content {
    width: 400px;
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