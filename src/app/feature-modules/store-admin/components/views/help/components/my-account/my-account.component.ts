import { Component, input } from '@angular/core';

@Component({
    selector: 'mi-my-account-tab-content',
    templateUrl: './my-account.component.html',
    styleUrl: './my-account.component.css',
    standalone: false
})
export class MyAccountComponent {
    contents = input<any[]>([]);
    isLoading = input<boolean>(false);
}
