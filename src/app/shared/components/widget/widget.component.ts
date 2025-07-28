import { Component, Input } from '@angular/core';

@Component({
    selector: 'mi-widget',
    templateUrl: './widget.component.html',
    styleUrl: './widget.component.css',
    standalone: false
})
export class WidgetComponent {
  @Input() widgetWidth: string = '';
  @Input() widgetBackground: string = 'white';
  @Input() widgetMainTextColor: string = 'black';
  @Input() widgetFooterTextColor: string = '';
}
