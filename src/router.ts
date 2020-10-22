// 导入要使用的模块
import fs from "fs";
import path from "path";
import { URL } from "url";
import Analy from "@/analy";
import crypto from "crypto";
import { PassThrough } from "stream";

export default class Router {
    // 路由列表
    public routers: MapleElectronRouter.Service.Router[] = [];
    // 请求信息
    #request = {} as Electron.ProtocolRequest;
    // 响应回调方法
    #callback!: MapleElectronRouter.Service.ElectronCallback;
    // 状态码
    #code: number = 200;
    // 默认请求头
    #headers: MapleElectronRouter.Service.Headers = { "Content-Type": "application\/json" };
    // 流
    #read!: PassThrough;
    // 默认检索值
    #next_index: number = 0;
    // 路径
    #pathname: string = "";
    // 响应结束状态
    #end_status: boolean = false;

    // 配置标签
    public get [Symbol.toStringTag](): string { return "MapleRouter"; }

    // Request请求
    private get request(): MapleElectronRouter.Service.Request {
        // 解析url
        const url = this.#request.url ? new URL(this.#request.url) : null;
        // 获取url
        const Url = url ? url : {} as URL;
        // Query参数
        const query: MapleElectronRouter.Service.Query = {};
        // Body参数
        const body: MapleElectronRouter.Service.Body = {};

        // 对Query参数进行解析
        if (url) {
            // 整理对象
            const arrange: MapleElectronRouter.Service.Arrange = {};

            // 整理请求参数
            for (const [name, value] of url.searchParams) {
                const index = new RegExp("\\[\\]$").test(name) ? name.slice(0, name.length - 2) : name;
                if (!arrange[index]) arrange[index] = [];
                arrange[index].push(value);
            }

            // 获取整理后的数据
            for (const index in arrange) {
                const params = arrange[index]
                // 数组的情况
                if (params.length > 1) {
                    query[index] = [];
                    for (const value of params) {
                        try { const param = JSON.parse(value); query[index].push(param) }
                        catch (error) { query[index].push(value) }
                    }
                    continue;
                }

                // 其他的情况
                try { query[index] = JSON.parse(params[0]); }
                catch (error) { query[index] = params[0] }
            }
        }

        // 对Body参数参数进行解析
        if (this.#request.uploadData) {
            this.#request.uploadData.forEach((itme: Electron.UploadData) => {
                try {
                    const params = JSON.parse(itme.bytes.toString());
                    for (let name in params) body[name] = params[name];
                } catch { };
            });
        }

        // 返回值
        return {
            // 继承 request的参数值
            ...this.#request,
            // 获取 body
            body: body,
            // 获取 query
            query: query,
            // 获取 path
            path: Url.pathname,
            // 获取 href
            href: Url.href,
            // 获取 host
            host: Url.host,
            // 获取 port
            port: Url.port,
            // 获取 search
            search: Url.search,
            // 获取 origin
            origin: Url.origin,
            // 获取 protocol
            protocol: Url.protocol,
            // 获取 username
            username: Url.username,
            // 获取 password
            password: Url.password,
            // 获取 path
            pathname: Url.pathname,
            // 获取 hostname
            hostname: Url.hostname
        } as MapleElectronRouter.Service.Request;
    }

    // Response响应
    private get response(): MapleElectronRouter.Service.Response {
        const response: MapleElectronRouter.Service.Response = {
            // 状态设置
            status: (code: number): MapleElectronRouter.Service.Response => {
                if (typeof code === "number" && !isNaN(code)) this.#code = code;
                return response;
            },
            // 设置请求头
            set: (header: string, value: string): MapleElectronRouter.Service.Response => {
                if (typeof header === "string" && typeof value === "string") {
                    this.#headers[header] = value;
                } return response;
            },
            // 写入响应数据
            write: (data: string): MapleElectronRouter.Service.Response => {
                if (data) this.#read.push(data);
                return response;
            },
            // 响应
            send: (data: any): void => {
                // 接受状态
                this.#end_status = true;

                // 进行响应
                this.#callback({
                    data: this.#read,
                    statusCode: this.#code,
                    headers: this.#headers
                });

                // 判断是否有数据写入并写入
                if (data) {
                    if (typeof data === "object") this.#read.push(JSON.stringify(data));
                    else this.#read.push(data);
                }

                // 停止写入
                this.#read.push(null);
            },
            // 异步响应
            sendAsync: (data: any): (() => void) => {
                // 接受状态
                this.#end_status = true;

                // 进行响应
                this.#callback({
                    data: this.#read,
                    statusCode: this.#code,
                    headers: this.#headers
                });

                // 判断是否有数据写入并写入
                if (data) {
                    if (typeof data === "object") this.#read.push(JSON.stringify(data));
                    else this.#read.push(data);
                }

                // 返回待响应结束方法
                return () => { this.#read.push(null) };
            },
            // 响应文件
            sendFile: (file: string, option?: MapleElectronRouter.Service.FileOption) => {
                // 获取文件类型
                const analy: Analy = new Analy(this.#pathname, this.#request.headers.Accept);

                // 判断是否是解密读取方式，还是普通读取方式
                if (option && typeof option.AES === "string" && Buffer.isBuffer(option.KEY) && Buffer.isBuffer(option.IV)) {
                    const decipher = crypto.createDecipheriv(option.AES, option.KEY, option.IV);
                    if (path.isAbsolute(file)) fs.createReadStream(file).pipe(decipher).pipe(this.#read);
                    else fs.createReadStream(path.resolve(file)).pipe(decipher).pipe(this.#read);
                } else {
                    if (path.isAbsolute(file)) fs.createReadStream(file).pipe(this.#read);
                    else fs.createReadStream(path.resolve(file)).pipe(this.#read);
                }

                // 进行响应
                this.#callback({
                    data: this.#read,
                    statusCode: this.#code,
                    headers: {
                        // 接受范围
                        "accept-rangesziji": "bytes",
                        // 时间
                        "date": (new Date).toUTCString(),
                        // 抽象化缓存
                        "connection": "keep-alive",
                        // 文件类型
                        "Content-Type": analy.type
                    }
                });
            }
        }

        // 返回对象实例
        return response;
    }

    // 进行下面的任务
    private next(): void {
        // 已经开始响应
        if (this.#end_status) return console.error(new Error("Response has been made, can't continue next."));

        // 获取请求对象
        const request = this.request;
        // 获取响应对象
        const response = this.response;

        // 获取方法并指向this
        const next = this.next.bind(this);

        // 检索遍历任务
        for (let i = this.#next_index; i < this.routers.length; i++) {
            // 获取当前任务
            const router = this.routers[i];

            // 任务检索递增,防止重复任务
            this.#next_index = i + 1;

            // use的情况
            if (typeof router.use === "function") {
                // 路径正则
                const regular = router.path ? new RegExp(`^${router.path}/`) : null;

                //  use任务执行判断并执行任务
                if (router.path === null || (regular && regular.test(`${this.#pathname}/`))) {
                    router.use(request, response, next);
                    break;
                }
            };

            // 其他的情况
            if (router.path === this.#pathname) {
                // 检索辨别并执行任务

                // 执行所有
                if (typeof router.all === "function") {
                    router.all(request, response, next);
                    break;
                }

                // 执行GET
                if (typeof router.get === "function" && this.#request.method === "GET") {
                    router.get(request, response, next);
                    break;
                }

                // 执行PUT
                if (typeof router.put === "function" && this.#request.method === "PUT") {
                    router.put(request, response, next);
                    break;
                }

                // 执行POST
                if (typeof router.post === "function" && this.#request.method === "POST") {
                    router.post(request, response, next);
                    break;
                }
                // 执行DELETE
                if (typeof router.delete === "function" && this.#request.method === "DELETE") {
                    router.delete(request, response, next);
                    break;
                }

            }
        }
    }

    // 监听
    public listen(request: Electron.ProtocolRequest, callback: MapleElectronRouter.Service.ElectronCallback): void {
        // 判断参值
        if (!request || !callback) throw new Error("There must be a request body and a response callback.");
        if (typeof request !== "object") throw new Error("The request body must be a protocol object.");
        if (typeof callback !== "function") throw new Error("The callback function must be a protocol response callback.");

        // 获取参数
        this.#request = request;
        this.#callback = callback;
        this.#read = new PassThrough();

        // 获取路径
        const { pathname } = typeof this.#request.url === "string" ? new URL(this.#request.url) : { pathname: null };

        // 异常判断
        if (!pathname) throw new Error("The request path is abnormal or does not exist");

        // 获取路径
        this.#pathname = pathname;

        // 进行任务执行
        this.next();
    }

    // 检查处理
    private inspect(msg: string, path: string, callback?: MapleElectronRouter.Service.Route): string | void {
        // 路径不是字符串
        if (typeof path !== "string") throw new Error(`Router.${msg} path must be set by string.`);

        // 没有设定首路经
        if (typeof path === "string" && !/^\//.test(path)) throw new Error(`API.${msg} path first character must be '/'.`)

        // 回调不是函数
        if (typeof callback !== "function") throw new Error(`API.${msg} callback must be set as a function.`);

        // 不是根路路径
        if (path !== "/" && path[path.length - 1] === "/") return path.slice(0, path.length - 1);

        // 是根路径 "/"
        return path;
    }

    // 中间件
    public use(path: string | MapleElectronRouter.Service.Route | Router, callback?: MapleElectronRouter.Service.Route | Router): Router {
        // 判断并整理路径
        const url: string | null = typeof path === "string" ? path : null;

        // 没有设定首路经
        if (typeof path === "string" && !/^\//.test(path)) throw new Error("Router.use path first character must be '/'.");

        // 首参数是一个回调时候
        if (typeof path === "function") callback = path;

        // 回调存在的情况
        if (typeof callback === "function") this.routers.push({ path: url, use: callback });

        // 实例值
        let instance: Router | null = null;

        // 首参数是一个实例时候
        if (typeof path === "object" && path.toString() === "[object MapleRouter]") instance = path;

        // 第二个参数是一个实例的时候
        if (typeof callback === "object" && callback.toString() === "[object MapleRouter]") instance = callback;

        // 实例存在的时候
        if (instance) {
            // 出现路径的情况
            if (typeof path === "string") {
                // 遍历实例
                for (const ruoter of instance.routers) {
                    // 出来路径
                    ruoter.path = ruoter.path ? ruoter.path !== "/" ? url + ruoter.path : url : url;
                }
            }

            // 合并路由
            this.routers = this.routers.concat(instance.routers);
        }
        return this;
    }

    // 文件请求
    public files(url: string, dir: string, option: MapleElectronRouter.Service.FileOption): Router {
        // 参数值重命名
        const root = url;
        // 获取首路径
        const index = path.join(root, "/index.html").replace(/\\/g, "/");
        // 路径信息列表
        const urls: MapleElectronRouter.Service.FileUrl[] = [];
        // 获取路径方法
        const GetPath = (parent: string, dir: string) => {
            // 获取当前文件夹信息
            const dirents = fs.readdirSync(dir, { withFileTypes: true });

            // 遍历文件信息
            for (const dirent of dirents) {
                // 获取url
                const url: MapleElectronRouter.Service.FileUrl = {
                    path: path.join(parent, dirent.name).replace(/\\/g, "/"),
                    file: path.join(dir, dirent.name),
                    name: dirent.name
                };

                // 是文件的时候
                if (dirent.isFile()) { urls.push(url); continue; }

                // 是文件夹的时候
                if (dirent.isDirectory()) GetPath(url.path, url.file);
            };
        }

        // 文件夹路径判断
        if (!fs.existsSync(dir)) throw new Error("The folder path does not exist.");

        // 文件夹是否为真判断
        if (!fs.statSync(dir).isDirectory()) throw new Error("The incoming folder is not a real folder.");

        // 路径不是字符串
        if (typeof root !== "string") throw new Error("Router.files path must be set by string.");

        // 没有设定首路经
        if (typeof root === "string" && !/^\//.test(root)) throw new Error("API.files path first character must be '/'.");

        // 检查配置信息
        if (option && typeof option !== "object") throw new Error("FileOption is not an object");

        // 检索文件夹
        GetPath(root, dir);

        // 设定接口
        let indexFile = "";
        for (const url of urls) {
            // 根接口
            if (url.path === index) {
                indexFile = url.file;
                this.get(root, (req, res) => {
                    res.sendFile(url.file, option);
                });
            }

            // 其他接口
            this.get(url.path, (req, res) => {
                res.sendFile(url.file, option);
            });
        }

        // 前端模拟接口式
        if (option && option.webRouter) this.use(root, (req, res, next) => {
            if (req.method === "GET") res.sendFile(indexFile, option);
            else next();
        });
        return this;
    }

    // 所有请求
    public all(path: string, callback?: MapleElectronRouter.Service.Route): Router {
        const url = this.inspect("all", path, callback);
        if (url) this.routers.push({ path: url, all: callback });
        return this;
    }

    // get请求方法 
    public get(path: string, callback?: MapleElectronRouter.Service.Route): Router {
        const url = this.inspect("get", path, callback);
        if (url) this.routers.push({ path: url, get: callback });
        return this;
    }

    //  put请求方法
    public put(path: string, callback?: MapleElectronRouter.Service.Route): Router {
        const url = this.inspect("put", path, callback);
        if (url) this.routers.push({ path: url, put: callback });
        return this;
    }

    // post请求方法
    public post(path: string, callback?: MapleElectronRouter.Service.Route): Router {
        const url = this.inspect("post", path, callback);
        if (url) this.routers.push({ path: url, post: callback });
        return this;
    }

    // delete请求方法
    public delete(path: string, callback?: MapleElectronRouter.Service.Route): Router {
        const url = this.inspect("delete", path, callback);
        if (url) this.routers.push({ path: url, delete: callback });
        return this;
    }
}
