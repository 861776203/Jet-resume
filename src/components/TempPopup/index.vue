<template>
    <el-drawer
        :model-value="show"
        :before-close="handleClose"
        destroy-on-close
        :show-close="false"
        size="360px"
        :with-header="false"
    >
        <div class="temp_box">
            <div class="left">
                <div v-for="(item,index) in tempImages" :key="index" class="temp_img_box" @click="onShowTemp">
                    <img :src="item.url">
                </div>
            </div> 
            <div class="right">
                <div v-for="(item, index) in sideBarData" :key="index" :class="['sidebar', index===sideIndex?'sidebar-active':'']" @click="sideIndex = index">
                    <i :class="item.icon" />
                    <p>{{ item.text }}</p>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { getCurrentInstance, readonly, ref, reactive } from 'vue'
export default {
    name: 'TempPopup',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        let { proxy } = getCurrentInstance()
        function handleClose() {
            proxy.$emit('update:show', false)
        }

        // 侧边栏
        let sideBarData = readonly([
            {icon: 'el-icon-picture-outline', text: '背景'},
            {icon: 'el-icon-picture-outline', text: '侧边栏'}
        ])
        let sideIndex = ref(0)

        // 模板图片
        let tempImages = reactive([
            {url: require('../../assets/images/bgs/bg1.png')}
        ])
        function onShowTemp() {
            console.log('ao')
        }

        return {
            handleClose,
            sideBarData,
            sideIndex,
            tempImages,
            onShowTemp
        }
    }
}
</script>
<style lang='scss' scoped>
$rightWidth: 73px;
.temp_box{
    width: 100%;
    height: 100%;
    display: flex;
    .left{
        width: calc(100% - #{$rightWidth});
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content:flex-start;
        padding: 15px;
        .temp_img_box{
            width: 124px;
            height: 124px;
            background: #f1f5f9;
            margin-bottom: 15px;
            padding: 8px;
            box-sizing: border-box;
            cursor: pointer;
            border: 1px solid #fff;
            transition: .2s;
            img{
                width: 106px;
                height: 106px;
                object-fit: contain;
            }
            &:hover{
                border-color:#1593ff;
            }
        }
    }
    .right{
        width: $rightWidth;
        border-left: 1px solid #ccd5db;
        .sidebar{
            height: 73px;
            padding: 15px 0;
            text-align: center;
            box-sizing: border-box;
            color: #333;
            cursor: pointer;
            transition: .4s;
            i{
                font-size: 30px;
            }
            p{
                font-size: 12px;
            }
            &:hover{
                background: #1593ff;
                color: #fff;
            }
        }
        .sidebar-active{
            position: relative;
            background: #1593ff;
            color: #fff;
            &::after{
                position: absolute;
                content: '';
                width: 0;
                height: 0;
                border-left: 6px solid #fafafa;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                left: -1px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}
</style>