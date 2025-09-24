import { config } from "@config/config.app";

export abstract class LocalStorage {
    static getItem(prefix: string): string{
        return localStorage.getItem(config.appName + prefix) || '';
    }
    
    static setItem(prefix: string, value: string): void{
        window.localStorage.setItem(config.appName + prefix, value);
    }

    static removeItem(prefix: string): void{
        localStorage.removeItem(config.appName + prefix);
    }
}