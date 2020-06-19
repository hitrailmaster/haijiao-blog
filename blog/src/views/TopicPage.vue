<template>
    <div class="post-container">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;{{title}}</span>
            <div class="header-right">
                <a-select class="sort-list" v-model="sort">
                    <a-select-option key="1" value="comment_count">按热度</a-select-option>
                    <a-select-option key="2" value="create_date">按发表时间</a-select-option>
                </a-select>
                <span>帖子数量： {{count}}</span>
            </div>
        </header>
        <a-skeleton :loading="loading" active/>
        <a-skeleton :loading="loading" active/>
        <a-skeleton :loading="loading" active/>
        <a-skeleton :loading="loading" active/>
        <div v-for="item in topics" :key="item.pid">
            <!-- <a-skeleton :loading="loading"/> -->
            <a-card :title="item.title" @click="gotoDetail(item)">
                <span slot="extra">{{item.topic_main + ' / '}}{{item.topic_sub | isEmpty}}</span>
                
                <p class="post-content">{{item.content}}</p>
                <template slot="actions" class="ant-card-actions">
                    <!-- <div class="icons"> -->
                        <span @click.stop="viewUser(item.uid)" class="user-info">
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
import Sider from './Sider'
export default {
    name: "TopicPage",
    data() {
        return {
            topics: [],
            current: 1,
            title: '全部话题',
            id: 100,
            count: 0, //帖子总数
            sort: 'create_date',
            pageSize: 5,
            pageSizeOptions: ['5', '10', '15'],
            loading: false
        }
    },
    computed: {
        ...mapGetters(['userId'])
    },
    components: {
        CanvasImg,
        Sider
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
                title: post.title,
                subId: post.id_sub
            }})
        },
        getPost(page) {
            this.loading = true;
            let postData = {
                sort: this.sort,
                myid: this.userId,
                page,
                pagesize: this.pageSize
            };
            if(this.title !== '全部话题') {
                postData.topic = this.title;
            }
            const self = this;
            this.$axios({
                method: 'GET',
                url: '/posts?' + this.$qs.stringify(postData)
            })
            .then(res => {
                let data = res.data;
                if(data) {
                    self.topics = data.posts;
                    self.count = data.count;
                    // self.shwoPosts = self.topics.slice(0, self.pageSize);
                }
                self.loading = false
            })
            .catch(err => {
                console.log(err)
                self.loading = false;
            })
        },
    },
    created() {
        if(this.$route.query.title) {
            this.title = this.$route.query.title;
            this.id = this.$route.query.id;
        }
        this.getPost(1);
    },
    watch: {
        sort(val, oldVal) {
            this.getPost(1);
        }
    }
}
</script>
<style lang="scss" scoped>
.user-info {
    // text-align: left;
    float: left;
    margin-left: 5px;
}
.post-container {
    padding: 0 50px;
    flex-grow: 2;
}
.user-avater {
    vertical-align: -5px;
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
.sort-list {
    width: 120px;
    margin-right: 20px;
    height: 100%;
    vertical-align: 3px;
}
.ant-card {
    margin-bottom: 20px;
}
.ant-select {
    font-size: inherit!important;
}
.ant-pagination {
    text-align: center;
}

</style>