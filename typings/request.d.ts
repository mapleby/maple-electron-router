import { RequestData } from "../types/router-request";

declare global {
    export namespace MapleElectronRouter {
        export namespace Request {
            export type Body = RequestData.Body;
            export type Query = RequestData.Query;
            export type Opation = RequestData.Opation;
        }
    }
}
