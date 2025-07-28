import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISidebar } from '@shared/interfaces/sidebar.interface';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrl: './sidebar-menu.component.css',
    standalone: false
})
export class SidebarMenuComponent implements OnInit, OnChanges {
  @Input() sidebarMenuItems: ISidebar[] = [];

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
