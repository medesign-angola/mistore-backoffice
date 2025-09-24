import { HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { APIExtender } from "@core/class/api/api-extender.class";
import { environment } from "@env/environment.development";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { IProductSize } from "@store/models/product.model";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SizesApiService {

    api = inject(GenericApi);

    getSizes(subcategory_id?: string): Observable<IProductSize[]>{
        return this.api.get<IProductSize[]>(`rest/v1/Sizes`, {
            headers: {
                'apiKey': environment.supabase_key
            }
        }).pipe(
            map((incoming: any[]) => Transformer.sizes(incoming ?? [])),
            map(incoming => (subcategory_id) ? incoming.filter(size => size.subcategory_id === subcategory_id) : incoming)
        );
    }
}