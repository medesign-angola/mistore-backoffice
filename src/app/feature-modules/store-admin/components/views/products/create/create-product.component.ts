import { Component, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { ColorOption } from '@core/base-models/base/ColorOption.model';
import { IBrand } from '@core/base-models/base/brands.model';
import { IProductCategory } from '@core/base-models/base/product-category.model';
import { IProductSubCategory } from '@core/base-models/base/subcategory.model';
import { LoaderService } from '@core/services/loader/loader.service';
import { ProductFacade } from '@store/facades/products/products.facade';
import { AddProductFacade } from '@store/facades/products/add-product.facade';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryFacade } from '@store/facades/category.facade';
import { SizeFacade } from '@store/facades/size.facade';
import { ColorFacade } from '@store/facades/color.facade';
import { IProductSize } from '@store/models/product.model';
import { map } from 'rxjs';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'mi-create-product',
    templateUrl: './create-product.component.html',
    styleUrl: './create-product.component.css',
    standalone: false
})
export class CreateProductComponent implements OnInit {

  public loaderService = inject(LoaderService);
  private productFacade = inject(ProductFacade);
  private categoryFacade = inject(CategoryFacade);
  private sizeFacade = inject(SizeFacade);
  private colorFacade = inject(ColorFacade);
  private addProductFacade = inject(AddProductFacade);
  private alertService = inject(AlertService);
  private router = inject(Router);

  addProductFormGroup!: FormGroup;

  pageLoaderIdentifier = PageLoaderIdentifier;

  files: any[] = [];

  selectedBrand!: IBrand[];
  selectedCategory!: IProductCategory[];
  selectedSubCategory!: IProductSubCategory[];
  selectedSizes!: { id: string, label: string, value: string }[];
  selectedColors: ColorOption[] = [];

  promotionRateValue = signal(0);

  brandsToSelect: WritableSignal<IBrand[]> = signal([]);
  categoriesToSelect: WritableSignal<IProductCategory[]> = signal([]);
  subCategoriesToSelect: WritableSignal<IProductSubCategory[]> = signal([]);
  sizes: WritableSignal<IProductSize[]> = signal([]);
  colors: WritableSignal<ColorOption[]> = signal([]);

  isAvailable: boolean = true;

  showColorModal: boolean = false;
  theColor: ColorOption | undefined;
  colorsWithImages: { [color: string]: any[] } = {};
  imagesColors: any[] = [];

  isCreating = signal(false);

  ngOnInit(): void {
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS, true);
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS, true);
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, true);
    
    this.productFacade.brands().subscribe((incomingBrands: IBrand[]) => {
      this.brandsToSelect.set(incomingBrands);
      if(this.brandsToSelect.length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS, false);

      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.BRANDS_ADD_PRODUCTS);
      }
    });

    this.categoryFacade.categoriesWithSubcategories().subscribe((incomingCategories: IProductCategory[]) => {
      this.categoriesToSelect.set(incomingCategories);
      if(this.categoriesToSelect.length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS, false);

      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.CATEGORIES_ADD_PRODUCTS);
      }
    });

    this.colorFacade.all().pipe(
      map(incoming => {
        // incoming.forEach((ele: ColorOption) => {
        //   this.colorsWithImages[ele.id] = [];
        // });
        return incoming
      })
    ).subscribe((incoming: ColorOption[]) => this.colors.set(incoming));

    if(!this.selectedCategory){
      this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, false);
    }

    this.addProductFormGroup = new FormGroup({
      'productName': new FormControl('', [ Validators.required ]),
      'price': new FormControl(0, [Validators.required, Validators.min(0)]),
      'qtd': new FormControl(0, [Validators.required, Validators.min(0)]),
      'promotionRate': new FormControl(0, [Validators.required, Validators.min(0)]),
      'description': new FormControl('', [Validators.required])
    })

  }

  addImagesToColor($event: any[]): void{
    this.colorsWithImages[this.theColor!.id] = $event;
  }

  imageHasLoaded(colorId: string, index: number){
    this.colorsWithImages[colorId][index]['hasLoaded'] = true;
  }

  removeFileItem(colorId: string, index: number){
    this.colorsWithImages[colorId].splice(index, 1);
  }

  hideColorModal($event: boolean): void{
    if($event){
      this.showColorModal = false;
    }
  }

  selectedBrandEventHandler($event: any){
    this.selectedBrand = $event;
  }

  selectedCategoryEventHandler($event: any){
    this.selectedCategory = $event;
    this.getSubCategoriesFromSelectedCategories();
  }

  selectedSubCategoryEventHandler($event: any){
    this.selectedSubCategory = $event;
    this.sizeFacade.sizesOfSubcategory(this.selectedSubCategory[0].id).subscribe((incoming) => this.sizes.set(incoming));
  }

  selectedSizesEventHandler($event: any){
    this.selectedSizes = $event;
  }

  getSubCategoriesFromSelectedCategories(){
    this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, true);
    this.categoryFacade.subcategoriesOfCategory(this.selectedCategory[0].id).subscribe((incomingSubCategories: IProductSubCategory[]) => {
      this.subCategoriesToSelect.set(incomingSubCategories);
      if(this.subCategoriesToSelect().length > 0){
        this.loaderService.setLoadingStatus(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS, false);
      }else{
        this.loaderService.loaderActionAfterTryFetching(this.pageLoaderIdentifier.SUB_CATEGORIES_ADD_PRODUCTS);
      }
    });
  }

  changeAvailability(){
    this.isAvailable = !this.isAvailable;
  }

  toggleSelectColor(colorId: string){
    let theColor = this.colors().find(color => color.id === colorId);
    if(theColor && 'selected' in theColor){
      theColor.selected = !theColor.selected;
      if(theColor.selected){
        
        // adiciona as imagens da cor clicada
        this.showColorModal = true;
        this.theColor = theColor;

        this.selectedColors.push(theColor);
      } else {
        const theIndex = this.selectedColors.findIndex(item => item.id === theColor!.id);
        if(theIndex >= 0){

          // remove as imagens da cor clicada
          
          this.selectedColors.splice(theIndex, 1);

        }
      }
    }
  }

  submitForm(): void{

    if(this.addProductFormGroup.invalid){
      this.alertService.add("Verifique se os campos todos são válidos.", LogStatus.ERROR);
      return;
    }

    if(!(this.files.length > 0)){
      this.alertService.add("Seleccione as imagens deste produto", LogStatus.WARNING);
      return;
    }

    if(!(this.selectedBrand.length > 0)){
      this.alertService.add("Seleccione uma marca para este produto", LogStatus.INFO);
      return;
    }

    if(!(this.selectedCategory.length > 0)){
      this.alertService.add("Seleccione uma categoria para este produto", LogStatus.INFO);
      return;
    }

    if(!(this.selectedSubCategory.length > 0)){
      this.alertService.add("Seleccione uma subcategoria para este produto", LogStatus.INFO);
      return;
    }

    if(!(this.selectedColors.length > 0)){
      this.alertService.add("Seleccione pelo menos uma cor para este produto", LogStatus.INFO);
      return;
    }

    if(!(this.selectedSizes.length > 0)){
      this.alertService.add("Seleccione um tamanho para este produto", LogStatus.INFO);
      return;
    }

    // after validation
    const fields: AddProductModel = {
      name: this.addProductFormGroup.get('productName')?.value,
      price: parseFloat(this.addProductFormGroup.get('price')!.value),
      stock_quantity: [parseInt(this.addProductFormGroup.get('qtd')!.value)],
      stock_status: [this.isAvailable],
      discount_status: true,
      discount_rate: (this.addProductFormGroup.get('promotionRate')?.value !== '') ? parseInt(this.addProductFormGroup.get('promotionRate')?.value) : 0,
      desc: this.addProductFormGroup.get('description')?.value,
      brand_id: this.selectedBrand[0].id,
      category_id: this.selectedCategory[0].id,
      subcategory_id: this.selectedSubCategory[0].id,
      size: this.selectedSizes.flatMap(_ => _.id),
      color: this.selectedColors.flatMap(_ => _.id),
      images: this.files.flatMap(_ => (_.previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '')),
      image_filename: this.files.flatMap(_ => _.name),
      shop_id: '1c13d9e3-41a3-47c5-83ae-8785441c878b',
      coverimage: (this.files[0].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, ''),
      coverimage_filename: this.files[0].name,
      imagescolor: Object.values(this.colorsWithImages).flatMap((images: any[]) => images.map(image => (image.previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, ''))),
      imagescolor_filename: Object.values(this.colorsWithImages).flatMap((images: any[]) => images.map(image => image.name))
    };

    console.log("campos do produto a ser criado: ", fields);

    this.isCreating.set(true);
    this.addProductFacade.addProduct(JSON.parse(JSON.stringify(fields))).subscribe({
      next: repsonse => {
        this.alertService.add("Produto adicionado com êxito", LogStatus.SUCCESS);
        this.router.navigate(['/store/products']);
        this.isCreating.set(false);
      },
      error: error => {
        this.alertService.add(error, LogStatus.ERROR);
        this.isCreating.set(false);
        console.error(error);
      }
    });
  }
}

export interface AddProductModel{
  name: string,
  price: number,
  stock_quantity: number[],
  stock_status: boolean[]
  discount_status: boolean,
  discount_rate: number,
  shop_id: string,
  coverimage: string,
  coverimage_filename: string,
  desc: number,
  brand_id: string | undefined,
  category_id: string | undefined,
  subcategory_id: string | undefined,
  size: string[],
  color: string[],
  images: string[],
  image_filename: string[],
  imagescolor: string[],
  imagescolor_filename: string[]
}