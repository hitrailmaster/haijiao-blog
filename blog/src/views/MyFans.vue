<template>
    <div class="collection">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;我的粉丝</span>
            <div class="header-right">
                <span>数量： {{fans.length}}</span>
            </div>

        </header>
        <div v-for="(item, index) in fans" :key="index">
            <a-card :title="item.nickname" @click="viewUser(item.uid)">
                <!-- <span slot="extra" title="关注">
                    <a-icon type="like"/>
                </span> -->
                <router-link to="/home/profile">
                    <a-avatar v-if="item.aid" shape="circle" :src="'/getimage?iid='+item.aid" size="middle"/>
                    <a-avatar v-else shape="circle" icon="user" size="middle"/>
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
        <a-pagination v-model="current" :total="fans.length" show-less-items />
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            current: 1,
            fans: []
        }
    },
    computed: {
        ...mapGetters(['userId'])
    },
    methods: {
        getFans() {
            const self = this;
            this.$axios.get('/getfans?uid=' + this.userId)
                .then(res => {
                    let data = res.data;
                    if(data.fanscount) {
                        self.fans = data.fans;
                    }
                })
        }
    },
    created() {
        this.getFans();
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
.ant-card {
    margin-bottom: 20px;
}
.ant-pagination {
    text-align: center;
}
.before-font {
    background: red;
    color: red;
}

</style>