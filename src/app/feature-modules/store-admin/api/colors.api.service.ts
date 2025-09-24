import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { ColorOption } from "@core/base-models/base/ColorOption.model";
import { environment } from "@env/environment.development";
import { Transformer } from "@shared/component-classes/transformation/transformer.class";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ColorsApiService{
    api = inject(GenericApi);
    getColors(): Observable<ColorOption[]>{
        return this.api.get<ColorOption[]>(`rest/v1/Colors`, { headers: {
            'apiKey': environment.supabase_key
        } })
        .pipe(
            map((incoming: any[]) => Transformer.colors(incoming ?? []))
        );
    }
}