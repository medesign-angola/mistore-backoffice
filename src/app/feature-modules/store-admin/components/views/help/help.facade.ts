import { inject, Injectable } from "@angular/core";
import { HelpComponent } from "./help.component";
import { HelpApiService } from "./help.api.service";
import { Observable } from "rxjs";
import { HelpTabsEnum } from "@store/components/views/help/help-tabs.enum";
import { Faq } from "./help.models";

@Injectable({
    providedIn: HelpComponent
})
export class HelpFacade {
    private api = inject(HelpApiService);

    contentsByTab(tab: HelpTabsEnum): Observable<Faq[]> {
        return this.api.contentByTab(tab);
    }
}