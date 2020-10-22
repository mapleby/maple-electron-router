import { RequestParams } from "../types/request";

declare global {
    export namespace MapleElectronRouter {
        export namespace Request {
            export type Body = RequestParams.Body;
            export type Query = RequestParams.Query;
            export type Opation = RequestParams.Opation;
        }
    }
}
