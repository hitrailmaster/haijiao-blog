<template>
    <a-form :form="form" @submit="handleSubmit" class="register-form">
        <a-form-item v-bind="formItemLayout" label="邮箱">
            <a-input
                v-decorator="[
                    'email',
                    {
                        rules: [
                            {
                                type: 'email',
                                message: '邮箱格式不正确!'
                            },
                            {
                                required: true,
                                message: '请输入邮箱!'
                            }
                        ]
                    }
                ]"
            />
        </a-form-item>
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
        <a-form-item v-bind="formItemLayout">
            <span slot="label">
                昵称&nbsp;
            </span>
            <a-input
                v-decorator="[
                    'nickname',
                    {
                        rules: [
                            {
                                required: true,
                                message: '请输入昵称，最大长度为10!',
                                whitespace: true
                            },
                            {
                                max: 10,
                                message: '最大长度为10!',
                            }
                        ]
                    }
                ]"
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
                    />秒后重发
                </a-col>
            </a-row>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
            <a-checkbox
                v-decorator="['agreement', { 
                    valuePropName: 'checked',
                    rules: [
                        {
                            required: true,
                            message: '请勾选!'
                        }
                    ]}]"
            >
                I have read the
                <a-modal :visible="visible" title="注册协议" @ok="setOk" @cancel="setVisible">
                    <p>
                        海角论坛协议（草案）
欢迎您来到海角论坛。

请您仔细阅读以下条款，如果您对本协议的任何条款表示异议，您可以选择不进入海角论坛。当您注册成功，无论是进入海角论坛，还是在海角论坛上发布任何内容（即「内容」），均意味着您（即「用户」）完全接受本协议项下的全部条款。

使用规则
用户注册成功后，海角论坛将给予每个用户一个用户帐号及相应的密码，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。

用户须对在海角论坛的注册信息的真实性、合法性、有效性承担全部责任，用户不得冒充他人；不得利用他人的名义发布任何信息；不得恶意使用注册帐号导致其他用户误认；否则海角论坛有权立即停止提供服务，收回其帐号并由用户独自承担由此而产生的一切法律责任。

用户直接或通过各类方式（如站外 API 引用等）间接使用海角论坛服务和数据的行为，都将被视作已无条件接受本协议全部内容；若用户对本协议的任何条款存在异议，请停止使用海角论坛所提供的全部服务。

海角论坛是一个信息分享、传播及获取的平台，用户通过海角论坛发表的信息为公开的信息，其他第三方均可以通过海角论坛获取用户发表的信息，用户对任何信息的发表即认可该信息为公开的信息，并单独对此行为承担法律责任；任何用户不愿被其他第三人获知的信息都不应该在海角论坛上进行发表。

用户承诺不得以任何方式利用海角论坛直接或间接从事违反中国法律以及社会公德的行为，海角论坛有权对违反上述承诺的内容予以删除。

用户不得利用海角论坛服务制作、上载、复制、发布、传播或者转载如下内容：

反对宪法所确定的基本原则的；
危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
损害国家荣誉和利益的；
煽动民族仇恨、民族歧视，破坏民族团结的；
侮辱、滥用英烈形象，否定英烈事迹，美化粉饰侵略战争行为的；
破坏国家宗教政策，宣扬邪教和封建迷信的；
散布谣言，扰乱社会秩序，破坏社会稳定的；
散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
侮辱或者诽谤他人，侵害他人合法权益的；
含有法律、行政法规禁止的其他内容的信息。
所有用户同意遵守海角论坛社区管理规定（试行） 和海角论坛视频服务协议（试行）。

机构用户同意遵守海角论坛机构号服务协议，以及海角论坛机构号使用规范（试行）。

海角论坛有权对用户使用海角论坛的情况进行审查和监督，如用户在使用海角论坛时违反任何上述规定，海角论坛或其授权的人有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容、暂停或终止用户使用海角论坛的权利）以减轻用户不当行为造成的影响。

知识产权
海角论坛是一个信息获取、分享及传播的平台，我们尊重和鼓励海角论坛用户创作的内容，认识到保护知识产权对海角论坛生存与发展的重要性，承诺将保护知识产权作为海角论坛运营的基本原则之一。

用户在海角论坛上发表的全部原创内容（包括但不仅限于回答、文章和评论），著作权均归用户本人所有。用户可授权第三方以任何方式使用，不需要得到海角论坛的同意。
海角论坛上可由多人参与编辑的内容，包括但不限于问题及补充说明、答案总结、话题描述、话题结构，所有参与编辑者均同意，相关知识产权归海角论坛所有。
海角论坛提供的网络服务中包含的标识、版面设计、排版方式、文本、图片、图形等均受著作权、商标权及其它法律保护，未经相关权利人（含海角论坛及其他原始权利人）同意，上述内容均不得在任何平台被直接或间接发布、使用、出于发布或使用目的的改写或再发行，或被用于其他任何商业目的。
为了促进知识的分享和传播，用户将其在海角论坛上发表的全部内容，授予海角论坛免费的、不可撤销的、非独家使用许可，海角论坛有权将该内容用于海角论坛各种形态的产品和服务上，包括但不限于网站以及发表的应用或其他互联网产品。
第三方若出于非商业目的，将用户在海角论坛上发表的内容转载在海角论坛之外的地方，应当在作品的正文开头的显著位置注明原作者姓名（或原作者在海角论坛上使用的帐号名称），给出原始链接，注明「发表于海角论坛」，并不得对作品进行修改演绎。若需要对作品进行修改，或用于商业目的，第三方应当联系用户获得单独授权，按照用户规定的方式使用该内容。
海角论坛为用户提供「保留所有权利，禁止转载」的选项。除非获得原作者的单独授权，任何第三方不得转载标注了「禁止转载」的内容，否则均视为侵权。
在海角论坛上传或发表的内容，用户应保证其为著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益。如果第三方提出关于著作权的异议，海角论坛有权根据实际情况删除相关的内容，且有权追究用户的法律责任。给海角论坛或任何第三方造成损失的，用户应负责全额赔偿。
如果任何第三方侵犯了海角论坛用户相关的权利，用户同意授权海角论坛或其指定的代理人代表海角论坛自身或用户对该第三方提出警告、投诉、发起行政执法、诉讼、进行上诉，或谈判和解，并且用户同意在海角论坛认为必要的情况下参与共同维权。
海角论坛有权但无义务对用户发布的内容进行审核，有权根据相关证据结合《侵权责任法》、《信息网络传播权保护条例》等法律法规及海角论坛社区指导原则对侵权信息进行处理。
个人隐私
尊重用户个人隐私信息的私有性是海角论坛的一贯原则，海角论坛将通过技术手段、强化内部管理等办法充分保护用户的个人隐私信息，除法律或有法律赋予权限的政府部门要求或事先得到用户明确授权等原因外，海角论坛保证不对外公开或向第三方透露用户个人隐私信息，或用户在使用服务时存储的非公开内容。同时，为了运营和改善海角论坛的技术与服务，海角论坛将可能会自行收集使用或向第三方提供用户的非个人隐私信息，这将有助于海角论坛向用户提供更好的用户体验和服务质量。

如果用户不希望被搜索引擎检索，可在「个人设置」中修改「个人信息」部分的设置，对于站外的用户与搜索引擎，你的姓名会显示为「海角论坛用户」，头像图片也将被隐藏。

您使用或继续使用我们的服务，即意味着同意我们按照海角论坛《海角论坛隐私保护指引》收集、使用、储存和分享您的相关信息。详情请参见《海角论坛隐私保护指引》

侵权举报
处理原则

海角论坛作为知识讨论社区，高度重视自由表达和个人、企业正当权利的平衡。依照法律规定删除违法信息是海角论坛社区的法定义务，海角论坛社区亦未与任何中介机构合作开展此项业务。

受理范围

受理海角论坛社区内侵犯企业或个人合法权益的侵权举报，包括但不限于涉及个人隐私、造谣与诽谤、商业侵权。

涉及个人隐私：发布内容中直接涉及身份信息，如个人姓名、家庭住址、身份证号码、工作单位、私人电话等详细个人隐私；
造谣、诽谤：发布内容中指名道姓（包括自然人和企业）的直接谩骂、侮辱、虚构中伤、恶意诽谤等；
商业侵权：泄露企业商业机密及其他根据保密协议不能公开讨论的内容。
举报条件

用户在海角论坛发表的内容仅表明其个人的立场和观点，并不代表海角论坛的立场或观点。如果个人或企业发现海角论坛上存在侵犯自身合法权益的内容，可以先尝试与作者取得联系，通过沟通协商解决问题。如您无法联系到作者，或无法通过与作者沟通解决问题，您可通过点击内容下方的举报按钮来向海角论坛平台进行投诉。为了保证问题能够及时有效地处理，请务必提交真实有效、完整清晰的材料，否则投诉将无法受理。您需要向海角论坛提供的投诉材料包括：

权利人对涉嫌侵权内容拥有商标权、著作权和/或其他依法可以行使权利的权属证明，权属证明通常是营业执照或组织机构代码证；
举报人的身份证明，身份证明可以是身份证或护照；
如果举报人非权利人，请举报人提供代表权利人进行举报的书面授权证明。
为确保投诉材料的真实性，在侵权举报中，您还需要签署以下法律声明：
• 我本人为所举报内容的合法权利人；
• 我举报的发布在海角论坛社区中的内容侵犯了本人相应的合法权益；
• 如果本侵权举报内容不完全属实，本人将承担由此产生的一切法律责任，并承担和赔偿海角论坛因根据投诉人的通知书对相关帐号的处理而造成的任何损失，包括但不限于海角论坛因向被投诉方赔偿而产生的损失及海角论坛名誉、商誉损害等。
处理流程

出于网络平台的监督属性，并非所有申请都必须受理。海角论坛自收到举报的七个工作日内处理完毕并给出回复。处理期间，不提供任何电话、邮件及其他方式的查询服务。

出现海角论坛已经删除或处理的内容，但是百度、谷歌等搜索引擎依然可以搜索到的现象，是因为百度、谷歌等搜索引擎自带缓存，此类问题海角论坛无权也无法处理，因此相关申请不予受理。您可以自行联系搜索引擎服务商进行处理。

此为海角论坛社区唯一的官方侵权投诉渠道，暂不提供其他方式处理此业务。

用户在海角论坛中的商业行为引发的法律纠纷，由交易双方自行处理，与海角论坛无关。

免责声明
海角论坛不能对用户发表的回答或评论的正确性进行保证。
用户在海角论坛发表的内容仅表明其个人的立场和观点，并不代表海角论坛的立场或观点。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。海角论坛不承担任何法律及连带责任。
海角论坛不保证网络服务一定能满足用户的要求，也不保证网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作保证。
对于因不可抗力或海角论坛不能控制的原因造成的网络服务中断或其它缺陷，海角论坛不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。
协议修改
根据互联网的发展和有关法律、法规及规范性文件的变化，或者因业务发展需要，海角论坛有权对本协议的条款作出修改或变更，一旦本协议的内容发生变动，海角论坛将会直接在海角论坛网站上公布修改之后的协议内容，该公布行为视为海角论坛已经通知用户修改内容。海角论坛也可采用电子邮件或私信的传送方式，提示用户协议条款的修改、服务变更、或其它重要事项。
如果不同意海角论坛对本协议相关条款所做的修改，用户有权并应当停止使用海角论坛。如果用户继续使用海角论坛，则视为用户接受海角论坛对本协议相关条款所做的修改。
                    </p>
                </a-modal>
                <a-button type="link" @click.stop="setVisible">
                    agreement
                </a-button>
            </a-checkbox>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit" class="btn">
                注册
            </a-button>
            <a-button 
                class="btn"
                @click="$router.go(-1)">
                返回
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import qs from "qs";
export default {
    data() {
        return {
            confirmDirty: false,
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
            deadline: Date.now(),
            isFinish: true,
            isShowCountDown: false,
            visible: false
        };
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: "register" });
    },
    methods: {
        setOk() {
            this.form.setFieldsValue({'agreement': true})
            this.setVisible();
        },
        setVisible() {
            this.visible = !this.visible;
        },
        countDownFinish() {
            this.isFinish = !this.isFinish;
            this.isShowCountDown = !this.isShowCountDown;
            // this.deadline = Date.now() + 1000 * 60;
        },
        setCount() {
            this.countDownFinish();
            this.deadline = Date.now() + 1000 * 60;
        },
        getCaptcha() {
            let postData = {
                type: 0,
                email: this.form.getFieldValue("email")
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
                        self.countDownFinish();
                    }
                })
                .catch(err => {
                    self.$message.error("发送失败");
                    self.countDownFinish();
                });
        },
        checkCaptcha() {
            let postData = {
                type: 1,
                email: this.form.getFieldValue("email"),
                code: this.form.getFieldValue("captcha")
            };
            const self = this;
            this.$axios
                .post("/emailverify", this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if (data.success) {
                        return true;
                    } else {
                        self.$message.error("验证码错误");
                    }
                })
                .catch(err => {
                    self.$message.error("验证码错误");
                });
            return false;
        },
        async handleSubmit(e) {
            e.preventDefault();
            let hasError = false;
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log("Received values of form: ", values);
                } else {
                    hasError = true
                }
            });
            if(!hasError && await this.checkCaptcha) {
                let postData = {
                    email: this.form.getFieldValue('email'),
                    nickname: this.form.getFieldValue('nickname'),
                    password: this.form.getFieldValue('password')
                }
                const self = this;
                this.$axios.post('/register', this.$qs.stringify(postData))
                        .then(res => {
                            let data = res.data;
                            if(data.success) {
                                self.$message.success('注册成功', 5);
                                self.$router.push('/login');
                            } else {
                                self.$message.error('注册失败');
                            }
                        })
                        .catch(err => {
                            self.$message.error('注册失败');
                        })
            }
        },
        handleConfirmBlur(e) {
            const value = e.target.value;
            this.confirmDirty = this.confirmDirty || !!value;
        },
        compareToFirstPassword(rule, value, callback) {
            const form = this.form;
            if (value && value !== form.getFieldValue("password")) {
                callback("两次密码输入不匹配!");
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
        handleWebsiteChange(value) {
            let autoCompleteResult;
            if (!value) {
                autoCompleteResult = [];
            } else {
                autoCompleteResult = [".com", ".org", ".net"].map(
                    domain => `${value}${domain}`
                );
            }
            this.autoCompleteResult = autoCompleteResult;
        }
    }
};
</script>
<style lang="scss" scoped>
.ant-statistic {
    display: inline-block;
}
.register-form {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto !important;
    // transform: translate(-10%);
    width: 600px;
    // margin-top: 100px;
    // height: 400px;
    .btn {
        margin: 0 20px;
    }
}
</style>
