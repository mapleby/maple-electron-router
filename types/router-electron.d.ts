import RouterServer from "./router-server";
import RouterRequest from "./router-request";

// 路由列表
interface ElectronRouter {
    RouterServer: RouterServer;
    RouterRequest: RouterRequest;
}

// 返回值
export const MapleElectronRouter: ElectronRouter;
