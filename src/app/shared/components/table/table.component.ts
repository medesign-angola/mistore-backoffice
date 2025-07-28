import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'mi-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    standalone: false
})
export class TableComponent implements OnInit, OnChanges {
  
  @Input() pagination: boolean = true;
  @Input() perPage: number = 4;
  @Input() route: string = '';
  @Input() queryParamName: string = 'page';
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;

  pages: number[] = [];

  selectedItems: string[] = [];

  @ViewChild('theadElementRef') theadElementRef!: ElementRef<HTMLElement>;
  selectedDetailsStickyTopSpacing: number = 0;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculatePages();
  }

  queryParams(page: number) {
    return { [this.queryParamName]: page };
  }

  calculatePages(){
    let pagesCount = 0;
    let remain = this.totalItems % this.perPage;

    if(remain === 0){
      pagesCount = Math.floor(this.totalItems / this.perPage);

    }else{
      pagesCount = Math.floor(this.totalItems / this.perPage) + 1;
    }

    for (let index = 1; index <= pagesCount; index++) {
      let page = this.pages.find(item => item === index);
      if(!page){
        this.pages.push(index);
      }else{
        return;
      }
    }

  }
}
