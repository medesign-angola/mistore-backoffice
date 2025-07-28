import { Component, inject } from '@angular/core';
import { AlertService, LogStatus } from '@core/services/alert/alert.service';

@Component({
    selector: 'mi-alert',
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.css',
    standalone: false
})
export class AlertComponent {

  logStatus = LogStatus;
  public alertService = inject(AlertService);

}
