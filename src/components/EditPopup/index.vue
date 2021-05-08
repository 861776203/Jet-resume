<template>
    <el-drawer
        :model-value="show"
        title="编辑"
        :before-close="handleClose" 
        destroy-on-close
    >
        <el-form ref="form" class="form" size="small" label-width="120px" label-suffix="：">
            <div class="basic_info">
                <p class="form_title">基本信息<i class="el-icon-circle-plus-outline" /></p>
                <el-form-item label="ao" />
            </div>
        </el-form>
        <div class="drawer__footer">
            <el-button size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary">保 存</el-button>
        </div>
    </el-drawer>
</template>

<script>
export default {
    name: 'EditPopup',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleClose() {
            this.$emit('update:show', false)
        }
    }
}
</script>
<style lang='scss' scoped>
.form{
    padding: 0 20px;
    .form_title{
        i{
            margin-left: 5px;
            cursor: pointer;
            &:hover{
                color: #409eff;
            }
        }
    }
}
.drawer__footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #d9d9d9;
    padding: 10px 20px 10px;
    display: flex;
    justify-content: flex-end;
}
</style>