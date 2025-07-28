import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services/loader/loader.service';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { IWidget } from '@shared/interfaces/widget.interface';

@Component({
    selector: 'mi-complaints',
    templateUrl: './complaints.component.html',
    styleUrl: './complaints.component.css',
    standalone: false
})
export class ComplaintsComponent extends TableComponentExtender {
  
  activatedRoute = inject(ActivatedRoute);
  loaderService = inject(LoaderService);

  constructor() {
    super();
    this.TABLE_STICKY_TOP = 100;
    this.checkbox = true;
    this.pagination = true;
    this.route = '/admin/stores/index';
    this.perPage = 6;
    this.withImage = true;
    this.withTinyText = true;
    this.imageRadius = 'lg';
    this.placeholderCount = 5;
    this.totalItems = this.tableUsers.length;
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
      headerLabel: 'Total de produtos impróprios',
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

  tableHeader: string[] = ['Produto', 'Categoria', 'Qtd. de denúncias', 'Data da denúncia', 'Loja', 'Telefone'];
  tableUsers: any[] = [
    {
      NIF: '234532445',
      name: 'Mateus Chipapa',
      imagePath: 'assets/images/products/image-2.png',
      category: 'Perfumaria',
      complaints_count: 30,
      complaint_at: '20/10/2024',
      store: 'mateus@email.com',
      phone: '934 433 455',
    }
  ];

  pageLoaderIdentifier = PageLoaderIdentifier;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParam => {
      const pageParam = parseInt(queryParam.get('page') ?? '1');
      this.currentPage = pageParam;
      this.getStores(pageParam, this.perPage);
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

  getStores(page: number, limit: number){
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
          this.tableUsers.forEach(element => {
              this.selectedItems.push(element.id);
          });
      }
  }
}