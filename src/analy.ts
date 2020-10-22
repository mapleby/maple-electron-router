// 导入要使用的模块
import path from "path";

// 文件类型解析
export default class Analy {
    // new方法
    constructor(url: string, accept: string) {
        // 获取后缀
        this.suffix = path.extname(url);
        // 当需要的格式是文本的情况
        if (/text\/html/.test(accept)) {
            this.type = "text/html;charset=utf-8";
            return;
        }

        // 转换后缀成小写
        const index: string = this.suffix.toLowerCase();
        // 获取格式
        const type = this.types[index];

        // 返回对应格式
        if (type) this.type = `${type};charset=utf-8`;
        // 没有后缀的文件
        else if (this.suffix === "") this.type = "text/html;charset=utf-8";
        // 默认格式
        else this.type = "*/*;charset=utf-8";
    }

    // 后缀
    public suffix: string = "";
    // 类型
    public type: string = "";

    // 配置标签
    public get [Symbol.toStringTag](): string { return "Analy"; }

    // 文件类型
    private get types(): MapleElectronRouter.Service.FileTypes {
        return {
            // 文本类型
            ...this.text_type,
            // 音频类型
            ...this.audio_type,
            // 视频类型
            ...this.video_type,
            // 图片类型
            ...this.image_type
        }
    }

    // 文本类型
    private get text_type(): MapleElectronRouter.Service.FileTypes {
        return {
            ".xq": "text/xml",
            ".rt": "text/vnd.rn-realtext",
            ".fo": "text/xml",
            ".323": "text/h323",
            ".biz": "text/xml",
            ".cml": "text/xml",
            ".asa": "text/asa",
            ".asp": "text/asp",
            ".css": "text/css",
            ".csv": "text/csv",
            ".dcd": "text/xml",
            ".dtd": "text/xml",
            ".ent": "text/xml",
            ".htc": "text/x-component",
            ".htx": "text/html",
            ".htm": "text/html",
            ".htt": "text/webviewhtml",
            ".jsp": "text/html",
            ".mml": "text/xml",
            ".mtx": "text/xml",
            ".plg": "text/html",
            ".rdf": "text/xml",
            ".sol": "text/plain",
            ".spp": "text/xml",
            ".stm": "text/html",
            ".tld": "text/xml",
            ".txt": "text/plain",
            ".uls": "text/iuls",
            ".vml": "text/xml",
            ".tsd": "text/xml",
            ".vcf": "text/x-vcard",
            ".wml": "text/vnd.wap.wml",
            ".wsc": "text/scriptlet",
            ".xdr": "text/xml",
            ".xql": "text/xml",
            ".xsd": "text/xml",
            ".xml": "text/xml",
            ".odc": "text/x-ms-odc",
            ".r3t": "text/vnd.rn-realtext3d",
            ".sor": "text/plain",
            ".xsl": "text/xml",
            ".math": "text/xml",
            ".vxml": "text/xml",
            ".html": "text/html",
            ".wsdl": "text/xml",
            ".xslt": "text/xml",
            ".xhtml": "text/html",
            ".xquery": "text/xml"
        };
    }

    // 音频类型
    private get audio_type(): MapleElectronRouter.Service.FileTypes {
        return {
            ".ra": "audio/vnd.rn-realaudio",
            ".au": "audio/basic",
            ".rpm": "audio/x-pn-realaudio-plugin",
            ".acp": "audio/x-mei-aac",
            ".la1": "audio/x-liquid-file",
            ".aif": "audio/aiff",
            ".m3u": "audio/mpegurl",
            ".pls": "audio/scpls",
            ".ram": "audio/x-pn-realaudio",
            ".rmi": "audio/mid",
            ".rmm": "audio/x-pn-realaudio",
            ".snd": "audio/basic",
            ".wav": "audio/x-wav",
            ".wma": "audio/x-ms-wma",
            ".xpl": "audio/scpls",
            ".wax": "audio/x-ms-wax",
            ".mid": "audio/mid",
            ".mp2": "audio/mp2",
            ".mp3": "audio/mp3",
            ".mp4": "audio/mp4",
            ".mnd": "audio/x-musicnet-download",
            ".mp1": "audio/mp1",
            ".mns": "audio/x-musicnet-stream",
            ".mpga": "audio/rn-mpeg",
            ".midi": "audio/mid",
            ".aiff": "audio/aiff",
            ".aifc": "audio/aiff",
            ".lavs": "audio/x-liquid-secure",
            ".lmsff": "audio/x-la-lms",

        }
    }

    // 视频类型
    private get video_type(): MapleElectronRouter.Service.FileTypes {
        return {
            ".rv": "video/vnd.rn-realvideo",
            ".wm": "video/x-ms-wm",
            ".asf": "video/x-ms-asf",
            ".asx": "video/x-ms-asf",
            ".avi": "video/avi",
            ".ivf": "video/x-ivf",
            ".m1v": "video/x-mpeg",
            ".m2v": "video/x-mpeg",
            ".m4e": "video/mpeg4",
            ".mp4": "video/mpeg4",
            ".mpa": "video/x-mpg",
            ".mpe": "video/x-mpeg",
            ".mpg": "video/mpg",
            ".mps": "video/x-mpeg",
            ".mpv": "video/mpg",
            ".wmv": "video/x-ms-wmv",
            ".wmx": "video/x-ms-wmx",
            ".wvx": "video/x-ms-wvx",
            ".mpv2": "video/mpeg",
            ".mpeg": "video/mpg",
            ".mp2v": "video/mpeg",
            ".movie": "video/x-sgi-movie"
        };
    }

    // 图类型片
    private get image_type(): MapleElectronRouter.Service.FileTypes {
        return {
            ".rp": "image/vnd.rn-realpix",
            ".vst": "image/x-tga",
            ".eps": "image/x-eps",
            ".svg": "image/svg+xml",
            ".fax": "image/fax",
            ".gif": "image/gif",
            ".ico": "image/x-icon",
            ".jpe": "image/jpeg",
            ".jpg": "image/jpeg",
            ".net": "image/pnetvue",
            ".png": "image/png",
            ".tif": "image/tiff",
            ".tiff": "image/tiff",
            ".jfif": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".wbmp": "image/vnd.wap.wbmp"
        };
    }

    // 判断是否是html 
    public noSuffixIsHtml(): boolean {
        // 是
        if (this.suffix === "" && this.type === "text/html;charset=utf-8") return true;

        // 不是
        return false;
    }
}
