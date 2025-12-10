import { Component, input } from '@angular/core';
import { Faq } from '../../help.models';

@Component({
    selector: 'mi-shippings-tab-content',
    templateUrl: './shippings.component.html',
    styleUrl: './shippings.component.css',
    standalone: false
})
export class ShippingsComponent {
    contents = input<Faq[]>([]);
    isLoading = input<boolean>(false);
}
