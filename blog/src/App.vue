
<template>
  <a-config-provider :locale="locale">
    <!-- 主路由 -->
    <div id="app">
        <vue-scroll :ops="ops">
            <transition name="fade"
                        enter-active-class="fadeInLeft"
                        leave-active-class="fadeOutRight"
                        mode="out-in">
                <router-view/>
            </transition>
        </vue-scroll>
    </div>
    
  </a-config-provider>
</template>

<script>
import vueScroll from 'vuescroll';
import 'vuescroll'
import Home from './views/Home'
import zhCN from "ant-design-vue/lib/locale/zh_CN";
export default {
  data: function() {
    return {
      locale: zhCN,
      ops: {
          bar: {
            //   keepShow: true
          }
      }
    };
  },
  components: {
      Home,
      vueScroll
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url("./assets/images/login_background.jpg");
//   color: #2c3e50;
  height: 100%;
  width: calc(100vw);
}
</style>
