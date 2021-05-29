/** 严格模式 **/
"use strict";

// 工作目录
const path = require("path");
process.chdir(path.join(__dirname, "../"));

// 导入要使用的模块
const fs = require("fs");
const webpack = require("webpack");
const prod = require("../webpack/webpack.prod.js");
const pkg = require("../package.json");

// 开发环境
new class Produce {
    // new 方法
    constructor() {
        // 执行应用编译
        const compiler = webpack(prod);
        compiler.run((err, stats) => {
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return;
            }

            console.log(stats.toString({
                chunks: false,
                colors: true
            }));

            this.copy();
        });
    }

    // 配置标签
    get [Symbol.toStringTag]() { return "Produce"; }

    // 编译执行进程
    copy() {
        // type文件
        fs.copyFileSync(path.resolve("types/index.d.ts"), path.resolve("dist/index.d.ts"));
        fs.copyFileSync(path.resolve("types/electron.d.ts"), path.resolve("dist/electron.d.ts"));
        fs.copyFileSync(path.resolve("types/request.d.ts"), path.resolve("dist/request.d.ts"));
        fs.copyFileSync(path.resolve("types/service.d.ts"), path.resolve("dist/service.d.ts"));
        fs.copyFileSync(path.resolve("LICENSE.txt"), path.resolve("dist/LICENSE.txt"));
        fs.copyFileSync(path.resolve("README.md"), path.resolve("dist/README.md"));


        delete pkg.scripts;
        delete pkg.devDependencies;
        const data = {
            "main": "index.js",
            "typings": "index.d.ts",
            "files": ["*"],
            ...pkg
        }

        fs.writeFileSync(path.resolve("dist/package.json"), JSON.stringify(data, null, "\t"));
    }
}