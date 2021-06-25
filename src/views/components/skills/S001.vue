<template>
    <div :class="['S001', tempClass]">
        <div v-for="(item,index) in data.skillInfo" :key="index" class="rate_box">
            <p class="rate_title">{{ item.title }}</p>
            <div class="rate_values">
                <p :style="[{'width': `${item.value*10}%`},{'background': data.skillColor}]" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
export default {
    name: 'S001',
    props: {
        data: {
            type: Object
        },
        type: {
            type: String
        }
    },
    setup() {
        let { proxy } = getCurrentInstance()
        let { state } = proxy.$inject('global')
        let tempClass = computed(() => {
            let className = ''
            if (proxy.type === 'pdf') {
                className = 'S001-pdf'
            } else if (state.isMobile) {
                className = 'S001-mobile'
            }
            return className
        })
        return {
            state,
            tempClass
        }
    }
}
</script>
<style lang='scss' scoped>
.rate_box{
    display: flex;
    align-items: center;
    margin-top: 10px;
    .rate_title{
        width: 100px;
        font-size: 15px;
        color: #333;
        font-weight: 300;
    }
    .rate_values{
        background: #f6f6f6;
        width: 150px;
        height: 15px;
        p{
            height: 100%;
        }
    }
}
.S001-pdf{
    display: flex;
    .rate_box{
        width: 31%;
        .rate_title{
            font-size: 12px;
            transform: scale(.8);
            width: 70px;
            text-align: right;
        }
        .rate_values{
            height: 8px;
        }
    }
}
</style>