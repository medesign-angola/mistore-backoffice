import { Component, OnInit, output, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fileValidator } from '@core/validators/input-file.validator';

@Component({
  selector: 'mi-fourth-step',
  standalone: false,
  template: `
    <form class="" (submit)="this.submit()" [formGroup]="formGroup">
        <div class="form-container flex flex-col gap-12 border border-[#E9E9E9] rounded-lg p-10">
            <div class="inputs flex flex-col gap-6">
                <div class="name input flex flex-col gap-y-3">
                    <label for="email" class="text-xs font-medium">Email da loja</label>
                    <input type="text"
                    [ngClass]="{
                        'is-invalid': this.formGroup.get('email')?.invalid && this.formGroup.get('email')?.touched
                    }"
                    class="placeholder:text-xs duration-[.3s] text-xs placeholder:text-[#999] focus:outline-none p-[14px] text-[#999] bg-[#F8F8F8] border border-[#E9E9E9] rounded-lg"
                    formControlName="email" placeholder="" id="email" />
                    @if (this.formGroup.get('email')?.invalid && (this.formGroup.get('email')?.touched || this.formIsInvalid())) {
                        <small class="text-red-500">Verifique os dados deste campo</small>
                    }
                </div>
            </div>
            <div class="inputs flex flex-col gap-6">
                <div class="profile input flex flex-col gap-y-6">
                    <label for="profile" class="text-xs font-medium">Adicionar foto de perfil da loja</label>
                    <mi-tiny-dropzone
                    [showDimentionsText]="false"
                    [showPreviewFiles]="false"
                    [multi]="false"
                    [name]="'profile'"
                    (outcomeFiles)="this.profile($event)"
                    [isInvalidFromParent]="this.profilePhoto.length <= 0"
                    />
                </div>
            </div>
            <div class="inputs flex flex-col gap-6">
                <div class="profile input flex flex-col gap-y-6">
                    <label for="profile" class="text-xs font-medium">Adicionar foto de capa da loja</label>
                    <mi-tiny-dropzone
                    [showDimentionsText]="false"
                    [showPreviewFiles]="false"
                    [multi]="false"
                    [layout]="'rectangle'"
                    [name]="'cover'"
                    (outcomeFiles)="this.cover($event)"
                    [isInvalidFromParent]="this.coverPhoto.length <= 0"
                    />
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
export class FourthStepComponent implements OnInit {

  userAgree: boolean = false;
  formGroup!: FormGroup;

  formIsInvalid = signal(false);

  formValues = output<any>();

  profilePhoto: any[] = [];
  coverPhoto: any[] = [];

  ngOnInit(): void {
      this.formGroup = new FormGroup({
        'email': new FormControl('', [ Validators.required ]),
        'profile': new FormControl(null, [ Validators.required ]),
        'cover': new FormControl(null, [ Validators.required ])
      });
  }

  profile($event: any): void{
    this.formGroup.get('profile')?.setValue($event);
  }

  cover($event: any): void{
    this.formGroup.get('cover')?.setValue($event);
  }

  private validate(){
    if(this.formGroup.invalid){
      this.formIsInvalid.set(true);
    } else {
      this.formIsInvalid.set(false);
    }
  }

  submit(): void{
    this.validate();
    if(this.formIsInvalid()){
      return;
    }

    console.log(this.formGroup);

    this.formValues.emit(this.formGroup.value);
  }

}
