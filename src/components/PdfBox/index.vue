<template>
    <div id="pdf_box">
        <CardsTemplate :data="data" :type="'pdf'" />
        <IntroCardsTemplate :data="data" type="pdf" />
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { inject, ref, getCurrentInstance } from 'vue'
export default {
    name: 'PdfBox',
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
    setup() {
        let { closeLoading } = inject('global')
        let { proxy } = getCurrentInstance()
        let url = ref(location.href)

        function download() {
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
                proxy.closeLoading()
                // pdf.save('www.pdf')
            })
        }

        return {
            url,
            download,
            closeLoading
        }
    }
}
</script>
<style lang='scss' scoped>
#pdf_box{
    border: 1px solid #ccc;
    width: 794px;
    margin: 0 auto;
    background: #fff;
}
</style>