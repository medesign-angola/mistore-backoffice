import { PromotionFacade } from "./promotion.facade";
import { PromotionService } from "./promotions.api.service";
import { PromotionSimulator } from "./simulator.service";

export function loadPromotionProviders(): any[] {
    return [
        PromotionSimulator,
        PromotionFacade,
        PromotionService
    ];
}