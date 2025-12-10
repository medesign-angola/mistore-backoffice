import { Component, input } from '@angular/core';
import { Faq } from '../../help.models';

@Component({
    selector: 'mi-my-account-tab-content',
    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.css',
    standalone: false
})
export class MyAccountComponent {
    contents = input<Faq[]>([]);
    isLoading = input<boolean>(false);
}
