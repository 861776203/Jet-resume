<template>
    <div class="C001">
        <Avatar :size="130" :url="data.headImg[0]" />
        <!-- <img class="headImg" src="@/assets/images/headImg.png"> -->
        <p class="name">{{ data.name||'九千岁的九千岁' }}</p>
        <p class="address"><span>{{ data.address||'杭州' }}</span>{{ data.job||'前端开发工程师' }}</p>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/basic_info.png">
                <p>基本信息</p>
            </div>
            <div v-for="(item,index) in data.basicInfo" :key="index" class="info_item">
                <p>{{ item.title }}</p>
                <span>{{ item.text }}</span>
            </div>
            <Skeleton v-show="!data.basicInfo||!data.basicInfo.length" />
        </div>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/basic_info.png">
                <p>联系方式</p>
            </div>
            <div v-for="(item,index) in data.contactInfo" :key="index" class="info_item">
                <p>{{ item.title }}</p>
                <span class="link" :style="{'color': data.contactUrlColor||'#ccc'}" @click="toLink(item.text)">{{ item.text }}</span>
            </div>
            <Skeleton v-show="!data.contactInfo||!data.contactInfo.length" />
        </div>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/basic_info.png">
                <p>技能点</p>
            </div>
            <SkillTemplate :data="data" />
            <Skeleton v-show="!data.skillInfo||!data.skillInfo.length" />
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
        isPhoneNumber(tel) {
            var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/
            return reg.test(tel)
        },
        toLink(val) {
            console.log()
            if (this.isPhoneNumber(val)) {
                location.href = `tel://${val}`
            } else {
                let isHttp = /http[s]{0,1}:\/\/([\w.]+\/?)\S*/.test(val)
                window.open(`${isHttp ? val : `http://${val}`}`)
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.C001{
    padding: 20px 15px;
    font-size: 16px;
    .headImg{
        width: 130px;
        height: 130px;
        display: block;
        margin: 0 auto;
    }
    .name{
        text-align: center;
        margin: 10px 0 5px 0;
        color: #000;
        font-weight: 200;
        font-size: 15px;
    }
    .address{
        text-align: center;
        color: #000;
        font-weight: 200;
        font-size: 15px;
        margin-bottom: 30px;
        span{
            &::after{
                content: '|';
                margin: 0 5px;
            }
        }
    }
    .basic_info{
        margin-top: 20px;
        .title_box{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #cfcfcf;
            padding-bottom: 10px;
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
        .info_item{
            display: flex;
            font-size: 15px;
            margin-top: 10px;
            color: #333;
            font-weight: 300;
            p{
                width: 110px;
                @include text-overflow(1);
            }
            span{
                width: calc(100% - 110px);
                white-space:normal;
                word-break:break-all;
                word-wrap:break-word;
            }
            .link{
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>