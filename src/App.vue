<template>
    <div>
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
