<template>
    <div id="app" v-loading="state.loading">
        <RouterView />
    </div>
</template>

<script>
import { inject } from 'vue'
export default {
    name: 'App',
    setup() {
        let {state} = inject('global')
        return {
            state
        }
    }
}
</script>
<style lang='scss' scoped>
#app{
    padding-bottom: 40px;
    background-image: url('./assets/images/bgs/bg1.png');
    // background-size: 100% 100%;
}
</style>
