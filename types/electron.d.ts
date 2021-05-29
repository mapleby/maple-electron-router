import Service, { Router } from "./service";

// 路由列表
interface ElectronRouter {
    Router: Router;
    Service: Service;
}

// 返回值
export const MapleElectronRouter: ElectronRouter;
