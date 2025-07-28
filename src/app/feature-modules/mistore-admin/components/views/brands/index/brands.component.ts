import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services/loader/loader.service';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { HorizontalBarChart } from '@shared/interfaces/hz-bar-chart.interface';
import { IWidget } from '@shared/interfaces/widget.interface';

@Component({
    selector: 'mi-brands',
    templateUrl: './brands.component.html',
    styleUrl: './brands.component.css',
    standalone: false
})
export class BrandsIndexComponent extends TableComponentExtender {
  
  activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);

  constructor() {
    super();
    this.TABLE_STICKY_TOP = 100;
    this.checkbox = true;
    this.pagination = true;
    this.route = '/store/products';
    this.perPage = 6;
    this.withImage = true;
    this.imageRadius = 'lg';
    this.withTinyText = false;
    this.placeholderCount = 5;
    this.totalItems = this.tableBrands.length;
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
      headerLabel: 'Total de marcas',
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

  tableHeader: string[] = ['Logotipo', 'Nome', 'Origem', 'Data de Registro'];
  tableBrands: any[] = [
    {
      imagePath: 'assets/images/brands/brand-1.png',
      name: 'Lacoste',
      source: 'Internacional',
      created_at: '22/10/2024'
    }
  ];

  pageLoaderIdentifier = PageLoaderIdentifier;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.currentPage = pageParam;
      this.getUsers(pageParam, this.perPage);
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

  getUsers(page: number, limit: number){
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
          this.tableBrands.forEach(element => {
              this.selectedItems.push(element.id);
          });
      }
  }

}
