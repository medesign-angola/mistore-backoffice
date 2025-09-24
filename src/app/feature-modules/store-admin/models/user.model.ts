export interface IUser{
    email: string,
    token: string,
    meta: {
        name: string,
        phone: string,
        nif: string,
        category: string,
        location: string,
        description: string
    }
}