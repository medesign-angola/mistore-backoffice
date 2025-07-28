import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'mi-messages',
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.css',
    standalone: false
})
export class MessagesComponent implements OnInit, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLElement>;
  @ViewChild('messageCardsContainer') messageCardsContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.messagesContainer.nativeElement.scrollTo(0, this.messageCardsContainer.nativeElement.clientHeight);
  }

}
