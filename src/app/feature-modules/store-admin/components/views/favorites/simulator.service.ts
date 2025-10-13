import { Injectable } from "@angular/core";
import { HttpStatusCode } from "@angular/common/http";
import { Observable, of, delay } from "rxjs";
import { random } from "../dashboard/simulator.service";
import { FavoriteService } from "./favorites.api.service";

@Injectable({
    providedIn: FavoriteService
})
export class FavoriteSimulator {
    private MY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    
    getStatistics(): Observable<any>{

        const data = {
            widget_products_count: {
                data: this.widgetData()
            },
            widget_products_removed: {
                data: this.widgetData()
            }
        };

        const response = {
            status: HttpStatusCode.Ok,
            data
        }

        return of(response).pipe(delay(3000));
    }

    private widgetData(): Record<string, any>{
        return {
            main: random(10000, 1000000),
            percentageStatus: random(0, 1) === 1 ? 'encrease' : 'decrease',
            percentageValue: random(0, 100),
            footerLabelValue: random(1, 100),
            footerLabelText: ' essa semana'
        };
    }
}