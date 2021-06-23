<template>
    <div class="I001">
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/school.png">
                <p>教育经历</p>
            </div>
            <ul>
                <li v-for="(item, index) in data.educationInfo" :key="index" class="scholl_title">
                    <span class="top">
                        <span class="scholl_name">{{ item.title }}</span>
                        <span class="time">{{ `${item.time[0]} — ${item.time[1]}` }}</span>
                    </span>
                    <p class="bottom">{{ item.text }}</p>
                </li>
            </ul>
        </div>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/job.png">
                <p>工作经历</p>
            </div>
            <ul>
                <li v-for="(item, index) in data.jobInfo" :key="index" class="job_box">
                    <div class="info">
                        <p class="name">[经历{{ index+1 }}]{{ item.title }} - {{ item.position }}</p>
                        <p class="time">{{ `${item.time[0]} — ${item.time[1]}` }}</p>
                    </div>
                    <ul class="describe_info">
                        <li v-for="(item2, index2) in item.messages" :key="index2">{{ item2.text }}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/project.png">
                <p>项目经历</p>
            </div>
            <ul>
                <li v-for="(item, index) in data.projectInfo" :key="index" class="project_box">
                    <div class="info">
                        <p class="name">{{ item.title }} <span class="demo" :style="{'color': data.projectUrlColor||'#25A9EB'}" @click="toUrl(item.url)">Demo</span></p>
                        <p class="time">{{ `${item.time[0]} — ${item.time[1]}` }}</p>
                    </div>
                    <ul class="describe_info">
                        <li>技术栈：{{ item.skills }}</li>
                        <li>简介：{{ item.intro }}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        }
    },
    methods: {
        toUrl(url) {
            window.open(url)
        }
    }
}
</script>
<style lang='scss' scoped>
.I001{
    padding: 20px 15px;
    font-size: 16px;
    .basic_info{
        &:not(:first-child) {
            margin-top: 20px;
        }
        .title_box{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #cfcfcf;
            padding-bottom: 10px;
            margin-bottom: 6px;
            .icon{
                width: 18px;
                height: 18px;
                margin-right: 4px;
            }
            p{
                font-size: 17px;
                font-weight: bold;
            }
        }
        ul{
            padding-left: 20px;
            margin: 0;
        }
    }
    .scholl_title{
        position: relative;
        font-size: 15px;
        font-weight: 300;
        .top{
            margin-bottom: 25px;
            font-weight: 400;
            font-size: 16px;
            .scholl_name{
                color: #000;
            }
            .time{
                position: absolute;
                right: 0;
            }
        }
        .bottom{
            margin-top: 5px;
        }
        &:not(:last-child) {
            margin-bottom: 20px;
        }
    }
    .job_box, .project_box{
        .info{
            display: flex;
            justify-content: space-between;
            font-weight: 400;
            font-size: 16px;
        }
        .describe_info{
            font-size: 15px;
            font-weight: 300;
            li{
                margin-top: 4px;
            }
        }
        &:not(:last-child) {
            margin-bottom: 20px;
        }
        .demo{
            border: 1px solid;
            border-radius: 4px;
            padding: 0 5px;
            font-size: 13px;
            margin-left: 10px;
            cursor: pointer;
        }
    }
}
</style>