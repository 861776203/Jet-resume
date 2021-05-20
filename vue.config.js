// 模拟数据
let bodyParser = require('body-parser')
const express = require('express')
let fs = require('fs')
const app = express()
let apiRoutes = express.Router()
app.use('/api', apiRoutes)

module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    runtimeCompiler: true,
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        // 模拟数据开始
        before(app) {
            // req.body编码解析
            app.use(bodyParser.urlencoded({ extended: true }))
            app.use(bodyParser.json())
            app.post('/api/updateinfo', (req, res) => {
                let data = JSON.stringify(req.body)
                let text = `let globalSettings = ${data}
export default globalSettings
                `
                fs.writeFileSync('./src/data/setting.js', text)
                res.send({
                    status: 200,
                    code: 0,
                    data: true
                })
            })
        },
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hot: false,
        liveReload: true,
        proxy: null// 设置代理

    },
    // 第三方插件配置
    pluginOptions: {
    // ...
    }
}
