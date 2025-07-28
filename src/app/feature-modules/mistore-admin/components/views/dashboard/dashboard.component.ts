import { Component } from '@angular/core';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { HorizontalBarChart } from '@shared/interfaces/hz-bar-chart.interface';
import { VerticalBarChart } from '@shared/interfaces/vt-bar-chart.interface';
import { IWidget } from '@shared/interfaces/widget.interface';

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
        visible: false,
        ref: SVGRefEnum.COINS_HAND,
        color: 'white'
      },
      headerLabel: 'Total de marcas',
      view_data: true,
      data: {
        main: 836000,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 89,
        footerLabelValue: 283,
        footerLabelText: ' esse mês'
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        visible: false,
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
        visible: false,
        ref: SVGRefEnum.WALLET,
        color: 'black'
      },
      headerLabel: 'Total de clientes',
      view_data: true,
      data: {
        main: 5256,
        percentageStatus: WidgetPercentageStatusEnum.DECREASE,
        percentageValue: 68,
        footerLabelValue: -20,
        footerLabelText: ' esse mês'
      }
    },
  ];
  
  horizontalChart: HorizontalBarChart = {
    details: {
      title: 'Aquisição de valores',
      description: 'Análise dos valores ganho na plataforma.',
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

  // verticalChart: VerticalBarChart = {
  //   details: {
  //     title: 'Visibilidade da plataforma',
  //     description: 'Quantidade de visitas e abandono na plataforma.',
  //     toolpit: true
  //   },
  //   labels: [
  //     "Seg",
  //     "Ter",
  //     // "Qua",
  //     // "Qui",
  //     // "Sex",
  //     // "Sáb",
  //     // "Dom"
  //   ],
  //   series: [
  //     {
  //       name: 'Visitas',
  //       color: '#F4BF4F',
  //       data: [
  //         43,
  //         23,
  //         // 45,
  //         // 80,
  //         // 30,
  //         // 12,
  //         // 4
  //       ]
  //     },
  //     {
  //       name: 'Abandonos',
  //       color: "#ddd",
  //       data: [
  //         35,
  //         3,
  //         // 35,
  //         // 12,
  //         // 85,
  //         // 11,
  //         // 5
  //       ]
  //     },
  //   ]
  // }
}
