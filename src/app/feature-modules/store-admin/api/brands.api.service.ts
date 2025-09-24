import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { IBrand } from "@core/base-models/base/brands.model";
import { APIExtender } from "@core/class/api/api-extender.class";
import { environment } from "@env/environment.development";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BrandsApiService {

    api = inject(GenericApi);
    getBrands(): Observable<IBrand[]>{
        return this.api.get<IBrand[]>(`api/brands/all`)
                        .pipe(
                            map((incoming: any[]) => Transformer.brands(incoming ?? [])),
                        );
    }
}