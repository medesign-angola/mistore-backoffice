import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthComponent } from '@auth/components/containers/auth.component';
import { SignInComponent } from '@auth/components/views/sign-in/sign-in.component';
import { SignUpComponent } from '@auth/components/views/sign-up/sign-up.component';
import { StepperComponent } from './components/views/sign-up/stepper/stepper.component';
import { FirstStepComponent } from './components/views/sign-up/steps/first-step/first-step.component';
import { SecondStepComponent } from './components/views/sign-up/steps/second-step/second-step.component';
import { ThirdStepComponent } from './components/views/sign-up/steps/third-step/third-step.component';
import { FourthStepComponent } from './components/views/sign-up/steps/fourth-step/fourth-step.component';
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    StepperComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    FourthStepComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
]
})
export class AuthModule { }
