import { inject, Injectable } from "@angular/core";
import { GenericApi } from "@core/api/generic.api.service";
import { HelpTabsEnum } from "@store/components/views/help/help-tabs.enum";
import { Observable } from "rxjs";
import { HelpSimulator } from "./simulator.service";
import { HelpFacade } from "./help.facade";
import { Faq } from "./help.models";

@Injectable({
    providedIn: HelpFacade
})
export class HelpApiService {

    private api = inject(GenericApi);
    private simulator = inject(HelpSimulator);

    contentByTab(tab: HelpTabsEnum): Observable<Faq[]> {
        return this.simulator.contentByTab(tab);
    }

}