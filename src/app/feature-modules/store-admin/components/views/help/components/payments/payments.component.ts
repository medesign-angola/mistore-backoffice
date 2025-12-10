import { Component, input } from '@angular/core';
import { Faq } from '../../help.models';

@Component({
    selector: 'mi-payments-tab-content',
    templateUrl: './payments.component.html',
    styleUrl: './payments.component.css',
    standalone: false
})
export class PaymentsComponent {
    contents = input<Faq[]>([]);
    isLoading = input<boolean>(false);
}
