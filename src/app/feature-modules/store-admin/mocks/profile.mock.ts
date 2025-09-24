import { UserInterface } from "@core/base-models/base/user.model";

export const AUTHENTICATED_USER: UserInterface = {
    Id: "",
    Name: "",
    Email: "",
    Token: "",
    IsFirstAcess: false,
    ShopMeta: {
        Shop: "",
        Cover: "",
        Profile: "",
        Nif: "",
        Category: [""],
        Location: [""],
        Description: ""
    }
}