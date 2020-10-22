import { app, protocol } from "electron";
import Router from "@/router";
import { URL } from "url";

// 路由服务
export default class Service extends Router {
    // new方法
    constructor(scheme: string, host: string, privileges?: MapleElectronRouter.Service.Privileges) {
        super();

        // 可更改属性
        const secure = privileges && !privileges.secure ? false : true;
        const bypassCSP = privileges && privileges.bypassCSP ? true : false;
        const allowServiceWorkers = privileges && privileges.allowServiceWorkers ? true : false;
        const corsEnabled = privileges && privileges.corsEnabled ? true : false;

        // 获取url
        this.#host = host;

        // 协议不是字符串 
        if (typeof scheme !== "string") throw new Error("Protocol scheme must be a string.");

        // 地址不是字符串 
        if (typeof host !== "string") throw new Error("Host scheme must be a string.");

        // 协议格式不正确
        if (!/^[a-zA-Z]+[a-zA-Z0-9]$/.test(scheme)) throw new Error("The protocol format is incorrect.");

        // 地址格式不正确
        if (!/^[a-zA-Z]+[a-zA-Z0-9\._-]+[a-zA-Z0-9]$/.test(host)) throw new Error("The host format is incorrect.");

        // 注册协议特权
        protocol.registerSchemesAsPrivileged([{
            scheme, privileges: {
                // 标准协议
                standard: true,
                // 支持FetchAPI()
                supportFetchAPI: true,
                // 保护
                secure: secure,
                // 绕过CSP
                bypassCSP: bypassCSP,
                // 允许服务人员
                allowServiceWorkers: allowServiceWorkers,
                // 启动cors(GPS技术)
                corsEnabled: corsEnabled
            }
        }]);

        // 等待注册协议
        app.whenReady().then(() => {
            try {
                protocol.registerStreamProtocol(scheme, (request, callback) => {
                    const { host }: URL = new URL(request.url);
                    if (this.#host === host) new Router().use(this).listen(request, callback);
                });
            } catch (error) {
                console.error(error);
            }
        });
    }

    // 地址列表
    readonly #host!: string;
}
