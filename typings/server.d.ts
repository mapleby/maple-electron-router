import RouterServer from "../types/router-server";

declare global {
    export namespace MapleElectronRouter {
        export namespace Server {
            export type Privileges = RouterServer.Privileges;
            export type Query = RouterServer.Query;
            export type Arrange = RouterServer.Arrange;
            export type Body = RouterServer.Body;
            export type Headers = RouterServer.Headers;
            export type Request = RouterServer.Request;
            export type Response = RouterServer.Response;
            export type FileTypes = RouterServer.FileTypes;
            export type FileUrl = RouterServer.FileUrl;
            export type FileOption = RouterServer.FileOption;
            export type Route = RouterServer.Route;
            export type Router = RouterServer.Router;
            export type Routers = RouterServer.Routers;
            export type ElectronCallback = RouterServer.ElectronCallback;
        }
    }
}
