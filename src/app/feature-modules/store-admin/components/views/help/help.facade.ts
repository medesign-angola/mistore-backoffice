import { inject, Injectable } from "@angular/core";
import { HelpComponent } from "./help.component";
import { HelpApiService } from "./help.api.service";
import { Observable } from "rxjs";
import { HelpTabsEnum } from "@store/enums/help-tabs.enum";

@Injectable({
    providedIn: HelpComponent
})
export class HelpFacade {
    private api = inject(HelpApiService);

    contentsByTab(tab: HelpTabsEnum): Observable<any[]> {
        return this.api.contentByTab(tab);
    }
}