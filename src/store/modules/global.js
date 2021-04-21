import { reactive } from 'vue'

export default function global() {
    const state = reactive({
        name: 'aaoo'
    })
    const setName = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                state.name = '豆豆鸡'
                resolve()
            }, 2000)
        })
    }

    return {
        state,
        setName
    }
}