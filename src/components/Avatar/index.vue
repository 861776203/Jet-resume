<template>
    <div class="avatar" :style="{width: size + 'px', height: size + 'px', borderRadius: shape==='circle'?'50%':'0'}">
        <div v-if="loading" class="loader" />
        <img v-else :src="getImg(url)">
    </div>
</template>

<script>
export default {
    name: 'Avatar',
    props: {
        size: {
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
    data() {
        return {
            loading: false
        }
    },
    methods: {
        getImg(val) {
            let url = ''
            try {
                url = require(`@/data/upload/${val}`)
                this.loading = false
            } catch (e) {
                this.loading = true
            }
            return url
        }
    }
}
</script>
<style lang='scss' scoped>
.avatar{
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    img{
        width: 100%;
    }
    .loader {
        margin: 0 auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 1.1em solid rgba(27, 209, 36, 0.2);
        border-right: 1.1em solid rgba(27, 209, 36, 0.2);
        border-bottom: 1.1em solid rgba(27, 209, 36, 0.2);
        border-left: 1.1em solid #ffffff;
        -webkit-animation: load 1.1s infinite linear;
        animation: load 1.1s infinite linear;
    }
    .loader,
    .loader:after {
        border-radius: 50%;
        width: 30%;
        height: 30%;
    }
    @-webkit-keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes load {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
}
</style>