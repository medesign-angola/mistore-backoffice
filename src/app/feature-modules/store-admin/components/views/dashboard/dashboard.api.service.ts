import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { map, Observable } from "rxjs";
import { DashboardSimulator } from "./simulator.service";
import { HttpStatusCode } from "@angular/common/http";
import { DashboardFacade } from "./dashboard.facade";

@Injectable({
    providedIn: DashboardFacade
})
export class DashboardService{
    private api = inject(GenericApi);
    private simulator = inject(DashboardSimulator);

    getStatistics(): Observable<any>{
        // return this.api.get(`api/get-store-dashboard-widgets-data`);
        return this.simulator.getStatistics().pipe(
            map(response => {
                if(response.status === HttpStatusCode.Ok){
                    // response.data.
                }

                return response;
            })
        );
    }
}