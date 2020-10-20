import { URL } from "url";

// 命名空间
export namespace RouterServer {
    // 协议特殊规则参数
    export interface Privileges {
        // 保护
        secure?: boolean;
        // 绕过CSP
        bypassCSP?: boolean;
        // 允许服务人员
        allowServiceWorkers?: boolean;
        // 启动cors(GPS技术)
        corsEnabled?: boolean;
    }

    // 返回协议请求参数
    export type ElectronRequest = Electron.ProtocolRequest;

    // 返回协议响应参数
    export type ElectronCallback = (response: NodeJS.ReadableStream | Electron.ProtocolResponse) => void;

    // Query数
    export interface Query {
        [name: string]: any;
    }

    // Query数
    export interface Arrange {
        [index: string]: string[];
    }

    // Body参数
    export interface Body {
        [name: string]: any;
    }

    // 请求头
    export interface Headers {
        [header: string]: string;
    }

    // 请求数据
    export interface Request extends Electron.ProtocolRequest, URL {
        // 路径
        path: string;
        // 请求参数(query)
        query: Query;
        //  请求参数(body)
        body: Body;
    }

    // 响应数据
    export interface Response {
        // 状态码
        status: (code: number) => Response;
        // 设置请求头
        set: (header: string, value: string) => Response;
        // 进行写入传输数据
        write: (data: string) => Response;
        // 响应结束
        send: (data?: any) => void;
        // 异步响应结束
        sendAsync: (data?: any) => (() => void);
        sendFile: (file: string, option?: FileOption) => void;
    }

    // 文件类型
    export interface FileTypes {
        [index: string]: string;
    }

    // 文件类型
    export interface FileUrl {
        path: string;
        file: string;
        name: string;
    }

    // 文件类型
    export interface FileOption {
        webRouter?: boolean;
        AES?: string;
        KEY?: Buffer;
        IV?: Buffer;
    }

    // 路由
    export type Route = (request: Request, response: Response, next: () => void) => void;

    // 路由器
    export interface Router {
        path: string | null;
        use?: Route;
        all?: Route;
        get?: Route;
        put?: Route;
        post?: Route;
        delete?: Route;
    }

    // 路由器列表
    export interface Routers {
        [url: string]: Router[];
    }
}

// 路由列表
export interface Router {
    routers: RouterServer.Router[];
    listen: (request: Electron.ProtocolRequest, callback: RouterServer.ElectronCallback) => void;
    use: (path: string | RouterServer.Route | Router, callback?: RouterServer.Route | Router) => Router;
    all: (path: string, callback?: RouterServer.Route) => Router;
    get: (path: string, callback?: RouterServer.Route) => Router;
    put: (path: string, callback?: RouterServer.Route) => Router;
    post: (path: string, callback?: RouterServer.Route) => Router;
    delete: (path: string, callback?: RouterServer.Route) => Router;
}

// 类列
export class RouterServer {
    constructor(scheme: string, urls: string | string[], privileges?: RouterServer.Privileges)
    use: (url: string | Router, router?: Router) => void;
    static Router: () => Router;
}

export default RouterServer;
