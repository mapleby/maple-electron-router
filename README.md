# maple-electron-router  
基于[electron](https://www.electronjs.org)的服务。(Services based on [electron](https://www.electronjs.org/docs) framework.)

  [![npm version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

## 示例(Examples)

#### main.js
```js
const { app, BrowserWindow } = require("electron");
const { RouterServer } = require("maple-electron-router");

// 创建服务(create service)
const service = new RouterServer("app", "maple.hyf");
const router = RouterServer.Router();


// 文件组 (file group)
router.files("/", "public", { webRouter: true });

// 设置GET请求 (set GET request)
router.get("/hello", (req, res) => {
    res.send("GET:helloWorld");
})

// 设置PUT请求 (set PUT request)
router.get("/hello", (req, res) => {
    res.send("PUT:helloWorld");
})

// 设置POST请求 (set POST request)
router.post("/hello", (req, res) => {
    res.send("POST:helloWorld");
});

// 中间件 (middleware)
router.use("/hello", (req, res, next) => {
    next();
});

// 设置DELETE请求 (set DELETE request)
router.delete("/hello", (req, res) => {
    res.send("DELETE:helloWorld");
});

service.use(router);

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
    <script>

        fetch("app://maple.hyf/hello", { method: "GET" }).then(async res => {
            const data = await res.text();
            console.log(data)
        });

        fetch("app://maple.hyf/hello", { method: "POST", body: JSON.stringify({ data: "post" }) }).then(async res => {
            const data = await res.text();
            console.log(data)
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

## (文档:Docs)RouterServer 

 * Router

#### constructor

 * use

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