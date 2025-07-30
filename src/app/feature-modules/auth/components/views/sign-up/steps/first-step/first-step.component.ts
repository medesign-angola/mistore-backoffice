import { Component, inject, output, signal } from '@angular/core';
import { AlertService } from '@core/services/alert/alert.service';

@Component({
  selector: 'mi-first-step',
  standalone: false,
  template: `
    <form class="" (submit)="this.validate()">
        <div class="form-container flex flex-col gap-12">
            <div class="inputs">
                <div class="code input flex flex-col gap-y-3">
                    <label for="code" class="text-xs font-medium mb-5">Digite o seu código Mistore</label>
                    <mi-otp-input [length]="6" (onComplete)="insertCode($event)"></mi-otp-input>
                </div>
            </div>
            <div class="submit">
                <button type="submit" [disabled]="this.code().length < 6" class="min-w-[150px] disabled:bg-red-400/30! disabled:cursor-auto w-full p-4 flex justify-center items-center bg-black text-white text-sm leading-4 rounded-lg">
                    @if (this.isValidating()) {
                        <mi-spinner />
                    } @else {
                        Verificar
                    }
                </button>
            </div>
        </div>
    </form>
  `,
  styles: ``
})
export class FirstStepComponent {
  alert = inject(AlertService);
  code = signal<string>('');
  isValidating = signal<boolean>(false);
  nextStep = output<boolean>();

  insertCode(event: string){
    this.code.set(event);
    console.log(event);
  }

  onInvalidCode(event: boolean){
    this.alert.add("Verifique o código")
  }

  validate(): void{
    this.isValidating.set(true);
    setTimeout(() => {
      this.nextStep.emit(true);
      this.isValidating.set(false);
    }, 2000);
  }

}
