/** 严格模式 **/
"use strict";

// 工作目录
const path = require("path");
process.chdir(path.join(__dirname, "../"));

// 导入要使用的模块
const { spawn } = require("child_process");

// 运行npm 
const logs = spawn(path.join(__dirname, "command.bat"), { windowsHide: true });

// 打印输出
logs.stdout.pipe(process.stdout);
logs.stderr.pipe(process.stderr);
