import Service, { Router } from "./service";
import Request from "./request";

// 路由列表
interface ElectronRouter {
    Router: Router;
    Service: Service;
    Request: Request;
}

// 返回值
export const MapleElectronRouter: ElectronRouter;
