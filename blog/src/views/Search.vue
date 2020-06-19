<template>
    <div>
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;{{title}}</span>
            <div class="header-right">
                <span>帖子数量： {{count}}</span>
            </div>
        </header>
        <div v-for="item in posts" :key="item.pid">
            <a-card :title="item.title" @click="gotoDetail(item)">
                <span slot="extra">{{item.topic_main + ' / '}}{{item.topic_sub | isEmpty}}</span>
                
                <p class="post-content">{{item.content}}</p>
                <template slot="actions" class="ant-card-actions">
                    <!-- <div class="icons"> -->
                        <span>
                            <!-- <canvas-img :iid="item.aid" :pid="item.pid"/> -->
                            <a-avatar class="user-avater" v-if="!!item.aid" size="small" :src="'/getimage?iid='+item.aid"/>
                            <a-avatar class="user-avater" size="small" icon="user" v-else/>
                            &emsp;{{item.username}}
                        </span>
                        <span>{{item.create_date}}</span>
                        <span>回复数：{{item.comment_count}}</span>
                        <a-tooltip placement="bottom" title="取消收藏" v-if="item.collected == 1">
                            <a-icon type="star" @click.stop="starPost(0, item.pid)" theme="filled"/>
                        </a-tooltip>
                        <a-tooltip placement="bottom" title="收藏" v-else>
                            <a-icon type="star" @click.stop="starPost(1, item.pid)"/>
                        </a-tooltip>
                    <!-- </div> -->
                </template>
            </a-card>
        </div>
        <a-pagination v-model="current" 
                :total="count" 
                :page-size="pageSize"
                :page-size-0ptions="pageSizeOptions"
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
import CanvasImg from './CanvasImg'
export default {
    data() {
        return {
            posts: [],
            current: 1,
            title: '全部话题',
            id: 100,
            count: 0, //帖子总数
            sort: 'create_date',
            pageSize: 5,
            pageSizeOptions: ['5', '10', '15'],
            keyword: ''
        }
    },
    computed: {
        ...mapGetters(['userId'])
    },
    components: {
        CanvasImg
    },
    filters: {
        isEmpty(val) {
            if(val)
                return val;
            return '';
        }
    },
    methods: {
        pageChange(page) {
            this.getPost(page)    
        },
        starPost(type, pid) {
            let postData = {
                uid: this.userId,
                pid,
                action: type
            }
            const self = this;
            this.$axios.post('/collect', this.$qs.stringify(postData))
            .then(res => {
                let data = res.data;
                if(data.success) {
                    self.$message.success('操作成功！');
                    self.getPost(self.current);
                } else {
                    self.$message.error('操作失败！');
                }
            })
            .catch(err => {
                console.log(err)
                self.$message.error('操作失败！');
            })
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
                keyword: this.keyword,
                type: 0,
                page,
                pagesize: this.pageSize
            }
            const self = this;
            this.$axios({
                method: 'GET',
                url: '/search?' + this.$qs.stringify(postData)
            })
            .then(res => {
                let data = res.data;
                if(data) {
                    self.posts = data.result;
                    self.count = data.count;
                }
            })
        }
    },
    created() {
        this.title = this.$route.query.title;
        this.id = this.$route.query.id;
        this.keyword = this.$route.query.keyword
        this.getPost(1);
    },
    // watch: {
    //     sort(val, oldVal) {
                // this.current = 1
    //         this.getPost(1);
    //     }
    // }
}
</script>
<style lang="scss" scoped>
.user-avater {
    vertical-align: -5px;
}
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