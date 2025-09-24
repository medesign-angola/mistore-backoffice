import { Injectable, inject } from "@angular/core";
import { catchError, forkJoin, map, Observable, of, switchMap, tap, throwError } from "rxjs";
import { IProduct, IProductResponse } from "../../models/product.model";
import { ProductsData } from "@core/data/store/products.data";
import { ProductApiService } from "@store/api/products.api.service";

@Injectable({
    providedIn: 'root'
})
export class ProductFacade{

    private api = inject(ProductApiService);
    private productsData = inject(ProductsData);

    products(page: number, limit: number): Observable<IProductResponse>{
        const cached$ = this.productsData.dataOfPage(page);
        if(cached$().products && cached$().products.length > 0){
            return of(cached$());
        }

        return this.api.getProducts(page, limit).pipe(
            tap((response: IProductResponse) => {
                this.productsData.paginatedData(page, response.total, response.products);
            })
        );
    }

    getProductById(id: string): Observable<any>{
        return this.api.getProductById(id).pipe(
            tap(() => {
                // this.productsData.clearData()
            })
        );
    }

    promotionProducts(page: number, limit: number): Observable<IProduct[]>{
        return this.api.getPromotionProducts(page, limit);
    }

    favoritesProducts(page: number, limit: number): Observable<IProductResponse>{
        return this.api.getFavoritesProducts(page, limit);
    }

    editProduct(product: any, page: number): Observable<any>{
        // return this.api.editProduct(product);

        const editProductMethodDatas = {
            userid: product.shop_id,
            product_id: product.productId,
            name: product.name,
            price: product.price,
            desc: product.desc,
            brand_id: product.brand_id,
            subcategory_id: product.subcategory_id,
            coverimage: product.coverimage,
            coverimage_filename: product.coverimage_filename,
            coverimage_filenameold: product.coverimage_filenameold
        }

        const productDiscountMethodDatas = {
            id: product.productId,
            active: product.stock_status[0],
            discountRate: product.discount_rate,
            products: product.productId
        }

        const productStockMethodDatas = {
            quantity: product.stock_quantity[0],
            product_id: product.productId,
            size_id: product.sizes[0] ?? '',
            color_id: product.new_colors[0] ?? product.old_colors[0].id,
            active: product.stock_status[0]
        }

        console.log(editProductMethodDatas, productStockMethodDatas, productDiscountMethodDatas)

        return this.api.editProduct(editProductMethodDatas)
        .pipe(
            // tap(console.log),
            map((response: any) => {
                return {
                    remaining: this.productsData.clearPage(page),
                    response
                };
            }),
            switchMap(response => {
                let colorSubs: Observable<any>[] = [];
                product.new_colors.forEach((color: string, index: number) => {
                    const theColor = {
                        productId: product.productId,
                        colorId: color,
                        base64Image: product.imagescolor[index],
                        filename: product.imagescolor_filename[index]
                    }
                    
                    colorSubs.push(
                        this.api.productColor(
                            theColor
                        )
                    )
                });

                if(!(colorSubs.length > 0)) return of(response);

                return forkJoin(colorSubs).pipe(
                    map(() => response) // continua com o response original depois que todas as cores forem salvas
                );
            }),
            switchMap(response => {
                let imagesSubs: Observable<any>[] = [];

                product.images.forEach((item: any, index: number) => {
                    const productImageMethodDatas = {
                        imageId:
                                    // (index === 0) ? 
                                    // product.old_image_path :
                                    product.oldImages[index].id,
                        productId: product.productId,
                        newFileName: product.image_filename[index],
                        type: 0,
                        originalFileName: 
                                            // (index === 0) ?
                                            // 'no-old-filename-specified' :
                                            product.oldImages[index].filename,
                        newImageData: product.images[index]
                    }
                    imagesSubs.push(
                        this.api.productImage(productImageMethodDatas)
                    );
                });

                if(!(imagesSubs.length > 0)) return of(response);

                return forkJoin(imagesSubs).pipe(
                    map(() => response) // continua com o response original depois que todas as cores forem salvas
                );
            }),
            switchMap(response => this.api.productDiscount(productDiscountMethodDatas)),
            switchMap(response => {
                if(!(product.old_status.length > 0)){
                    return this.api.createProductStock(productStockMethodDatas).pipe(tap(console.log));
                } else {
                    return this.api.updateProductStock(productStockMethodDatas, product.old_status[0].id);
                }
            }),
            catchError(error => throwError(() => error))
        )
    }

    deleteProduct(product_page: number, product: IProduct): Observable<any>{
        return this.api.deleteProduct(product).pipe(
            map((response: any) => {
                return {
                    remaining: this.productsData.removeDataFromPage(product_page, product),
                    response
                };
            })
        );
    }

}