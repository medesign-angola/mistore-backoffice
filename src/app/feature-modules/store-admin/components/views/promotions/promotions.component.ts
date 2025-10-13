import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { TableComponentInterface } from '@shared/component-interfaces/table-component.interface';
import { IWidget } from '@shared/interfaces/widget.interface';
import { PRODUCTS } from '@store/mocks/products.mock';
import { LoaderService } from '@core/services/loader/loader.service';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { ProductStatusEnum } from '@store/enums/products-status.enum';
import { IProduct } from '@store/models/product.model';
import { PromotionFacade } from './promotion.facade';
import { HttpStatusCode } from '@angular/common/http';

@Component({
    selector: 'mi-promotions',
    templateUrl: './promotions.component.html',
    styleUrl: './promotions.component.css',
    standalone: false
})
export class PromotionsComponent extends TableComponentExtender implements OnInit, TableComponentInterface {
  
  activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);
  promotionFacade = inject(PromotionFacade);

  constructor(){
    super();
    this.TABLE_STICKY_TOP = 100;
    this.checkbox = true;
    this.pagination = true;
    this.route = '/store/promotions';
    this.perPage = PRODUCTS_LIMIT;
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
        ref: SVGRefEnum.GIFT,
        color: 'black'
      },
      headerLabel: 'Produtos em Promoção',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' produtos adicionados'
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.SHOPPING_CART,
        color: 'black'
      },
      headerLabel: 'Produtos Vendidos',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' esse mês'
      }
    },
  ];

  productStatusEnum = ProductStatusEnum;
  svgRefEnum = SVGRefEnum;

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Preço + Promoção'];
  tableProducts: IProduct[] = [];

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
    this.promotionFacade.statistics.subscribe({
      next: response => {
        if(response.status === HttpStatusCode.Ok){
          const PRODUCTS = 0;
          const PRODUCTS_SOLD = 1;

          this.widgets[PRODUCTS].data = response.data.widget_products_count.data;
          this.widgets[PRODUCTS_SOLD].data = response.data.widget_products_sold.data;

        }
      },
      error: error => {}
    })
  }
  
  // End of Table Component Interface Requirements
  getProducts(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, true);
    this.promotionFacade.products(page, limit).subscribe({
      next: (incoming: IProduct[]) => {
        this.tableProducts = incoming;
        if(this.tableProducts.length > 0){

          this.totalItems = PRODUCTS.filter(product => product.promotion_price > 0).length;
          this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, false);
        
        }else{
          this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.PRODUCTS);
        }
      },
    });
  }
}
