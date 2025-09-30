export class UserLogin{
    email: string;
    password: string;
    remoteIpAddress: string = '';

    constructor(user: string, password: string) {
        this.email = user;
        this.password = password;
    }

    toObject(): Object{
        return {
            email: this.email,
            password: this.password
        }
    }
}