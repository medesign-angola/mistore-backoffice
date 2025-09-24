import { HttpStatusCode } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { LogoutFacade } from '@auth/facades/logout.facade';
import { SidebarExtender } from '@shared/component-classes/sidebar/sidebar-extender.class';
import { BadgeColorEnum } from '@shared/Enums/badge.enum';
import { ISidebar } from '@shared/interfaces/sidebar.interface';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-store-admin',
    templateUrl: './store-admin.component.html',
    styleUrl: './store-admin.component.css',
    standalone: false
})
export class StoreAdminComponent extends SidebarExtender implements OnInit, AfterViewInit {
  
  private logoutFacade = inject(LogoutFacade);
  isLeaving = signal(false);

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
          icon: { iconRef: 'wallet' },
          label: 'Carteira',
          routeTo: 'wallet',
          active: false
        },
        {
          icon: { iconRef: 'hearts' },
          label: 'Looks',
          routeTo: 'looks',
          active: false
        },
        {
          icon: { iconRef: 'shopping-cart' },
          label: 'Produtos',
          routeTo: 'products',
          active: false
        },
        {
          icon: { iconRef: 'gift' },
          label: 'Promoções',
          routeTo: 'promotions',
          active: false
        },
        {
          icon: { iconRef: 'heart-rounded' },
          label: 'Favoritos',
          routeTo: 'favorites',
          active: false
        },
        {
          icon: { iconRef: 'message-dots-circle' },
          label: 'Mensagens',
          routeTo: 'messages',
          active: false,
          bagde: {
            label: '4',
            color: BadgeColorEnum.ALERT
          }
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

  handleLogout(): void{
    this.isLeaving.set(true);
    this.logoutFacade.logout().subscribe(response => {
      if(response.status === HttpStatusCode.NoContent){
        this.router.navigate(['/auth/sign-in']);
        this.isLeaving.set(false);
      }
    })
  }

}
