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
                // 如果有文件流先存储
                let files = app.get('files') || {}
                let delfiles = app.get('delfiles') || []
                for (let key in files) {
                    // 创建可读流
                    let read = fs.createReadStream(files[key].path)
                    // 设置文件保存路径
                    let imgPath = path.join('./', `./src/data/upload/${files[key].originalFilename}`)
                    // 创建可写流
                    let upStream = fs.createWriteStream(imgPath)
                    // 可读流通过管道写入可写流
                    read.pipe(upStream)
                }
                if (delfiles.length) {
                    delfiles.map(v => {
                        fs.unlinkSync(`./src/data/upload/${v}`)
                    })
                }
                let data = JSON.stringify(req.body)
                let text = `let globalSettings = ${data}
export default globalSettings
                `
                fs.writeFileSync('./src/data/setting.js', text)
                app.set('files', [])
                res.send({
                    status: 200,
                    code: 0,
                    data: true
                })
            })
            app.post('/api/upload', multipartMiddleware, (req, res) => {
                let data = req.files.file
                let files = app.get('files') || {}
                let filedir = fs.readdirSync('./src/data/upload')
                if (files[data.originalFilename] || filedir.includes(data.originalFilename)) {
                    res.status(500).send({
                        status: 500,
                        code: -1,
                        message: '请勿上传文件名相同的图片'
                    })
                }
                files[data.originalFilename] = data
                app.set('files', files)
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
                let files = app.get('files') || {}
                let delfiles = app.get('delfiles') || []
                // 文件缓存中有需要删除的文件进行删除
                if (files[filename]) {
                    delete files[filename]
                } else { // 文件缓存中找不到则加入删除队列
                    delfiles.push(filename)
                    app.set('delfiles', delfiles)
                }
                res.send({
                    status: 200,
                    code: 0,
                    message: '上传成功'
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
    },
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
