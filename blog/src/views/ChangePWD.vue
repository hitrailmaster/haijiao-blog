<template>
    <a-form :form="form" @submit="handleSubmit" class="register-form">
        <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
            <a-input
                v-decorator="[
                    'password',
                    {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!'
                            },
                            {
                                validator: validateToNextPassword
                            }
                        ]
                    }
                ]"
                type="password"
            />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
            <a-input
                v-decorator="[
                    'confirm',
                    {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            },
                            {
                                validator: compareToFirstPassword
                            }
                        ]
                    }
                ]"
                type="password"
                @blur="handleConfirmBlur"
            />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="验证码">
            <a-row :gutter="8">
                <a-col :span="12">
                    <a-input
                        v-decorator="[
                            'captcha',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            'Please input the captcha you got!'
                                    }
                                ]
                            }
                        ]"
                    />
                </a-col>
                <a-col :span="12">
                    <a-button @click="getCaptcha" :disabled="!isFinish"
                        >获取验证码</a-button
                    >
                </a-col>
                <a-col :span="12" v-show="isShowCountDown">
                    <a-statistic-countdown
                        :value="deadline"
                        format="ss"
                        @finish="countDownFinish"
                    />&ensp;秒后重发
                </a-col>
            </a-row>
        </a-form-item>
        <a-form-item
            v-bind="tailFormItemLayout"
            :style="{ 'text-align': 'center' }"
        >
            <a-button type="primary" html-type="submit">
                提交
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            confirmDirty: false,
            // residences,
            autoCompleteResult: [],
            formItemLayout: {
                labelCol: {
                    xs: { span: 6 },
                    sm: { span: 6 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                }
            },
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0
                    },
                    sm: {
                        span: 16,
                        offset: 8
                    }
                }
            },
            isShowCountDown: false,
            deadline: Date.now(),
            isFinish: true,
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: "register" });
    },
    computed: {
        ...mapGetters(["email", "userId"])
    },
    methods: {
        countDownFinish() {
            this.isFinish = !this.isFinish;
            this.isShowCountDown = !this.isShowCountDown;
            // this.deadline = Date.now() + 1000 * 2;
        },
        setCount() {
            this.countDownFinish();
            this.deadline = Date.now() + 1000 * 60;
        },
        getCaptcha() {
            let postData = {
                type: 0,
                email: this.email
            };
            const self = this;
            this.$axios
                .post("/emailverify", this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if (data.success) {
                        self.$message.success("发送成功");
                        self.setCount();
                    } else {
                        self.$message.error("发送失败");
                    }
                })
                .catch(err => {
                    self.$message.error("发送失败");
                });
        },
        handleSubmit(e) {
            e.preventDefault();
            let postData = {
                password: this.form.getFieldValue('password'),
                email: this.email,
                code: this.form.getFieldValue('captcha')
            };
            const self = this;
            this.$axios
                .post("/FPCodeVerify", this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if (data.status) {
                        self.$message.success("修改成功");
                        self.setCount();
                        self.$router.push('/home/profile/myprofile');
                    } else {
                        self.$message.error("修改失败");
                    }
                })
                .catch(err => {
                    self.$message.error("修改失败");
                });
        },
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue("password")) {
                callback("Two passwords that you enter is inconsistent!");
            } else {
                callback();
            }
        },
        validateToNextPassword(rule, value, callback) {
            const form = this.form;
            if (value && this.confirmDirty) {
                form.validateFields(["confirm"], { force: true });
            }
            callback();
        },
    }
};
</script>
<style lang="scss" scoped>
.ant-statistic {
    display: inline-block;
}
.register-form {
    margin-left: 50px;
    // position: absolute;
    // top: 0;
    // bottom: 0;
    // left: 0;
    // right: 0;
    // margin: auto!important;
    /* transform: translate(-50%, -50%); */
}
</style>
