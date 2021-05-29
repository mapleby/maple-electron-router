// 主动设置环境变量判断测试环境
process.env.NODE_ENV = "production";

// 导入模块
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// 生产环境
module.exports = merge(common, {
    // 生产模式
    mode: "production",
    // 关闭源映射
    devtool: false
});
