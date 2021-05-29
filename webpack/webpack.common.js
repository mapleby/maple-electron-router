// 导入模块
const path = require("path");
const TerserJSPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// wepback打包配置
module.exports = {
    // 打包的目标
    target: "node",
    // 入口
    entry: {
        index: path.resolve("src/index.ts"),
        request: path.resolve("src/request.ts"),
    },
    // 输出
    output: {
        // 输出目录
        path: path.resolve("dist"),
        // 文件名
        filename: "[name].js",
        library: "MapleElectronRouter",
        libraryExport: "default",
        libraryTarget: "umd"
    },
    // 忽略node_modules
    externals: [nodeExternals()],
    // 优化
    optimization: {
        // 最小化,js压缩(支持es6)
        minimizer: [new TerserJSPlugin]
    },
    // 解析
    resolve: {
        // 引入文件的时候可以少写后缀
        extensions: [".js", ".json", ".ts", ".tsx"],
        // 路径解析
        alias: {
            // @ 代表 src
            "@": path.resolve("src")
        }
    },
    // 模块
    module: {
        // 规则
        rules: [{
            // ts\tsx文件
            test: /\.(ts|tsx)$/,
            // 解析加载
            use: [
                // javascript解析器
                "babel-loader",
                // typescript解析器
                "ts-loader"
            ],
            // 忽略的模块
            exclude: /node_modules/
        }, {
            // js文件
            test: /\.js$/,
            // javascript解析器
            loader: "babel-loader",
            // 忽略的模块
            exclude: /node_modules/
        }]
    },
    // 插件
    plugins: [
        // 清理构建文件夹
        new CleanWebpackPlugin()
    ]
}
