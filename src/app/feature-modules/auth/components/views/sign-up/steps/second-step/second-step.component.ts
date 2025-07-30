import { Component } from '@angular/core';

@Component({
  selector: 'mi-second-step',
  standalone: false,
  template: `
    <form class="">
        <div class="form-container flex flex-col gap-12">
            <div class="inputs flex flex-col gap-6">
                <div class="email input flex flex-col gap-y-3">
                    <label for="phone" class="text-xs font-medium">Número de telefone</label>
                    <input type="text"
                    class="placeholder:text-xs text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="phone" placeholder="900111222" id="phone" />
                </div>
                <div class="nif input flex flex-col gap-y-3">
                    <label for="nif" class="text-xs font-medium">NIF da loja</label>
                    <input type="text"
                    class="placeholder:text-xs text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="nif" placeholder="87368LDA78383" id="nif" />
                </div>
                <div class="password input flex flex-col gap-y-3">
                    <label for="password" class="text-xs font-medium">Digite a sua senha</label>
                    <input type="password"
                    class="placeholder:text-xs text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="password" placeholder="Senha" id="password" />
                </div>
                <div class="password-confirmation input flex flex-col gap-y-3">
                    <label for="password-confirmation" class="text-xs font-medium">Digite a sua senha</label>
                    <input type="password"
                    class="placeholder:text-xs text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="password-confirmation" placeholder="Confirmação de senha" id="password-confirmation" />
                </div>

                <div class="agreement">
                    <div
                    class="chip cursor-pointer w-fit text-black/[0.6] rounded-full text-xs font-medium flex gap-4 items-start"
                    (click)="changeAgreementStatus()"
                    >
                        <div class="check w-5 h-5 duration-[.6s] border-[2px] rounded-[5px]  border-[#E9E9E9] flex justify-center items-center"
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
                <button type="submit" class="min-w-[150px] w-full p-4 flex justify-center items-center bg-black text-white text-sm leading-4 rounded-lg">
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
export class SecondStepComponent {

  userAgree: boolean = false;
  
  changeAgreementStatus(){
    this.userAgree = !this.userAgree;
  }

}
