<template>
    <div id="resume_box" class="resume_box">
        <div class="card">
            <C001 :data="data" />
        </div>
        <div class="content">
            <IntroCardsTemplate :data="data" />
        </div>
        <Popup top="120px" tips="编辑" icon="edit" @onClick="showEditPopup = true" />
        <Popup top="180px" tips="下载PDF" icon="pdf" @onClick="downPDF" />
        <!-- eslint-disable -->
        <EditPopup v-model:show="showEditPopup" :data="data" />
    </div>
</template>

<script>
import C001 from './components/cards/C001'
import Settings from '@/data/setting'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
export default {
    components: {
        C001
    },
    data() {
        return {
            showEditPopup: false,
            data: {}
        }
    },
    created() {
        Settings.headImg = Settings.headImg ? Settings.headImg.split(',') : []
        this.data = Settings
    },
    mounted() {
        // setTimeout(() => {
        //     this.showEditPopup = true
        // }, 300)
    },
    methods: {
        downPDF() {
            html2canvas(document.body, {
                allowTaint: true,
                useCORS: true,
                backgroundColor: null
            }).then(canvas => {
                let contentWidth = canvas.width
                let contentHeight = canvas.height
 
                // 一页pdf显示html页面生成的canvas高度;
                let pageHeight = contentWidth / 592.28 * 841.89
                // 未生成pdf的html页面高度
                let leftHeight = contentHeight
                // pdf页面偏移
                let position = 0
                // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                let imgWidth = 595.28
                let imgHeight = 592.28 / contentWidth * contentHeight
                let img = canvas.toDataURL('image/png')
                let pdf = new jsPDF('', 'pt', 'a4')
 
                // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                // 当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight)
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(img, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight
                        position -= 841.89
                        // 避免添加空白页
                        if (leftHeight > 0) {
                            pdf.addPage()
                        }
                    }
                }
 
                pdf.save('www.pdf')
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.resume_box{
    width: 1150px;
    margin: 0 auto;
    padding-top: 20px;
}
.card{
    width: 320px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 5px 20px #bbb;
    position: absolute;
}
.content{
    width: calc(100% - 350px);
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 5px 20px #bbb;
    margin-left: 350px;
}
@media (max-width: 1150px){
    .resume_box{
        flex-wrap: wrap;
        padding: 20px 20px;
        box-sizing: border-box;
    }
    .card{
        width: 100%;
        margin: 0;
    }
    .content{
        width: 100%;
    }
}
</style>