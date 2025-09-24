import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { IProductCategory } from "@core/base-models/base/product-category.model";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoriesApiService{

    api = inject(GenericApi);

    getCategories(): Observable<IProductCategory[]>{
        return this.api.get<IProductCategory[]>(`api/categories/all`)
                        .pipe(
                            map((incoming: any[]) => Transformer.categories(incoming ?? []))
                        );
    }
}