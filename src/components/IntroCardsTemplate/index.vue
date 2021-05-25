<template>
    <div>
        <I001 v-bind="$props" />
    </div>
</template>

<script>
const requireComponent = require.context(
    '@/views/components/introCards',
    true,
    /\w+\.vue$/
)
let comObj = {}
requireComponent.keys().forEach(fileName => {
    // 获取文件名
    let names = fileName.split('/')[1].replace(/\.\w+$/, '')
    names = names.split('-').join('')
    names = names.charAt(0).toUpperCase() + names.slice(1)
    const componentConfig = requireComponent(fileName)
    comObj[names] = componentConfig.default || componentConfig
})
export default {
    name: 'IntroCardsTemplate',
    components: {
        ...comObj
    },
    props: {
        data: {
            type: Object
        }
    }
}
</script>