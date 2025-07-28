import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

enum DragDropBG{
  DEFAULT = '#F8F8F8',
  OVER = 'black'
}

@Directive({
    selector: '[appDragAndDrop]',
    standalone: false
})
export class DragAndDropDirective {

  constructor() { }

  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background') bgColor = DragDropBG.DEFAULT;

  @HostListener('dragover', ['$event']) public dragOver(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.bgColor = DragDropBG.OVER;
  }

  @HostListener('dragleave', ['$event']) public dargLeave(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.bgColor = DragDropBG.DEFAULT;
  }
  
  @HostListener('drop', ['$event']) public ondrop(event: any){
    event.preventDefault();
    event.stopPropagation();
    let files = event.dataTransfer.files;
    console.log(files);
    if(files.length > 0){
      this.fileDropped.emit(files);
    }
  }

}
