import { Component, input } from '@angular/core';

@Component({
    selector: 'mi-spinner',
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.css',
    standalone: false
})
export class SpinnerComponent {
    color = input<string>('white');
}
