import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

const routes = []
const require_module = require.context('./modules', false, /.js$/)
require_module.keys().forEach(file_name => {
    routes.push(require_module(file_name).default)
})

routes.push({
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404'),
    meta: {
        title: '找不到页面'
    }
})

const routerHistory = createWebHashHistory()
const router = createRouter({
    history: routerHistory,
    routes: routes.flat()
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    NProgress.done()
    next()
})

export default router
