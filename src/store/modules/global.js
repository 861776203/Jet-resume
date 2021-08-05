import { reactive } from 'vue'
export default function global() {
    const state = reactive({
        loading: false,
        isMobile: false
    })

    function showLoading(msg, time) {
        return new Promise(resolve => {
            state.loading = this.$message({
                type: '',
                iconClass: 'el-icon-loading',
                customClass: 'jet-icon-loading',
                message: msg || '加载中',
                duration: time * 1000,
                onClose: () => {
                    resolve()
                }
            })
        })
    }

    function closeLoading() {
        state.loading.close()
    }

    return {
        state,
        showLoading,
        closeLoading
    }
}