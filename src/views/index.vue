<template>
    <div class="resume_box">
        <div class="card">
            <C001 :data="data" />
        </div>
        <div class="content">
            <IntroCardsTemplate :data="data" />
        </div>
        <Popup top="120px" tips="编辑" icon="edit" @onClick="showEditPopup = true" />
        <!-- eslint-disable -->
        <EditPopup v-model:show="showEditPopup" :data="data" />
    </div>
</template>
 
<script>
import C001 from './components/cards/C001'
import Settings from '@/data/setting'
export default {
    components: {
        C001
    },
    data() {
        return {
            showEditPopup: false,
            data: Settings
        }
    },
    mounted() {
        setTimeout(() => {
            this.showEditPopup = true
        }, 300)
    },
    methods: {
        
    }
}
</script>
<style lang='scss' scoped>
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
}
.content{
    width: calc(100% - 350px);
    height: 2000px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 5px 20px #bbb;
    margin-left: 350px;
}
@media (max-width: 1150px){
    .resume_box{
        flex-wrap: wrap;
        padding: 20px 20px;
        box-sizing: border-box;
    }
    .card{
        width: 100%;
        margin: 0;
    }
    .content{
        width: 100%;
    }
}
</style>