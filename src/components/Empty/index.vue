<template>
    <el-empty :description="description" :image-size="100" />
</template>

<script>
export default {
    name: 'Empty',
    props: {
        description: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>

</style>