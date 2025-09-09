import { Component, OnInit, output, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'mi-third-step',
  standalone: false,
  template: `
    <form class="" (submit)="this.submit()" [formGroup]="formGroup">
        <div class="form-container flex flex-col gap-12 border border-[#E9E9E9] rounded-lg p-10">
            <div class="inputs flex flex-col gap-6">
                <div class="name input flex flex-col gap-y-3">
                    <label for="name" class="text-xs font-medium">Nome da loja</label>
                    <input type="text"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('name')?.invalid && this.formGroup.get('name')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="name" placeholder="" id="name" />
                    @if (this.formGroup.get('name')?.invalid && (this.formGroup.get('name')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                </div>
                <div class="category input flex flex-col gap-y-3">
                    <label for="category" class="text-xs font-medium">Tipo da loja</label>
                    <input type="text"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('category')?.invalid && this.formGroup.get('category')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="category" placeholder="Loja de roupas" id="category" />
                    @if (this.formGroup.get('category')?.invalid && (this.formGroup.get('category')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                </div>
                <div class="location input flex flex-col gap-y-3">
                    <label for="location" class="text-xs font-medium">Localização</label>
                    <input type="text"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('location')?.invalid && this.formGroup.get('location')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="location" placeholder="Luanda, Angola" id="location" />
                    @if (this.formGroup.get('location')?.invalid && (this.formGroup.get('location')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                    
                </div>
                <div class="description input flex flex-col gap-y-3">
                    <label for="description" class="text-xs font-medium">Descrição</label>
                    <textarea
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('description')?.invalid && this.formGroup.get('description')?.touched
                    }"
                    rows="5" class="placeholder:text-xs resize-none text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="description" placeholder="Descrição" id="description"></textarea>
                    @if (this.formGroup.get('description')?.invalid && (this.formGroup.get('description')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
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
export class ThirdStepComponent implements OnInit {

  userAgree: boolean = false;

  formIsInvalid = signal(false);

  formGroup!: FormGroup;

  formValues = output<any>();

  ngOnInit(): void {
      this.formGroup = new FormGroup({
        'name': new FormControl('', [ Validators.required ]),
        'category': new FormControl('', [ Validators.required ]),
        'location': new FormControl('', [ Validators.required ]),
        'description': new FormControl('', [ Validators.required ]),
      });
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

    this.formValues.emit(this.formGroup.value);
  }
  
}
