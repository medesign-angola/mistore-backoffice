import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFacade } from '@auth/facades/login.facade';
import { ResetPasswordFacade } from '@auth/facades/reset-password.facade';
import { UserLogin } from '@core/base-models/auth/UserLogin';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { AuthenticationService } from '@core/services/auth/authentication.service';

@Component({
  selector: 'mi-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

    formGroup: FormGroup = new FormGroup({});
    formIsInvalid = signal(true);
    submiting = signal<boolean>(false);
    resetFacade = inject(ResetPasswordFacade);
    
    private authService = inject(AuthenticationService);
    private alertService = inject(AlertService);

    private router = inject(Router);

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            'email': new FormControl('', [ Validators.required, Validators.email ]),
        })
    }

    submit(): void{
        if(this.formGroup.invalid) return;

        this.resetFacade.requestResetingLink(this.formGroup.value).subscribe({
          next: response => console.log,
          error: error => console.error
        });
        this.submiting.set(true);
    }
}
