import { HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { DashboardService } from "./dashboard.api.service";

@Injectable({
    providedIn: DashboardService
})
export class DashboardSimulator{

    private MY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
    
    getStatistics(): Observable<any>{

        const data = {
            widget_sales: {
                data: this.widgetData()
            },
            widget_products: {
                data: this.widgetData()
            },
            widget_income: {
                data: this.widgetData()
            },
            chart_sales_per_product: {
                labels: monthsUntilPresent(),
                series: [
                    {
                        name: 'Ganhos',
                        color: '#61C554',
                        data: generateChartSeriesDatas()
                    },
                    {
                        name: 'Perdas',
                        color: "#ddd",
                        data: generateChartSeriesDatas()
                    }
                ]
            },
            chart_visits_per_week: {
                labels: weeksUntilPresent(),
                series: [
                    {
                        name: 'Visitas',
                        color: '#F4BF4F',
                        data: generateChartVisitisSeriesDatas()
                    },
                    {
                        name: 'Abandonos',
                        color: "#ddd",
                        data: generateChartVisitisSeriesDatas()
                    }
                ]
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

export function random(min: number, max: number): number{
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function monthsUntilPresent(): string[]{
    const allMonths = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];

    const currentMonthIndex = new Date().getMonth(); // 0 = Jan, 9 = Out, etc.
    return allMonths.slice(0, currentMonthIndex);
}

export function weeksUntilPresent(): string[]{
    const allDays = [
        "Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
    ];

    const today = new Date();
    const dayIndex = today.getDay();
    return allDays.slice(0, dayIndex);
}

export function generateChartSeriesDatas(min: number = 1000, max: number = 10000, static_number?: number): number[]{
    const data = [
        random(min, max), // Jan
        random(min, max), // Fev
        random(min, max), // Mar
        random(min, max), // Abr
        random(min, max), // Mai
        random(min, max), // Jun
        random(min, max), // Jul
        random(min, max), // Ago
        random(min, max), // Set
        random(min, max), // Out
        random(min, max), // Nov
        random(min, max), // Dez
    ];

    const currentMonthIndex = new Date().getMonth(); // 0 = Jan, 9 = Out
    return data.slice(0, currentMonthIndex);
}

export function generateChartVisitisSeriesDatas(min: number = 0, max: number = 1000): number[]{
    const data = [
        random(min, max), // Dom
        random(min, max), // Seg
        random(min, max), // Ter
        random(min, max), // Qua
        random(min, max), // Qui
        random(min, max), // Sex
        random(min, max), // Sáb
    ];

    const today = new Date();
    const dayIndex = today.getDay();
    return data.slice(0, dayIndex);
}