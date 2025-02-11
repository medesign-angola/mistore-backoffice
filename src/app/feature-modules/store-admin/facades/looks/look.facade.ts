import { inject, Injectable } from "@angular/core";
import { LooksData } from "@core/data/store/looks.data";
import { StoreApi } from "@store/api/store.api.service";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";
import { DraftingLookFacade } from "./drafts.facade";
import { IProduct } from "@store/models/product.model";

@Injectable({
    providedIn: 'root'
})
export class LookFacade{
    private api = inject(StoreApi);
    private looksData = inject(LooksData);
    private draftingLook = inject(DraftingLookFacade);

    looks(page: number, limit_per_page: number): Observable<ILookResponse>{

        const cached$ = this.looksData.dataOfPage(page);
        if(cached$().looks && cached$().looks.length > 0){
            return of(cached$());
        }

        return this.api.getLooks(page, limit_per_page).pipe(
            tap(incoming => {
                this.looksData.paginatedData(page, incoming.total, incoming.looks);
            })
        );
    }

    look(id: string): Observable<ILook[]>{
        return this.api.getLookById(id);
    }

    createDraft(look: any): Observable<any>{
        return this.draftingLook.createLook(look).pipe(
            catchError(error => throwError(() => error))
        );
    }

    looksOnDraft(page: number, limit: number): Observable<ILookResponse>{
        return this.draftingLook.paginatedDraftLooks(page, limit);
    }

    lookOnDraft(id: string): Observable<ILook>{
        return this.draftingLook.lookOnDraft(id).pipe(
            map(incoming => {
                if(!(incoming.length > 0)){
                    throw new Error("Não existe look em draft com este id: " + id);
                }
                return incoming[0];
            })
        );
    }

    updateProductsOfLookOnDraft(look_id: string, products: IProduct[]): Observable<any>{
        return this.draftingLook.updateLookProducts(look_id, products);
    }

    create(look: any): Observable<any>{
        return this.api.createLook(look);
    }

}