import { Component, input } from '@angular/core';

@Component({
    selector: 'mi-devolution-tab-content',
    templateUrl: './devolution.component.html',
    styleUrl: './devolution.component.css',
    standalone: false
})
export class DevolutionComponent {
    contents = input<any[]>([]);
    isLoading = input<boolean>(false);
}
