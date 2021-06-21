<template>
    <div class="avatar" :style="{width: width + 'px', height: height + 'px', borderRadius: shape==='circle'?'50%':'0'}">
        <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        width: {
            type: Number,
            default: 60
        },
        height: {
            type: Number,
            default: 60
        },
        shape: {
            type: String,
            default: 'circle'
        },
        url: {
            type: String
        }
    },
    mounted() {
        console.log(this.url)
    }
}
</script>
<style lang='scss' scoped>
.avatar{
    margin: 0 auto;
    overflow: hidden;
    img{
        width: 100%;
    }
}
</style>