import { HelpApiService } from "./help.api.service";
import { HelpFacade } from "./help.facade";
import { HelpSimulator } from "./simulator.service";

export function loadHelpProviders(): any[]{
    return [
        HelpSimulator,
        HelpApiService,
        HelpFacade
    ];
}