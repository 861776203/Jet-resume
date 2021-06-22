<template>
    <el-tooltip effect="dark" :content="tips" placement="left">
        <div :style="{'top': top}" class="popup_box" @click="onClick()">
            <img :src="Img">
        </div>
    </el-tooltip>
</template>

<script>
import { toRefs } from 'vue'
export default {
    name: 'Popup',
    props: {
        top: {
            type: String,
            default: '20px'
        },
        tips: {
            type: String
        },
        icon: {
            type: String
        }
    },
    emits: {
        'onClick': null 
    },
    setup(props, {emit}) {
        const { icon } = toRefs(props)
        const Img = require(`@/assets/images/icons/${icon.value}.png`)
        function onClick() {
            emit('onClick')
        }
        return { Img, onClick }
    }
}
</script>
<style lang='scss' scoped>
.popup_box{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: fixed;
    right: 20px;
    background: #fff;
    box-shadow: 0px 1px 20px 0px rgb(0 0 0 / 10%), inset 0px -1px 0px 0px rgb(0 0 0 / 10%);
    margin-bottom: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 16px;
        height: 16px;
    }
}
</style>