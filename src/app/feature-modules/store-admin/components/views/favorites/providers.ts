import { FavoriteService } from "./favorites.api.service";
import { FavoriteFacade } from "./favorites.facade";
import { FavoriteSimulator } from "./simulator.service";

export function loadFavoriteProviders(): any[] {
    return [
        FavoriteSimulator,
        FavoriteService,
        FavoriteFacade
    ];
}