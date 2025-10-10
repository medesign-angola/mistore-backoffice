import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Directive()
export class PasswordValidator{

    control: AbstractControl | null;
    protected criteriasObj: { [key: string]: boolean } = {};

    constructor(control: AbstractControl | null){
        this.control = control;
    }

    get criterias(): { [key: string]: boolean }{
        return this.criteriasObj;
    }

    updateCriterias(rules: {[key: string]: boolean} | null = null){
        if(rules === null){
            rules = {
                minLength: this.control?.value.length >= 8,
                hasLetter: /[a-zA-Z]/.test(this.control?.value),
                hasNumber: /\d/.test(this.control?.value),
                hasSymbol: /[@$!%*?&#]/.test(this.control?.value)
            }
        }
        this.criteriasObj = rules;
    }

    static confirmPassword(form: AbstractControl, options: { fields: { password: string, confirm: string } } = { fields: { password: 'password', confirm: 'confirm_password' } }): ValidationErrors | null
    {
        const password = form.get(options.fields.password)?.value;
        const confirm = form.get(options.fields.confirm)?.value;
        return password === confirm ? null : { passwordMismatch: true };
    }
    
    public validate(){
        const keys = Object.keys(this.criteriasObj);
        for (let index = 0; index < keys.length; index++) {
            if(this.criteriasObj[ keys[index] ] === false){
                this.control?.setErrors({})
            }
        }
    }
}