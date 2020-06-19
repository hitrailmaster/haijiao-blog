<template>
    <div class="collection">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;消息</span>
            <div class="header-right">
                <a-button @click="setRead" style="margin-right: 20px">全部设为已读</a-button>
                <span>数量： {{unReadMessage}}</span>
            </div>

        </header>
        <div v-for="(item, index) in message" :key="index" :class="read">
            <a-card v-if="item.typeId === 3" :class="read">
                用户<a class="user" @click="viewUser(item)">{{item.userNickName}}</a>关注了你
            </a-card>
            <a-card v-else-if="item.typeId === 0" :class="read">
                你的贴子<span class="user" @click="gotoDetail(item)">{{item.posTitle}}</span>有了新的评论
            </a-card>
            <a-card v-else-if="item.typeId === 2" :class="read">
                你的回答被作者设置为有用  帖子：<span class="user" @click="gotoDetail(item)">{{item.posTitle}}</span>
            </a-card>
            <a-card v-else :class="read">
                你的评论被赞了  帖子：<span class="user" @click="gotoDetail(item)">{{item.posTitle}}</span>
            </a-card>
        </div>
        <a-pagination v-model="current" :total="message.length" show-less-items />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: "Message",
    data() {
        return {
            current: 1,
            read: 'no-read',
        }
    },
    computed: {
        ...mapGetters(["message", "unReadMessage"])
    },
    methods: {
        ...mapActions(["updateHasMessage"]),
        handlePostData(data) {
            let postData = [];
            if(data.length) {
                data.forEach(item => postData.push(item.id + ''))
            } else {
                postData.push(data.id + '')
            }
            this.delMessage(postData)
        },
        delMessage(postData) {
            const self = this;
            this.$axios.post('/deleteUserMessages', this.$qs.stringify({ids: postData.join(',')}))
                .then(res => {
                    let data = res.data;
                    // if(data.status)
                })
        },
        setRead() {
            this.read = 'read';
            this.updateHasMessage(0);
            this.handlePostData(this.message);
        },
        gotoDetail(post) {
            this.handlePostData(post);
            this.$router.push({path: '/home/postdetail', 
            query: {
                id: post.posId,
                title: post.posTitle
            }})
        }
    },
    beforeMount() {
        if(!this.unReadMessage) this.read = 'read'
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
.no-read {
        font-weight:800;
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
.before-font {
    background: red;
    color: red;
}
.user {
    color: red;
    font-weight: 500;
    margin: 0 10px;
}

</style>