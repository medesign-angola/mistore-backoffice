import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/containers/auth.component';
import { SignInComponent as StoreSignIn } from './components/views/store/sign-in/sign-in.component';
import { SignUpComponent } from './components/views/store/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/views/store/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/views/store/reset-password/reset-password.component';
import { ResetPasswordGuard } from '@core/guards/reset-password-guard.guard';
import { SignInComponent as AdminSignIn } from './components/views/admin/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'store',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        title: 'Entrar na minha conta - Mistore, Autenticação',
        component: StoreSignIn
      },
      {
        path: 'sign-up',
        title: 'Criar a minha conta - Mistore, Autenticação',
        component: SignUpComponent
      },
      {
        path: 'forgot-password',
        title: 'Esqueci a minha senha',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset-password/:id/:token',
        title: 'Recuperar a minha senha',
        canActivate: [ ResetPasswordGuard ],
        component: ResetPasswordComponent
      },
      {
        path: '**',
        redirectTo: '/auth/sign-in',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'management',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        component: AdminSignIn
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
