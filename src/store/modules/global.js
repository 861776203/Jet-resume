import { reactive } from 'vue'
export default function global() {
    const state = reactive({
        loading: false,
        isMobile: false
    })
    function setLoading(flag) {
        state.loading = flag
    }

    return {
        state,
        setLoading
    }
}