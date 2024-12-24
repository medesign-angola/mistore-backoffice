import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/api/api.service";
import { ILook, ILookResponse } from "@store/models/looks.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LookFacade{
    private api = inject(ApiService);

    looks(page: number, limit_per_page: number): Observable<ILookResponse>{
        return this.api.getLooks(page, limit_per_page);
    }
}