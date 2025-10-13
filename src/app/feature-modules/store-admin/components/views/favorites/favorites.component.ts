import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { TableComponentInterface } from '@shared/component-interfaces/table-component.interface';
import { IWidget } from '@shared/interfaces/widget.interface';
import { LoaderService } from '@core/services/loader/loader.service';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { ProductStatusEnum } from '@store/enums/products-status.enum';
import { IProduct, IProductResponse } from '@store/models/product.model';
import { HttpStatusCode } from '@angular/common/http';
import { FavoriteFacade } from './favorites.facade';

@Component({
    selector: 'mi-favorites',
    templateUrl: './favorites.component.html',
    styleUrl: './favorites.component.css',
    standalone: false
})
export class FavoritesComponent extends TableComponentExtender implements OnInit, TableComponentInterface {
  
  activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);
  favoriteFacade = inject(FavoriteFacade);

  constructor(){
    super();
    this.TABLE_STICKY_TOP = 100;
    this.checkbox = true;
    this.pagination = true;
    this.route = '/store/favorites';
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
      backgroundColor: 'black',
      ctaDotsColor: 'white',
      mainTextColor: 'white',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.HEART_ROUNDED,
        color: 'white'
      },
      headerLabel: 'Total de produtos favoritos',
      view_data: true,
      data: {
        main: 0,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 0,
        footerLabelValue: 0,
        footerLabelText: ' produtos essa semana'
      }
    },
    {
      backgroundColor: 'white',
      ctaDotsColor: '#858585',
      mainTextColor: 'black',
      footerTextColor: '#858585',
      svgIcon: {
        ref: SVGRefEnum.TRASH,
        color: 'black'
      },
      headerLabel: 'Produtos removidos',
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

  productStatusEnum = ProductStatusEnum;
  svgRefEnum = SVGRefEnum;

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'N/ Adicionados'];
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
  
  // End of Table Component Interface Requirements

  getStatistics(): void{
    this.favoriteFacade.statistics.subscribe({
      next: response => {
        if(response.status === HttpStatusCode.Ok){
          const PRODUCTS = 0;
          const PRODUCTS_SOLD = 1;

          this.widgets[PRODUCTS].data = response.data.widget_products_count.data;
          this.widgets[PRODUCTS_SOLD].data = response.data.widget_products_removed.data;

        }
      },
      error: error => {}
    })
  }

  getProducts(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, true);
    this.favoriteFacade.products(page, limit).subscribe({
      next: (incoming: IProductResponse) => {
        this.tableProducts = incoming.products;
        if(this.tableProducts.length > 0){

          // this.totalItems = PRODUCTS.filter(product => product.favoritesCount && product.favoritesCount > 0).length;
          this.totalItems = incoming.total;
          this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, false);
        
        }else{
          this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.PRODUCTS);
        }
      },
    });
  }
}
