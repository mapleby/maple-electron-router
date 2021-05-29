// 主动设置环境变量判断测试环境
process.env.NODE_ENV = "production";

// 导入模块
const fs = require("fs");
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

fs.copyFileSync(path.resolve("types/request.d.ts"), path.resolve("request.d.ts"))

// 生产环境
module.exports = merge(common, {
    // 生产模式
    mode: "production",
    // 关闭源映射
    devtool: false
});
