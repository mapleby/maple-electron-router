import SrviceRouter from "../types/service";

declare global {
    export namespace MapleElectronRouter {
        export namespace Service {
            export type Privileges = SrviceRouter.Privileges;
            export type Query = SrviceRouter.Query;
            export type Arrange = SrviceRouter.Arrange;
            export type Body = SrviceRouter.Body;
            export type Headers = SrviceRouter.Headers;
            export type Request = SrviceRouter.Request;
            export type Response = SrviceRouter.Response;
            export type FileTypes = SrviceRouter.FileTypes;
            export type FileUrl = SrviceRouter.FileUrl;
            export type FileOption = SrviceRouter.FileOption;
            export type Route = SrviceRouter.Route;
            export type Router = SrviceRouter.Router;
            export type Routers = SrviceRouter.Routers;
            export type ElectronCallback = SrviceRouter.ElectronCallback;
        }
    }
}
