import { Component } from '@angular/core';

@Component({
    selector: 'mi-create-admin-stores',
    templateUrl: './create-admin-stores.component.html',
    styleUrl: './create-admin-stores.component.css',
    standalone: false
})
export class CreateAdminStoresComponent {
  categories: any[] = [
    {
      id: 'dppfof-dkiofp',
      name: 'Perfumaria'
    },
    {
      id: 'sdf-dkiofp',
      name: 'Boutique'
    },
  ];
  
  selectedCategory: any[] = [];

  selectedCategoryEventHandler($event: any[]){
    this.selectedCategory = $event;
  }
}