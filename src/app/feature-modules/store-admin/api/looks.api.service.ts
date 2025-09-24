import { inject, Injectable } from "@angular/core";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { map, Observable } from "rxjs";
import { GenericApi } from "@core/api/generic.api.service";

@Injectable({
    providedIn: 'root'
})
export class LookApiService{

    api = inject(GenericApi);
    
    getLooks(page: number, limit_per_page: number): Observable<ILookResponse>{
        return this.api.get<ILook[]>(`api/LookApi/GetLookByUser?shop_id=${ this.api.getUserShopId }&page=${ page }&page_size=${ limit_per_page }&sortColumn=created_at&order=desc`)
        .pipe(
            map((incomingLooks: any) => ({
                total: (incomingLooks) ? incomingLooks.look_count : 0,
                looks: Transformer.looks((incomingLooks) ? incomingLooks.looks : [])
            }))
        )
    }

    getLookById(id: string): Observable<ILook[]>{
        return this.api.get<ILook[]>(`api/LookApi/GetByIdlookDetails?id=${ id }`)
                        .pipe(
                            map((incoming: any) => Transformer.looks((incoming) ? incoming.looks : []))
                        )
    }

    publishLook(look: any): Observable<any>{
        return this.api.post(`api/LookApi/InsertLook`, look);
    }

    editLook(look: any): Observable<any>{
        return this.api.put(`api/LookApi/UpdateLook?look_id=${ look.look_id }&user_id=${ look.user_id }`, look);
    }

    updateLookProducts(data: any): Observable<any>{
        return this.api.put(`api/LookApi/ProductListUpdate`, data);
    }

    deleteLook(look: any): Observable<any>{
        const options = {
            body: look,
            headers: { 'Content-Type': 'application/json' }
        };
        return this.api.delete<any>(`api/LookApi/DeleteLook`, options);
    }

}