<template>
<div @keyup.enter="login">
    <header>
        <h3>
            <marquee behavior="" direction="">
                欢迎来到<span>海角论坛</span>
            </marquee>
            <!-- 欢迎来到<span>海角论坛</span> -->
        </h3>
    </header>
    <main class="main">
        <div class="introduce">
            <h1>专业</h1>
            <h1>专注</h1>
            <h1>专为程序员</h1>
        </div>
        <a-form id="components-form-demo-normal-login" class="login-form" @keyup.enter="login">
            <a-form-item>
                <a-input
                    v-decorator="[
                        'userName',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]
                        }
                    ]"
                    placeholder="邮箱"
                    v-model="email"
                >
                    <a-icon
                        slot="prefix"
                        type="user"
                        style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-decorator="[
                        'password',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]
                        }
                    ]"
                    type="password"
                    v-model="pwd"
                    placeholder="密码"
                >
                    <a-icon
                        slot="prefix"
                        type="lock"
                        style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-checkbox
                    v-model="isKeep"
                    v-decorator="[
                        'remember',
                        {
                            valuePropName: 'checked',
                            initialValue: true
                        }
                    ]"
                >
                    一周内免登录
                </a-checkbox>
                <a class="login-form-forgot" href="">
                    <router-link to="/forgetpwd">忘记密码</router-link>
                </a>
                <a-button :loading="loading" 
                        type="primary" 
                        class="login-form-button"
                        @click="login">
                    登录
                </a-button>
                <a href="" @click="register">
                    <router-link to="/register">注册</router-link>
                </a>
            </a-form-item>
        </a-form>
    </main>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        return {
            email: "",
            pwd: "",
            uid: "",
            userName: "",
            isKeep: false,
            loading: false
        };
    },
    computed: {
        ...mapGetters(["userId"])
    },
    methods: {
        ...mapActions(["updateUserData", "updateMessage", "updateMasterList"]),
        login() {
            this.loading = true;
            let postData = {
                email: this.email,
                password: this.pwd
            };
            const self = this;
            this.$axios
                .post("/login", this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if (data.status === "success") {
                        // self.updateUserData(data.uid);
                        self.uid = data.info.uid;
                        self.userName = data.info.nickname;
                        self.aid = data.info.aid;
                        self.storeInfo(data.info);
                        // self.$router.push('/home')
                        self.$message.success("登录成功！");
                        if(data.info.status == 1)
                            self.getMaster();
                    } else {
                        self.$message.error("登录失败！");
                    }
                    self.loading =  false;
                })
                .catch(err => {
                    console.log(err);
                    self.$message.error("登录失败！");
                    self.loading = false;
                });
        },
        storeInfo(userData) {
            if (this.isKeep) {
                var d = new Date();
                d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
                var expires = "expires=" + d.toGMTString();
                document.cookie = "email=" + this.email + "; " + expires;
                document.cookie = "uid=" + this.uid + "; " + expires;
                document.cookie = "user_name=" + this.userName + "; " + expires;
                localStorage.setItem("userData", JSON.stringify(userData))
            }
            this.updateUserData({
                uid: this.uid,
                email: this.email,
                username: this.userName,
                aid: this.aid,
                status: userData.status,
                points: userData.points
            });
            this.$router.push("/home");
            this.updateMessage();
        },
        register() {
            this.$router.push({ path: "/register" });
        },
        enterKey(event) {
            const componentName = this.$options.name;
            if (componentName == "Login") {
                const code = event.keyCode
                    ? event.keyCode
                    : event.which
                        ? event.which
                        : event.charCode;
                if (code == 13) {
                    this.login();
                }
            }
        },
        enterKeyupDestroyed() {
            document.removeEventListener("keyup", this.enterKey);
        },
        enterKeyup() {
            document.addEventListener("keyup", this.enterKey);
        },
        getMaster() {
            const self = this;
            this.$axios.get('/mastertopic?uid=' + this.uid)
                .then(res => {
                    let data = res.data;
                    self.updateMasterList(data)
                })
        }
    },
    mounted() {
        this.enterKeyup();
    },
    destroyed() {
        this.enterKeyupDestroyed();
    },
    created() {
        if (!!this.userId && this.userId !== "undefined") {
            this.$nextTick(() =>this.$router.push("/home"));
            this.updateUserData(JSON.parse(localStorage.getItem("userData")))
        }
    }
};
</script>
<style lang="scss" scoped>
// .login-container {

// }
header {
    height: 80px;
    background: #ee6e73;
    display: flex;
    // justify-content: center;
    align-items: center;
    h3 {
        margin-left: 200px;
        font-size: 24px;
        span {
            font-weight: 600;
            margin-left: 20px;
            font-size: 28px;
        }
    }
}
.main {
    display: flex;
    justify-content: space-around;
    // margin-top: 100px;
}
.introduce {
        // position: absolute;
        // left: 100px;
        // top: 80px;
        font-size: 32px;
        transform: rotate3d(45deg)
}
.login-form {
    // position: absolute;
    margin-top: 100px;
    // margin: auto !important;
    width: 500px;
    height: 300px;
    padding: 30px;
    background: white;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
}
#components-form-demo-normal-login .login-form-forgot {
    float: right;
}
#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>
