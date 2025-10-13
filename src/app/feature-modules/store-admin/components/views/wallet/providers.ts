import { WalletSimulator } from "./simulator.service";
import { WalletService } from "./wallet.api.service";
import { WalletFacade } from "./wallet.facade";

export function loadWalletProviders(): any[] {
    return [
        WalletSimulator,
        WalletService,
        WalletFacade
    ];
}