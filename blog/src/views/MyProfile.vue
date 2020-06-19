<template>
    <div class="collection">
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;我的信息</span>
            <div class="header-right">
                <a-button v-if="!isEdit" @click="edit">编辑</a-button>
                <span v-else>
                    <a-button @click="submit">提交</a-button>
                    <a-button @click="edit">取消</a-button>
                </span>
            </div>
        </header>
        <div>
            <div class="avatar">
                <a-tooltip placement="bottom" title="上传头像">
                    <canvas-img :iid="iid" :isEdit="isEdit"></canvas-img>
                </a-tooltip>
            </div>
            <a-form class="register-form" layout="horizontal">
                <a-form-item label="昵称">
                    <a-input v-model="nickName" :disabled="!isEdit"/>
                </a-form-item>
                <a-form-item label="邮箱">
                    <a-input v-model="email" :disabled="true"/>
                </a-form-item>
                <a-form-item label="创建日期">
                    <a-input v-model="createDate" :disabled="true"/>
                </a-form-item>
                <a-form-item label="性别">
                    <a-radio-group v-model="gender" :disabled="!isEdit">
                        <a-radio value="男">
                            男
                        </a-radio>
                        <a-radio value="女">
                            女
                        </a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="学校">
                    <a-input v-model="school" :disabled="!isEdit"/>
                </a-form-item>
                <a-form-item label="个人简介">
                    <a-textarea v-model="description" :disabled="!isEdit" :autosize="true"></a-textarea>
                </a-form-item>
            </a-form>
        </div>
          
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CanvasImg from './CanvasImg'
export default {
    data() {
        return {
            topics: [
                "相对于 static 定位以外的第一个",
                "11111",
                "相对于 static 定位以外的第一个",
                "11111",
                "11111",
            ],
            current: 1,
            imageId: '',
            isEdit: false,
            gender: '',
            school: '',
            nickName: '',
            createDate: '',
            description: '',
            iid: ''

        }
    },
    computed: {
        ...mapGetters(["email", "userId"])
    },
    components: {
        CanvasImg
    },
    methods: {
        edit() {
            this.isEdit = !this.isEdit;
            this.getInfo();
        },
        submit() {
            let postData = {
                nickname: this.nickName,
                uid: this.userId,
                gendar: this.gender,
                content: this.description,
                school: this.school
            }
            const self = this;
            this.$axios.post('/updateuserdetailinfo', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data) {
                        self.edit();
                        self.$message.success('修改成功');
                    } else {
                        self.$message.error('修改失败');
                    }
                })
                .catch(err => {
                    self.$message.error('修改失败');
                })
        },
        getInfo() {
            const self = this;
            this.$axios.get('/getUserDetailInfo?uid=' + this.userId)
                .then(res => {
                    let data = res.data;
                    if(data) {
                        self.description = data.content;
                        self.gender = data.gendar;
                        self.nickName = data.nickName;
                        self.iid = data.imageId;
                        self.school = data.school;
                        self.createDate = data.createDate;
                    }
                })
        }
    },
    created() {
        this.getInfo();
    },
    watch: {
        imageId(val) {
            console.log(val)
        }
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

</style>