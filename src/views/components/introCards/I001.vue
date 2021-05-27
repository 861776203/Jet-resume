<template>
    <div class="I001">
        <div class="basic_info">
            <div class="title_box">
                <img class="icon" src="@/assets/images/icons/basic_info.png">
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
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        }
    }
}
</script>
<style lang='scss' scoped>
.I001{
    padding: 20px 15px;
    font-size: 16px;
    .basic_info{
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
        .scholl_title{
            position: relative;
            font-size: 15px;
            font-weight: 300;
            .top{
                margin-bottom: 25px;
                font-weight: 500;
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
    }
}
</style>