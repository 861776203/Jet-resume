export default function global() {
    const state = {
        loading: false
    }
    const setLoading = flag => {
        state.loading = flag
    }

    return {
        state,
        setLoading
    }
}