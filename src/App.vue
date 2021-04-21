<template>
    <div id="app">
        <RouterView />
    </div>
</template>

<script>
import store from '@/store/index'
import { provide } from 'vue'
export default {
    name: 'App',
    setup() {
        store.map(v => {
            provide(v.name, v.module)
        })
    }
}
</script>
