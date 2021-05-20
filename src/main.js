import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
const app = createApp(App)

// 全局组件自动注册
import {autoRegister} from '@/components/autoRegister'
autoRegister(app)

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
app.use(ElementPlus)

import api from './api'
app.config.globalProperties.$api = api

import './assets/styles/reset.scss'

app.use(router).mount('#app')
                                                                                                                                                                                                                                                                                                                                                                                    