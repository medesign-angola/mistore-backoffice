import { AfterViewInit, Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { LoaderService } from '@core/services/loader/loader.service';
import { TableComponentExtender } from '@shared/component-classes/table-component.class';
import { PRODUCTS_LIMIT } from '@shared/constants/data-limit.const';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';
import { LookProductRelationService } from '@shared/services/look-product.service';
import { ProductStatusEnum } from '@store/enums/products-status.enum';
import { LookFacade } from '@store/facades/looks/look.facade';
import { ProductFacade } from '@store/facades/products/products.facade';
import { ILook } from '@store/models/looks.model';
import { IProduct, IProductResponse } from '@store/models/product.model';
import { combineLatest } from 'rxjs';

@Component({
    selector: 'mi-see-look',
    templateUrl: './see-look.component.html',
    styleUrl: './see-look.component.css',
    standalone: false
})
export class SeeLookComponent extends TableComponentExtender implements OnInit, AfterViewInit {
  
  constructor(){
    super();
    this.TABLE_STICKY_TOP = 0;
    this.checkbox = true;
    this.pagination = true;
    this.route = './';
    this.perPage = PRODUCTS_LIMIT;
    this.withImage = true;
    this.withTinyText = true;
    this.imageRadius = 'lg';
    this.placeholderCount = 5;
    this.totalItems = 0;
    this.currentPage = 1;
  }
  
  public loaderService = inject(LoaderService);
  public pageLoaderIdentifier = PageLoaderIdentifier;
  public selectedProducts$: Signal<IProduct[]> = computed(() => this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$());

  private lookFacade = inject(LookFacade);
  private productFacade = inject(ProductFacade);
  private lookProductRelationshipService = inject(LookProductRelationService);

  private alertService = inject(AlertService);
  private activatedRoute = inject(ActivatedRoute);

  selectedLookImages: any[] = [];

  editLookFormGroup!: FormGroup;

  isEditing = signal(false);

  showProductsModal = signal(false);

  theLook!: ILook;
  isDraft: boolean = false;

  productStatusEnum = ProductStatusEnum;
  svgRefEnum = SVGRefEnum;

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Estado'];
  tableProducts: IProduct[] = [];

  id: any;

  ngOnInit(): void {
    this.editLookFormGroup = new FormGroup({
      'title': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.required, Validators.maxLength(30) ])
    })

    combineLatest([this.activatedRoute.paramMap, this.activatedRoute.queryParamMap])
    .subscribe(([params, queryParams]) => {

      this.id = params.get('id') ?? null;

      if(!this.id) return;
      this.getTheLook(this.id);

      const productsListingActivePage = queryParams.get('product_modal_page');
      if(productsListingActivePage){
        this.currentPage = parseInt(productsListingActivePage);
        this.getProducts(this.currentPage, PRODUCTS_LIMIT);
      }
    });
  }

  selectedDetailsStickyTopSpacing: number = 0;

  ngAfterViewInit(): void {
    this.selectedDetailsStickyTopSpacing = this.TABLE_STICKY_TOP + 52;
  }

  getProducts(page: number, limit: number){
      this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, true);
      this.productFacade.products(page, limit).subscribe({
        next: (incoming: IProductResponse) => {
          this.tableProducts = incoming.products;
          if(this.tableProducts.length > 0){
  
            this.itemsSelectionService.setItems = this.tableProducts;
  
            this.totalItems = incoming.total;
            this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.PRODUCTS, false);
          
          }else{
            this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.PRODUCTS);
          }
        },
      });
  }

  changeProductsModalVisibility(status: boolean): void{
    if(status){
      this.getProducts(this.currentPage, PRODUCTS_LIMIT);
      this.selectedItems = this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$();
    }
    this.showProductsModal.set(status);
  }

  getTheLook(id: string): void{
    this.lookFacade.look(id).subscribe({
      next: incoming => {
        this.theLook = incoming[0];

        this.fullfillFormInputs();
        console.log(this.theLook, this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$())
        if(!(this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$().length > 0)){
          this.lookProductRelationshipService.attachProducts(this.theLook.products);
        }
        console.log(this.theLook, this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$())
      },
      error: error => {
        console.error(error);
        this.alertService.add(error.message, LogStatus.ERROR);
      }
    })
  }

  fullfillFormInputs(): void{
    this.editLookFormGroup.get('title')?.setValue(this.theLook.name);
    this.editLookFormGroup.get('description')?.setValue(this.theLook.description);
  }
  
}
