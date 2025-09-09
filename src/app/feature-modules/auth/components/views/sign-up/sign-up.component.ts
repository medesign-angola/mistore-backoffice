import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/api/api.service';
import { AlertService } from '@core/services/alert/alert.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css',
    standalone: false
})
export class SignUpComponent implements OnInit {
    activeStep = signal<number>(1);
    api = inject(AuthService);
    alert = inject(AlertService);

    goToStep(step: number): void{
        this.activeStep.set(step);
    }

    registerFormGroup!: FormGroup;

    ngOnInit(): void {
        this.registerFormGroup = new FormGroup({});
    }

    fullfillSecondStepFormGroup(formValues: any): void{
        console.log(this.registerFormGroup)
        this.registerFormGroup.addControl('phone', new FormControl(formValues.phone));
        this.registerFormGroup.addControl('nif', new FormControl(formValues.nif));
        this.registerFormGroup.addControl('password', new FormControl(formValues.password));

        this.goToStep(3);
    }

    fullfillThirdStepFormGroup(formValues: any): void{
        this.registerFormGroup.addControl('name', new FormControl(formValues.name));
        this.registerFormGroup.addControl('category', new FormControl(formValues.category));
        this.registerFormGroup.addControl('location', new FormControl(formValues.location));
        this.registerFormGroup.addControl('description', new FormControl(formValues.description));
        this.goToStep(4);
    }
    
    fullfillFourthStepFormGroup(formValues: any): void{
        this.registerFormGroup.addControl('email', new FormControl(formValues.email));
        this.registerFormGroup.addControl('profile', new FormControl(formValues.profile));
        this.registerFormGroup.addControl('cover', new FormControl(formValues.cover));
        
        this.register(this.registerFormGroup);
    }

    private register(formGroup: FormGroup): void{
        console.log(formGroup.value)
        // this.api.register(formGroup.value).subscribe({
        //     next: response => {
        //         console.log(response)
        //     },
        //     error: error => {
        //         console.error(error)
        //     }
        // });
    }
}
