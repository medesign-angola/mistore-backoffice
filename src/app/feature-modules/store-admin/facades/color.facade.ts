import { inject, Injectable } from "@angular/core";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { ColorsApiService } from "@store/api/colors.api.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ColorFacade{
    private api = inject(ColorsApiService);

    all(): Observable<ColorOption[]>{
        return this.api.getColors();
    }
}