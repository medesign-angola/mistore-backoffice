import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, input } from '@angular/core';

@Component({
    selector: 'mi-select',
    templateUrl: './select.component.html',
    styleUrl: './select.component.css',
    standalone: false
})
export class SelectComponent implements OnInit, OnChanges, AfterViewInit {

  readonly label = input<string>('Label');
  readonly name = input<string>('label');
  readonly items = input.required<any[]>();
  readonly optionValue = input.required<string>();
  readonly optionName = input.required<string>();
  readonly placeholder = input.required<string>();
  readonly multi = input<boolean>(false);

  // states
  @Input() touched: boolean = false;
  isInvalid: boolean = false;
  readonly required = input<boolean>(false);
  
  @Output() selectedItemsEventEmitter: EventEmitter<any[]> = new EventEmitter<any[]>();

  readonly defaultValues = input<any[]>([]);
  selectedItems: any[] = [];
  filteredItems: any[] = [];

  private changeDetectorRef = inject(ChangeDetectorRef);

  placeholderDisplay: string = '';

  selectSearchTerm: string = '';

  isSelectExpanded: boolean = false;
  maxHeightOfDropdown: number = 0;

  contentInitiated: boolean = false;

  @ViewChild('selectDropdownReference') selectDropdownReference!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.placeholderDisplay = this.placeholder();
    
    this.filteredItems = this.items();

    if(this.defaultValues().length > 0 && this.filteredItems.length > 0){
      this.defaultValues().forEach(element => {
        this.selectItem(element);
      });
    }

  }
  
  ngAfterViewInit(): void {
    
  }

  countItems(){
    const selectDropdownReference = document.querySelector(`.dropdown-${ this.name() }`) as HTMLElement;
    if(!selectDropdownReference) return;
    for (let index = 0; index < selectDropdownReference.children.length; index++) {
      this.maxHeightOfDropdown += selectDropdownReference.children[index].clientHeight;
    }
  }

  toggleSelectVisibility(){
    if(!this.isSelectExpanded){
      this.expand();
      return;
    }
    this.collapse();
  }

  collapse(){
    this.isSelectExpanded = false;
    this.maxHeightOfDropdown = 0;
    if(this.touched && !(this.selectedItems.length > 0) && this.required()){
      this.isInvalid = true;
    } else {
      this.isInvalid = false;
    }
  }

  expand(){
    this.isSelectExpanded = true;
    this.touched = true;
    this.countItems();
  }

  selectItem(item: any){
    let itemIndex = this.itemIndex(item[this.optionValue()]);
    if(itemIndex === -1){
      if(this.multi()){
        this.selectedItems = [...this.selectedItems, item];
      }else{
        this.selectedItems = [item];
        this.collapse();
      }
    }else{ 
      this.selectedItems.splice(itemIndex, 1);
    }

    this.inputPlaceholderContentChange();
    this.selectedItemsEventEmitter.emit(this.selectedItems);
  }

  itemIndex(itemValue: any): number{
    return this.selectedItems.findIndex(item => item[this.optionValue()] === itemValue);
  }

  searchItem(): void{
    if(this.selectSearchTerm.length !== 0){
      this.filteredItems = this.items().filter(item => item[this.optionName()].toLowerCase().includes(this.selectSearchTerm.toLocaleLowerCase()));
    }else{
      this.filteredItems = this.items();
    }
  }

  inputPlaceholderContentChange(){
    let getItemsNames: string[] = [];
    this.selectedItems.forEach(item => {
      getItemsNames.push(item[this.optionName()]);
    });
    let joined = getItemsNames.join(', ');
    if(getItemsNames.length > 0){
      this.placeholderDisplay = joined;
    }else {
      this.placeholderDisplay = this.placeholder();
    }
  }

}
