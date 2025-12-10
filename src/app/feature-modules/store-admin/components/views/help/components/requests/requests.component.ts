import { Component, input, model } from '@angular/core';
import { Faq } from '../../help.models';

@Component({
    selector: 'mi-requests-tab-content',
    templateUrl: './requests.component.html',
    styleUrl: './requests.component.css',
    standalone: false
})
export class RequestsComponent {
    contents = input<Faq[]>([]);
    isLoading = input<boolean>(false);
}
