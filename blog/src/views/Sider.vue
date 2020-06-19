<template>
<div class="menu-container">
    <a-menu
        theme="light"
        @click="handleSelect"
        :style="{ lineHeight: '64px' }"
    >
        <!-- <a-menu-item key="100$全部话题">
            全部话题
        </a-menu-item> -->
        <!-- <a-menu-item :disabled="true" key="12">
            <a-input-search type="search"
                @search="handleSearch"
                placeholder="搜索全站"
                v-model="keyword"/>
        </a-menu-item> -->
        <a-skeleton :loading="!topicList" active/>
        <a-sub-menu v-for="item in topicList" :key="item.mainID+'$'+item.mainTitle" @titleClick="handleSelect">
            <a-skeleton :loading="!topicList"/>
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
    </a-menu>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import CookieUtils from '../js/cookie_utils';
export default {
    data() {
        return {
            keyword: '',
            loading: true
        }
    },
    computed: {
        ...mapGetters(["message", "aid", "unReadMessage", "topicList"])
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
    },
    created() {
        // this.getAllTopics();
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
.menu-container {
    padding: 20px;
    // display: inline-block;
    height: calc(100vh - 175px);
    overflow-y: scroll;
    width: 300px;
}
</style>