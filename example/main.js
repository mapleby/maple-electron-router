const { app, BrowserWindow } = require("electron");
const { RouterServer } = require("../dist/index");

// 创建路径
const service = new RouterServer("app", "maple.hyf");
const router = RouterServer.Router();

// get请求
router.get("/hello", (req, res) => {
    res.send("GET:helloWorld");
})

// post请求
router.post("/hello", (req, res) => {
    res.send("POST:helloWorld");
});


router.files("/", "example/public", { webRouter: true });

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
    win.webContents.openDevTools();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
