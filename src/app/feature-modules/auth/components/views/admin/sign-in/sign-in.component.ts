import { HttpStatusCode } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginFacade } from '@auth/facades/login.facade';
import { UserLogin } from '@core/base-models/auth/UserLogin';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';
import { AuthenticationService } from '@core/services/auth/authentication.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css',
    standalone: false
})
export class SignInComponent implements OnInit {

    formGroup: FormGroup = new FormGroup({});
    formIsInvalid = signal(true);
    signing = signal<boolean>(false);
    signInFacade = inject(LoginFacade);
    
    private authService = inject(AuthenticationService);
    private alertService = inject(AlertService);

    private router = inject(Router);

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            'email': new FormControl('', [ Validators.required, Validators.email ]),
            'password': new FormControl('', [ Validators.required ]),
        })
    }

    submit(): void{
        if(this.formGroup.invalid) return;

        const user = new UserLogin(
            this.formGroup.get('email')?.value,
            this.formGroup.get("password")?.value
        );

        this.signing.set(true);
        this.signInFacade.login(user).subscribe(response => {
            
            if(response.status === HttpStatusCode.Ok){
                this.authService.setUserId(response.data.Id);
                this.authService.setUserName(response.data.Name);
                this.authService.setUserEmail(response.data.Email);
                this.authService.setUserToken(response.data.Token);
                this.authService.setIsFirstAcess(response.data.IsFirstAcess);
                this.authService.setUserShopId(response.data.ShopMeta.Id);
                this.authService.setUserShopName(response.data.ShopMeta.Shop);
                this.authService.setUserShopProfile(response.data.ShopMeta.Profile);
                this.authService.setUserShopCover(response.data.ShopMeta.Cover);
                this.authService.setUserShopNif(response.data.ShopMeta.Nif);

                this.alertService.add("Usuário logado com êxito.", LogStatus.SUCCESS, 5);

                this.router.navigate(['/store/dashboard']);
            }

            if(response.status === HttpStatusCode.Unauthorized){
                this.alertService.add(response.data.message, LogStatus.ERROR);
            }
            
            this.signing.set(false);
        });
    }
}