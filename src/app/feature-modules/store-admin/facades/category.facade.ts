import { inject, Injectable } from "@angular/core";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { CategoriesApiService } from "@store/api/categories.api.service";
import { IProductSubCategory } from "@store/models/product.model";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryFacade{

    private categories$ = new BehaviorSubject<IProductCategory[]>([]);
    private api = inject(CategoriesApiService);

    constructor(){
        this.categoriesWithSubcategories();
    }

    categoriesWithSubcategories(): Observable<IProductCategory[]>{
        return this.api.getCategories().pipe(
            map(i => {
                this.categories$.next(i);
                return i;
            })
        );
    }

    get onlyCategories(): Observable<IProductCategory[]>{
        return this.categories$.pipe(
            map((categories: any[]) => {
                return categories.flatMap(c=> {
                    return {
                        id: c.id,
                        name: c.name,
                        slug: c.slug
                    }
                })
            })
        );
    }

    subcategoriesOfCategory(category_id: string): Observable<IProductSubCategory[]>{
        return this.categories$.asObservable().pipe(
            map((categories: IProductCategory[]) => {
                const theCategory = categories.find(c => c.id === category_id);
                if(theCategory === undefined){
                    return [];
                } else {
                    return theCategory.subcategories ?? [];
                }
            })
        )
    }

}