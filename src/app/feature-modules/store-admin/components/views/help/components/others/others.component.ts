import { Component, input } from '@angular/core';
import { Faq } from '../../help.models';

@Component({
    selector: 'mi-others-tab-content',
    templateUrl: './others.component.html',
    styleUrl: './others.component.css',
    standalone: false
})
export class OthersComponent {
    contents = input<Faq[]>([]);
    isLoading = input<boolean>(false);
}
