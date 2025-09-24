import { Component, input, Input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { ISidebar } from '@shared/interfaces/sidebar.interface';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrl: './sidebar-menu.component.css',
    standalone: false
})
export class SidebarMenuComponent implements OnInit, OnChanges {
  sidebarMenuItems = input<ISidebar[]>([]);
  logoutEmitter = output<boolean>();
  isLeaving = input.required<boolean>();

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  logout(): void {
    this.logoutEmitter.emit(true);
  }

}
