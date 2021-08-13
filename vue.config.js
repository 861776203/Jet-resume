// 模拟数据
let bodyParser = require('body-parser')
const express = require('express')
let fs = require('fs')
let multipart = require('connect-multiparty')
let multipartMiddleware = multipart()
const path = require('path')
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
    configureWebpack: () => {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true)
    },
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
        before(app) {
            // req.body编码解析
            app.use(bodyParser.urlencoded({ extended: true }))
            app.use(bodyParser.json())
            app.post('/api/updateinfo', (req, res) => {
                req.body.headImg = req.body.headImg.join(',')
                let data = JSON.stringify(req.body)
                // 图片垃圾回收
                let filedir = fs.readdirSync('./src/data/upload')
                let uploadfile = [req.body.headImg]
                let delList = filedir.filter(val => { return uploadfile.indexOf(val) === -1 })
                delList.map(v => {
                    fs.unlinkSync(`./src/data/upload/${v}`)
                })
                let text = `/* eslint-disable */\nlet globalSettings = ${data}\nexport default globalSettings`
                fs.writeFileSync('./src/data/setting.js', text)
                res.send({
                    status: 200,
                    code: 0,
                    data: true
                })
            })
            app.post('/api/upload', multipartMiddleware, (req, res) => {
                let data = req.files.file
                // 创建可读流
                let read = fs.createReadStream(data.path)
                // 设置文件保存路径
                let imgPath = path.join('./', `./src/data/upload/${data.originalFilename}`)
                // 创建可写流
                let upStream = fs.createWriteStream(imgPath)
                // 可读流通过管道写入可写流
                read.pipe(upStream)
                res.send({
                    status: 200,
                    code: 0,
                    data: {
                        path: data.path
                    }
                })
            })
            app.get('/api/deleteimg', (req, res) => {
                let { filename } = req.query
                let filedir = fs.readdirSync('./src/data/upload')
                if (filedir.includes(filename)) {
                    fs.unlinkSync(`./src/data/upload/${filename}`)
                }
                res.send({
                    status: 200,
                    code: 0,
                    message: '删除成功'
                })
            })
        },
        open: true,
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        https: false,
        liveReload: true,
        proxy: null // 设置代理

    },
    // 第三方插件配置
    pluginOptions: {
    // ...
    },
    // eslint-disable-next-line no-dupe-keys
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        './src/assets/styles/resources/*.scss'
                    ]
                })
                .end()
        })
    }
}
