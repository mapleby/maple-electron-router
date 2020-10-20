import { app, protocol } from "electron";
import Router from "@/router";
import { URL } from "url";

// 路由服务
export default class RouterServer {
    // new方法
    constructor(scheme: string, urls: string | string[], privileges?: MapleElectronRouter.Server.Privileges) {
        // 可更改属性
        const secure = privileges && !privileges.secure ? false : true;
        const bypassCSP = privileges && privileges.bypassCSP ? true : false;
        const allowServiceWorkers = privileges && privileges.allowServiceWorkers ? true : false;
        const corsEnabled = privileges && privileges.corsEnabled ? true : false;

        // 获取url
        this.#urls = ([] as string[]).concat(urls);

        // 协议不正确
        if (typeof scheme !== "string") throw new Error("Protocol scheme must be a string.");

        // 协议格式不正确
        if (/^[a-zA-Z0-9]+[a-zA-Z0-9]:\/\/[a-zA-Z0-9\._-]+[a-zA-Z0-9]$/.test(scheme)) throw new Error("The protocol format is incorrect.");

        // 地址列表内容异常
        if (this.#urls.some(arg => typeof arg !== "string")) throw new Error("There is an address in the address list that is not a string.");

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
                    for (const url of this.#urls) {
                        if (url === host) new Router().use(this.#routers[url]).listen(request, callback);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        });
    }

    // 地址列表
    readonly #urls!: string[];
    // 路由列表组
    readonly #routers: { [url: string]: Router } = {};

    // 配置标签
    public get [Symbol.toStringTag](): string { return "MapleRouterServer"; }

    // 组装路由
    public use(url: string | Router, router?: Router) {
        const index = typeof url === "string" ? url : this.#urls[0];
        if (typeof url === "object") router = url;
        if (!(typeof router === "object" && router.toString() === "[object MapleRouter]")) throw "Is not a router object.";
        if (this.#routers[index]) this.#routers[index].use(router);
        else this.#routers[index] = new Router().use(router);
        return this;
    }

    // 独立路由
    public static Router() {
        return new Router();
    }
}
