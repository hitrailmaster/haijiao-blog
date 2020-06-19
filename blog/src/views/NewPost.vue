<template>
    <div>
        <header>
            <span class="before-font">&ensp;</span>
            <span>&ensp;发布新帖子</span>
        </header>
        <div>
            <span>请选择类型：</span>
            <a-select class="sort-list" 
                    v-model="mainId">
                <a-select-option key="-1" value="-1">请选择</a-select-option>
                <a-select-option 
                    v-for="(item, index) in topicList"
                    :key="index" 
                    :value="item.mainID">{{item.mainTitle}}</a-select-option>
            </a-select>
            <a-select class="sort-list" v-model="subId">
                <a-select-option key="-2" value="-1">请选择</a-select-option>
                <a-select-option 
                    v-for="(item, index) in subList"
                    :key="index" 
                    :value="item.subID">{{item.subTitle}}</a-select-option>
            </a-select>
            <a-button @click="setVisible">插入代码</a-button>
            <a-modal
                title="Title"
                :visible="visible"
                @ok="insertCode"
                @cancel="setVisible"
                >
                <a-textarea v-model="code" :autosize="true"></a-textarea>
            </a-modal>
        </div>
        <label for="title">标题：</label>
        <a-textarea v-model="title" 
                    class="post-title" 
                    name="title"
                    placeholder="请输入标题"
                    :allowClear="true"
                    :maxLength="100"/>
        <div class="input-contaniner">
            <a-textarea v-model="content" 
                    class="content" 
                    placeholder="请输入内容"
                    :allowClear="true"
                    :autosize="true"
                    :maxLength="1000"/>
            <div class="preview-container">
                <div v-html="html" class="preview"></div>
            </div>
        </div>
        <div class="btn">
            <a-button type="primary" @click="submit">发表</a-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            html: '',
            content: '',
            code: '',
            visible: false,
            codeList: [],
            index: -1,
            title: '',  //帖子标题
            mainId: '-1',  //主板块id
            subId: '-1',   //子版块id
            subList: []
        }
    },
    computed:{
        ...mapGetters(["userId", "topicList"])
    },
    methods: {
        insertCode() {
            let i = document.getElementsByTagName('textarea')[0];
            const self = this;
            this.$nextTick(() =>{
            this.content = this.content.slice(0,i.selectionStart) + `<-- code${++this.index} -->` +
                        this.content.slice(i.selectionStart);
            });
            this.code = this.code.replace(/\n/g, '<br>');
            this.code = this.code.replace(/\s/g, '&ensp;');
            // this.html += `<p class='code'>${this.code}</p>`;
            this.codeList.push(`<p class='code'>${this.code}</p>`);
            
            this.setVisible();
        },
        setVisible() {
            this.visible = !this.visible;
            this.code = '';
        },
        handleHTML() {
            let reg = /<-- code([0-9]) -->/g;
            let arr = this.content.match(reg);
            this.html = this.content.replace(/\n/g, '<br>');
            if(arr)
                for(let item of arr) {
                    let index = parseInt(item.match(/[0-9]/)[0]);
                    this.html = this.html.replace(item, this.codeList[index])
                }
            this.html = '<p style="word-wrap:break-word;"> ' + this.html + '</p>';
        },
        submit() {
            if(!this.title) {
                this.$message.error('请输入标题');
                return;
            }
            if(!this.content) {
                this.$message.error('请输入内容');
                return;
            }
            if(this.subId == -1 || this.mainId == -1) {
                this.$message.error('请选择所属板块');
                return;
            }
            let postData = {
                uid: this.userId,
                title: this.title,
                tid: this.subId,
                content: this.html
            }
            const self = this;
            this.$axios.post('/addpost', this.$qs.stringify(postData))
                .then(res => {
                    let data = res.data;
                    if(data.pid !== -1) {
                        self.$message.success('发帖成功');
                        self.subList.forEach(item => {
                            if(item.subID === self.subId) {
                                self.$router.push({
                                path: '/home/topic', 
                                query: {id: self.subID,
                                title:item.subTitle}
                            })
                            }
                        })
                        // self.$router.push({
                        //         path: '/home/topic', 
                        //         query: {id: self.subId}
                        //     })
                    } else {
                        self.$message.error('发帖失败');
                    }
                })
                .catch(err => {
                    this.$message.error('发帖失败');
                })
        }
    },
    created() {
        // console.log(this.topicList)
    },
    watch: {
        content(val, oldVal) {
            this.handleHTML();
        },
        mainId(val, oldVal) {
            if(val === oldVal)
                return;
            for(let item in this.topicList) {
                if(this.topicList[item].mainID === val) {
                    this.subList = this.topicList[item].subTopics;
                    return;
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.btn {
    text-align: center;
    margin-top: 20px;
    .ant-btn {
        width: 150px;
    }
}
header {
    span {
        font-size: 26px;
    }
    margin-bottom: 40px;
    .before-font {
        background: red;
        color: red;
    }
}
.sort-list {
    width: 120px;
}
.input-contaniner {
    display: flex;
    width: 100%;
}
.content {
    width: 50%;
    // height: auto;
    flex-grow: 0;
    min-height: 200px;
}
.preview-container {
    flex-grow: 0;
    width: 454px;
    overflow: hidden;
}
.preview {
    // width: 50%;
    padding: 5px;
    height: 100%;
    white-space:unset;
    // flex-grow: 0;
}
.post-title {
    margin-bottom: 20px;
}
</style>