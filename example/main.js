const { app, BrowserWindow } = require("electron");
const { Service, Router } = require("../dist/index");

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
