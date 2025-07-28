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
import { combineLatest, switchMap, map, of } from 'rxjs';

@Component({
    selector: 'mi-edit-look-draft',
    templateUrl: './edit-look-draft.component.html',
    styleUrl: './edit-look-draft.component.css',
    standalone: false
})
export class EditLookDraftComponent extends TableComponentExtender implements OnInit, AfterViewInit {
  
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

  private temporaryProductsActions: { action: 'added' | 'removed', product: IProduct, index?: number }[] = [];

  private lookFacade = inject(LookFacade);
  private productFacade = inject(ProductFacade);
  private lookProductRelationshipService = inject(LookProductRelationService);

  private alertService = inject(AlertService);
  private activatedRoute = inject(ActivatedRoute);

  private router = inject(Router);

  editLookOnDraftFormGroup!: FormGroup;

  isEditing = signal(false);

  showProductsModal = signal(false);

  theLook!: ILook;

  productStatusEnum = ProductStatusEnum;
  svgRefEnum = SVGRefEnum;

  tableHeader: string[] = ['Produto', 'Categoria', 'Quantidade', 'Data de Registro', 'Preço', 'Estado'];
  tableProducts: IProduct[] = [];

  ngOnInit(): void {
    this.editLookOnDraftFormGroup = new FormGroup({
      'title': new FormControl('', [ Validators.required, Validators.maxLength(30) ]),
      'description': new FormControl('', [ Validators.maxLength(30) ])
    })

    combineLatest([this.activatedRoute.paramMap, this.activatedRoute.queryParamMap])
    .subscribe(([params, queryParams]) => {

      const id = params.get('id') ?? null;

      if(!id) return;
      this.getTheLook(id);

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

  toggleSelect(): void{
      if(this.selectedItems.length > 0){
        this.unselectAll();
      }else{
          this.tableProducts.forEach(element => {
              this.selectedItems.push(element);
          });
      }

      this.lookProductRelationshipService.attachProducts((this.selectedItems) as IProduct[]);
  }

  cancel(): void{
    this.changeProductsModalVisibility(false);
    this.revertTemporaryActions(this.temporaryProductsActions);
    this.lookProductRelationshipService.attachProducts(this.selectedItems);
  }

  save(): void{
    this.changeProductsModalVisibility(false);
    this.temporaryProductsActions = [];
    this.lookProductRelationshipService.attachProducts((this.selectedItems) as IProduct[]);

    // actualizar os productos do look em draft
    this.lookFacade.updateProductsOfLookOnDraft(this.theLook.id, this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$()).subscribe({
      next: response => {
        this.alertService.add(response.message, LogStatus.SUCCESS);
      },
      error: error => {
        console.error(error.message);
        this.alertService.add(error.message, LogStatus.ERROR);
      }
    });
  }

  override selectItem(item: IProduct){
      let itemIndex: string | number = this.isSelected(item.id, 'index');
      if((typeof(itemIndex) === 'number') && itemIndex !== -1){
          this.selectedItems.splice(itemIndex, 1);
          this.tmpSelectionAction(item, 'removed', itemIndex);
          console.log("console 1: ", this.temporaryProductsActions, this.selectedItems);
          return;
      }
      
      this.tmpSelectionAction(item, 'added');
      this.selectedItems.push(item);
  }

  revertTemporaryActions(actions: { action: 'added' | 'removed', product: IProduct, index?: number }[]): void{
    actions.forEach(action => {
      const theProductIndex = this.selectedItems.findIndex(selectedProduct => selectedProduct.id === action.product.id);
      switch(action.action){
        case 'added':
          if (theProductIndex !== -1) {
              this.selectedItems.splice(theProductIndex, 1);
          }
          break;
        case 'removed':
          // se foi removido ele deve adicionar o item exatamente no seu index
          if(action.index !== undefined && action.index !== null){
            this.selectedItems.splice(action.index, 0, action.product);
          }
          break;
        default:
          break;
      }
    })

    this.lookProductRelationshipService.attachProducts(this.selectedItems);
  }

  tmpSelectionAction(product: IProduct, action: 'added' | 'removed', index?: number): void{
    const ind = this.temporaryProductsActions.findIndex(it => it.product.id === product.id);
    if(ind === -1){
      this.temporaryProductsActions.push({ action, product, index });
    } else {
      this.temporaryProductsActions.splice(ind, 1);
    }
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
    this.lookFacade.lookOnDraft(id).subscribe({
      next: incoming => {
        this.theLook = incoming;

        this.fullfillFormInputs();
        if(!(this.lookProductRelationshipService.selectedProductsToAttachOnNewLook$().length > 0)){
          this.lookProductRelationshipService.attachProducts(this.theLook.products);
        }

      },
      error: error => {
        console.error(error);
        this.alertService.add(error.message, LogStatus.ERROR);
        this.router.navigate(['/store/looks']);
      }
    });
  }

  fullfillFormInputs(): void{
    this.editLookOnDraftFormGroup.get('title')?.setValue(this.theLook.name);
    if(this.theLook.description.length > 0)
      this.editLookOnDraftFormGroup.get('description')?.setValue(this.theLook.description);
  }
  
  submit(): void{
    if(this.editLookOnDraftFormGroup.invalid) return;
    if(!(this.selectedProducts$().length > 0)){
      this.alertService.add("Seleccione os produtos para criar o look", LogStatus.ERROR)
      return;
    };

    const look = {
      id: this.theLook.id,
      name: this.editLookOnDraftFormGroup.get('title')?.value,
      description: this.editLookOnDraftFormGroup.get('description')?.value
    }

    this.isEditing.set(true);
    this.lookFacade.editLookOnDraft(look)
    .subscribe({
      next: (response) => {
        this.alertService.add(response.message, LogStatus.SUCCESS);
        this.isEditing.set(false);
        this.router.navigate(['/store/looks']);
      },
      error: (error) => {
        this.alertService.add(error, LogStatus.ERROR);
        this.isEditing.set(false);
        console.error(error);
      }
    });

  }
}
