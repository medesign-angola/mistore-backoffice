import { Component } from '@angular/core';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { HorizontalBarChart } from '@shared/interfaces/hz-bar-chart.interface';
import { VerticalBarChart } from '@shared/interfaces/vt-bar-chart.interface';
import { IWidget } from '@shared/interfaces/widget.interface';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';

@Component({
    selector: 'mi-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    standalone: false
})
export class DashboardComponent {

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
        main: 1234,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 24,
        footerLabelValue: 283,
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
        main: 7453,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 24,
        footerLabelValue: 663,
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
      headerLabel: 'Valor arrecadado',
      view_data: true,
      data: {
        main: 1234,
        percentageStatus: WidgetPercentageStatusEnum.DECREASE,
        percentageValue: 24,
        footerLabelValue: -40000,
        footerLabelText: ' essa semana'
      }
    },
  ];
  
  horizontalChart: HorizontalBarChart = {
    details: {
      title: 'Dados por produtos',
      description: 'Análise de estados de produtos por venda',
      chartUnity: 'AOA',
      toolpit: true
    },
    labels: [
      "Jan",
      "Fev",
      // "Mar",
      // "Abr",
      // "Mai",
      // "Jun",
      // "Jul",
      // "Ago",
      // "Set",
      // "Out",
      // "Nov",
      // "Dez"
    ],
    series: [
      {
        name: 'Ganhos',
        color: '#61C554',
        data: [
          10123,
          13345,
          // 35235,
          // 25223,
          // 64213,
          // 23000,
          // 50522,
          // 23409,
          // 21345,
          // 53234,
          // 34563,
          // 54322
        ]
      },
      {
        name: 'Perdas',
        color: "#ddd",
        data: [
          13000,
          23000,
          // 45123,
          // 35342,
          // 56000,
          // 23553,
          // 70000,
          // 23409,
          // 21345,
          // 64234,
          // 14563,
          // 14322
        ]
      }
    ]
  }

  verticalChart: VerticalBarChart = {
    details: {
      title: 'Dados da loja',
      description: 'Número de visitantes da sua loja nesta semana.',
      toolpit: true
    },
    labels: [
      "Seg",
      "Ter",
      // "Qua",
      // "Qui",
      // "Sex",
      // "Sáb",
      // "Dom"
    ],
    series: [
      {
        name: 'Visitas',
        color: '#F4BF4F',
        data: [
          43,
          23,
          // 45,
          // 80,
          // 30,
          // 12,
          // 4
        ]
      },
      {
        name: 'Abandonos',
        color: "#ddd",
        data: [
          35,
          3,
          // 35,
          // 12,
          // 85,
          // 11,
          // 5
        ]
      },
    ]
  }
}
