import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SVGRefEnum } from '@shared/Enums/svg-ref.enum';

@Component({
    selector: 'mi-svg',
    templateUrl: './svg.component.html',
    standalone: false
})
export class SvgComponent implements OnInit, OnChanges {
  
  svgRefEnum = SVGRefEnum;
  @Input() reference!: SVGRefEnum;
  @Input() color: string = 'white';

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
  
  }

}
