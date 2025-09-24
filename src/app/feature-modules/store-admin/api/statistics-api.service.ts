import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { APIExtender } from "@core/class/api/api-extender.class";
import { environment } from "@env/environment.development";
import { WidgetPercentageStatusEnum } from "@shared/Enums/widget-percentage-status.enum";
import { StatisticsData } from "@store/models/statistics.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StatisticsApiService{
    api = inject(GenericApi);
    
    getProductsPageStatistics(): Observable<StatisticsData>{
        return this.api.get<StatisticsData>(`api/products/Get-totalproduct?id=${ this.api.getUserShopId }`)
                .pipe(
                    map((incoming: any) => {
                        return {
                            main: incoming ?? 0,
                            percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
                            percentageValue: 0,
                            footerLabelValue: 0
                        };
                    }),
                );
    }

    getAvailableProductsPageStatistics(): Observable<StatisticsData>{
        return this.api.get<StatisticsData>(`api/StockApi/ActiveStock?id=${ this.api.getUserShopId }`)
                .pipe(
                    map((incoming: any) => {
                        return {
                            main: incoming ?? 0,
                            percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
                            percentageValue: 0,
                            footerLabelValue: 0
                        };
                    }),
                );
    }

    getUnavailableProductsPageStatistics(): Observable<StatisticsData>{
        return this.api.get<StatisticsData>(`api/StockApi/UnavailableStock?id=${ this.api.getUserShopId }`)
                .pipe(
                    map((incoming: any) => {
                        return {
                            main: incoming ?? 0,
                            percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
                            percentageValue: 0,
                            footerLabelValue: 0
                        };
                    }),
                );
    }

}