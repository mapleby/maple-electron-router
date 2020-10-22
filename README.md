# maple-electron-router  
基于[electron](https://www.electronjs.org)的服务。(Services based on [electron](https://www.electronjs.org/docs) framework.)

  [![npm version][npm-image]][npm-url]
 <!-- [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url] -->

## 示例(Examples)
##### 项目起步时间不是很长，可能会有一些调整，请求谅解一下\^\_\^.(Project start time is not very long, there may be some adjustments, please understand\^\_\^.)

#### main.js
```js
const { app, BrowserWindow } = require("electron");
const { Service, Router } = require("maple-electron-router");

// 创建服务(create service)
const server = new Service("app", "maple.hyf");

// 文件组 (file group)
server.files("/", "public", { webRouter: true });

// 设置GET请求 (set GET request)
server.get("/hello", (req, res) => {
    res.send("GET:helloWorld");
})

// 设置PUT请求 (set PUT request)
server.put("/hello", (req, res) => {
    res.send("PUT:helloWorld");
})

// 设置POST请求 (set POST request)
server.post("/hello", (req, res) => {
    res.send("POST:helloWorld");
});

// 中间件 (middleware)
server.use("/hello", (req, res, next) => {
    next();
});

// 设置DELETE请求 (set DELETE request)
server.delete("/hello", (req, res) => {
    res.send("DELETE:helloWorld");
});

// 创建独立路由 (Create independent router)
const router = new Router();

// 设置路由GET请求 (set router GET request)
router.get("/get", (req, res) => {
    res.send({
        text: "HelloWorld!"
    });
});

// 合并路由 (Merge router)
server.use("/router", router);


// 运行窗口
app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL("app://maple.hyf")
    win.webContents.openDevTools()
})


```

#### index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="get-hello"></div>
    <div id="post-hello"></div>
    <div id="post-router"></div>
    <script>

        fetch("/hello", { method: "GET" }).then(async res => {
            const data = await res.text();
            document.getElementById("get-hello").innerHTML = data;
            console.log(data)
        });

        fetch("/hello", { method: "POST", body: JSON.stringify({ data: "post" }) }).then(async res => {
            const data = await res.text();
            document.getElementById("post-hello").innerHTML = data;
            console.log(data)
        });

        fetch("/router/get", { method: "GET" }).then(async res => {
            const data = await res.json();
            document.getElementById("post-router").innerHTML = JSON.stringify(data);
            console.log(data)
        });

    </script>

    <script>
        const { Request } = require("maple-electron-router");

        Request.put("/hello").then((arg) => {
            console.log(arg)
        });

        Request.delete("/hello").then((arg) => {
            console.log(arg)
        });
    </script>
</body>

</html>

```

## 安装(Installation)

这是一个[node.js](https://nodejs.org/en/)模块可通过[npm](https://www.npmjs.com/)安装.(This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
)

安装前，下载并安装[Electron](https://www.electronjs.org)并且
Electron要求8.0.0或更高。(Before installing, [Electron](https://www.electronjs.org).
Electron 8.0.0 or higher is required.)


安装方式 [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install maple-electron-router 
```

## (特点)Features

  * 非端口服务(Nonport service)
  * 更好的管理Electron的主进程和渲染进程的交互(Better management of electron main process and rendering process interaction)

## (文档:Docs)Service \<Constructor\>

#### 参数(Params)

 * **scheme** \<string\>：协议名(Name of agreement)
 * **host** \<string\>：域名地址(Domain name address)
 * **privileges** \<object\>
   * **secure** \<boolean\> 
   * **bypassCSP** \<boolean\> 
   * **allowServiceWorkers** \<boolean\>
   * **corsEnabled** \<boolean\>

#### 实例返回一个路由（Instance returns a router）
 * Router

#### Router
 
 * use
 * get
 * put
 * post
 * delete
 * files

[npm-image]: https://img.shields.io/npm/v/maple-electron-router.svg
[npm-url]: https://npmjs.org/package/maple-electron-router
[downloads-image]: https://img.shields.io/npm/dm/maple-electron-router.svg
[downloads-url]: https://npmcharts.com/compare/maple-electron-router?minimal=true
[travis-image]: https://img.shields.io/travis/maple-electron-routerjs/maple-electron-router/master.svg?label=linux
[travis-url]: https://travis-ci.org/maple-electron-routerjs/maple-electron-router
[appveyor-image]: https://img.shields.io/appveyor/ci/dougwilson/maple-electron-router/master.svg?label=windows
[appveyor-url]: https://ci.appveyor.com/project/dougwilson/maple-electron-router
[coveralls-image]: https://img.shields.io/coveralls/maple-electron-routerjs/maple-electron-router/master.svg
[coveralls-url]: https://coveralls.io/r/maple-electron-routerjs/maple-electron-router?branch=master