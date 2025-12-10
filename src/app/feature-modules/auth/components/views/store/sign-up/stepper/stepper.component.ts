import { Component, input } from '@angular/core';

@Component({
  selector: 'mi-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  activeStep = input.required<number>();
}
