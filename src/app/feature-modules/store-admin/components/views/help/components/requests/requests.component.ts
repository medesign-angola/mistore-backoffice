import { Component, input, model } from '@angular/core';

@Component({
    selector: 'mi-requests-tab-content',
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.css',
    standalone: false
})
export class RequestsComponent {
    contents = input<any[]>([]);
    isLoading = input<boolean>(false);
}
