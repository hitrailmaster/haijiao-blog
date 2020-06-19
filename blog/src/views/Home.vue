<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <a-layout-header>
            <Header />
            <!-- <Sider /> -->
        </a-layout-header>
        <a-layout-content style="padding: 0">
            <div class="content" :style="style">
                <transition name="fade"
                      enter-active-class="fadeIn"
                      leave-active-class="fadeOut"
                      mode="out-in">
                      <keep-alive include="TopicIndex">
                          <router-view :key="routerViewKey"/>
                      </keep-alive>
            </transition>
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            <Footer />
        </a-layout-footer>
    </a-layout>
</template>
<script>
import Header from './Header'
import Footer from './Footer'
import Sider from './Sider'
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            routerViewKey: "",//解决复用组件后不刷新问题
            timeId: '',
            style: { background: '#fff', padding: '24px'}
        }
    },
    components: {
        Header,
        Footer,
        Sider
    },
    computed: {
        ...mapGetters(["userId"])
    },
    watch:{
        $route(val, oldVal) {
            if(val.path === oldVal.path) {
                this.routerViewKey = this.$route.path + Math.random();
            }
            if(val.path !== '/home/topic') {
                this.style = { background: '#fff', width: '1200px', margin: '20px auto', padding: '20px 120px'}
            } else 
                this.style = { background: '#fff', padding: '24px'}
            }
    },
    methods: {
        ...mapActions(["clearTimeInterval", "updateMessage", "updateUserData"])
    },
    created() {
        if(this.$route.path !== '/home/topic') {
            this.style = { background: '#fff', width: '1200px', margin: '20px auto', padding: '20px 120px'}
        } else 
            this.style = { background: '#fff', padding: '24px'}
        this.timeId = setInterval(this.updateMessage, 60000);
        this.updateMessage()
        window.onbeforeunload = () => {
            clearInterval(this.timeId)
            this.updateUserData(JSON.parse(localStorage.getItem("userData")))
        }
    },
    beforeDestroy() {
        if(this.timeId)
        clearInterval(this.timeId)
    }
}
</script>
<style scoped>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.layout {
    display: flex;
    flex-direction: column;
    background: url("../assets/images/back.jpg")  no-repeat;
    background-size: cover;
    background-position: center center;
}
.ant-layout-content {
    flex-grow: 2;
    height: 100%;
    /* display: flex; */
    /* background: #f0f2f5; */
}
.ant-layout-header {
    z-index: 999;
    position: sticky;
    background: none;
    top: 0;
    padding: 0!important;
}
.content {
    height: 100%;
    /* margin: 20px 20px; */
    padding: 24px;
    opacity: 0.9;
    /* flex-grow: 2; */
    /* padding: 24px ; */
    min-height: calc(100vh - 175px);
}
</style>