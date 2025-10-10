import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { HorizontalBarChart } from '@shared/interfaces/hz-bar-chart.interface';
import { VerticalBarChart } from '@shared/interfaces/vt-bar-chart.interface';
import { IWidget } from '@shared/interfaces/widget.interface';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { DashboardFacade } from './dashboard.facade';
import { HttpStatusCode } from '@angular/common/http';
import { generateChartSeriesDatas, generateChartVisitisSeriesDatas, monthsUntilPresent, weeksUntilPresent } from './simulator.service';

@Component({
    selector: 'mi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: false
})
export class DashboardComponent implements OnInit {

  private dashboardFacade = inject(DashboardFacade);
  isLoading = signal(false);

  widgetPercentageStatusEnum = WidgetPercentageStatusEnum;
  widgets: IWidget[] = [
    {
      backgroundColor: 'black',
      ctaDotsColor: 'white',
      mainTextColor: 'white',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.COINS_HAND,
        color: 'white'
      },
      headerLabel: 'Vendas Concluídas',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' essa semana'
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.WALLET,
        color: 'black'
      },
      headerLabel: 'Produtos disponíveis',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ''
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.WALLET,
        color: 'black'
      },
      headerLabel: 'Valor arrecadado',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.DECREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' essa semana'
      }
    },
  ];
  
  horizontalChart: WritableSignal<HorizontalBarChart> = signal({
    details: {
      title: 'Dados por produtos',
      description: 'Análise de estados de produtos por venda',
      chartUnity: 'AOA',
      toolpit: true
    },
    labels: monthsUntilPresent(),
    series: [
      {
          name: 'Ganhos',
          color: '#61C554',
          data: []
      },
      {
          name: 'Perdas',
          color: "#ddd",
          data: []
      }
    ]
  })

  verticalChart: WritableSignal<VerticalBarChart> = signal({
    details: {
      title: 'Dados da loja',
      description: 'Número de visitantes da sua loja nesta semana.',
      toolpit: true
    },
    labels: weeksUntilPresent(),
    series: [
      {
          name: 'Visitas',
          color: '#F4BF4F',
          data: []
      },
      {
          name: 'Abandonos',
          color: "#ddd",
          data: []
      }
    ]
  });

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void{
    this.isLoading.set(true);

    this.dashboardFacade.statistics.subscribe({
      next: response => {
        if(response.status === HttpStatusCode.Ok){
          const SALES = 0;
          const PRODUCTS = 1;
          const INCOME = 2

          this.widgets[SALES].data = response.data.widget_sales.data;
          this.widgets[PRODUCTS].data = response.data.widget_products.data;
          this.widgets[INCOME].data = response.data.widget_income.data;

          this.horizontalChart.update(val => {
            return {
              ...val,
              labels: response.data.chart_sales_per_product.labels,
              series: response.data.chart_sales_per_product.series
            }
          });
          this.verticalChart.update(val => {
            return {
              ...val,
              labels: response.data.chart_visits_per_week.labels,
              series: response.data.chart_visits_per_week.series
            }
          });

          this.isLoading.set(false);
        }
      },
      error: error => {}
    })
  }
}
