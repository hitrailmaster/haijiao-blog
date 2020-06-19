<template>
    <div class="canvas-img">
        <template>
            <a-upload
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                accept="image/jpeg,image/jpg,image/png"
                action="localhost:8080/addimage"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChange"
                :disabled="!isEdit"
            >
                <canvas id="myCanvas"/>
                <a-icon :type="loading ? 'loading' : 'plus'" class="plus"/>
            </a-upload>
            <!-- <img src="/getimage?iid=15"> -->
        </template>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            loading: false,
            imageUrl: '',
            isabled: true
        }
    },
    props: ['iid', 'pid', 'isEdit'],
    computed: {
        ...mapGetters(["userId"])
    },
    methods: {
        handleChange(file) {
            // console.log(file)
            // var reader = new FileReader();
            // reader.readAsDataURL(file);
            // reader.onload = function(event){
            //     console.log(reader)
            //     this.imageUrl = event.target.result;//base64
            // }
        },
        beforeUpload(file) {
            
            // let img = new ImageData(file)
            var reader = new FileReader();
            reader.readAsDataURL(file);
            const self = this;
            reader.onload = function(event){
                self.imageUrl = event.target.result;//base64
                self.drawImg(file)
            }
            return false;
        },
        drawImg(file) {
            let canvas = document.getElementById('myCanvas');
            let ctx = canvas.getContext('2d');
            let img = new Image();
            img.src = this.imageUrl;
            const self = this;
            img.onload = () =>{
                ctx.drawImage(img, 0, 0, 500, 500)
                let newImageData = canvas.toDataURL(file.type, 0.8);
                let resultFile = this.dataURLtoFile(newImageData,file.name);
                self.uploadImage(resultFile)
            }
        },
        dataURLtoFile(dataurl, filename) {
            let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        },
        uploadImage(file) {
            let postData = new FormData();
            postData.append('bin', file);
            postData.append('uid', this.userId);
            this.$axios.post('/setimage', postData)
                .then(res => {
                    let data = res.data;
                    if(data.success) {
                        this.$message.success('上传成功');
                    }
                })
        },
        getImage() {
            if(this.iid) {
                let canvas = document.getElementById('myCanvas');
                let ctx = canvas.getContext('2d');
                let img = new Image();
                img.src = '/getimage?iid=' + this.iid;
                img.onload = () =>{
                    ctx.drawImage(img, 0, 0, 500, 500);
                }
            }
        }
    },
    created() {
        this.getImage();
    },
    watch: {
        iid() {
            this.getImage();
        }
    }
}
</script>
<style lang="scss" scoped>
.canvas-img {
    display: inline-block;
}
canvas {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.plus {
    position: absolute;
    top: 25px;
    left: 25px;
    transform: translate(-50%, -50%)
}
</style>