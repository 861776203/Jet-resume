<template>
    <el-drawer
        :model-value="show"
        title="编辑"
        :before-close="handleClose" 
        destroy-on-close
    >
        <el-form ref="form" class="form" :model="form" :rules="rules" size="small" label-suffix="：">
            <div class="drawer_box" :style="{'height': height-130+'px'}">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="地点" prop="address">
                    <el-input v-model="form.address" placeholder="请输入地点" />
                </el-form-item>
                <el-form-item label="职业" prop="job">
                    <el-input v-model="form.job" placeholder="请输入职业" />
                </el-form-item>
                <div class="basic_info">
                    <p class="form_title">基本信息<i class="el-icon-circle-plus-outline" @click="addBasicInfo" /></p>
                    <div v-for="(item,index) in form.basicInfo" :key="index" class="from_item">
                        <el-form-item :prop="'basicInfo.'+index+'.title'" :rules="getRules('标题')">
                            <el-input v-model="item.title" placeholder="请输入标题" maxlength="7" />
                        </el-form-item>
                        <el-form-item :prop="'basicInfo.'+index+'.text'" :rules="getRules('信息')">
                            <el-input v-model="item.text" placeholder="请输入信息" />
                        </el-form-item>
                        <i class="el-icon-remove-outline" @click="onDel('basicInfo', index)" />
                    </div>
                    <Empty v-show="!form.basicInfo || !form.basicInfo.length" description="请添加基本信息" />
                </div>
                <div>
                    <p class="form_title">联系方式<i class="el-icon-circle-plus-outline" @click="addContacInfo" /></p>
                    <el-form-item prop="contactUrlColor" label="链接颜色">
                        <el-color-picker v-model="form.contactUrlColor" />
                    </el-form-item>
                    <div v-for="(item,index) in form.contactInfo" :key="index" class="from_item">
                        <el-form-item :prop="'contactInfo.'+index+'.title'" :rules="getRules('标题')">
                            <el-input v-model="item.title" placeholder="请输入标题" maxlength="7" />
                        </el-form-item>
                        <el-form-item :prop="'contactInfo.'+index+'.text'" :rules="getRules('信息')">
                            <el-input v-model="item.text" placeholder="请输入信息" />
                        </el-form-item>
                        <i class="el-icon-remove-outline" @click="onDel('contactInfo', index)" />
                    </div>
                    <!-- <Empty v-show="!form.contactInfo || !form.contactInfo.length" description="请添加联系方式" /> -->
                </div>
            </div>
        </el-form>
        <div class="drawer__footer">
            <el-button size="small" @click="handleClose">取 消</el-button>
            <el-button size="small" type="primary" @click="onSubmit">保 存</el-button>
        </div>
    </el-drawer>
</template>

<script>
import { deepClone, deepCompare } from '@/util'
export default {
    name: 'EditPopup',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            form: {},
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                address: [{ required: true, message: '请输入地点', trigger: 'blur' }],
                job: [{ required: true, message: '请输入职业', trigger: 'blur' }]
            },
            height: document.body.clientHeight
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.form = deepClone(this.data)
            }
        }
    },
    created() {
        window.addEventListener('resize', () => {
            this.height = document.body.clientHeight
        })
    },
    methods: {
        handleClose() {
            if (!deepCompare(this.form, this.data)) {
                this.$confirm('还未保存数据是否关闭？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$emit('update:show', false)
                }).catch(() => {
                    return
                })
            } else {
                this.$emit('update:show', false)
            }
        },
        onSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$api.post('/updateinfo', this.form).then(() => {
                        this.$message.success('保存成功')
                        this.$emit('update:show', false)
                    })
                }
            })
        },
        addBasicInfo() {
            let { basicInfo } = this.form
            if (!basicInfo) {
                basicInfo = []
            }
            basicInfo.push({title: '', text: ''})
            this.form.basicInfo = basicInfo
        },
        addContacInfo() {
            let { contactInfo } = this.form
            if (!contactInfo) {
                contactInfo = []
            }
            contactInfo.push({title: '', text: ''})
            this.form.contactInfo = contactInfo
        },
        onDel(key, index) {
            this.form[key].splice(index, 1)
        },
        getRules(name) {
            return { required: true, message: `请输入${name}`, trigger: 'blur' }
        }
    }
}
</script>
<style lang='scss' scoped>
:deep(.el-form-item) {
    display: flex;
}
.form{
    padding: 0 20px;
    overflow-y: auto;
    .form_title{
        margin-bottom: 20px;
        font-weight: 500;
        i{
            margin-left: 5px;
            cursor: pointer;
            &:hover{
                color: #409eff;
            }
        }
    }
    .from_item{
        display: flex;
        .el-form-item:first-child{
            margin-right: 20px;
        }
        .el-icon-remove-outline{
            cursor: pointer;
            margin: 9px 0 0 15px;
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