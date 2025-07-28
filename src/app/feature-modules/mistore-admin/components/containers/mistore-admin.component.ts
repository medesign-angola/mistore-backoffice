import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd } from '@angular/router';
import { SidebarExtender } from '@shared/component-classes/sidebar/sidebar-extender.class';
import { BadgeColorEnum } from '@shared/Enums/badge.enum';
import { ISidebar } from '@shared/interfaces/sidebar.interface';
import { filter } from 'rxjs';

@Component({
    selector: 'app-mistore-admin',
    templateUrl: './mistore-admin.component.html',
    styleUrl: './mistore-admin.component.css',
    standalone: false
})
export class MistoreAdminComponent extends SidebarExtender implements OnInit, AfterViewInit {
  
  @ViewChild('sidebaerElementRef') override sidebaerElementRef!: ElementRef<HTMLElement>;
  @ViewChild('bodyContainer') override bodyContainer!: ElementRef<HTMLElement>;

  override sidebarMenuItems: ISidebar[] = [
    {
      fieldset: 'Categorias',
      items: [
        {
          icon: { iconRef: 'grid' },
          label: 'Visão Geral',
          routeTo: 'dashboard',
          active: false
        },
        {
          icon: { iconRef: 'users' },
          label: 'Usuários',
          routeTo: 'users',
          active: false
        },
        {
          icon: { iconRef: 'shopping-bag-2' },
          label: 'Produtos',
          routeTo: 'products',
          active: false
        },
        {
          icon: { iconRef: 'hearts' },
          label: 'Looks',
          routeTo: 'looks',
          active: false
        },
        {
          icon: { iconRef: 'shopping-bag' },
          label: 'Lojas',
          routeTo: 'store',
          active: false
        },
        {
          icon: { iconRef: 'tag' },
          label: 'Marcas',
          routeTo: 'brands',
          active: false
        },
        {
          icon: { iconRef: 'list' },
          label: 'Categoria',
          routeTo: 'categories',
          active: false,
          bagde: {
            label: '4',
            color: BadgeColorEnum.ALERT
          }
        },
        {
          icon: { iconRef: 'two-items-list' },
          label: 'Subcategorias',
          routeTo: 'subcategories',
          active: false,
          bagde: {
            label: '0',
            color: BadgeColorEnum.ALERT
          }
        },
        {
          icon: { iconRef: 'alert-triangle' },
          label: 'Denúncias',
          routeTo: 'complaints',
          active: false
        },
        {
          icon: { iconRef: 'announcement' },
          label: 'Anúncios',
          routeTo: 'advertisements',
          active: false
        },
      ]
    },
    {
      fieldset: 'Geral',
      items: [
        {
          icon: { iconRef: 'alert-circle' },
          label: 'Ajuda',
          routeTo: 'help',
          active: false
        },
        {
          icon: { iconRef: 'settings' },
          label: 'Definições',
          routeTo: 'settings',
          active: false
        }
      ]
    }
  ];

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.captuteSnapshot();
    });
    
    this.captuteSnapshot();
  }

  ngAfterViewInit(): void {
  }
}
