import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
const app = createApp(App)

// 全局组件自动注册
import {autoRegister} from '@/components/autoRegister'
autoRegister(app)

import './assets/styles/reset.scss'

app.use(router).mount('#app')
