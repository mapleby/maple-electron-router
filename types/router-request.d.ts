export namespace RequestData {
    // Body参数
    export interface Body {
        [index: string]: any;
    }

    // query请求
    export interface Query {
        [index: string]: any;
    }

    // 配置
    export interface Opation {
        headers?: HeadersInit;
        body?: Body;
        params?: Query;
        mode: RequestMode;
    }

}

export class RouterRequest {
    get: (url: string, obj?: RequestData.Opation) => Promise<unknown>;
    put: (url: string, data: RequestData.Body, obj?: RequestData.Opation) => Promise<unknown>;
    post: (url: string, data: RequestData.Body, obj?: RequestData.Opation) => Promise<unknown>;
    delete: (url: string, obj?: RequestData.Opation) => Promise<unknown>;
    static get: (url: string, obj?: RequestData.Opation) => Promise<unknown>;
    static put: (url: string, data: RequestData.Body, obj?: RequestData.Opation) => Promise<unknown>;
    static post: (url: string, data: RequestData.Body, obj?: RequestData.Opation) => Promise<unknown>;
    static delete: (url: string, obj?: RequestData.Opation) => Promise<unknown>;
}

export default RouterRequest;
