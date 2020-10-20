# maple-electron-router  
����[electron](https://www.electronjs.org)�ķ���(Services based on [electron](https://www.electronjs.org/docs) framework.)

  [![npm version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url]

## ʾ��(Examples)

#### main.js
```js
const { app, BrowserWindow } = require("electron");
const { RouterServer } = require("maple-electron-router");

// ��������(create service)
const service = new RouterServer("app", "maple.hyf");
const router = RouterServer.Router();


// �ļ��� (file group)
router.files("/", "public", { webRouter: true });

// ����GET���� (set GET request)
router.get("/hello", (req, res) => {
    res.send("GET:helloWorld");
})

// ����PUT���� (set PUT request)
router.get("/hello", (req, res) => {
    res.send("PUT:helloWorld");
})

// ����POST���� (set POST request)
router.post("/hello", (req, res) => {
    res.send("POST:helloWorld");
});

// �м�� (middleware)
router.use("/hello", (req, res, next) => {
    next();
});

// ����DELETE���� (set DELETE request)
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

## ��װ(Installation)

����һ��[node.js](https://nodejs.org/en/)ģ���ͨ��[npm](https://www.npmjs.com/)��װ.(This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).
)

��װǰ�����ز���װ[Electron](https://www.electronjs.org)����
ElectronҪ��8.0.0����ߡ�(Before installing, [Electron](https://www.electronjs.org).
Electron 8.0.0 or higher is required.)


��װ��ʽ [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install maple-electron-router 
```

## (�ص�)Features

  * �Ƕ˿ڷ���(Nonport service)
  * ���õĹ���Electron�������̺���Ⱦ���̵Ľ���(Better management of electron main process and rendering process interaction)

## (�ĵ�:Docs)RouterServer 

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