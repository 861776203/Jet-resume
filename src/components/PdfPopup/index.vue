<template>
    <el-dialog title="预览" :model-value="show">
        <div class="pdf_box">
            <div id="pdf_box">
                <CardsTemplate :data="data" :type="'pdf'" />
                <IntroCardsTemplate :data="data" type="pdf" />
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="download">保 存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
export default {
    name: 'PdfPopup',
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
            url: location.href
        }
    },
    methods: {
        handleClose() {
            this.$emit('update:show', false)
        },
        download() {
            html2canvas(document.getElementById('pdf_box'), {
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
.pdf_box{
    border: 1px solid #ccc;
    width: 400px;
    height: 571px;
    margin: 0 auto;
    overflow-y: scroll;
}
</style>