import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '@core/services/loader/loader.service';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { WidgetPercentageStatusEnum } from '@shared/Enums/widget-percentage-status.enum';
import { IWidget } from '@shared/interfaces/widget.interface';

@Component({
    selector: 'mi-advertisements',
    templateUrl: './advertisements.component.html',
    styleUrl: './advertisements.component.css',
    standalone: false
})
export class AdvertisementsComponent extends TableComponentExtender {
  
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
    this.totalItems = this.tableAdvertisements.length;
    this.currentPage = 1;
  }

  tableHeader: string[] = ['Publicidade', 'Página de destino', 'Duração', 'Data de registro'];
  tableAdvertisements: any[] = [
    {
      ref: '234532445',
      name: 'P1',
      imagePath: 'assets/images/products/image-2.png',
      destination_page: 'Página inicial',
      duration: '1 Semana',
      created_at: '20/10/2024',
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
          this.tableAdvertisements.forEach(element => {
              this.selectedItems.push(element.id);
          });
      }
  }
}