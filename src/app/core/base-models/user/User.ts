import { BaseEntity } from "../base/base-entity";
import { ShopMetaInterface, UserInterface } from "../base/user.model";

export class User extends BaseEntity {
    Name: string;
    Email: string;
    Token: string;
    ShopMeta: ShopMetaInterface;
    RefreshToken: string;
    IsFirstAcess: boolean;

    constructor(
        user: UserInterface
    ) {

        super(user.Id)

        this.Name = user.Name;
        this.Email = user.Email;
        this.ShopMeta = user.ShopMeta;
        this.Token = user.Token;
        this.RefreshToken = user.RefreshToken ?? '';
        this.IsFirstAcess = user.IsFirstAcess;

    }
}
