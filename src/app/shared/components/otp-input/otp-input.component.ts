import { Component, ElementRef, input, linkedSignal, output, QueryList, Signal, viewChildren, WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mi-otp-input',
  standalone: false,
  template: `
  <div class="otp-container">
    @for (input of controls(); track $index) {
      <input #input type="text" maxlength="1" min="1" max="9"
      miTailwindClasses
      [attr.data-index]="$index"
      [formControl]=this.controls()[$index]
      (keydown)="this.onKeyDown($event, $index)"
      (input)="this.onInput($event, $index)"
      >
    }
  </div>
  `,
  styles: `
  .otp-container {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 0.75rem;
  }
  `
})
export class OtpInputComponent {
  length = input.required<number>();
  code = output<string>();

  controls = linkedSignal(() => Array(this.length()).fill(null).map(() => new FormControl('')));
  inputs = viewChildren<ElementRef>('input');

  onKeyDown(event: KeyboardEvent, inputIndex: number): void{
    const key = event.key;

    if(key === 'Backspace'){
      if(this.controls()[inputIndex]?.value === '' && inputIndex > 0){
        this.focusInput(inputIndex - 1);
      }
    } else if(!/^['0-9']$/.test(key) && key !== 'Tab'){
      event.preventDefault();
    }
  }

  onInput(event: Event, inputIndex: number): void{
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const controls = this.controls();

    if(value.length > 1){
      input.value = value.charAt(0);
    }

    controls[inputIndex].setValue(input.value);
    this.controls.set(controls);

    if(input.value && inputIndex < this.length() - 1){
      this.focusInput(inputIndex + 1);
    }

    const isComplete = this.controls().every((control: FormControl) => control.value.length === 1);
    const opt = this.controls().map((control: FormControl) => control.value).join('');
    // if(opt.length === this.length() && isComplete){
      this.code.emit(opt);
    // }

  }

  focusInput(index: number): void{
    const inputsArray = this.inputs();
    const target = inputsArray[index].nativeElement;

    if(target){
      target.focus();
      target.select();
    }
  }

}
