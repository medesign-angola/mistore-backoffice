import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ModalSupporter } from '@core/class/modal-supporter.class';

@Component({
    selector: 'mi-modal',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    standalone: false
})
export class ModalComponent extends ModalSupporter implements OnInit, OnChanges {
  @Input() showModalFromParent: boolean = false;
  @Input() hideOnBgClick: boolean = true;
  @Output() hideModalOnParent = new EventEmitter<boolean>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ){
    super();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.showModalFromParent){
      this.openModal();
    } else {
      this.hideModal();
    }
  }

  openModal(){
    this.showModalBackground.set(true);
    this.firstTimeOpeningModal.set(false);
    this.hideModalOnParent.emit(false);
    this.toggleOverflowHiddenBodyElement(true);
  }

  hideModal(){
    this.showModalBackground.set(false);
    this.hideModalOnParent.emit(true);
    this.toggleOverflowHiddenBodyElement(false);
  }

  hideModalFromBg(){
    if(!this.hideOnBgClick) return;
    this.showModalBackground.set(false);
    this.hideModalOnParent.emit(true);
    this.toggleOverflowHiddenBodyElement(false);
  }
  
  override toggleOverflowHiddenBodyElement(value: boolean){
    if(!isPlatformBrowser(this.platformId)) return;
    let bodyElement = document.querySelector("body") as HTMLElement;
    
    if(value){
      bodyElement.style.height = '90vh';
      bodyElement.style.overflow = 'hidden';
    }else{
      bodyElement.style.height = 'auto';
      bodyElement.style.overflow = 'auto';
    }
  }
}
