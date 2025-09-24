export interface UserInterface{
    Id: string,
    Name: string;
    Email: string;
    Token: string,
    RefreshToken?: string;
    IsFirstAcess: boolean;
    ShopMeta: ShopMetaInterface
}

export interface ShopMetaInterface{
    Id: string,
    Shop: string,
    Cover: string;
    Phone: string,
    Profile: string;
    Nif: string,
    Category: string[],
    Location: string[],
    Description: string
}