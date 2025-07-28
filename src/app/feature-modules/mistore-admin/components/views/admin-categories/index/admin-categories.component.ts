import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services/loader/loader.service';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { IWidget } from '@shared/interfaces/widget.interface';

@Component({
    selector: 'mi-admin-categories',
    templateUrl: './admin-categories.component.html',
    styleUrl: './admin-categories.component.css',
    standalone: false
})
export class AdminCategoriesComponent extends TableComponentExtender {
  
  activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);

  constructor() {
    super();
    this.TABLE_STICKY_TOP = 100;
    this.checkbox = true;
    this.pagination = true;
    this.route = '/store/products';
    this.perPage = 6;
    this.withImage = false;
    this.imageRadius = 'lg';
    this.withTinyText = false;
    this.placeholderCount = 5;
    this.totalItems = this.tableCategories.length;
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
        visible: false,
        ref: SVGRefEnum.COINS_HAND,
        color: 'white'
      },
      headerLabel: 'Total de categorias',
      view_data: true,
      data: {
        main: 836000,
        percentageStatus: WidgetPercentageStatusEnum.ENCREASE,
        percentageValue: 89,
        footerLabelValue: 283,
        footerLabelText: ' esse mês'
      }
    }
  ];

  tableHeader: string[] = ['Categoria', 'Data de Registro'];
  tableCategories: any[] = [
    {
      category: 'Roupa',
      created_at: '22/10/2024'
    }
  ];

  pageLoaderIdentifier = PageLoaderIdentifier;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.currentPage = pageParam;
      this.getCategories(pageParam, this.perPage);
    });
    this.generatePlaceholders();
  }

  // Start of Table Component Interface Requirements
  @ViewChild('theadElementRef') theadElementRef!: ElementRef<HTMLElement>;
  selectedDetailsStickyTopSpacing: number = 0;

  ngAfterViewInit(): void {
    this.selectedDetailsStickyTopSpacing = this.TABLE_STICKY_TOP + this.theadElementRef.nativeElement.clientHeight;
  }

  ngOnDestroy(): void {
    
  }

  getCategories(page: number, limit: number){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, true);
    // this.productFacade.products(page, limit).subscribe({
    //   next: (incoming: IProductResponse) => {
    //     this.tableProducts = incoming.products;
    //     if(this.tableProducts.length > 0){

    //       this.itemsSelectionService.setItems = this.tableProducts;

    //       this.totalItems = incoming.total;
    //       this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, false);
        
    //     }else{
    //       this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.PRODUCTS);
    //     }
    //   },
    // });
  }

  toggleSelect(): void{
      if(this.selectedItems.length > 0){
          this.selectedItems = [];
          
      }else{
          this.tableCategories.forEach(element => {
              this.selectedItems.push(element.id);
          });
      }
  }

}
