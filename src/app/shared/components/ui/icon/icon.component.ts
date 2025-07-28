import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IMenuItemBadge } from '@shared/interfaces/sidebar.interface';
import { SIDEBAR_ICONS } from '@shared/constants/sidebar-icons.const';
import { IMenuIconRef } from '@shared/interfaces/icon-ref.interface';
import { ISidebarIcon } from '@shared/interfaces/icons.interface';

@Component({
    selector: 'mi-icon',
    templateUrl: './icon.component.html',
    standalone: false
})
export class IconComponent implements OnInit, OnChanges {
  
  @Input() icon: IMenuIconRef = { iconRef: '' };
  @Input() bagde: IMenuItemBadge | undefined;
  @Input() iconIsActive: boolean = false;
  theIcon!: ISidebarIcon | undefined;
  
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.theIcon = SIDEBAR_ICONS.find(item => item.ref.iconRef === this.icon.iconRef);
  }

}
