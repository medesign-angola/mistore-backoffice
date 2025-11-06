import { Component, input } from '@angular/core';

@Component({
    selector: 'mi-others-tab-content',
    templateUrl: './others.component.html',
    styleUrl: './others.component.css',
    standalone: false
})
export class OthersComponent {
    contents = input<any[]>([]);
    isLoading = input<boolean>(false);
}
