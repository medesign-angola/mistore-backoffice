import { Component, ElementRef, OnInit, ViewChild, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LoaderService } from '@core/services/loader/loader.service';
import { WalletFacade } from '@store/components/views/wallet/wallet.facade';
import { IProduct } from '@store/models/product.model';
import { WALLET_PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { HorizontalBarChart } from '@shared/interfaces/hz-bar-chart.interface';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { TableComponentInterface } from '@shared/component-interfaces/table-component.interface';
import { IWidget } from '@shared/interfaces/widget.interface';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { monthsUntilPresent } from '../dashboard/simulator.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
    selector: 'mi-wallet',
    templateUrl: './wallet.component.html',
    styleUrl: './wallet.component.css',
    standalone: false
})
export class WalletComponent extends TableComponentExtender implements OnInit, TableComponentInterface {

  private walletFacade = inject(WalletFacade);
  private activatedRoute = inject(ActivatedRoute);

  isLoading = signal(false);
  
  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Valor arrecadado'];
  tableProducts: IProduct[] = [];

  loaderService = inject(LoaderService);

  constructor() {
    super();
    this.TABLE_STICKY_TOP = 100;
    this.checkbox = false;
    this.pagination = true;
    this.route = '/store/wallet';
    this.perPage = WALLET_PRODUCTS_LIMIT;
    this.withImage = true;
    this.withTinyText = true;
    this.imageRadius = 'lg';
    this.placeholderCount = 5;
    this.totalItems = 0;
    this.currentPage = 1;
  }

  widgetPercentageStatusEnum = WidgetPercentageStatusEnum;
  widgets: IWidget[] = [
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.COINS_HAND,
        color: 'black'
      },
      headerLabel: 'Vendas Concluídas',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' esse mês'
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.BANK_NOTE,
        color: 'black'
      },
      headerLabel: 'Valor total na carteira',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' esse ano'
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

  pageLoaderIdentifier = PageLoaderIdentifier;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.currentPage = pageParam;
      this.getProducts(pageParam, this.perPage);
    });

    this.getStatistics();
    this.generatePlaceholders();
  }

  // Start of Table Component Interface Requirements
  @ViewChild('theadElementRef') theadElementRef!: ElementRef<HTMLElement>;
  selectedDetailsStickyTopSpacing: number = 0;

  ngAfterViewInit(): void {
    this.selectedDetailsStickyTopSpacing = this.TABLE_STICKY_TOP + this.theadElementRef.nativeElement.clientHeight;
  }
  // End of Table Component Interface Requirements

  toggleSelect(): void{
      if(this.selectedItems.length > 0){
          this.selectedItems = [];
          
      }else{
          this.tableProducts.forEach(element => {
              this.selectedItems.push(element.id);
          });
      }
  }

  getStatistics(): void{
    this.isLoading.set(true);

    this.walletFacade.statistics.subscribe({
      next: response => {
        if(response.status === HttpStatusCode.Ok){
          const SALES = 0;
          const IN_WALLET = 1;

          this.widgets[SALES].data = response.data.widget_sales.data;
          this.widgets[IN_WALLET].data = response.data.widget_in_wallet.data;

          this.horizontalChart.update(val => {
            return {
              ...val,
              labels: response.data.chart_sales_per_product.labels,
              series: response.data.chart_sales_per_product.series
            }
          });

          this.isLoading.set(false);
        }
      },
      error: error => {}
    })
  }

  getProducts(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.WALLET_PRODUCTS, true);
    this.walletFacade.products(page, limit).subscribe({
      next: (incoming: IProduct[]) => {
        this.tableProducts = incoming;
        if(this.tableProducts.length > 0){

          this.totalItems = incoming.length;
          this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.WALLET_PRODUCTS, false);
        
        }else{
          this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.WALLET_PRODUCTS);
        }
      },
    });
  }

}
