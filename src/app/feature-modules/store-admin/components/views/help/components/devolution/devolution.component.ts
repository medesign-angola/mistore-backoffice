import { Component, input } from '@angular/core';
import { Faq } from '../../help.models';

@Component({
    selector: 'mi-devolution-tab-content',
    templateUrl: './devolution.component.html',
    styleUrl: './devolution.component.css',
    standalone: false
})
export class DevolutionComponent {
    contents = input<Faq[]>([]);
    isLoading = input<boolean>(false);
}
