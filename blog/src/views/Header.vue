<template>
<div>
    <a-menu
        theme="light"
        mode="horizontal"
        @click="handleSelect"
        :style="{ lineHeight: '64px' }"
    >
        <a-menu-item key="100$全部话题">
            全部话题
        </a-menu-item>
        <a-sub-menu v-for="item in title" :key="item.mainID+'$'+item.mainTitle" @titleClick="handleSelect">
            <span slot="title" class="submenu-title-wrapper">
                {{item.mainTitle}}
            </span>
            <a-menu-item 
                v-for="sonItem in item.subTopics"
                :key="sonItem.subID+'$'+sonItem.subTitle"
            >
                {{sonItem.subTitle}}
            </a-menu-item>
        </a-sub-menu>
        <!-- <a-sub-menu key="else">
            <span slot="title" class="submenu-title-wrapper">其他</span>
            <a-sub-menu v-for="item in otherTitle" :key="item.mainID+'$'+item.mainTitle" @titleClick="handleSelect">
                <span slot="title" class="submenu-title-wrapper">
                    {{item.mainTitle}}
                </span>
                <a-menu-item 
                    v-for="sonItem in item.subTopics"
                    :key="sonItem.subID+'$'+sonItem.subTitle"
                >
                    {{sonItem.subTitle}}
                </a-menu-item>
            </a-sub-menu>
        </a-sub-menu> -->
        <a-menu-item :disabled="true" key="12">
            <a-input-search type="search"
                @search="handleSearch"
                placeholder="搜索全站"
                v-model="keyword"/>
        </a-menu-item>
        <a-menu-item key="13" class="user-info" @click="logout">
            <a-icon type="logout"/>
            <!-- <router-link to="/"><a-icon type="logout" @click="logout"/></router-link> -->
        </a-menu-item>
        <a-menu-item key="14" class="user-info">
            <router-link to="/home/rank">排行榜</router-link>
        </a-menu-item>
        <a-menu-item key="15" class="user-info">
            <router-link to="/home/message"><a-badge :count="unReadMessage">站内信</a-badge></router-link>
        </a-menu-item>
        <a-menu-item key="16" class="user-info">
            <router-link to="/home/newpost">发帖</router-link>
        </a-menu-item>
        <a-menu-item class="user-info" key="17">
            <router-link to="/home/profile">
                <a-avatar shape="circle" v-if="!aid" icon="user" size="large"/>
                <a-avatar shape="circle" v-else :src="'/getimage?iid='+aid" size="large"/>
            </router-link>
        </a-menu-item>
    </a-menu>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CookieUtils from '../js/cookie_utils';
export default {
    data() {
        return {
            title: [],
            otherTitle: [],
            keyword: ''
        }
    },
    computed: {
        ...mapGetters(["message", "aid", "unReadMessage"])
    },
    methods: {
        ...mapActions(["updateUserData", "updateTopicList"]),
        handleSelect(item) {
            if(item.key.indexOf('$') !== -1) {
                let queryList = item.key.split('$');
                this.$router.push({path: '/home/topic', 
                query: {id: queryList[0], title: queryList[1]}})
            }
        },
        handleSearch(value) {
            // if(!this.keyword) return;
            this.$router.push({path: '/home/search', 
            query: {id: '0', title: '搜索结果', keyword: value}})
        },
        logout() {
            this.updateUserData({
                userId: '',
                email: '',
                userName: ''           
            });
            CookieUtils.deleteCookie('uid');
            CookieUtils.deleteCookie('user_name');
            CookieUtils.deleteCookie('email');
            this.$router.push({path: '/login'})
        },
        getAllTopics() {
            const self = this;
            this.$axios.get('/topics')
                .then(res => {
                    let data = res.data;
                    if(data.mainTopics.length > 0) {
                        self.updateTopicList(data.mainTopics)
                        self.title = data.mainTopics.slice(0, 7);
                        self.otherTitle = data.mainTopics.slice(3);
                    }
                })
        }
    },
    created() {
        this.getAllTopics();
        // this.router.push("/Home/profile")
    }
}
</script>
<style lang="scss" scoped>
.ant-menu {
    opacity: 0.8;
}
.anticon-user {
    font-size: 24px!important;
}
.user-info {
    font-size: 18px!important;
    margin: 0;
    float: right;
}
.ant-badge {
    font-size: inherit;
}
.ant-badge-count {
    top: -4px;
    right: -6px!important;
}
.ant-menu-item .anticon {
    margin-right: 0!important;
}
</style>