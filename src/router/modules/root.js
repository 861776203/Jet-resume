import EmptyLayout from '@/layout/empty'
export default [
    {
        path: '/',
        redirect: '/index',
        component: EmptyLayout,
        children: [
            {
                path: 'index',
                component: () => import(/* webpackChunkName: 'root' */ '@/views/index.vue')
            }
        ]
    }
]
