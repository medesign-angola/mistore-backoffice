import { HttpStatusCode } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordFacade } from '@auth/facades/reset-password.facade';
import { PasswordReset } from '@core/base-models/auth/PasswordReset';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { AuthenticationService } from '@core/services/auth/authentication.service';
import { PasswordValidator } from '@core/validators/password.validator';

@Component({
  selector: 'mi-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

    formGroup: FormGroup = new FormGroup({});
    formIsInvalid = signal(true);
    submiting = signal<boolean>(false);
    resetFacade = inject(ResetPasswordFacade);
    
    private activatedRoute = inject(ActivatedRoute);
    private authService = inject(AuthenticationService);
    private alertService = inject(AlertService);

    private router = inject(Router);

    id: string | null = null;
    token: string | null = null;

    ngOnInit(): void {
      
      this.activatedRoute.paramMap.subscribe(params => {
        this.id = params.get('id');
        if(this.id === null && this.token === null){
          this.router.navigate(['/auth/sign-in'])
          this.alertService.add("Não tem acesso para esta página.", LogStatus.ERROR);
        }
      })

      this.formGroup = new FormGroup({
          'password': new FormControl('', [ Validators.required ]),
          'confirm_password': new FormControl('', [ Validators.required ]),
      }, { validators: PasswordValidator.confirmPassword });

      const passwordValidator = new PasswordValidator(this.formGroup.get('password'));
      this.formGroup.get('password')?.valueChanges.subscribe((value: any) => {
        passwordValidator.updateCriterias();
        passwordValidator.validate();
      });
    }

    submit(): void{
      if(this.formGroup.invalid) return;

      const data = new PasswordReset(
        this.id as string,
        this.formGroup.get('password')!.value, 
        this.formGroup.get('confirm_password')!.value
      );

      this.resetFacade.resetPassword(data).subscribe({
        next: response => {
          this.router.navigate(['/auth/sign-in']);
          if(response.status === HttpStatusCode.Ok){
            this.alertService.add("Senha redifinida com êxito.", LogStatus.SUCCESS);
          }
          
          if(response.status === HttpStatusCode.Forbidden){
            this.alertService.add("O seu token expirou.", LogStatus.ERROR);
          }
        },
        error: error => console.error
      });
      this.submiting.set(true);
    }
}
