module.exports = {
    autoRegister(app) {
        const componentsContext = require.context('./', true, /index.(vue|js)$/)
        componentsContext.keys().forEach(file_name => {
            // 获取文件中的 default 模块
            const componentConfig = componentsContext(file_name).default
            if (/.vue$/.test(file_name)) {
                app.component(componentConfig.name, componentConfig)
            } else {
                app.use(componentConfig)
            }
        })
    }
}
