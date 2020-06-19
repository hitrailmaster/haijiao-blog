<template>
    <div class="profile-container">
        <a-menu mode="vertical">
            <a-menu-item key="1">
                <router-link to="/home/profile/myprofile">个人资料</router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="/home/profile/changepwd">修改密码</router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="/home/profile/mypost">我的帖子</router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="/home/profile/myanswer">我的回答</router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="/home/profile/myfans">我的粉丝</router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="/home/profile/myfollow">我的关注</router-link>
            </a-menu-item>
            <a-menu-item>
                <router-link to="/home/profile/mycollection">我的收藏</router-link>
            </a-menu-item>
        </a-menu>
        <router-view/>
    </div>
</template>
<style lang="scss" scoped>
.profile-container {
    display: flex;
}
.ant-menu {
    width: 100px;
    margin-left: 30px;
    border: none;
}
.ant-menu-item:nth-child(1) {
    margin-bottom: 0!important;
}
.ant-menu-item:nth-child(2) {
    margin-top: 0!important;
}
.ant-menu-item:nth-child(3) {
    border-top: 1px solid #E33E33!important;
}
.ant-menu-item:nth-child(n+3) {
    margin-bottom: 0!important;
    // border-top: none;
}
.ant-menu-item:nth-child(n+2) {
    margin-top: 0!important;
    border-top: none;
}
.ant-menu-item {
    border: 1px solid #E33E33;
    border-radius: 5px;
    // background: #E33E33;
    margin-bottom: 20px!important;
}
</style>