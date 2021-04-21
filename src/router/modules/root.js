export default [
    {
        path: '/index',
        component: () => import(/* webpackChunkName: 'root' */ '@/views/index.vue')
    }
]
