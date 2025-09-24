import { Directive, ElementRef, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { ISidebar } from "@shared/interfaces/sidebar.interface";

const INITIAL_INDEX: number = 0;

@Directive()
export abstract class SidebarExtender {

    router = inject(Router);
    route = inject(ActivatedRoute);
    protected authService = inject(AuthenticationService);

    sidebaerElementRef!: ElementRef<HTMLElement>;
    bodyContainer!: ElementRef<HTMLElement>;

    sidebarMenuItems: ISidebar[] = [];

    captuteSnapshot(){
        if(this.route.snapshot.children && this.route.snapshot.children[INITIAL_INDEX]){
            if(this.route.snapshot.children[INITIAL_INDEX].url && this.route.snapshot.children[INITIAL_INDEX].url[INITIAL_INDEX]){
                let path = this.route.snapshot.children[INITIAL_INDEX].url[INITIAL_INDEX].path;
                let sidebarIndex: number = this.getSidebarIndex(path);
                let sidebarItemIndex: number = this.getSidebarItemIndex(path, sidebarIndex);
                
                this.changeActiveItemOnMenu(sidebarIndex, sidebarItemIndex);
            }
        }
    }

    getSidebarIndex(path: string): number{
        return this.sidebarMenuItems.findIndex(sidebarItem => {
        let wantedItem = sidebarItem.items.findIndex(item => item.routeTo === path);
            if(wantedItem != -1){
                return true;
            }else{
                return false;
            }
        });
    }

    getSidebarItemIndex(path: string, sidebarIndex: number): number{
        return this.sidebarMenuItems[sidebarIndex]?.items.findIndex(item => item.routeTo === path);
    }

    changeActiveItemOnMenu(sidebarIndex: number, sidebarItemIndex: number): void{
        this.deactivateAllOthers();
        if(!this.sidebarMenuItems[sidebarIndex]) return;
        this.sidebarMenuItems[sidebarIndex].items[sidebarItemIndex].active = true;
    }

    deactivateAllOthers(): void{
        this.sidebarMenuItems.forEach(sidebar => {
        sidebar.items.forEach(item => item.active = false);
        });
    }
    
}