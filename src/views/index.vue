<template>
    <div id="resume_box">
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
            state
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
    // background-size: 100% 100%;
}
.resume_box{
    width: 1150px;
    margin: 0 auto;
    padding-top: 20px;
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