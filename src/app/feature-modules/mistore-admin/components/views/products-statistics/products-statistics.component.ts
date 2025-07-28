import { Component } from '@angular/core';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { IWidget } from '@shared/interfaces/widget.interface';

@Component({
    selector: 'mi-products-statistics',
    templateUrl: './products-statistics.component.html',
    styleUrl: './products-statistics.component.css',
    standalone: false
})
export class ProductsStatisticsComponent {
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
      headerLabel: 'Total de produtos',
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
      headerLabel: 'Produtos indisponíveis',
      view_data: true,
      data: {
        main: 5256,
        percentageStatus: WidgetPercentageStatusEnum.DECREASE,
        percentageValue: 68,
        footerLabelValue: -20,
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
      headerLabel: 'Produtos adicionados',
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
      headerLabel: 'Produtos removidos',
      view_data: true,
      data: {
        main: 7453,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 24,
        footerLabelValue: 663,
        footerLabelText: ' essa semana'
      }
    },
  ];
}
