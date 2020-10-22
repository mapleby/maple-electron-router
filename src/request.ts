export default class RouterRequest {
    // 配置标签
    public get [Symbol.toStringTag](): string { return "MapleRouterRequest"; }

    // 解析数据
    private static resolve(opation: MapleElectronRouter.Request.Opation) {
        // 返回解析后的数据
        return {
            headers: typeof opation.headers === "object" ? opation.headers : undefined,
            body: typeof opation.body === "object" ? JSON.stringify(opation.body) : undefined,
            mode: typeof opation.mode === "string" ? opation.mode : undefined
        }
    }

    // 解析参数
    private static resolveParam(url: string, params: MapleElectronRouter.Request.Query): string {
        // 参数不是对象
        if (typeof params !== "object") return "";

        // 解析参数
        let urlParams = "";
        for (const index in params) {
            const param = params[index];
            if (typeof param === "object") {
                // 数组情况处理
                if (Array.isArray(param)) {
                    for (const data of param) {
                        if (typeof data === "object") {
                            urlParams += `&${index}=${JSON.stringify(data)}`;
                            continue;
                        }
                        urlParams += `&${index}=${data}`;
                    }
                    continue;
                }

                // 对象的情况
                urlParams += `&${index}=${JSON.stringify(param)}`;
                continue;
            }

            // 其他情况
            urlParams += `&${index}=${param}`;
        }

        // 处理拼接
        const urlAndParams = url.split("?");
        if (urlAndParams.length === 1) return "?" + encodeURI(urlParams.slice(1, urlParams.length));
        if (!urlAndParams[1]) return encodeURI(urlParams.slice(1, urlParams.length));
        return encodeURI(urlParams);
    }

    // 整理数据
    private static async organize(url: string, res: Response, resolve: (value?: unknown) => void, obj?: MapleElectronRouter.Request.Opation,) {
        // 获取响应数据
        let data: string | { [index: string]: any } = await res.text();
        try { data = JSON.parse(data); } catch { };
        const host = res.url.match(/[a-zA-Z0-9]*:\/\/\S+?\//);

        // 整理后的数据
        resolve({
            url: res.url.split("?")[0],
            href: res.url,
            pathname: url.replace(/[a-zA-Z0-9]*:\/\/\S+?\//g, ""),
            host: host ? host[0] : null,
            data: data,
            status: res.status,
            opation: obj ? obj : {}
        });
    }

    // GET请求
    public static get(url: string, obj?: MapleElectronRouter.Request.Opation) {
        const params = obj && obj.params ? this.resolveParam(url, obj.params) : "";
        const opation = { ...obj } as MapleElectronRouter.Request.Opation;
        return new Promise((resolve, reject) => {
            fetch(url + params, {
                method: "GET",
                ...this.resolve(opation)
            }).then(res => this.organize(url, res, resolve, obj)).catch(error => reject(error));
        })
    }

    // PUT 请求
    public static put(url: string, data: MapleElectronRouter.Request.Body, obj?: MapleElectronRouter.Request.Opation) {
        const params = obj && obj.params ? this.resolveParam(url, obj.params) : "";
        const opation = { ...data, ...obj } as MapleElectronRouter.Request.Opation;;
        return new Promise((resolve, reject) => {
            fetch(url + params, {
                method: "PUT",
                ...this.resolve(opation)
            }).then(res => this.organize(url, res, resolve, obj)).catch(error => reject(error));
        });
    }

    // POST 请求
    public static post(url: string, data: MapleElectronRouter.Request.Body, obj?: MapleElectronRouter.Request.Opation) {
        const params = obj && obj.params ? this.resolveParam(url, obj.params) : "";
        const opation = { ...data, ...obj } as MapleElectronRouter.Request.Opation;;
        return new Promise((resolve, reject) => {
            fetch(url + params, {
                method: "POST",
                ...this.resolve(opation)
            }).then(res => this.organize(url, res, resolve, obj)).catch(error => reject(error));
        });
    }

    // DELETE 请求
    public static delete(url: string, obj?: MapleElectronRouter.Request.Opation) {
        const params = obj && obj.params ? this.resolveParam(url, obj.params) : "";
        const opation = { ...obj } as MapleElectronRouter.Request.Opation;
        return new Promise((resolve, reject) => {
            fetch(url + params, {
                method: "DELETE",
                ...this.resolve(opation)
            }).then(res => this.organize(url, res, resolve, obj)).catch(error => reject(error));
        });
    }

    // get 请求
    public get(...arg: [url: string, obj?: MapleElectronRouter.Request.Opation]) { RouterRequest.get.apply(this, arg) }

    // put 请求
    public put(...arg: [url: string, data: MapleElectronRouter.Request.Body, obj?: MapleElectronRouter.Request.Opation]) { RouterRequest.put.apply(this, arg) }

    // post 请求
    public post(...arg: [url: string, data: MapleElectronRouter.Request.Body, obj?: MapleElectronRouter.Request.Opation]) { RouterRequest.post.apply(this, arg) }

    // delete 请求
    public delete(...arg: [url: string, obj?: MapleElectronRouter.Request.Opation]) { RouterRequest.delete.apply(this, arg) }
}
