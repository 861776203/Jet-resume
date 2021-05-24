<template>
    <div>
        <div v-for="(item,index) in data.skillInfo" :key="index" class="rate_box">
            <p class="rate_title">{{ item.title }}</p>
            <div class="rate_values">
                <p :style="[{'width': `${item.value*10}%`},{'background': data.skillColor}]" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'S001',
    props: {
        data: {
            type: Object
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
</style>