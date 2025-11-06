import { Component, input } from '@angular/core';

@Component({
    selector: 'mi-shippings-tab-content',
    templateUrl: './shippings.component.html',
    styleUrl: './shippings.component.css',
    standalone: false
})
export class ShippingsComponent {
    contents = input<any[]>([]);
    isLoading = input<boolean>(false);
}
