import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Params } from '@angular/router';
import { LookProductRelationService } from '@shared/services/look-product.service';
import { LookStatus } from '@store/enums/look-status.enum';
import { ILook } from '@store/models/looks.model';

@Component({
    selector: 'mi-look',
    templateUrl: './look.component.html',
    styleUrl: './look.component.css',
    standalone: false
})
export class LookComponent implements OnInit, OnChanges {
  @Input({ required: true }) look!: ILook;
  @Input() route = '/store/looks/';
  @Input() queryParams: Params | null = null;
  @Input() select: boolean = false;
  private lookProductRelation = inject(LookProductRelationService);

  lookStatus = LookStatus;

  @Output() selectEventEmitter: EventEmitter<{ action: 'select' | 'remove', look: ILook }> = new EventEmitter();
  @Input() unSelectAllLooksFromParent: boolean = false;

  linkRelatedProducts(): void{
    if(!(this.look.products.length > 0)) return;
    this.lookProductRelation.attachProducts(this.look.products);
  }

  toggleLookSelection(status: boolean, look: ILook){
    this.select = status;
    this.selectEventEmitter.emit({ action: (this.select) ? 'select' : 'remove', look: look });
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.unSelectAllLooksFromParent){
      this.toggleLookSelection(false, this.look);
    }
  }

}
