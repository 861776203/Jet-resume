<template>
    <div>
        <el-upload
            list-type="picture-card"
            :action="url"
            name="file"
            :on-success="onSuccess"
            :file-list="fileList"
        >
            <template #default>
                <i class="el-icon-plus" />
            </template>
            <template #file="{file}">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                </div>
            </template>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'ImageUpload',
    data() {
        return {
            url: process.env.VUE_APP_API_ROOT + '/upload',
            fileList: []
        }
    },
    methods: {
        onSuccess(e) {
            console.log(e)
        }
    }
}
</script>