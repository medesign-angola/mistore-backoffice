import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBrand } from '@core/base-models/base/brands.model';
import { ColorOption } from '@core/base-models/base/ColorOption.model';
import { IProductCategory } from '@core/base-models/base/product-category.model';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { LoaderService } from '@core/services/loader/loader.service';
import { PageLoaderIdentifier } from '@shared/Enums/page-loader-id.enum';
import { CategoryFacade } from '@store/facades/category.facade';
import { ColorFacade } from '@store/facades/color.facade';
import { ProductFacade } from '@store/facades/products/products.facade';
import { SizeFacade } from '@store/facades/size.facade';
import { IProductSubCategory, IProductSize, IProduct, IProductColor, FilenameImage } from '@store/models/product.model';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'mi-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  public loaderService = inject(LoaderService);
  private productFacade = inject(ProductFacade);
  private categoryFacade = inject(CategoryFacade);
  private sizeFacade = inject(SizeFacade);
  private colorFacade = inject(ColorFacade);
  private alertService = inject(AlertService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  editProductFormGroup!: FormGroup;

  theProduct!: IProduct;
  theProductImages: string[] = [];

  pageLoaderIdentifier = PageLoaderIdentifier;

  files: any[] = [];

  selectedBrand!: IBrand[];
  selectedCategory!: IProductCategory[];
  selectedSubCategories!: IProductSubCategory[];
  selectedSizes: { id: string, label: string, value: string }[] = [];
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

  isEditing = signal(false);

  belongingPageNumber: number = 0;

  ngOnInit(): void {
    let urlParams = combineLatest([
      this.activatedRoute.paramMap,
      this.activatedRoute.queryParamMap
    ]);

    urlParams.subscribe(([params, queryParams]) => {
      const product_id = params.get('product');
      this.belongingPageNumber = parseInt(queryParams.get('product_page') ?? '1');

      if(product_id == null) return;
      this.getTheProduct(product_id);
    });

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

    this.editProductFormGroup = new FormGroup({
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

  selectedSubCategoriesEventHandler($event: any){
    this.selectedSubCategories = $event;
    this.sizeFacade.sizesOfSubcategory(this.selectedSubCategories[0].id).subscribe((incoming) => this.sizes.set(incoming));
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

  changeAvailability(status: boolean){
    this.isAvailable = status;
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

  getTheProduct(id: string): void{
    this.loaderService.setLoadingStatus(PageLoaderIdentifier.PRODUCTS, true);
    this.productFacade.getProductById(id).subscribe({
      next: (product: any) => {
        this.theProduct = product;
        const featureImages = this.theProduct.featureImages?.map(i => i.image) || [];
        console.log(this.theProduct);
        
        const selectedColorIds: any[] = this.theProduct.colors?.map(cl => cl.id) ?? [];

        const updatedColors: ColorOption[] = this.colors().map((color: ColorOption) => ({
          ...color,
          selected: selectedColorIds.includes(color.id)
        }));

        this.colors.set(updatedColors);

        this.fullfillFormFields();
        
        this.theProductImages = [
          // this.theProduct.imagePath,
          ...featureImages
        ].filter(Boolean);
        this.loaderService.setLoadingStatus(PageLoaderIdentifier.PRODUCTS, false);
      },
      error: (error: any) => {
        this.alertService.add(error.message, LogStatus.ERROR);
        this.loaderService.setLoadingStatus(PageLoaderIdentifier.PRODUCTS, false);
      }
    });
  }

  fullfillFormFields(){

    const percentage = 100 - ((this.theProduct.promotion_price / this.theProduct.price) * 100);

    this.editProductFormGroup.get('productName')?.setValue(this.theProduct.name)
    this.editProductFormGroup.get('price')?.setValue(this.theProduct.price)
    this.editProductFormGroup.get('qtd')?.setValue(this.theProduct.quantity)
    this.editProductFormGroup.get('promotionRate')?.setValue(percentage)
    this.editProductFormGroup.get('description')?.setValue(this.theProduct.description)
    
    if(this.theProduct.status && this.theProduct.status.length > 0){
      this.isAvailable =  this.theProduct.status[0].status;
    }
  }

  submitForm(): void{

     if(this.editProductFormGroup.invalid){
      this.alertService.add("Verifique se os campos todos são válidos.", LogStatus.ERROR);
      return;
    }
    
    // after validation

    // if(this.theProduct.imagePath !== ''){
    //   if(this.theProduct.featureImages!.length + 1 < this.files.length){
    //     this.alertService.add("A quantidade de imagens novas deve ser igual à das imagens antigas", LogStatus.WARNING);
    //     return;
    //   }
    // } else {
      if(this.theProduct.featureImages!.length > 0 && (this.theProduct.featureImages!.length < this.files.length)){
        this.alertService.add("A quantidade de imagens novas deve ser igual à das imagens antigas", LogStatus.WARNING);
        return;
      }

      // }

    if(!(this.selectedSizes.length > 0)){
      this.alertService.add("Seleccione um tamanho para este produto", LogStatus.INFO);
      return;
    }

    const fields: EditProductModel = {
      productId: this.theProduct.id,
      id: this.theProduct.id,
      name: this.editProductFormGroup.get('productName')?.value,
      price: parseFloat(this.editProductFormGroup.get('price')!.value),
      stock_quantity: [parseInt(this.editProductFormGroup.get('qtd')!.value)],
      stock_status: [this.isAvailable],
      old_status: this.theProduct.status ?? [],
      discount_status: true,
      discount_rate: (this.editProductFormGroup.get('promotionRate')?.value !== '') ? parseInt(this.editProductFormGroup.get('promotionRate')?.value) : 0,
      desc: this.editProductFormGroup.get('description')?.value,
      brand_id: this.selectedBrand[0].id,
      category_id: this.selectedCategory[0].id,
      subcategory_id: this.selectedSubCategories[0].id,
      sizes: this.selectedSizes.flatMap(_ => _.id),
      old_colors: this.theProduct.colors,
      new_colors: this.selectedColors.flatMap(_ => _.id),
      images: (this.files.length > 0) ? this.files.flatMap(_ => (_.previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '')) : [],
      oldImages: this.theProduct.featureImages,
      image_filename: this.files.flatMap(_ => _.hashedName),
      old_image_path: this.theProduct.imagePath,
      shop_id: '1c13d9e3-41a3-47c5-83ae-8785441c878b',
      coverimage: (this.files.length > 0) ? (this.files[0].previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, '') : this.theProduct.coverImage,
      coverimage_filename: (this.files.length > 0) ? this.files[0].hashedName : this.theProduct.coverImageFilename,
      coverimage_filenameold: this.theProduct.coverImageFilename ?? '',
      imagescolor: Object.values(this.colorsWithImages).flatMap((images: any[]) => images.map(image => (image.previewUrl).replace(/^data:image\/[a-zA-Z]+;base64,/, ''))),
      imagescolor_filename: Object.values(this.colorsWithImages).flatMap((images: any[]) => images.map(image => image.hashedName))
    };

    this.isEditing.set(true);
    this.productFacade.editProduct(JSON.parse(JSON.stringify(fields)), this.belongingPageNumber).subscribe({
      next: repsonse => {
        this.alertService.add("Produto actualizado com êxito", LogStatus.SUCCESS);
        this.router.navigate(['/store/products'], { queryParams: {'page': this.belongingPageNumber}, queryParamsHandling: 'preserve' });
        this.isEditing.set(false);
      },
      error: error => {
        this.alertService.add(error.message ?? error.error, LogStatus.ERROR);
        this.isEditing.set(false);
        console.error(error);
      }
    });
  }
}

export interface EditProductModel{
  productId: string,
  id: string,
  name: string,
  price: number,
  stock_quantity: number[],
  stock_status: boolean[],
  old_status: any[],
  discount_status: boolean,
  discount_rate: number,
  shop_id: string,
  coverimage: string,
  coverimage_filename: string,
  coverimage_filenameold: string,
  desc: number,
  brand_id: string | undefined,
  category_id: string | undefined,
  subcategory_id: string | undefined,
  sizes: string[],
  old_colors?: any[],
  new_colors: string[],
  old_image_path: string,
  oldImages?: FilenameImage[],
  images: string[],
  image_filename: string[],
  imagescolor: string[],
  imagescolor_filename: string[]
}