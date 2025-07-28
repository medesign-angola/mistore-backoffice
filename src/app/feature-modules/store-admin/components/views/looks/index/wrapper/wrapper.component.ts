import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Params } from '@angular/router';
import { LOOKS_LIMT } from '@shared/constants/data-limit.const';
import { ILook } from '@store/models/looks.model';

@Component({
    selector: 'mi-look-wrapper',
    templateUrl: './wrapper.component.html',
    styleUrl: './wrapper.component.css',
    standalone: false
})
export class WrapperComponent implements OnChanges {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) currentPage: number = 1;
  
  @Input() totalItems: number = 0;
  @Input() limit: number = 0;
  
  @Input() looks: ILook[] = [];
  
  @Input() isLoading: boolean | null = false;
  
  @Input() routeTo: string = '/store/looks/edit/';
  @Input() queryParams: Params | null = null;
  @Input() queryParamName = 'page';
  @Input() pages: number[] = [];
  selectedItems: string[] = [];
  
  @Input() placeholderCount: number = 8;  

  @Output() selectionEventEmitter: EventEmitter<{ action: 'select' | 'remove', look: ILook }> = new EventEmitter<{ action: 'select' | 'remove', look: ILook }>();
  @Input() unSelectAllLooksFromParent: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {

  }

  lookSelectionHandler(event: { action: 'select' | 'remove', look: ILook }): void{
    this.selectionEventEmitter.emit(event);
  }

  generatePlaceholders(): number[]{
      return Array.from({ length: this.placeholderCount });
  }
}
