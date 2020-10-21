// 主动设置环境变量判断测试环境
process.env.NODE_ENV = "development";

// 导入模块
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");


// 开发环境环境
module.exports = merge(common, {
    // 生产模式
    mode: "development",
    // 开发环境环境
    devtool: "cheap-eval-source-map"
});
