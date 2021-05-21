<template>
    <div class="resume_box">
        <div class="card">
            <C001 :data="data" />
        </div>
        <div class="content">
            内容
            <input ref="writ">
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
    methods: {
        
    }
}
</script>
<style lang='scss' scoped>
.resume_box{
    display: flex;
    justify-content: center;
    min-width: 1150px;
    padding-top: 20px;
}
.card{
    width: 320px;
    height: 1000px;
    border: 1px solid #ccc;
    margin-right: 30px;
    border-radius: 5px;
    box-shadow: 0 5px 20px #bbb;
}
.content{
    width: 750px;
    height: 2000px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 5px 20px #bbb;
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