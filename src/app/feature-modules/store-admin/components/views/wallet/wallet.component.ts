import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { LoaderService } from '@core/services/loader/loader.service';
import { WalletFacade } from '@store/facades/wallet.facade';
import { IProduct } from '@store/models/product.model';
import { WALLET_PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { HorizontalBarChart } from '@shared/interfaces/hz-bar-chart.interface';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { TableComponentInterface } from '@shared/component-interfaces/table-component.interface';
import { IWidget } from '@shared/interfaces/widget.interface';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';

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
    // {
    //   backgroundColor: 'black',
    //   ctaDotsColor: 'white',
    //   mainTextColor: 'white',
    //   footerTextColor: '#858585',
    //   svgIcon: {
    //     ref: SVGRefEnum.SHOPPING_CART,
    //     color: 'white'
    //   },
    //   headerLabel: 'Total de Produtos',
    //   view_data: true,
    //   data: {
    //     main: 263000,
    //     percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
    //     percentageValue: 68,
    //     footerLabelValue: 635,
    //     footerLabelText: ' produtos adicionados'
    //   }
    // },
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
        main: 63000,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 24,
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
        ref: SVGRefEnum.BANK_NOTE,
        color: 'black'
      },
      headerLabel: 'Valor total na carteira',
      view_data: true,
      data: {
        main: 683000,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 68,
        footerLabelValue: 100000,
        footerLabelText: ' esse ano'
      }
    },
  ];

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Valor arrecadado'];
  tableProducts: IProduct[] = [];

  loaderService = inject(LoaderService);

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

  pageLoaderIdentifier = PageLoaderIdentifier;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.currentPage = pageParam;
      this.getProducts(pageParam, this.perPage);
    });

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

  getProducts(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.WALLET_PRODUCTS, true);
    this.walletFacade.walletProducts(page, limit).subscribe({
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
