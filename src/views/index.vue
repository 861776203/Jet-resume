<template>
    <div id="resume_box">
        <div class="corner">
            <el-switch v-model="value1" />
        </div>
        <div class="resume_box">
            <div class="card">
                <CardsTemplate :data="data" />
            </div>
            <div class="content">
                <IntroCardsTemplate :data="data" />
            </div>
        </div>
        <Popup top="120px" tips="编辑" icon="edit" @onClick="showEditPopup = true" />
        <Popup top="180px" tips="下载PDF" icon="pdf" @onClick="showPDF" />
        <!-- <Popup top="240px" tips="模板" icon="pdf" @onClick="showPDF" /> -->
        <!-- eslint-disable -->
        <EditPopup v-model:show="showEditPopup" :data="data" />
        <PdfPopup v-model:show="showPdfPopup" :data="data" />
    </div>
</template>

<script>
import { inject } from 'vue'
import Settings from '@/data/setting'
export default {
    data() {
        let { state } = inject('global')
        return {
            showEditPopup: false,
            showPdfPopup: false,
            data: {},
            state,
            value1: true
        }
    },
    created() {
        Settings.headImg = Settings.headImg ? Settings.headImg.split(',') : []
        this.data = Settings
        if (window.innerWidth < 1150) {
            this.setMobile(true)
        }
    },
    mounted() {
        // setTimeout(() => {
        //     this.showEditPopup = true
        // }, 300)
    },
    methods: {
        showPDF() {
            this.showPdfPopup = true
        },
        setMobile(val) {
            this.state.isMobile = val
        }
    }
}
</script>
<style lang='scss' scoped>
#resume_box{
    padding-bottom: 40px;
    background-image: url('../assets/images/bgs/bg1.png');
    .corner{
        position: absolute;
        height: 54px;
        width: 54px;
        left: 0;
        top: 0;
        transition: .6s;
        overflow: hidden;
        &::before{
            position: absolute;
            content: '';
            height: 100%;
            width: 100%;
            top: -4px;
            left: -4px;
            border-radius: 0 0 0px 90px / 0 0 0 30px;
            background: linear-gradient(45deg, #979595 24%, #b8b5b5 40%,#b4b1b1 43%,#b4b1b1 46%,#bebbbb 50%,#fff 50%,#fff);
            transform: rotate(272deg);
            box-shadow: 5px 2px 8px rgb(182, 180, 180);
            cursor: pointer;
        }
        &:hover{
            height: 90px;
            width: 90px;
            .el-switch{
                opacity: 1;
            }
        }
        .el-switch{
            transform: rotate(-45deg);
            left: 10px;
            top: 15px;
            opacity: 0;
            transition: .4s;
        }
    }
}
.resume_box{
    width: 1150px;
    margin: 0 auto;
    padding-top: 60px;
}
.card{
    width: 320px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 5px 20px #bbb;
    position: absolute;
    background: #fff;
}
.content{
    width: calc(100% - 350px);
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 5px 20px #bbb;
    margin-left: 350px;
    background: #fff;
}
@media (max-width: 1150px){
    .resume_box{
        flex-wrap: wrap;
        padding: 20px 20px;
        box-sizing: border-box;
        width: 100%;
    }
    .card{
        width: 100%;
        margin: 0;
        position: relative;
    }
    .content{
        width: 100%;
        margin: 0;
    }
}
</style>