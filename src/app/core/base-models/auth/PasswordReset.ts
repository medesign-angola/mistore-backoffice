export class PasswordReset{
    id: string;
    password: string;
    confirm_password: string;

    constructor(id: string, password: string, confirm_password: string) {

        if(confirm_password !== password) throw new Error("As senhas não coincidem.");

        this.id = id;
        this.password = password;
        this.confirm_password = confirm_password;
    }

    toObject(): Object{
        return {
            id: this.id,
            password: this.password,
            confirm_password: this.confirm_password
        }
    }
}