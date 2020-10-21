/** 严格模式 **/
"use strict";

// 工作目录
const path = require("path");
process.chdir(path.join(__dirname, "../"));

// 导入要使用的模块
const fs = require("fs");
const webpack = require("webpack");
const electron = require("electron");
const { spawn, spawnSync } = require("child_process");
const dev = require("../webpack/webpack.dev.js");

// 开发环境
class Develop {
    // new 方法
    constructor() {
        // 异步监听自执行
        (async () => {
            try {
                // 初始化
                await this["initialization"]();
                // 编译执行进程
                this["compile-watch"]();
            } catch (error) { console.error(error) };
        })();
    }

    // 配置标签
    get [Symbol.toStringTag]() { return "Develop"; }

    // 初始化
    "initialization"() {
        return new Promise(resolve => {
            // 清理控制台
            console.clear();
            process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
            // 打印工作目录
            console.log(`${path.resolve()}>`, "\n");
            // 更改控制台编码(控制台中文乱码问题)
            spawnSync("chcp", ["65001"], { stdio: "inherit" });
            return resolve();
        });
    }

    // 编译执行进程
    "compile-watch"() {
        // 执行应用编译
        const compiler = webpack(dev);

        // 子进程等待
        this.child = null;

        // 监听文件变化
        fs.watch(path.join(__dirname, "../example"), { recursive: true }, () => {
            if (this.child) this.child.kill();
        });

        // 监听内容变化
        compiler.watch({
            // 延迟时间
            aggregateTimeout: 0,
            // 忽略文件
            ignored: /node_modules/,
            // 轮询时间
            poll: 500
            // 运行回调监听
        }, (err, stats) => {
            // 错误处理
            if (err) {
                // 输出错误
                console.error(err.stack || err);
                // 判断细节
                if (err.details) {
                    // 打印错误细节
                    console.error(err.details);
                }
                return;
            }

            // 控制台打印
            console.log(stats.toString({
                // 使构建过程更静默无输出
                chunks: false,
                // 在控制台展示颜色
                colors: true
            }));

            // 已经启动过
            if (this.child) this.child.kill();
            // 第一次启动执行
            else this.electronRun();
        });
    }

    // electron启动
    electronRun() {
        // 清理控制台
        console.clear();
        process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
        // 打印当前路径
        console.log(__filename);

        // 执行命令
        this.child = spawn(electron, ["example/main.js"]);

        // 打印输出
        this.child.stdout.pipe(process.stdout);
        this.child.stderr.pipe(process.stderr);

        // electron关闭监听
        this.child.on("close", () => {
            // 提示:已经关闭了electron...
            console.log("\u5df2\u7ecf\u5173\u95ed\u4e86electron...");
            // 提示:开始启动electron...
            console.log("\u5f00\u59cb\u542f\u52a8electron...");
            // 重新执行
            this.electronRun();
        });
    }
}

// 进行执行
new Develop();                                                                           
