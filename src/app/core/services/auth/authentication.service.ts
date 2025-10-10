import { Injectable } from "@angular/core";
import { config } from "@config/config.app";
import { LocalStorage } from "../local-storage";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor() { }

    public getUserName(): string {
        return LocalStorage.getItem('_user_name_full');
    }

    public setUserName(name: string): void {
        LocalStorage.setItem('_user_name_full', name);
    }

    public getUserEmail(): string {
        return LocalStorage.getItem('_user_email');
    }

    public setUserEmail(email: string): void {
        LocalStorage.setItem('_user_email', email);
    }

    public getUserToken(): string {
        return LocalStorage.getItem('_user_token');
    }

    public setUserToken(token: string): void {
        LocalStorage.setItem('_user_token', token);
    }

    public getResetUserPasswordToken(): string {
        return LocalStorage.getItem('_reset_user_password_token');
    }

    public setResetUserPasswordToken(token: string): void {
        LocalStorage.setItem('_reset_user_password_token', token);
    }

    public cleanResetPasswordToken(): boolean
    {
        return this.cleanStorage('_reset_user_password_token');
    }

    public getUserRefreshToken(): string {
        return LocalStorage.getItem('_user_refresh_token');
    }

    public setUserRefreshToken(refreshToken: string): void {
        LocalStorage.setItem('_user_refresh_token', refreshToken);
    }

    public getUserDefaultPass(): string {
        return LocalStorage.getItem('_user_default_pass');
    }

    public setUserDefaultPass(pass: string): void {
        LocalStorage.setItem('_user_default_pass', pass);
    }

    public getIsFirstAcess(): boolean {
        const value = localStorage.getItem('_user_is_first_acess');
        return (value == 'true');
    }

    public setIsFirstAcess(isFirstAcess: any): void {
        LocalStorage.setItem('_user_is_first_acess', isFirstAcess);
    }

    public getUserId(): string {
        return LocalStorage.getItem('_user_id');
    }

    public setUserId(id: string): void {
        LocalStorage.setItem('_user_id', id);
    }

    public setUserShopId(id: string): void {
        LocalStorage.setItem('_user_shop_id', id);
    }

    public getUserShopId(): string {
       return LocalStorage.getItem('_user_shop_id');
    }

    public setUserShopName(value: string): void {
        LocalStorage.setItem('_user_shop_name', value);
    }

    public getUserShopName(): string {
       return LocalStorage.getItem('_user_shop_name');
    }

    public setUserShopCover(value: string): void {
        LocalStorage.setItem('_user_shop_cover', value);
    }

    public getUserShopCover(): string {
       return LocalStorage.getItem('_user_shop_cover');
    }

    public setUserShopProfile(value: string): void {
        LocalStorage.setItem('_user_shop_profile', value);
    }

    public getUserShopProfile(): string {
       return LocalStorage.getItem('_user_shop_profile');
    }

    public setUserShopNif(value: string): void {
        LocalStorage.setItem('_user_shop_nif', value);
    }

    public getUserShopNif(): string {
       return LocalStorage.getItem('_user_shop_nif');
    }

    public setUserShopPhone(value: string): void {
        LocalStorage.setItem('_user_shop_phone', value);
    }

    public getUserShopPhone(): string {
       return LocalStorage.getItem('_user_shop_phone');
    }

    public cleanAuthenticationDataFromLocalStorage(): boolean{
        const userPrefixes: string[] = [
            '_user_name_full',
            '_user_email',
            '_user_token',
            '_user_refresh_token',
            '_user_default_pass',
            '_user_is_first_acess',
            '_user_id',
            '_user_shop_id',
            '_user_shop_name',
            '_user_shop_cover',
            '_user_shop_profile',
            '_user_shop_nif',
            '_user_shop_phone',
            '_reset_user_password_token'
        ];

        userPrefixes.forEach(prefix => {
            LocalStorage.removeItem(prefix);
        });

        return true;
    }

    private cleanStorage(prefix: string): boolean{
        LocalStorage.removeItem(prefix);
        return true;
    }
}