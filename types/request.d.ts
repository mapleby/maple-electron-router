export namespace RequestParams {
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

export class Request {
    get: (url: string, obj?: RequestParams.Opation) => Promise<unknown>;
    put: (url: string, data: RequestParams.Body, obj?: RequestParams.Opation) => Promise<unknown>;
    post: (url: string, data: RequestParams.Body, obj?: RequestParams.Opation) => Promise<unknown>;
    delete: (url: string, obj?: RequestParams.Opation) => Promise<unknown>;
    static get: (url: string, obj?: RequestParams.Opation) => Promise<unknown>;
    static put: (url: string, data: RequestParams.Body, obj?: RequestParams.Opation) => Promise<unknown>;
    static post: (url: string, data: RequestParams.Body, obj?: RequestParams.Opation) => Promise<unknown>;
    static delete: (url: string, obj?: RequestParams.Opation) => Promise<unknown>;
}

export default Request;
