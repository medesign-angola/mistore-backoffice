export class PasswordReset{
    password: string;
    confirm_password: string;

    constructor(password: string, confirm_password: string) {

        if(confirm_password !== password) throw new Error("As senhas não coincidem.");

        this.password = password;
        this.confirm_password = confirm_password;
    }

    toObject(): Object{
        return {
            password: this.password,
            confirm_password: this.confirm_password
        }
    }
}