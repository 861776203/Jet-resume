import { createApp, inject } from 'vue'
import router from './router/index'
import App from './App.vue'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App).use(ElementPlus, { locale })

// 全局组件自动注册
import {autoRegister} from '@/components/autoRegister'
autoRegister(app)

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
app.use(ElementPlus)

import api from './api'
app.config.globalProperties.$api = api

app.config.globalProperties.$inject = inject

import dayjs from 'dayjs'
app.config.globalProperties.$dayjs = dayjs

// 全局store注册
import store from '@/store/index'
store.map(v => {
    app.provide(v.name, v.module())
})

import './assets/styles/reset.scss'

app.use(router).mount('#app')
                                                                                                                                                                                                                                                                                                                                                                                    