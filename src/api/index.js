import axios from 'axios'
import { ElMessage } from 'element-plus'
// import qs from 'qs'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    timeout: 10000,
    responseType: 'json'
    // withCredentials: true
})

api.interceptors.request.use(
    request => {
        // request.data = qs.stringify(request.data)
        return request
    }
)

api.interceptors.response.use(
    response => {
        if (response.data.code === -1) {
            ElMessage.error(response.data.msg || '系统错误')
            return Promise.reject(response.data)
        }
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error)
    }
)

export default api
