import { inject, Injectable } from "@angular/core";
import { DashboardService } from "./dashboard.api.service";
import { Observable } from "rxjs";

Injectable({
    providedIn: 'any'
})
export class DashboardFacade{
    
    private api = inject(DashboardService);

    get statistics(): Observable<any>{
        return this.api.getStatistics();
    }

}