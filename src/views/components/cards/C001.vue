<template>
    <div class="C001">
        <img class="headImg" src="@/assets/images/headImg.png">
        <p class="name">九千岁的九千岁</p>
        <p class="address"><span>杭州</span>前端开发工程师</p>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/basic_info.png">
                <p>基本信息</p>
            </div>
        </div>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/basic_info.png">
                <p>联系方式</p>
            </div>
        </div>
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/basic_info.png">
                <p>技能点</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>
<style lang='scss' scoped>
.C001{
    padding: 20px 15px;
    font-size: 16px;
    .headImg{
        width: 140px;
        height: 140px;
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
        border-bottom: 1px solid #cfcfcf;
        padding-bottom: 10px;
        margin-top: 20px;
        .title_box{
            display: flex;
            align-items: center;
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
    }
}
</style>