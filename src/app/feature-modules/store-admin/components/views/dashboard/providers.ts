import { DashboardService } from "./dashboard.api.service";
import { DashboardFacade } from "./dashboard.facade";
import { DashboardSimulator } from "./simulator.service";

export function loadDashboardProviders(): any[]{
    return [
        DashboardService,
        DashboardFacade,
        DashboardSimulator
    ];
}