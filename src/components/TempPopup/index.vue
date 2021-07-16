<template>
    <el-drawer
        :model-value="show"
        :before-close="handleClose"
        destroy-on-close
        :show-close="false"
        size="35%"
        :with-header="false"
    >
        ao
    </el-drawer>
</template>

<script>
import { getCurrentInstance } from 'vue'
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

        return {
            handleClose
        }
    }
}
</script>
<style lang='scss' scoped>

</style>