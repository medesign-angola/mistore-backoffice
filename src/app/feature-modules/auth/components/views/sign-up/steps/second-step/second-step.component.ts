import { Component, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'mi-second-step',
  standalone: false,
  template: `
    <form class="" (submit)="this.submit()" [formGroup]="formGroup">
        <div class="form-container flex flex-col gap-12 border border-[#E9E9E9] rounded-lg p-10">
            <div class="inputs flex flex-col gap-6">
                <div class="phone input flex flex-col gap-y-3">
                    <label for="phone" class="text-xs font-medium">Número de telefone</label>
                    <input type="text"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('phone')?.invalid && this.formGroup.get('phone')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="phone" mask="+000 000 000 000" placeholder="244 900 111 222" id="phone" />
                    @if (this.formGroup.get('phone')?.invalid && (this.formGroup.get('phone')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                </div>
                <div class="nif input flex flex-col gap-y-3">
                    <label for="nif" class="text-xs font-medium">NIF da loja</label>
                    <input type="text"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('nif')?.invalid && this.formGroup.get('nif')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="nif" mask="000-000-000" placeholder="873678383" id="nif" />
                    @if (this.formGroup.get('nif')?.invalid && (this.formGroup.get('nif')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                </div>
                <div class="password input flex flex-col gap-y-3">
                    <label for="password" class="text-xs font-medium">Digite a sua senha</label>
                    <input type="password"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('password')?.invalid && this.formGroup.get('password')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="password" placeholder="Senha" id="password" />
                    @if (this.formGroup.get('password')?.invalid && (this.formGroup.get('password')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                    
                </div>
                <div class="password-confirmation input flex flex-col gap-y-3">
                    <label for="password-confirmation" class="text-xs font-medium">Confirme a senha</label>
                    <input type="password"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('password-confirmation')?.invalid && this.formGroup.get('password-confirmation')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="password-confirmation" placeholder="Confirmação de senha" id="password-confirmation" />
                    @if (this.formGroup.get('password-confirmation')?.invalid && (this.formGroup.get('password-confirmation')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                    @if (this.formGroup.hasError('passwordMismatch') && this.formGroup.get('password-confirmation')?.touched) {
                        <small class="text-red-500">As senhas não condizem</small>
                    }
                </div>

                <div class="agreement">
                    <div
                    class="chip cursor-pointer w-fit text-black/60 rounded-full text-xs font-medium flex gap-4 items-start"
                    (click)="changeAgreementStatus()"
                    >
                        <div class="check w-5 h-5 duration-[.6s] border-2 rounded-[5px]  border-[#E9E9E9] flex justify-center items-center"
                        [ngClass]="{
                            'bg-black': userAgree
                        }"
                        >
                            <svg width="100%" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg"
                            *ngIf="this.userAgree"
                            >
                                <path d="M1 3.48889L4.02222 6.51111L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <span class="w-[250px]">
                            Concordo com todas as políticas de privacidade de termos de segurança.
                        </span>
                    </div>
                </div>
            </div>
            <div class="submit">
                <button type="submit" [disabled]="this.formGroup.invalid" class="min-w-[150px] w-full p-4 duration-[.3s] disabled:bg-black/70 disabled:cursor-auto cursor-pointer flex justify-center items-center bg-black text-white text-sm leading-4 rounded-lg">
                    <!-- @if (this.isCreating()) {
                        <mi-spinner />
                    } @else { -->
                        Seguinte
                    <!-- } -->
                </button>
            </div>
        </div>
    </form>
  `,
  styles: ``
})
export class SecondStepComponent implements OnInit {

  userAgree: boolean = false;

  formIsInvalid = signal(false);

  formGroup!: FormGroup;

  formValues = output<any>();

  ngOnInit(): void {
      this.formGroup = new FormGroup({
        'phone': new FormControl('', [ Validators.required ]),
        'nif': new FormControl('', [ Validators.required ]),
        'password': new FormControl('', [ Validators.required ]),
        'password-confirmation': new FormControl('', [ Validators.required ]),
        'agreement': new FormControl(false, [ Validators.requiredTrue ])
      }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null
  {
    const password = form.get('password')?.value;
    const confirm = form.get('password-confirmation')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  private validate(){
    if(this.formGroup.invalid){
      this.formIsInvalid.set(true);
    } else {
      this.formIsInvalid.set(false);
    }
  }

  changeAgreementStatus(){
    this.userAgree = !this.userAgree;
    this.formGroup.get('agreement')?.setValue(this.userAgree);
  }

  submit(): void{
    this.validate();
    if(this.formIsInvalid()){
      return;
    }

    console.log(this.formGroup.value)

    this.formValues.emit(this.formGroup.value);
  }

}
