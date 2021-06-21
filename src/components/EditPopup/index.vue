<template>
    <el-drawer
        :model-value="show"
        title="编辑"
        :before-close="handleClose"
        destroy-on-close
        size="40%"
    >
        <el-form ref="form" class="form" :model="form" :rules="rules" size="small" label-suffix="：">
            <div class="drawer_box" :style="{'height': height-130+'px'}">
                <el-form-item label="头像" prop="headImg">
                    <ImageUpload :url="form.headImg" :max="1" :action="action" name="file" :file-list="form.headImg" @onSuccess="(e) => { form.headImg = [e] }" />
                </el-form-item>
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
                <!-- 联系方式 -->
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
                <!-- 技能点 -->
                <div>
                    <p class="form_title">技能点<i class="el-icon-circle-plus-outline" @click="addSkillInfo" /></p>
                    <el-form-item prop="skillColor" label="颜色">
                        <el-color-picker v-model="form.skillColor" />
                    </el-form-item>
                    <div v-for="(item,index) in form.skillInfo" :key="index" class="form_item2">
                        <div class="left_item">
                            <el-form-item :prop="'skillInfo.'+index+'.title'" :rules="getRules('标题')">
                                <el-input v-model="item.title" placeholder="请输入技能标题" />
                            </el-form-item>
                            <el-form-item>
                                <el-slider v-model="item.value" :step="1" :max="10" show-stops />
                            </el-form-item>
                        </div>
                        <i class="el-icon-remove-outline" @click="onDel('skillInfo', index)" />
                    </div>
                </div>
                <!-- 教育经历 -->
                <div>
                    <p class="form_title">教育经历<i class="el-icon-circle-plus-outline" @click="addEducationInfo" /></p>
                    <div v-for="(item,index) in form.educationInfo" :key="index" class="form_item2">
                        <div class="left_item">
                            <el-form-item :prop="'educationInfo.'+index+'.title'" :rules="getRules('学校名')">
                                <el-input v-model="item.title" placeholder="请输入学校名" />
                            </el-form-item>
                            <el-form-item :prop="'educationInfo.'+index+'.time'" :rules="getRules('入学时间')">
                                <el-date-picker v-model="item.time" type="daterange" range-separator="至" start-placeholder="入学时间" end-placeholder="毕业时间" @change="checkTime" />
                            </el-form-item>
                            <el-form-item :prop="'educationInfo.'+index+'.text'" :rules="getRules('详情')">
                                <el-input v-model="item.text" type="textarea" rows="3" placeholder="请输入详情" />
                            </el-form-item>
                        </div>
                        <i class="el-icon-remove-outline" @click="onDel('educationInfo', index)" />
                    </div>
                    <Empty v-show="!form.educationInfo || !form.educationInfo.length" description="请添加教育经历" />
                </div>
                <!-- 工作经历 -->
                <div>
                    <p class="form_title">工作经历<i class="el-icon-circle-plus-outline" @click="addJobInfo" /></p>
                    <div v-for="(item,index) in form.jobInfo" :key="index" class="form_item2">
                        <div class="left_item">
                            <el-form-item :prop="'jobInfo.'+index+'.title'" :rules="getRules('公司名')">
                                <el-input v-model="item.title" clearable placeholder="请输入公司名" />
                            </el-form-item>
                            <el-form-item :prop="'jobInfo.'+index+'.position'" :rules="getRules('职位')">
                                <el-input v-model="item.position" clearable placeholder="请输入职位" />
                            </el-form-item>
                            <el-form-item :prop="'jobInfo.'+index+'.time'" :rules="getRules('工作时间')">
                                <el-date-picker v-model="item.time" type="daterange" range-separator="至" start-placeholder="入职时间" end-placeholder="离职时间" @change="checkTime" />
                            </el-form-item>
                            <el-form-item v-for="(item2, index2) in item.messages" :key="index2" :prop="'jobInfo.'+index+'.messages.'+index2+'.text'" :label="`描述${index2+1}`" :rules="getRules(`描述${index2+1}`)" class="describe_item show_label">
                                <div class="label_box">
                                    <el-input v-model="item2.text" type="textarea" :placeholder="`请输入描述${index2+1}`" />
                                    <i class="el-icon-error label_close" @click="onDelDesc(item.messages, index2)" />
                                </div>
                            </el-form-item>
                            <div class="describe_box" @click="addDescribe(item)"><i class="el-icon-plus" />添加描述</div>
                        </div>
                        <i class="el-icon-remove-outline" @click="onDel('jobInfo', index)" />
                    </div>
                    <Empty v-show="!form.jobInfo || !form.jobInfo.length" description="请添加工作经历" />
                </div>
                <!-- 项目经历 -->
                <div>
                    <p class="form_title">项目经历<i class="el-icon-circle-plus-outline" @click="addProjectInfo" /></p>
                    <el-form-item prop="projectUrlColor" label="链接颜色">
                        <el-color-picker v-model="form.projectUrlColor" />
                    </el-form-item>
                    <div v-for="(item, index) in form.projectInfo" :key="index" class="form_item2">
                        <div class="left_item">
                            <el-form-item :prop="'projectInfo.'+index+'.title'" :rules="getRules('项目名称')">
                                <el-input v-model="item.title" placeholder="请输入项目名称" />
                            </el-form-item>
                            <el-form-item :prop="'projectInfo.'+index+'.url'" :rules="getRules('项目链接')">
                                <el-input v-model="item.url" placeholder="请输入项目链接" />
                            </el-form-item>
                            <el-form-item :prop="'projectInfo.'+index+'.time'" :rules="getRules('项目时间')">
                                <el-date-picker v-model="item.time" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="checkTime" />
                            </el-form-item>
                            <el-form-item :prop="'projectInfo.'+index+'.skills'" :rules="getRules('技术栈')">
                                <el-input v-model="item.skills" placeholder="请输入技术栈" />
                            </el-form-item>
                            <el-form-item :prop="'projectInfo.'+index+'.intro'" :rules="getRules('简介')">
                                <el-input v-model="item.intro" placeholder="请输入简介" />
                            </el-form-item>
                        </div>
                        <i class="el-icon-remove-outline" @click="onDel('projectInfo', index)" />
                    </div>
                    <Empty v-show="!form.projectInfo || !form.projectInfo.length" description="请添加项目经历" />
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
            height: document.body.clientHeight,
            action: process.env.VUE_APP_API_ROOT + '/upload'
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
                    this.form.headImg = this.form.headImg.join(',')
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
        // 新增联系方式
        addContacInfo() {
            let { contactInfo } = this.form
            if (!contactInfo) {
                contactInfo = []
            }
            contactInfo.push({title: '', text: ''})
            this.form.contactInfo = contactInfo
        },
        // 添加技能点
        addSkillInfo() {
            let { skillInfo } = this.form
            if (!skillInfo) {
                skillInfo = []
            }
            skillInfo.push({title: '', value: 0})
            this.form.skillInfo = skillInfo
        },
        // 新增教育经历
        addEducationInfo() {
            let { educationInfo } = this.form
            if (!educationInfo) {
                educationInfo = []
            }
            educationInfo.push({title: '', text: '', time: []})
            this.form.educationInfo = educationInfo
        },
        // 新增工作经历
        addJobInfo() {
            let { jobInfo } = this.form
            if (!jobInfo) {
                jobInfo = []
            }
            jobInfo.push({title: '', position: '', time: []})
            this.form.jobInfo = jobInfo
        },
        // 新增项目经历
        addProjectInfo() {
            let { projectInfo } = this.form
            if (!projectInfo) {
                projectInfo = []
            }
            projectInfo.push({title: '', url: '', time: [], skills: '', intro: ''})
            this.form.projectInfo = projectInfo
        },
        addDescribe(item) {
            if (item.messages) {
                item.messages.push({text: ''})
            } else {
                item.messages = [{text: ''}]
            }
        },
        onDelDesc(item, index) {
            item.splice(index, 1)
        },
        // 日期插件选择格式转换
        checkTime(e) {
            e[0] = this.$dayjs(e[0]).format('YYYY-MM-DD')
            e[1] = this.$dayjs(e[1]).format('YYYY-MM-DD')
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
$label-width: 90px;
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
    .el-icon-remove-outline{
        cursor: pointer;
        margin: 9px 0 0 15px;
        &:hover{
            color: #409eff;
        }
    }
    .from_item{
        display: flex;
        .el-form-item:first-child{
            margin-right: 20px;
        }
    }
    :deep(.el-form-item__label) {
        flex-shrink: 0;
    }
    .form_item2{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .left_item{
            width: 80%;
            border: 1px solid #DDDFE6;
            border-radius: 10px;
            padding: 20px 15px;
        }
        :deep(.el-form-item__label){
            width: $label-width;
        }
        :deep(.el-form-item__content){
            width: 100%;
            .el-date-editor{
                width: 100%;
            }
        }
        .el-icon-remove-outline{
            margin-top: 0;
        }
        .show_label{
            :deep(.el-form-item__content) {
                width: calc(100% - $label-width);
            }
            .label_box{
                transition: .4s;
                .label_close{
                    position: absolute;
                    color: #f56c6c;
                    top: -6px;
                    right: -6px;
                    cursor: pointer;
                    font-size: 17px;
                    background: #fff;
                    transition: .3s;
                    opacity: 0;
                }
                &:hover{
                    .label_close{
                        opacity: 1;
                    }
                }
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
.describe_box{
    width: 100%;
    border: 1px dashed #ccc;
    border-radius: 3px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    transition: .4s;
    font-size: 14px;
    margin-top: 25px;
    i{
        margin-right: 5px;
    }
    &:hover{
        color: #1989fa;
        border-color: #1989fa;
    }
}
</style>