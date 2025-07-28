import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'mi-ads',
    templateUrl: './ads.component.html',
    styleUrl: './ads.component.css',
    standalone: false
})
export class AdsComponent implements OnInit, OnChanges {
  @Input() backgroundColor: string = 'black';
  @Input() textColor: string = 'white';

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}
